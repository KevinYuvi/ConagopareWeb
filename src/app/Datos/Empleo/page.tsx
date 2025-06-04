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
                        src="https://app.powerbi.com/view?r=eyJrIjoiZWI2MDIwYTMtZmU0OC00ZmQ4LTk4MDAtZGRlNzE0NTMxOTVhIiwidCI6IjhjYTUyZTJiLTFkMjAtNDI3NC05YTEzLWJkNzZlY2NiODFkMSIsImMiOjR9"
                        className="w-full h-full"
                        allowFullScreen
                    ></iframe>
                </div>
            </div>
        </div>
    );
}
