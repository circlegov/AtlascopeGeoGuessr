import {React, useState, useCallback } from 'react'
import { GoogleMap, useJsApiLoader, StreetViewPanorama } from '@react-google-maps/api';

function StreetView({center, containerStyle}) {
    // fix env
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
  })

  // eslint-disable-next-line no-unused-vars
  const [map, setMap] = useState(null)

  const onLoad = useCallback(function callback(map) {
    setMap(map)
  }, [])

  return isLoaded ? (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onLoad={onLoad}
      >
        <StreetViewPanorama
            position={center}
            visible={true}
            options={{addressControl: false, showRoadLabels:false}}
        />
      </GoogleMap>
  ) : <></>
}

export default StreetView;