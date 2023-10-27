const axios = require("axios")
const app = require('express').Router()
const { Dog, Temperament } = require('../db');

// Obtiene un arreglo de objetos, donde cada objeto es la raza de un perro.
app.get('/dogs', async (req, res) => {
    try{
        let dogs = await Dog.findAll();
        if(!dogs){
            throw new Error('No hay perros')
            }
            return res.status(200).json({message: 'Perros obtenidos exitosamente!', data: dogs})
            }catch(err){
                console.log(err)
                return res.status(500).send({error:'Error al obtener los perros'});
            }
});

// Esta ruta obtiene el detalle de una raza específica. 
// La raza es recibida por parámetro (ID).
// Debe funcionar tanto para los perros de la API como para los de la base de datos.

app.get('/dogs/:idRaza', async (req, res) => {
    const idRaza = req.params.idRaza
    try {
        const[dogFromApi, dogFromDB] = await Promise.all([
            axios.get(`https://api.thedogapi.com/v1/breeds/${idRaza}`),
            Dog.findOne({where:{name:idRaza}, include: db.Temperament})
        ]);
        if(!dogFromApi || !dogFromDB) {
            return res.status(404).json({message: 'Breed not found'});
        }
        const temperamentNames = dogFromDB.Temperaments.map(temp => temp.name);

        const dogDetails = {
            id: dogFromApi.data.id,
            name: dogFromApi.data.name,
            temperament: temperamentNames,
            description: dogFromDB.description,
        };
        res.json(dogDetails);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Esta ruta debe obtener todas aquellas razas de perros que coinciden con el nombre recibido por query. 
// (No es necesario que sea una coincidencia exacta).
// Debe buscar tanto los de la API como los de la base de datos.

app.get('/dogs/name', async (req, res) => {
    const searchName = req.query.search.toLowerCase();

    try {
        const[dogFromApi, dogFromDB] = await Promise.all([
            axios.get(`https://api.thedogapi.com/v1/breeds/${idRaza}`),
            Dog.findOne({where:{name:idRaza}, include: db.Temperament})
        ]);

        const dogList = dogFromApi.data.map(dog => ({
            id: dog.id,
            name: dog.name.toLowerCase()
        }));
        dogFromDB.forEach(dog => {
            dogList.push({
                id: dog.id,
                name: dog.breed.toLowerCase()
            });
            const matchingDogs = dogList.filter(dog => dog.name.includes(searchQuery));
            const dogNames = matchingDogs.map(dog => dog.name);

            if(dogNames.length === 0) {
                return res.status(404).json({ message: 'No matching breeds found' });
            }
            res.json(dogNames);
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
})