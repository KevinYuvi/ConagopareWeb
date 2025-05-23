// Importaciones básicas (obligatorias para Next.js)

import Head from 'next/head'; // Para metadatos como el título de la página

import Sections from './Inicio/sections';
import Hero from './Inicio/hero';


export default function Home() {
  return (
    <>
      <Head>
        <title>Identidad Rural</title>
        <meta name="description" content="Platform on rural issues in Ecuador" />
      </Head>
      <main >
         <Hero    />        
        <Sections />
      </main>
    </>
  );
}

