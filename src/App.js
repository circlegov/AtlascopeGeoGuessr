import { React, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMapEvent } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import Map from './components/Map'

// TODO make this a component
const App = () => {

  return (
    <Map />
  )
}

export default App