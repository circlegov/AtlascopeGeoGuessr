import './App.css';
import { useState } from 'react'
import Map from './components/Map';
import StreetView from './components/StreetView';

// to stop from panning outside the map
// atlascope bounds
const bounds = [
  [42.255080663684545,-71.19172100986304],
  [42.40280553537127,-70.98226948425062]
]

// change locations and phrases lol
const locations = {
  freedomTrail : {lat: 42.354445408577654 , lng: -71.06783816366712, phrase: "whats a freedom trail?"},
  backBayFens : {lat: 42.354445408577654 , lng: -71.06783816366712, phrase: "whats a freedom trail?"},
  bostonPublicLibrary : {lat: 42.354445408577654 , lng: -71.06783816366712, phrase: "whats a freedom trail?"},
  museumOfFineArts : {lat: 42.354445408577654 , lng: -71.06783816366712, phrase: "whats a freedom trail?"}
}

// TODO make both divs overlay thanks
// and make them smaller in the thing
const containerStyle = {
  width: '80vw',
  height:'80vh',
};

const location = {
    lat: locations.freedomTrail.lat, 
    lng: locations.freedomTrail.lng
  };

function App() {

  const [pos, setPos] = useState(null)
  const [isShown, setIsShown] = useState(false);
  const handleCallback = (data) => {
    setPos(data)
    console.log(data)
  };
  
  const gameFinished = console.log("a"); //fly to smth on map so when isShwon is true itll do it 
                                         // so just display the text

  //TODO button component and add onclick functionality to submit point
  return (
    <div className="main">
      <StreetView center={location} containerStyle={containerStyle}/>
      <div className = "map">
        <Map bounds={bounds} handleCallback={handleCallback} position={location} isShown={isShown}/>
      </div>
      <button onClick={() => setIsShown(true)}>Submit</button>
    </div>
  )
}

export default App;