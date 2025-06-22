export default function EmpleoPage() {
    return (
        <div className="p-8 sm:px-12 md:px-16">
            <div className="max-w-5xl mx-auto flex flex-col items-center text-center gap-6">
                <h1 className="text-3xl font-heading">Tasa de Empleo y Desempleo</h1>
                <p className="max-w-3xl">
                    Detalla las tasas de empleo y desempleo según género, nivel educativo, etnia y quintil de ingreso. Segmentado por periodo y provincia, ofrece un panorama del mercado laboral rural y los desafíos para la inclusión económica.
                </p>
                <div className="w-full aspect-video rounded-xl overflow-hidden shadow-lg">
                    <iframe
                        title="Tasa de Empleo y Desempleo"
                        src="https://app.powerbi.com/view?r=eyJrIjoiYmU1NmUwMmYtYmUwNS00ZjczLThhZTQtMjYwYWRhYzRmMGY4IiwidCI6IjhjYTUyZTJiLTFkMjAtNDI3NC05YTEzLWJkNzZlY2NiODFkMSIsImMiOjR9"
                        className="w-full h-full"
                        allowFullScreen
                    ></iframe>
                </div>
                <div className="mx-auto mt-8 border-l-4 border-blue-600 text-left px-6">
                    <h3 className="text-xl font-bold">Fuente</h3>
                    <p>
                        INEC · Encuesta Nacional de Empleo (ENEMDU).{' '}
                        <a
                            href="https://www.ecuadorencifras.gob.ec/estadisticas-laborales-enemdu/"
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
