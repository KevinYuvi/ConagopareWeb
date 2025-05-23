export default function ServiciosBasicosPage() {
    return (
        <div className="p-6 sm:p-10 md:p-16 bg-white">
            <div className="max-w-5xl mx-auto flex flex-col items-center text-center">
                <h1 className="text-3xl font-heading font-bold text-gray-800 mb-4">Servicios Básicos</h1>
                <p className="text-base max-w-3xl mb-6">
                    Analiza el acceso a agua potable, alcantarillado y electricidad según el censo 2022. Muestra el porcentaje de hogares con servicios en parroquias rurales, permitiendo identificar territorios con mayor vulnerabilidad en condiciones de vida.
                </p>
                <div className="w-full aspect-video rounded-xl overflow-hidden shadow-lg">
                    <iframe
                        title="Centros Médicos"
                        src="https://app.powerbi.com/view?r=eyJrIjoiN2JlYWMwYWYtMjkxMy00Njc5LWFiMzgtNTI1NWUyMDU1NWE1IiwidCI6IjhjYTUyZTJiLTFkMjAtNDI3NC05YTEzLWJkNzZlY2NiODFkMSIsImMiOjR9"
                        className="w-full h-full"
                        frameBorder="0"
                        allowFullScreen
                    ></iframe>
                </div>
            </div>
        </div>
    );
}
