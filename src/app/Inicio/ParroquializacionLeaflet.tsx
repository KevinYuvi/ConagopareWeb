"use client";

import { useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Icono personalizado
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

// Componente que mueve el mapa suavemente a una parroquia
function FlyToParroquia({ coords, zoom }: { coords: { lat: number; lng: number }; zoom: number }) {
  const map = useMap();

  useEffect(() => {
    map.flyTo([coords.lat, coords.lng], zoom, { duration: 1.5 });
  }, [coords, zoom, map]);

  return null;
}

export default function ParroquializacionLeaflet() {
  const [parroquiasData, setParroquiasData] = useState<Parroquia[]>([]);
  const [provincia, setProvincia] = useState("");
  const [canton, setCanton] = useState("");
  const [parroquia, setParroquia] = useState("");
  const [parroquiaSeleccionada, setParroquiaSeleccionada] = useState<Parroquia | null>(null);
  const [coords, setCoords] = useState({ lat: -1.8312, lng: -78.1834 });
  const [zoom, setZoom] = useState(6);
  const markerRef = useRef<L.Marker>(null);

  // Solo montar el mapa en cliente
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Cargar datos
  useEffect(() => {
    fetch("/Data/parroquias.json")
      .then((res) => res.json())
      .then((data: Parroquia[]) => setParroquiasData(data));
  }, []);

  // Mostrar automáticamente popup cuando cambia la parroquia seleccionada
  useEffect(() => {
    if (markerRef.current) {
      markerRef.current.openPopup();
    }
  }, [parroquiaSeleccionada]);

  const handleConsulta = () => {
    const resultado = parroquiasData.find(
      (p) =>
        p.provincia === provincia &&
        p.canton === canton &&
        p.parroquia === parroquia
    );
    if (resultado) {
      setParroquiaSeleccionada(resultado);
      setCoords({ lat: resultado.lat, lng: resultado.lng });
      setZoom(14);
    } else {
      setParroquiaSeleccionada(null);
    }
  };

  return (
    <section className="py-16 bg-gray-100 text-gray-800">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold font-heading mb-8">Parroquialización en Ecuador</h2>

        {/* Filtros */}
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

        {/* Botón */}
        <button onClick={handleConsulta}
        
              className="cursor-pointer transition-all bg-[#224e99] text-white px-4 py-2 text-sm rounded-lg border-[#11336d]  border-b-[4px] hover:brightness-110 active:border-b-[2px] active:brightness-90 active:translate-y-[2px] disabled:opacity-50">
          Consultar
        </button>

        {/* Fecha de parroquialización */}
        {parroquiaSeleccionada && (
          <p className="mt-4 mb-4 text-lg text-center text-gray-800">
            Fecha de parroquialización de <strong>{parroquiaSeleccionada.parroquia}</strong>: {" "}
            <strong>{parroquiaSeleccionada.fecha}</strong>
          </p>
        )}

        {/* Mapa */}
        <div className="mt-4 border shadow-md h-[400px] relative z-10 overflow-hidden">
          {isClient && (
            <MapContainer
              center={coords}
              zoom={zoom}
              scrollWheelZoom={true}
              className="w-full h-full rounded"
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              {parroquiaSeleccionada && (
                <>
                  <FlyToParroquia coords={coords} zoom={zoom} />
                  <Marker position={coords} icon={customIcon} ref={markerRef}>
                    <Popup>
                      <strong>{parroquiaSeleccionada.parroquia}</strong><br />
                      Fecha: {parroquiaSeleccionada.fecha}
                    </Popup>
                  </Marker>
                </>
              )}
            </MapContainer>
          )}
        </div>
      </div>
    </section>
  );
}
