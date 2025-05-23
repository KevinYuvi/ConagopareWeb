export default function VialidadPage() {
    return (
        <div className="p-6 sm:p-10 md:p-16 bg-white">
            <div className="max-w-5xl mx-auto flex flex-col items-center text-center">
                <h1 className="text-3xl font-heading font-bold text-gray-800 mb-4">Vialidad</h1>
                <p className="text-base max-w-3xl mb-6">
                    Esta sección analiza el estado de las vías en parroquias rurales del Ecuador. Presenta kilómetros por tipo de vía (asfalto, lastrado, sendero), estado de conservación y distribución geográfica por provincia, cantón y parroquia. Visibiliza las brechas de infraestructura y la urgencia de inversión pública.
                </p>
                <div className="w-full aspect-video rounded-xl overflow-hidden shadow-lg">
                    <iframe
                        title="Centros Médicos"
                        src="https://app.powerbi.com/view?r=eyJrIjoiY2EyZTQzNTktYjM2My00ZDQxLWEwZWMtMWU0NzQ4NDMwNzA1IiwidCI6IjhjYTUyZTJiLTFkMjAtNDI3NC05YTEzLWJkNzZlY2NiODFkMSIsImMiOjR9"
                        className="w-full h-full"
                        frameBorder="0"
                        allowFullScreen
                    ></iframe>
                </div>
            </div>
        </div>
    );
}
