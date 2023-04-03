import './App.css';
import Map from './components/Map';
import { GoogleMap, LoadScript, StreetViewPanorama } from '@react-google-maps/api';
// TODO make this a component

const center = {
  lat: 42.331891493532964, 
  lng: -71.10145404754537
};

const containerStyle = {
  width: '100vw',
  height: '100vh'
};


const App = () => {

  return (
    <>
    <LoadScript 
      // fix env stuff later idk why its broken as fuck
      googleMapsApiKey="" // secret key plz add
    >
      <GoogleMap
    id="streetview"
    mapContainerStyle={containerStyle}
    zoom={7}
    center={center}
  >
    <StreetViewPanorama
      position={center}
      visible={true}
    />
  </GoogleMap>
    </LoadScript>
    <div className = "map">
      <Map />
    </div>
    </>
  )
}

export default App