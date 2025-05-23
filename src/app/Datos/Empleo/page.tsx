export default function EmpleoPage() {
    return (
        <div className="p-6 sm:p-10 md:p-16 bg-white">
            <div className="max-w-5xl mx-auto flex flex-col items-center text-center">
                <h1 className="text-3xl font-heading font-bold text-gray-800 mb-4">Tasa de Empleo y Desempleo</h1>
                <p className="text-base max-w-3xl mb-6">
                    Detalla las tasas de empleo y desempleo según género, nivel educativo, etnia y quintil de ingreso. Segmentado por periodo y provincia, ofrece un panorama del mercado laboral rural y los desafíos para la inclusión económica.
                </p>
                <div className="w-full aspect-video rounded-xl overflow-hidden shadow-lg">
                    <iframe
                        title="Centros Médicos"
                        src="https://app.powerbi.com/view?r=eyJrIjoiZWI2MDIwYTMtZmU0OC00ZmQ4LTk4MDAtZGRlNzE0NTMxOTVhIiwidCI6IjhjYTUyZTJiLTFkMjAtNDI3NC05YTEzLWJkNzZlY2NiODFkMSIsImMiOjR9"
                        className="w-full h-full"
                        
                        allowFullScreen
                    ></iframe>
                </div>
            </div>
        </div>
    );
}
