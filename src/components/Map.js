import { React, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMapEvent } from 'react-leaflet'
import L, { LatLng } from 'leaflet';
import 'leaflet/dist/leaflet.css';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

const PositionMarker = ({handleCallback, isShown}) => {
  const [position, setPosition] = useState(new LatLng(42.328529, -71.102312));
  useMapEvent('click', (e) => {
    if (!isShown) {
      setPosition(e.latlng)
    }
    handleCallback(e.latlng)
  })
  return (
    <Marker position={position}>
      <Popup>
	  	You are here
	    </Popup>
    </Marker>
  )
}

const Map = ({bounds, handleCallback, position, isShown}) => {
  const [map, setMap] = useState(null);

  const gameFinished = () => {
    if (isShown) {
      map.flyTo(position);
    }
  }

  return (
      <MapContainer 
        center={[42.339695, -71.076306]} 
        zoom={15} 
		    zoomControl={false}
        maxBounds={bounds}
        maxBoundsViscosity={1}
        ref={setMap}
      >
        <TileLayer
          attribution='&copy; <a href=\"https://leventhalmap.org\">Leventhal Map & Education Center</a> at the <a href=\"https://bpl.org\">Boston Public Library</a>'
          url="https://s3.us-east-2.wasabisys.com/urbanatlases/39999059010825/tiles/{z}/{x}/{y}.png"
        />
        <PositionMarker handleCallback={handleCallback} isShown={isShown}/>
        {isShown && (<Marker position={position}>
                      <Popup>
                         A pretty CSS3 popup. <br /> Easily customizable.
                         {gameFinished()}
                      </Popup>
                    </Marker>)}
        
      </MapContainer>
  )
}

export default Map