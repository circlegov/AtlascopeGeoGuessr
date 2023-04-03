import { React, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMapEvent } from 'react-leaflet'
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

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
	  	You are here
	  </Popup>
    </Marker>
  )
}

const Map = () => {

  return (
      <MapContainer 
        center={[42.339695, -71.076306]} 
        zoom={15} 
		zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href=\"https://leventhalmap.org\">Leventhal Map & Education Center</a> at the <a href=\"https://bpl.org\">Boston Public Library</a>'
          url="https://s3.us-east-2.wasabisys.com/urbanatlases/39999059010825/tiles/{z}/{x}/{y}.png"
        />
        <PositionMarker/>
      </MapContainer>
  )
}

export default Map