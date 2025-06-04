export default function ServiciosBasicosPage() {
    return (
        <div className="p-8 sm:px-12 md:px-16">
            <div className="max-w-5xl mx-auto flex flex-col items-center text-center gap-6">
                <h1 className="text-3xl font-heading">Servicios Básicos</h1>
                <p className="max-w-3xl">
                    Analiza el acceso a agua potable, alcantarillado y electricidad según el censo 2022. Muestra el porcentaje de hogares con servicios en parroquias rurales, permitiendo identificar territorios con mayor vulnerabilidad en condiciones de vida.
                </p>
                <div className="w-full aspect-video rounded-xl overflow-hidden shadow-lg">
                    <iframe
                        title="Servicios Básicos"
                        src="https://app.powerbi.com/view?r=eyJrIjoiN2JlYWMwYWYtMjkxMy00Njc5LWFiMzgtNTI1NWUyMDU1NWE1IiwidCI6IjhjYTUyZTJiLTFkMjAtNDI3NC05YTEzLWJkNzZlY2NiODFkMSIsImMiOjR9"
                        className="w-full h-full"
                        allowFullScreen
                    ></iframe>
                </div>
            </div>
        </div>
    );
}
