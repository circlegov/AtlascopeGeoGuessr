import { React, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMapEvent } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

function PositionMarker() {
  const [position, setPosition] = useState([42.328529, -71.102312]);
  //TODO make this a bit cleaner but it works
  useMapEvent('click', (e) => {
    setPosition(e.latlng)
  })
  return (
    <Marker position={position}>
      <Popup>
	  	<span>
              A pretty CSS3 popup. <br/> Easily customizable.
        </span></Popup>
    </Marker>
  )
}

const Map = () => {

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

export default Map