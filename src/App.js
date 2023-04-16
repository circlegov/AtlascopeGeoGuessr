import './App.css';
import { useState } from 'react'
import Map from './components/Map';
import StreetView from './components/StreetView';
import { getDistanceBetweenTwoPoints } from 'calculate-distance-between-coordinates';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

// to stop from panning outside the map
// atlascope bounds
const bounds = [
  [42.255080663684545,-71.19172100986304],
  [42.40280553537127,-70.98226948425062]
]

// change locations and phrases lol
const locations = [
  {lat: 42.348711681123696 , lng: -71.07913979214999, phrase: "whats a fl?"}, // bpl
  {lat: 42.366826013349225 , lng: -71.05849031196088, phrase: "whail?"}, // freedom trail
  {lat: 42.34321306338657  , lng: -71.09463509299229, phrase: "wom trail?"}, // fens
  {lat: 42.35449486876708  , lng: -71.06683831918687, phrase: "whats dom trail?"}, // boston commons
  {lat: 42.338712819158914 , lng: -71.09446475207845, phrase: "il?"}  // mfa
]

const containerStyle = {
  width: '75vw',
  height:'75vh',
};

function App() {

  const randomLocation = () => {
    const randomNumber = Math.floor(Math.random() *  Object.keys(locations).length);
    console.log(locations[randomNumber].phrase)
    return ({lat: locations[randomNumber].lat, 
             lng:  locations[randomNumber].lng})
  };

  const restartGame = () => {
    setIsShown(false);
    setPos(null);
    setLocation(randomLocation());
    setPosition(null);
    setIsReset(true);
  }
  const [location, setLocation] = useState(randomLocation());
  const [pos, setPos] = useState(null);
  const [isShown, setIsShown] = useState(false);
  const [isReset, setIsReset] = useState(false);
  const [position, setPosition] = useState(null);

  const handleCallback = (data) => {
    if (!isShown) {
      setPos(data);
    }
  };

  return (
    <div className="main">
      <h1>Atlascope GeoGuessr</h1>
      <StreetView center={location} containerStyle={containerStyle}/>
      <div className = "map">
        <Map bounds={bounds} handleCallback={handleCallback} finalPos={location} isShown={isShown} isReset={isReset} position={position} setPosition={setPosition} setIsReset={setIsReset}/>
      </div>
      <div className="buttons">
          <Button variant="success" onClick={() => {
          if (pos != null) {
            setIsShown(true);
          } else {
            alert("please pick a point");
          }
          }}>Submit</Button>
          {isShown && <Button variant="dark" onClick={() => {restartGame()}}>Play Again</Button>}
        </div>
      <p>{isShown && getDistanceBetweenTwoPoints({lat: location.lat , lon: location.lng},{lat : pos.lat, lon : pos.lng},'mile')}</p>
      <p>{location.phrase}</p>
    </div>
  )
}

export default App;