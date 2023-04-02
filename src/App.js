import { React, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMapEvent } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';

function PositionMarker() {
  const [position, setPosition] = useState(null);
  //TODO make this a bit cleaner but it works
  useMapEvent('click', (e) => {
    setPosition(e.latlng)
  })
  return position === null ? null : (
    <Marker position={position}>
      <Popup>You are here</Popup>
    </Marker>
  )
}

// TODO make this a component
const App = () => {

  return (
    <div>
      <MapContainer 
        center={[42.339695, -71.076306]} 
        zoom={15} 
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://s3.us-east-2.wasabisys.com/urbanatlases/39999059010825/tiles/{z}/{x}/{y}.png"
        />
        <PositionMarker/>
      </MapContainer>
    </div>
  )
}

export default App