import React from 'react';
import './Header.css';
import { Autocomplete } from '@react-google-maps/api';

const Header = ({ onPlaceChanged, onLoad }) => {
    return (
      <div className="nav">

   <div>
    <h1>Travel Advisor</h1>
   </div>

     <div className="searchbox">
        <div> <h2> Place Search </h2>  </div>
      <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
         <div style={{display:"flex"}}> 
      
           <input type="text" name="search"  placeholder="Search Place"/>
        </div>
        </Autocomplete>
    </div>
  
     
     </div>

    )
}

  


export default Header;