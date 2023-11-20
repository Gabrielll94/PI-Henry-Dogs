const axios = require("axios");
require("dotenv").config();
const { API_URL, API_KEY } = process.env;

const { Dog, Temperament } = require("../db");
   
// Get data from the API
const getApiData = async () => {
	try {
	  const { data } = await axios.get(API_URL);
  
	  return data.map((d) => {
		let [weightMin, weightMax] = d.weight.metric.split("-");
		let [heightMin, heightMax] = d.height.metric.split("-");
		let temperament = d.hasOwnProperty("temperament")
		  ? d.temperament.split(/\s*(?:,|$)\s*/)
		  : [];
		const result = {
		  id: d.id,
		  name: d.name,
		  weightMin: Number(weightMin),
		  weightMax: Number(weightMax),
		  heightMin: Number(heightMin),
		  heightMax: Number(heightMax),
		  temperament: temperament,
		  lifeSpan: d.life_span,
		  bredFor: d.bred_for,
		  image: d.reference_image_id,
		  source: "API",
		};
		return result;
	  });
	} catch (error) {
	  console.error("getApiData: ", error.message);
	  throw error;
	}
  };

// Get Data from database
const getDbData = async () => {
  try {
    const dogs = await Dog.findAll({
      include: {
        model: Temperament,
        through: {
          attributes: [],
        },
      },
    });

    if (dogs.length) {
      // format record like API
      const dbData = dogs.map((d) => {
        const tempArray = d.temperaments.map((t) => t.name);
        const data = {
          id: d.id,
          name: d.name,
          weightMin: d.weightMin,
          weightMax: d.weightMax,
          heightMin: d.heightMin,
          heightMax: d.heightMax,
          temperament: tempArray,
          lifeSpan: d.lifeSpan,
          bredFor: d.bredFor,
          image: d.image.url,
          source: "DB",
        };
        return data;
      });
      return dbData;
    } else {
      return [];
    }
  } catch (error) {
    console.error("getDbData: ", error.message);
    throw error;
  }
};

// Join all the data
const getAllData = async () => {
  const api = await getApiData();
  const db = await getDbData();

  const all = [...api, ...db];
  // sort by default alphabetic ASC
  all.sort((a, b) => (a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1));

  return all;
};

// Get data by idRaza
const getByIdRaza = async (idRaza) => {
  try {
    const data = await getAllData();
    const dog = data.find((d) => d.id.toString() === idRaza.toString());
    return dog || false;
  } catch (error) {
    console.error("getByIdRaza: ", error.message);
    throw error;
  }
};

// Create new breed
const addNewBreed = async ({
  name,
  heightMin,
  heightMax,
  weightMin,
  weightMax,
  lifeSpan,
  image,
  bredFor,
  temperaments,
}) => {
  try {
    name = name.charAt(0).toUpperCase() + name.slice(1);
    // create new breed
    const newDog = await Dog.create({
      name,
      heightMin,
      heightMax,
      weightMin,
      weightMax,
      lifeSpan,
      bredFor,
      image,
    });
    // add temperaments to newDog
    if (temperaments.length) {
      await Promise.all(
        temperaments.map(async (name) => {
          const temp = await Temperament.findOne({
            attributes: ["id"],
            where: { name: name },
          });
          await newDog.addTemperament(temp.id);
        })
      );
    }
    return newDog;
  } catch (error) {
    console.error("addNewBreed: ", error.message);
    throw error;
  }
};

// Delete from database
const deleteDbBreed = async (id) => {
  try {
    const res = await Dog.destroy({
      where: {
        id,
      },
      force: true,
    });
    return res;
  } catch (error) {
    console.error("deleteDbBreed: ", error.message);
    throw error;
  }
};

module.exports = {
  getApiData,
  getDbData,
  getAllData,
  getByIdRaza,
  addNewBreed,
  deleteDbBreed,
};
