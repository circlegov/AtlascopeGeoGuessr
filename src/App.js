import './App.css';
import Map from './components/Map';
import StreetView from './components/StreetView';

// to stop from panning outside the map
const bounds = [
  [42.255080663684545,-71.19172100986304],
  [42.40280553537127,-70.98226948425062]
]

function App() {
  // maybe not best bounds but this is what atlascope gave me so

  const randomLat = Math.random() * (bounds[1][0] - bounds[0][0]) + 42.33189149353;
  const randomLng = Math.random() * (bounds[0][1] - bounds[1][1]) + -71.101454047;

  const center = {
    lat: randomLat, 
    lng: randomLng 
  };

  return (
    <>
      <StreetView center={center} />
      <div className = "map">
        <Map bounds={bounds}/>
      </div>
    </>
  )
}

export default App;