import { React, useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMapEvent } from 'react-leaflet'
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

const PositionMarker = ({handleCallback, isShown, position, setPosition}) => {
  useMapEvent('click', (e) => {
    if (!isShown) {
      setPosition(e.latlng)
      console.log(e.latn)
      handleCallback(e.latlng)
    }
  })

  if (position != null) {
    return (
      <Marker position={position}>
        <Popup>
        You are here
        </Popup>
      </Marker>
    );
  } 
}

const greenIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const Map = ({bounds, handleCallback, finalPos, isShown, isReset, position, setPosition, setIsReset}) => {
  const [map, setMap] = useState(null);
  const [startPos, setStartPos] = useState([42.328529, -71.102312]);

  const gameFinished = () => {
    if (isShown) {
      map.flyTo(finalPos);
    }
  }

  useEffect(() => {
    setStartPos(startPos);
    if (isReset) { 
      map.flyTo({lat:startPos[0], lng:startPos[1]})
      setPosition(null);
      setIsReset(false);
    }
  }, [isReset, startPos, map, setIsReset, setPosition]); 
  return (
      <MapContainer 
        center={startPos} 
        zoom={15} 
        minZoom={13}
        maxZoom={40}
		    zoomControl={true}
        maxBounds={bounds}
        maxBoundsViscosity={1}
        ref={setMap}
      >
        <TileLayer
          attribution='&copy; <a href=\"https://leventhalmap.org\">Leventhal Map & Education Center</a> at the <a href=\"https://bpl.org\">Boston Public Library</a>'
          url="https://s3.us-east-2.wasabisys.com/urbanatlases/39999059010825/tiles/{z}/{x}/{y}.png"
        />
        <PositionMarker handleCallback={handleCallback} isShown={isShown} position={position} setPosition={setPosition}/>
        {isShown && (<Marker position={finalPos} icon={greenIcon}>
                      <Popup>
                         A pretty CSS3 popup. <br /> Easily customizable.
                         {gameFinished()}
                      </Popup>
                    </Marker>)}
        
      </MapContainer>
  )
}

export default Map