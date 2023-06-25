import React from 'react'
import GoogleMapReact from 'google-map-react';
import './Map.css';
import { Paper, Typography}  from '@mui/material'
import mapStyles from '../../mapStyles';
import { Rating } from '@mui/material';



const Map = ({setCoordinates,setBounds,coords,places,setChildClicked, weatherData }) => {
  console.log({weatherData});
  return (
    <div className='MapPlace'>
    <GoogleMapReact
        bootstrapURLKeys={{ key:process.env.REACT_APP_GOOGLE_MAPS_API_KEY}}
        defaultCenter={coords}
        center={coords}
        defaultZoom={8}
        margin={[50,50,50,50]}
        onChange={(e)=>{
        setCoordinates({lat: e.center.lat, lng: e.center.lng})
        setBounds({ne:e.marginBounds.ne,sw: e.marginBounds.sw})
        }}
        options={{ disableDefaultUI: true, zoomControl: true, styles: mapStyles }}
        onChildClick={(child) => setChildClicked(child)}
      >

      {console.log("places" ,places)}

  {  places?.map((place, i) => (
          <div
            className="markerContainer"
            lat={Number(place?.latitude)}
            lng={Number(place?.longitude)}
            key={i}
          >
                <Paper elevation={3} className="paper">
                  <Typography variant="subtitle2" gutterBottom> {place.name}</Typography>
                  <img
                    className="pointer"
                    src={place.photo ? place.photo.images.large.url : 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'}
                  />
                  <Rating name="size-small" size="small" value={Number(place.rating)} readOnly />
                </Paper>
              
          </div>
        ))}



      { weatherData?.data?.map((data, i) => (
          <div key={i} lat={weatherData.lat} lng={weatherData.lon}>
            <img src={`https://openweathermap.org/img/wn/${data.Weather.icon}@2x.png`} height="70px" />
          </div>
        ))}



      </GoogleMapReact>
   </div>
  );
};

export default Map;