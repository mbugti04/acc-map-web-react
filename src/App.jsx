import "leaflet/dist/leaflet.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import MapComponent from './MapComponent';
import ForumComponent from './ForumComponent';
import { Container, Navbar, Nav } from 'react-bootstrap';

function App() {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:5001/locations').then(res => res.json()).then(data => {
      setLocations(data);
    });
  }, []);

  return (
    <>
    <Navbar className="bg-body-tertiary" style={{ padding: '0.5rem 1rem', maxHeight: '60px' }}>
        <Container>
          <Navbar.Brand href="#home">
            <img
              src="src/assets/ACCMapLogo.png"
              width="30"
              height="30"
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
            />
            AccMap
          </Navbar.Brand>
        </Container>
      </Navbar>
    
    <div className="container">
      
      <div className="map" id="map">
        <MapComponent locations={locations} />
      </div>
      <div className="forum" id="forum">
        <ForumComponent locations={locations} />
      </div>
    </div>
    </>
  );
}

export default App
