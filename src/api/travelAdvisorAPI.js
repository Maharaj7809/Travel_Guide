   import axios from 'axios';

   export const getPlacesData = async (type,sw,ne) => {
    try {
      const { data: { data } } = await axios.get(`https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`, {
        params: {
          bl_latitude: sw.lat,
          tr_latitude: ne.lat,
          bl_longitude: sw.lng,
          tr_longitude: ne.lng,
        },
        headers: {
          'X-RapidAPI-Key': '87369e2fe8msh6fc7f4126b22623p1a2cbfjsn9dddc50c3e28',
          'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
        }
      });
              return data;
    }catch (error) {
      console.log(error);
    }
  };
  
  export const getWeatherData = async (lat, lng) => {
    try {
      if (lat && lng) {
        const { data } = await axios.get('https://weatherbit-v1-mashape.p.rapidapi.com/forecast/3hourly', {
          params: {
            lat: lat,
            lon: lng
          },
          headers: {
            'X-RapidAPI-Key': '5d63b2d2eemsh4da1ae251d3ed61p145a08jsn5e3ec88da019',
            'X-RapidAPI-Host': 'weatherbit-v1-mashape.p.rapidapi.com'
          }
        });
    
        return data;
      
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  
  