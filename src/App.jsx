import "leaflet/dist/leaflet.css";
import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'

function App() {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:5001/locations').then(res => res.json()).then(data => {
      setLocations(data);
    });
  }, []);

  return (
    <MapContainer center={[41.37, -72.11]} zoom={12} scrollWheelZoom={true} style={{ height: '98vh', width: '98vw'}}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {locations.map(location => (
        <Marker key={location.id} position={[location.latitude, location.longitude]}>
          <Popup>
            <strong>{location.marker_title}</strong><br />{location.marker_description}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default App
