import React from "react";
import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const markers = [
  { id: 1, name: "Roma", coords: [41.9028, 12.4964], description: "Capitale d'Italia" },
  { id: 2, name: "Milano", coords: [45.4642, 9.1900], description: "Capitale della moda" },
  { id: 3, name: "Napoli", coords: [40.8518, 14.2681], description: "Famosa per la pizza" },
  { id: 4, name: "Firenze", coords: [43.7696, 11.2558], description: "Culla del Rinascimento" }
];

const MapModule = ({selectedItem}) => {
  /*return  <div className="characteristics" id="mapMod">
   TODO MAP MODULE
   </div>
  */
  return (
    <MapContainer center={[42.5, 12.5]} zoom={6} style={{ height: "500px", width: "100%" }} scrollWheelZoom={false}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      
      {markers.map((marker) => (
        <CircleMarker
          key={marker.id}
          center={marker.coords}
          radius={10}
          fillColor="blue"
          color="darkblue"
          weight={2}
          fillOpacity={0.6}
        >
          <Popup>
            <strong>{marker.name}</strong>
            <br />
            {marker.description}
          </Popup>
        </CircleMarker>
      ))}
    </MapContainer>
  );
};

export default MapModule;
