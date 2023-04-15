import './App.css';
import { useState } from 'react'
import Map from './components/Map';
import StreetView from './components/StreetView';
import { getDistanceBetweenTwoPoints } from 'calculate-distance-between-coordinates';

// to stop from panning outside the map
// atlascope bounds
const bounds = [
  [42.255080663684545,-71.19172100986304],
  [42.40280553537127,-70.98226948425062]
]

// change locations and phrases lol
const locations = {
  0 : {lat: 42.354445408577654 , lng: -71.06783816366712, phrase: "whats a freedom trail?"}, // freedom trail,
  1 : {lat: 42.354445408577654 , lng: -71.06783816366712, phrase: "whats a freedom trail?"}, // freedom trail
  2 : {lat: 42.354445408577654 , lng: -71.46783816366712, phrase: "whats a freedom trail?"}, // fens
  3 : {lat: 42.354445408577654 , lng: -71.36783816366712, phrase: "whats a freedom trail?"}, // boston commons
  4 : {lat: 42.354445408577654 , lng: -71.16783816366712, phrase: "whats a freedom trail?"}  // mfa
}

// TODO make both divs overlay thanks
// and make them smaller in the thing
const containerStyle = {
  width: '90vw',
  height:'90vh',
};

function App() {

  const randomLocation = () => {
    const randomNumber = Math.floor(Math.random() *  Object.keys(locations).length);

    return ({lat: locations[randomNumber].lat, 
             lng:  locations[randomNumber].lng})
  };

  const restartGame = () => {
    setIsShown(false);
    setPos(null);
    setLocation(randomLocation());
  }
  const [location, setLocation] = useState(randomLocation());
  const [pos, setPos] = useState(null);
  const [isShown, setIsShown] = useState(false);
  const handleCallback = (data) => {
    if (!isShown) {
      setPos(data);
    }
  };

  return (
    <div className="main">
      <StreetView center={location} containerStyle={containerStyle}/>
      <div className = "map">
        <Map bounds={bounds} handleCallback={handleCallback} position={location} isShown={isShown}/>
      </div>
      <button onClick={() => {
        if (pos != null) {
          setIsShown(true);
        } else {
          alert("please pick a point");
        }
        }}>Submit</button>
      <h1>{isShown && getDistanceBetweenTwoPoints({lat: location.lat , lon: location.lng},{lat : pos.lat, lon : pos.lng},'mile')}</h1>
      {isShown && <button onClick={() => {restartGame()}}>restart</button>}
    </div>
  )
}

export default App;