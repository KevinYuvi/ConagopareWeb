export default function ConectividadPage() {
    return (
        <div className="p-8 sm:px-12 md:px-16">
            <div className="max-w-5xl mx-auto flex flex-col items-center text-center gap-6">
                <h1 className="text-3xl font-heading">Internet y Conectividad</h1>
                <p className="max-w-3xl">
                    Muestra el acceso a internet móvil y fijo por parroquia, tipo de proveedor y zona geográfica. Analiza la brecha digital que limita la educación, el emprendimiento y la participación política de las comunidades rurales.                </p>
                <div className="w-full aspect-video rounded-xl overflow-hidden shadow-lg">
                    <iframe
                        title="Internet y Conectividad"
                        src="https://app.powerbi.com/view?r=eyJrIjoiMmU0MjEzNzgtYzI0Zi00OWRiLWJlYjAtYjE0ZDVjZGEwMjgwIiwidCI6IjhjYTUyZTJiLTFkMjAtNDI3NC05YTEzLWJkNzZlY2NiODFkMSIsImMiOjR9"
                        className="w-full h-full"
                        allowFullScreen
                    ></iframe>
                </div>
                <div className="mx-auto mt-8 border-l-4 border-blue-600 text-left px-6">
                    <h3 className="text-xl font-bold">Fuente</h3>
                    <p>
                        ARCOTEL · Estadísticas de telecomunicaciones.{' '}
                        <a
                            href="https://www.arcotel.gob.ec/estadisticas-de-telecomunicaciones2/"
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
