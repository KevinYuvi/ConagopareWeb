export default function CentrosMedicosPage() {
  return (
    <div className="p-8 sm:px-12 md:px-16">
      <div className="max-w-5xl mx-auto flex flex-col items-center text-center gap-6">
        <h1 className="text-3xl font-heading">Centros Médicos</h1>
        <p className="max-w-3xl">
          Se muestra la distribución de centros de salud públicos y privados por provincia y cantón. Este
          informe permite visualizar cómo se distribuyen los centros médicos a nivel nacional,
          facilitando el análisis territorial de la atención en salud.
        </p>
        <div className="w-full aspect-video rounded-xl overflow-hidden shadow-lg ">
          <iframe
            title="Centros Médicos"
            src="https://app.powerbi.com/view?r=eyJrIjoiZTVhYjYyNzEtNDgxOC00NDQ1LTgwNWMtZTMyOTVjMTJiZTllIiwidCI6IjhjYTUyZTJiLTFkMjAtNDI3NC05YTEzLWJkNzZlY2NiODFkMSIsImMiOjR9"
            className="w-full h-full"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
}
