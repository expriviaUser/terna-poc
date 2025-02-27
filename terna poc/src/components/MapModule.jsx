import React from "react";
import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const italyCenter = [42.0, 12.5]; // Centro approssimativo dell'Italia
const zoomLevel = 6; // Livello di zoom

// Punti nodali (coordinate casuali per rappresentare nodi sulla mappa)
const nodes = [
  { id: 1, name: "Torino", coords: [45.0703, 7.6869] },
  { id: 2, name: "Milano", coords: [45.4642, 9.1900] },
  { id: 3, name: "Venezia", coords: [45.4408, 12.3155] },
  { id: 4, name: "Firenze", coords: [43.7696, 11.2558] },
  { id: 5, name: "Roma", coords: [41.9028, 12.4964] },
  { id: 6, name: "Napoli", coords: [40.8518, 14.2681] },
  { id: 7, name: "Palermo", coords: [38.1157, 13.3615] },
  { id: 8, name: "Cagliari", coords: [39.2238, 9.1217] },
];

const MapModule = ({selectedItem}) => {
  return (
    <>
    <MapContainer center={italyCenter} zoom={zoomLevel} style={{ height: "500px", width: "100%" }}>
      {/* Layer stilizzato (ad esempio, OpenStreetMap con stile HOT) */}
      <TileLayer
        url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />

      {/* Marker circolari rossi */}
      {/*nodes.map((node) => (
        <CircleMarker
          key={node.id}
          center={node.coords}
          radius={10}
          fillColor="red"
          color="darkred"
          weight={1}
          fillOpacity={0.8}
        >
          <Popup>
            <strong>{node.name}</strong>
            <br /> Nodo strategico
          </Popup>
        </CircleMarker>
      ))*/}
    </MapContainer>
    </>
  );
};

export default MapModule;
