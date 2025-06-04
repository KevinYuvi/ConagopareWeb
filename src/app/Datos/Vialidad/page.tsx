export default function VialidadPage() {
    return (
        <div className="p-8 sm:px-12 md:px-16">
            <div className="max-w-5xl mx-auto flex flex-col items-center text-center gap-6">
                <h1 className="text-3xl font-heading">Vialidad</h1>
                <p className="max-w-3xl">
                    Esta sección analiza el estado de las vías en parroquias rurales del Ecuador. Presenta kilómetros por tipo de vía (asfalto, lastrado, sendero), estado de conservación y distribución geográfica por provincia, cantón y parroquia. Visibiliza las brechas de infraestructura y la urgencia de inversión pública.
                </p>
                <div className="w-full aspect-video rounded-xl overflow-hidden shadow-lg">
                    <iframe
                        title="Centros Médicos"
                        src="https://app.powerbi.com/view?r=eyJrIjoiY2EyZTQzNTktYjM2My00ZDQxLWEwZWMtMWU0NzQ4NDMwNzA1IiwidCI6IjhjYTUyZTJiLTFkMjAtNDI3NC05YTEzLWJkNzZlY2NiODFkMSIsImMiOjR9"
                        className="w-full h-full"
                        allowFullScreen
                    ></iframe>
                </div>
            </div>
        </div>
    );
}
