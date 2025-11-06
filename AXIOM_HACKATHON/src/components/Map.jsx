import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect } from 'react';

// Fix for default marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom pharmacy marker icon
const pharmacyIcon = new L.Icon({
  iconUrl: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMiIgaGVpZ2h0PSI0MiIgdmlld0JveD0iMCAwIDMyIDQyIj48cGF0aCBmaWxsPSIjMDZiNmQ0IiBkPSJNMTYgMEM5LjQgMCA0IDUuNCA0IDEyYzAgOS41IDEyIDI2IDEyIDI2czEyLTE2LjUgMTItMjZjMC02LjYtNS40LTEyLTEyLTEyem0wIDE4Yy0zLjMgMC02LTIuNy02LTZzMi43LTYgNi02IDYgMi43IDYgNi0yLjcgNi02IDZ6Ii8+PC9zdmc+',
  iconSize: [32, 42],
  iconAnchor: [16, 42],
  popupAnchor: [0, -42]
});

// User location marker icon
const userIcon = new L.Icon({
  iconUrl: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSIjZWY0NDQ0Ij48Y2lyY2xlIGN4PSIxMiIgY3k9IjEyIiByPSI4IiBmaWxsPSIjZWY0NDQ0IiBvcGFjaXR5PSIwLjMiLz48Y2lyY2xlIGN4PSIxMiIgY3k9IjEyIiByPSI0IiBmaWxsPSIjZWY0NDQ0Ii8+PC9zdmc+',
  iconSize: [24, 24],
  iconAnchor: [12, 12]
});

// Component to handle map auto-centering
function MapController({ center, pharmacies }) {
  const map = useMap();
  
  useEffect(() => {
    if (center && pharmacies.length > 0) {
      // Calculate bounds to fit all markers
      const bounds = L.latLngBounds([
        [center.lat, center.lng],
        ...pharmacies.map(p => [p.lat, p.lng])
      ]);
      map.fitBounds(bounds, { padding: [50, 50] });
    } else if (center) {
      map.setView([center.lat, center.lng], 12);
    }
  }, [center, pharmacies, map]);
  
  return null;
}

const Map = ({ center, pharmacies }) => {
  if (!center) {
    return (
      <div className="bg-gradient-to-br from-gray-100 to-gray-200 h-[500px] rounded-2xl flex items-center justify-center shadow-inner">
        <div className="text-center">
          <div className="animate-pulse mb-4">
            <svg className="w-16 h-16 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <p className="text-gray-600 font-medium">Loading map...</p>
          <p className="text-sm text-gray-500">Getting your location</p>
        </div>
      </div>
    );
  }
  
  return (
    <MapContainer 
      center={[center.lat, center.lng]} 
      zoom={12} 
      className="rounded-2xl shadow-lg border-2 border-cyan-100"
      style={{ height: '500px' }}
    >
      <MapController center={center} pharmacies={pharmacies} />
      
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      />
      
      {/* User Location Marker */}
      <Marker position={[center.lat, center.lng]} icon={userIcon}>
        <Popup>
          <div className="text-center p-2">
            <strong className="text-red-600">📍 Your Location</strong>
            <p className="text-xs text-gray-600 mt-1">
              {center.lat.toFixed(4)}, {center.lng.toFixed(4)}
            </p>
          </div>
        </Popup>
      </Marker>
      
      {/* Pharmacy Markers */}
      {pharmacies.map((pharmacy) => (
        <Marker 
          key={pharmacy.id}
          position={[pharmacy.lat, pharmacy.lng]}
          icon={pharmacyIcon}
        >
          <Popup>
            <div className="p-2 min-w-[200px]">
              <h3 className="font-bold text-base text-gray-800 mb-2">{pharmacy.name}</h3>
              
              <div className="space-y-1 mb-3">
                <p className="text-sm">
                  <span className="font-semibold text-green-600">Price:</span> ₹{pharmacy.price}
                </p>
                <p className="text-sm">
                  <span className="font-semibold text-blue-600">Distance:</span> {pharmacy.distance.toFixed(2)} km
                </p>
                <p className="text-sm">
                  <span className="font-semibold text-purple-600">Stock:</span> {pharmacy.stock} units
                </p>
                <p className="text-sm">
                  <span className="font-semibold text-cyan-600">AI Score:</span> {pharmacy.score?.toFixed(1)}/100
                </p>
              </div>
              
              <button
                onClick={() => {
                  const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${pharmacy.lat},${pharmacy.lng}`;
                  window.open(mapsUrl, '_blank');
                }}
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-2 px-4 rounded-lg font-semibold hover:shadow-lg transition-all text-sm"
              >
                Get Directions →
              </button>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default Map;
