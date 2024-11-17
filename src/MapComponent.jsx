
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

function MapComponent({ locations }) {
  return (
    <MapContainer center={[41.37, -72.11]} zoom={12} scrollWheelZoom={true} style={{ height: '85vh', width: '50vw'}}>
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

export default MapComponent;