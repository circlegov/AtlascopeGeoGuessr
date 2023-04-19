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
  {lat: 42.348711681123696 , lng: -71.07913979214999, phrase: "The Boston Public Library is the first large free municipal library in the United States (and they have made this project possible) - bpl.org"}, // bpl
  {lat: 42.366826013349225 , lng: -71.05849031196088, phrase: "The Freedom Trail is 2.5 miles long with 16 nationally significant historic sites - thefreedomtrail.org"}, // freedom trail
  {lat: 42.34321306338657  , lng: -71.09463509299229, phrase: "Come see the geese"}, // fens
  {lat: 42.35449486876708  , lng: -71.06683831918687, phrase: "Boston Common is America's oldest public park - thefreedomtrail.org."}, // boston commons
  {lat: 42.338712819158914 , lng: -71.09446475207845, phrase: "The Museum of Fine Arts encompasses nearly 500,000 works of art - mfa.org."},  // mfa
  {lat: 42.37687716858686  , lng: -71.06046526638188, phrase: "The Battle of Bunker Hill was one of the bloodiest of the American Revolution."},  // bunker hill
  {lat: 42.35889517564658  , lng:-71.05815590108267, phrase: "The Old State House is the oldest surviving public building in Boston."} // Old State House
]

const containerStyle = {
  width: '75vw',
  height:'75vh',
};

function App() {

  const randomLocation = (randomNumber) => {
    return ({lat: locations[randomNumber].lat, 
             lng:  locations[randomNumber].lng})
  };

  const restartGame = () => {
    const newNum = Math.floor(Math.random() *  Object.keys(locations).length)

    setIsShown(false);
    setPos(null);
    setLocation(randomLocation(newNum));
    setPosition(null);
    setIsReset(true);
    setRandNumber(newNum);
  }
  const [randNumber, setRandNumber] = useState(Math.floor(Math.random() *  Object.keys(locations).length));
  const [location, setLocation] = useState(randomLocation(randNumber));
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
      <p>{isShown && locations[randNumber].phrase}
        <br/>
        {isShown && `You were ${parseFloat((getDistanceBetweenTwoPoints({lat: location.lat , lon: location.lng},{lat : pos.lat, lon : pos.lng},'mile')).toFixed(2))} miles away`}
        </p>
    </div>
  )
}

export default App;