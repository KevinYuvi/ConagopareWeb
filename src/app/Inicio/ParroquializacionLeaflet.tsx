"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";



// Icono personalizado para que se vea bien
const customIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

interface Parroquia {
  provincia: string;
  canton: string;
  parroquia: string;
  lat: number;
  lng: number;
  fecha: string;
}

export default function ParroquializacionLeaflet() {
  const [parroquiasData, setParroquiasData] = useState<Parroquia[]>([]);
  const [provincia, setProvincia] = useState("");
  const [canton, setCanton] = useState("");
  const [parroquia, setParroquia] = useState("");
  const [fecha, setFecha] = useState("");
  const [coords, setCoords] = useState({ lat: -1.8312, lng: -78.1834 });
  const [zoom, setZoom] = useState(6);

  useEffect(() => {
    fetch("/data/parroquias.json")
      .then((res) => res.json())
      .then((data: Parroquia[]) => setParroquiasData(data));
  }, []);

  const handleConsulta = () => {
    const result = parroquiasData.find(
      (p) =>
        p.provincia === provincia &&
        p.canton === canton &&
        p.parroquia === parroquia
    );
    if (result) {
      setFecha(result.fecha);
      setCoords({ lat: result.lat, lng: result.lng });
      setZoom(14);
    } else {
      setFecha("No disponible");
    }
  };

  return (
    <section className="py-16 bg-gray-100 text-gray-800">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-heading font-bold mb-8">Parroquialización en Ecuador</h2>

        <div className="flex flex-col md:flex-row justify-center gap-4 mb-6">
          <select onChange={(e) => setProvincia(e.target.value)} className="border px-4 py-2 rounded">
            <option value="">Seleccione una provincia</option>
            {[...new Set(parroquiasData.map((p) => p.provincia))].map((prov) => (
              <option key={prov} value={prov}>{prov}</option>
            ))}
          </select>

          <select onChange={(e) => setCanton(e.target.value)} className="border px-4 py-2 rounded" disabled={!provincia}>
            <option value="">Seleccione un cantón</option>
            {[...new Set(parroquiasData.filter((p) => p.provincia === provincia).map((p) => p.canton))].map((cant) => (
              <option key={cant} value={cant}>{cant}</option>
            ))}
          </select>

          <select onChange={(e) => setParroquia(e.target.value)} className="border px-4 py-2 rounded" disabled={!canton}>
            <option value="">Seleccione una parroquia</option>
            {parroquiasData
              .filter((p) => p.provincia === provincia && p.canton === canton)
              .map((p) => (
                <option key={p.parroquia} value={p.parroquia}>{p.parroquia}</option>
              ))}
          </select>
        </div>

        <button onClick={handleConsulta} className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
          Consultar
        </button>

        <div className="mt-6 border shadow-md h-[400px] relative z-10 overflow-hidden">
            <MapContainer
                key={`${coords.lat}-${coords.lng}`} // 🔧 esta línea previene el error
                center={coords}
                zoom={zoom}
                scrollWheelZoom={true}
                className="w-full h-full rounded"
            >

            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {parroquia && (
              <Marker position={coords} icon={customIcon}>
                <Popup>
                  <strong>{parroquia}</strong><br />
                  Fecha: {fecha}
                </Popup>
              </Marker>
            )}
          </MapContainer>
        </div>

        {parroquia && (
          <p className="mt-6 text-lg">
            Fecha de parroquialización: <strong>{fecha}</strong>
          </p>
        )}
      </div>
    </section>
  );
}
