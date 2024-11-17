import "leaflet/dist/leaflet.css";
import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import MapComponent from './MapComponent';

function App() {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:5001/locations').then(res => res.json()).then(data => {
      setLocations(data);
    });
  }, []);

  return (
    <MapComponent locations={locations} />
  );
}

export default App
