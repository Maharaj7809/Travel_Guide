import React, { useState, useEffect, createRef } from 'react';
import './List.css'
import { CircularProgress , Typography,Grid} from '@mui/material';
import { Rating } from '@mui/material';
const List = ({places,type,setType,rating,setRating,childClicked,isLoading}) => {

  const [elRefs, setElRefs] = useState([]);


  useEffect(() => {
    setElRefs((refs) => Array(places?.length).fill().map((_, i) => refs[i] || createRef()));
  }, [places]);


  return (
  
    <div className="Lista">
 <div  style={{display:"flex ",alignItems:"center",justifyContent:"center"}}><h1>Food and Dining around you</h1></div>

    <div  className='Listo'>  
      <div> <label id="type">Type</label>
         <select id="type" value={type} onChange={(e) => setType(e.target.value)} >
           
        <option value="restaurants">Restaurents</option>
        <option value="hotels">Hotels</option>
        <option value="attractions">Attractions</option>
            
            </select> </div>
       <div>
       <label id="rating">Rating</label>
            <select id="rating" value={rating} onChange={(e) => setRating(e.target.value)} >
              <option value="">All</option>
              <option value="3">Above 3.0</option>
              <option value="4">Above 4.0</option>
              <option value="4.5">Above 4.5</option>
            </select>
       </div>
            
            </div>

   <div className="row" >

   {isLoading ? (
        <div style={{display:"flex",alignItems:"center",justifyContent:"center",height:"45vh"}}>
        
          <CircularProgress size="4rem" />
        </div>
      ) : (

        places?.map((place ,i) => (
          <Grid ref={elRefs[i]} key={i} item xs={12}>
        <Card  selected={Number(childClicked) === i} refProp={elRefs[i]} key={i} place={place} img={(place.photo && place.photo.images.medium.url)? place.photo.images.medium.url :'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'} />
        </Grid>
              
          ))
        
      )
     }

  </div>
  </div> 
  )
}







const Card=({place,img,selected, refProp})=>{
  if (selected) refProp?.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  return(
  <div className='cardi'>  
  <img className="card" src={img} alt='' onClick={() => window.open(place.web_url, '_blank') }/>
<div style={ {display:'flex', justifyContent:"center"}}>
  <h4>  {place.name} </h4>
</div>
        <div style={ {display:'flex', justifyContent:"space-between"}} >
    
          <h5>{place.num_reviews} review{place.num_reviews > 1 && 's'}</h5>

          <Rating name="read-only" value={Number(place.rating)} readOnly />
        </div>

        <div style={ {display:'flex', justifyContent:"space-between"}}>
          <div> <h5>phone</h5></div>
          <div><h5>{place.phone} </h5></div>
         
        </div>

        <div style={ {display:'flex', justifyContent:"space-between"}}>
          <div> <h5>price</h5></div>
          <div><h5>{place.price_level} </h5></div>
         
        </div>

        <div style={ {display:'flex', justifyContent:"space-between"}}>
          <h5>Ranking</h5>
          <h5>
            {place.ranking}
          </h5>
        </div>
        {place?.awards.map((award) => (
          <div style={ {display:'flex', justifyContent:"space-between",alignItems:"center"}}>
            <img src={award?.images.small} />
            <h5>{award.display_name}</h5>
          </div>
        ))}


</div>
  
  )
}



export default List;