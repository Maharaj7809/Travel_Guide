import './App.css';
import {  BrowserRouter as Router,Route } from "react-router-dom";
import Header from './components/Header/Header';
import List from './components/List/List';
import Map from './components/Map/Map';
import React, { useState, useEffect } from 'react';
import { getPlacesData, getWeatherData } from './api/travelAdvisorAPI';

function App() {
  const [type, setType] = useState('restaurants');
  const [rating, setRating] = useState('');
  const [autocomplete, setAutocomplete] = useState({});
 const[places,setPlaces]=useState([]);
 const [filteredPlaces, setFilteredPlaces] = useState([]);
 const [bounds, setBounds] = useState({});
 const [coords, setCoordinates] = useState({});
 const [isLoading, setIsLoading] = useState(false);
 const [childClicked, setChildClicked] = useState(null);
 const [weatherData, setWeatherData] = useState([]);
 
 useEffect(() => {
  navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
    setCoordinates({ lat: latitude, lng: longitude });
   
  });
}, []);

useEffect(() => {
  const filtered = places?.filter((place) => Number(place.rating) > rating);

  setFilteredPlaces(filtered);
}, [rating]);


  useEffect(() => {
    if (bounds.sw && bounds.ne) {
      setIsLoading(true);


      getWeatherData(coords.lat, coords.lng)
      .then((data) => setWeatherData(data));


      getPlacesData(type,bounds.sw, bounds.ne).then((data) => {
           setPlaces(data?.filter((place) => place.name && place.num_reviews > 0)); 
           setFilteredPlaces([]);
           setIsLoading(false);
           setRating('');
      
        });
      }
  }, [type,bounds]);



  const onLoad = (autoC) => setAutocomplete(autoC);

  const onPlaceChanged = () => {
    const lat = autocomplete.getPlace().geometry.location.lat();
    const lng = autocomplete.getPlace().geometry.location.lng();

    setCoordinates({ lat, lng });
  };


  
  return (
    <Router>
     <Header onPlaceChanged={onPlaceChanged} onLoad={onLoad}/>

    <div className='Listmap'> 
      <List
        childClicked={childClicked}
         isLoading={isLoading}
      places={filteredPlaces.length ? filteredPlaces : places}
         type={type}
        setType={setType}
        rating={rating}
        setRating={setRating}
      
      />
      <Map
        setChildClicked={setChildClicked}
      setCoordinates={setCoordinates}
      setBounds={setBounds}
       coords={coords}
      places={filteredPlaces.length ? filteredPlaces : places}
      weatherData={weatherData}
      />
    </div>
      </Router>

  );
  
}

export default App;

