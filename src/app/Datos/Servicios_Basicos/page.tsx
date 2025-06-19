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
                        src="https://app.powerbi.com/view?r=eyJrIjoiOTk3MWY1YTUtOWQyNi00NTk4LTk1ZGEtZTA2MDAyN2ZhY2RlIiwidCI6IjhjYTUyZTJiLTFkMjAtNDI3NC05YTEzLWJkNzZlY2NiODFkMSIsImMiOjR9"
                        className="w-full h-full"
                        allowFullScreen
                    ></iframe>
                </div>
                <div className="mx-auto mt-8 border-l-4 border-blue-600 text-left px-6">
                    <h3 className="text-xl font-bold">Fuente</h3>
                    <p>
                        INEC · Resultados del censo sobre servicios básicos.{' '}
                        <a
                            href="https://www.censoecuador.gob.ec/resultados-censo/"
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
