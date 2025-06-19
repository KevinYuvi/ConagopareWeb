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
            src="https://app.powerbi.com/view?r=eyJrIjoiM2JjYzYwM2ItNzY4NS00ZjAzLWIxZDEtZmEwM2MyYjVjZThhIiwidCI6IjhjYTUyZTJiLTFkMjAtNDI3NC05YTEzLWJkNzZlY2NiODFkMSIsImMiOjR9"
            className="w-full h-full"
            allowFullScreen
          ></iframe>
        </div>
        <div className="mx-auto mt-8 border-l-4 border-blue-600 text-left px-6">
          <h3 className="text-xl font-bold">Fuente</h3>
          <p>
            ACESS - Licencias otorgadas a establecimientos de salud públicos y privados.{' '}
            <a
              href="https://datosabiertos.gob.ec/dataset/licenciamientos-a-establecimientos-de-salud"
              className="text-blue-600 underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Ver fuente
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
