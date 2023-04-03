import {React, useState, useCallback } from 'react'
import { GoogleMap, useJsApiLoader, StreetViewPanorama } from '@react-google-maps/api';

function StreetView({center, containerStyle}) {
    // fix env
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyAF7YjiZUcYyW3Py0TFj4HbnOZECWcr6yc"
  })

  const [map, setMap] = useState(null)

  const onLoad = useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    setMap(map)
  }, [])

  const onUnmount = useCallback(function callback(map) {
    setMap(null)
  }, [])

  return isLoaded ? (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        <StreetViewPanorama
            position={center}
            visible={true}
        />
      </GoogleMap>
  ) : <></>
}

export default StreetView;