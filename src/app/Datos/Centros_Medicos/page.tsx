export default function CentrosMedicosPage() {
  return (
    <div className="p-6 sm:p-10 md:p-16 bg-white">
      <div className="max-w-5xl mx-auto flex flex-col items-center text-center">
        <h1 className="text-3xl font-heading font-bold mb-4">Centros Médicos</h1>
        <p className="text-base max-w-3xl mb-6">
          Se muestra la distribución de centros de salud públicos y privados por provincia y cantón. Este
          informe permite visualizar cómo se distribuyen los centros médicos a nivel nacional,
          facilitando el análisis territorial de la atención en salud.
        </p>
        <div className="w-full aspect-video rounded-xl overflow-hidden shadow-lg">
          <iframe
            title="Centros Médicos"
            src="https://app.powerbi.com/view?r=eyJrIjoiZTVhYjYyNzEtNDgxOC00NDQ1LTgwNWMtZTMyOTVjMTJiZTllIiwidCI6IjhjYTUyZTJiLTFkMjAtNDI3NC05YTEzLWJkNzZlY2NiODFkMSIsImMiOjR9"
            className="w-full h-full"
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
}
