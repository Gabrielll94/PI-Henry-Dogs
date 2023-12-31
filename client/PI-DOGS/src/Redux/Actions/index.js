  import axios from 'axios';

//    Constants for action types
const ORDER_BY_NAME = 'ORDER_BY_NAME';
const ORDER_BY_WEIGHT = 'ORDER_BY_WEIGHT';
const GET_DOGS = 'GET_DOGS';
const GET_DOGS_ERROR = 'GET_DOGS_ERROR';
const GET_DOGS_BY_NAME = 'GET_DOGS_BY_NAME';
const GET_DOGS_BY_NAME_ERROR = 'GET_DOGS_BY_NAME_ERROR';
const GET_TEMPERAMENTS_LIST = 'GET_TEMPERAMENTS_LIST';
const POST_DOG = 'POST_DOG';
const GET_DOGS_BY_BREED = 'GET_DOGS_BY_BREED';
const GET_BREEDS = 'GET_BREEDS';
const GET_BREEDS_ERROR = 'GET_BREEDS_ERROR';
const GET_DOGS_BY_TEMP = 'GET_DOGS_BY_TEMP';
const FILTER_CREATED = 'FILTER_CREATED';
const GET_DETAILS = 'GET_DETAILS';
const DELETE_DETAILS = 'DELETE_DETAILS';

  export function orderByName(payload) {
      return {
          type: ORDER_BY_NAME,
          payload,
      };
  }

  export function orderByWeight(payload) {
      return {
          type: ORDER_BY_WEIGHT,
          payload,
      };
  }

  export function getDogs() {
      return async function (dispatch) {
          try {
              const { data } = await axios.get('http://localhost:3001/dogs');

              if (data.length === 0) {
                  dispatch({
                      type: GET_DOGS_ERROR,
                      payload: { error: 'No dogs found' },
                  });
              } else {
                  dispatch({
                      type: GET_DOGS,
                      payload: data,
                  });
              }
          } catch (error) {
              console.error('Error fetching dogs:', error);
              dispatch({
                  type: GET_DOGS_ERROR,
                  payload: { error: 'Failed to fetch dogs', details: error.message },
              });
          }
      };
  }

  export function filterDogsByMAXWeight(payload) {
      return {
          type: 'FILTER_BY_MAX_WEIGHT',
          payload,
      };
  }

  export function filterDogsByMINWeight(payload) {
      return {
          type: 'FILTER_BY_MIN_WEIGHT',
          payload,
      };
  }

  export function getDogsByName(name) {
      return async function (dispatch) {
        
       
  try {
              const { data } = await axios.get(`http://localhost:3001/dogs?name=${name}`);
              dispatch({
                  type: GET_DOGS_BY_NAME,
                  payload: data,
              });
          } catch (error) {
              console.error('Error fetching dogs by name:', error);
              dispatch({
                  type: GET_DOGS_BY_NAME_ERROR,
                
               
  payload: { error: 'Failed to fetch dogs by name', details: error.message },
              });
          }
      };
  }

  export function getTemperamentsList() {
    return async function (dispatch) {
        try {
            const { data } = await axios.get('http://localhost:3001/temperaments');
            console.log("Temperaments data:", data); // Add this line for logging
            const listOfTemperaments = data.map((el) => el.name);
            dispatch({
                type: GET_TEMPERAMENTS_LIST,
                payload: listOfTemperaments,
            });
        } catch (error) {
            console.error('Error fetching temperaments:', error);
        }
    };
}

  export function postDog(payload) {
      return async function (dispatch) {
          try {
              const response = await axios.post('http://localhost:3001/dogs', payload);
              dispatch({
                type: POST_DOG,
                  payload: response.data,
              });
          } catch (error) {
              console.error('Error posting dog:', error);
          }
      };
  }

  export function getDogsByBreed(payload) {
    return async function (dispatch) {
      try {
        const { data } = await axios.get(`http://localhost:3001/breedGroup?breedGroup=${payload}`);
        dispatch({
          type: GET_DOGS_BY_BREED,
          payload: data, // Assuming data is an array of dogs
        });
      } catch (error) {
        console.error('Error fetching dogs by breed:', error);
      }
    };
  }

export function getBreeds() {
return async function (dispatch) {
  try {
  const { data } = await axios.get('http://localhost:3001/breeds');
dispatch({
 type: GET_BREEDS,
 payload: data,
});
  } catch (error) {
console.log('Error fetching breeds:', error);
dispatch({
 type: GET_BREEDS_ERROR,
 payload: { error: 'Failed to fetch breeds', details: error.message },
});
  }
 };
}


  export function filterDogsByTemperament(payload) {
      return async function (dispatch) {
          try {
              const { data } = await axios.get(`http://localhost:3001/dog/?temperament=${payload}`);
              console.log(data);
              dispatch({
                  type: GET_DOGS_BY_TEMP,
                  payload: data,
              });
          } catch (error) {
              console.error('Error fetching dogs by temperament:', error);
          } 
      };
  }

  export function filterCreated(payload) {
      return {
          type: FILTER_CREATED,
          payload,
      };
  }

  export function getDetails(id) {
      return async function (dispatch) {
          try {
              const { data } = await axios.get(`http://localhost:3001/dogs/${id}`);
              dispatch({
                  type: GET_DETAILS,
                  payload: data,
              });
          } catch (error) {
              console.error('Error fetching details:', error);
          }
      };
  }
            
       


  export function deleteDetails() {
      return async function (dispatch) {
          try {
              dispatch({
                  type: DELETE_DETAILS,
              });
          } catch (error) {
              console.error('Error deleting details:', error);
          }
      };
  }