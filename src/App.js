import './App.css';
import { useState } from 'react'
import Map from './components/Map';
import StreetView from './components/StreetView';

// to stop from panning outside the map
const bounds = [
  [42.255080663684545,-71.19172100986304],
  [42.40280553537127,-70.98226948425062]
]
// TODO make both divs overlay thanks
// and make them smaller in the thing
const containerStyle = {
  width: '80vw',
  height: '80vh',
};



function App() {
  // maybe not best bounds but this is what atlascope gave me so

  const randomLat = Math.random() * (bounds[1][0] - bounds[0][0]) + 42.33189149353;
  const randomLng = Math.random() * (bounds[0][1] - bounds[1][1]) + -71.101454047;

  const center = {
    lat: randomLat, 
    lng: randomLng 
  };

  const [pos, setPos] = useState(null)

  const handleCallback = (data) => {
    setPos(data)
    console.log(data)
  };
  
  

  //TODO button component and add onclick functionality to submit point
  return (
    <>
      <StreetView center={center} containerStyle={containerStyle}/>
      <div className = "map">
        <Map bounds={bounds} handleCallback={handleCallback}/>
      </div>
      
      <button>Submit</button>
    </>
  )
}

export default App;