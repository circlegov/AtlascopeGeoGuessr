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
  height:'80vh',
};

// maybe not best bounds but this is what atlascope gave me so
// why does this break if i put in app nad move around my street view when map is moved
const randomLat = Math.random() * (bounds[1][0] - bounds[0][0]) + 42.25508;
const randomLng = Math.random() * (bounds[0][1] - bounds[1][1]) + -71.1917;

const location = {
    lat: randomLat, 
    lng: randomLng 
  };

function App() {

  const [pos, setPos] = useState(null)

  const handleCallback = (data) => {
    setPos(data)
    console.log(data)
  };
  

  //TODO button component and add onclick functionality to submit point
  return (
    <div className="main">
      <StreetView center={location} containerStyle={containerStyle}/>
      <div className = "map">
        <Map bounds={bounds} handleCallback={handleCallback}/>
      </div>
      <button>Submit</button>
    </div>
  )
}

export default App;