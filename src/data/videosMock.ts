// src/data/videosMock.ts

export type Video = {
  id: number;
  provincia: string;
  canton: string;
  parroquia: string;
  videoId: string;
  titulo?: string;
};

export const videosMock: Video[] = [
  {
    id: 1,
    provincia: "Azuay",
    canton: "Cuenca",
    parroquia: "Baños",
    videoId: "VY7ZRdliRlE",
    titulo: "Gobierno Parroquial Baños",
  },
  {
    id: 2,
    provincia: "Tungurahua",
    canton: "Ambato",
    parroquia: "Ambatillo",
    videoId: "rOaYRGIzqMM",
    titulo: "Gobierno Parroquial Ambatillo"
  },
  {
    id: 3,
    provincia: "El Oro",
    canton: "Marcabelí",
    parroquia: "El Ingenio",
    videoId: "JY0G7h2nVAI",
    titulo: "Gobierno Parroquial El Ingenio"
  },
  {
    id: 4,
    provincia: "El Oro",
    canton: "Portovelo",
    parroquia: "Curtincápac",
    videoId: "_xpWmvLmTBw",
    titulo: "Gobierno Parroquial Curtincapac"
  },
  {
    id: 5,
    provincia: "Morona Santiago",
    canton: "Gualaquiza",
    parroquia: "Chigüinda",
    videoId: "WfYCH6ynpZk",
    titulo: "Gobierno Parroquial Chigüinda"
  },

  {
    id: 6,
    provincia: "Loja",
    canton: "Celica",
    parroquia: "San Juan de Pózul",
    videoId: "UblbbZxrZQk",
    titulo: "Gobierno Parroquial San José de Pózul"
  },
];
