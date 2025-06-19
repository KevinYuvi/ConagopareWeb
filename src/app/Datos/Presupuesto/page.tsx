export default function PresupuestoPage() {
    return (
        <div className="p-8 sm:px-12 md:px-16">
            <div className="max-w-5xl mx-auto flex flex-col items-center text-center gap-6">
                <h1 className="text-3xl font-heading">Presupuesto Parroquial 2025</h1>
                <p className="max-w-3xl">
                    Explora la asignación presupuestaria 2025 para los GAD parroquiales. Compara montos por año, provincia, cantón y parroquia. Esta sección revela la inequidad en el financiamiento estatal y su impacto en el desarrollo local.
                </p>
                <div className="w-full aspect-video rounded-xl overflow-hidden shadow-lg">
                    <iframe
                        title="Presupuesto Parroquial 2025"
                        src="https://app.powerbi.com/view?r=eyJrIjoiMWQ5ZDY3MDctZmJiMi00ZmZlLThkNGEtY2MwODU0YzJmMjlhIiwidCI6IjhjYTUyZTJiLTFkMjAtNDI3NC05YTEzLWJkNzZlY2NiODFkMSIsImMiOjR9"
                        className="w-full h-full"
                        allowFullScreen
                    ></iframe>
                </div>
                <div className="mx-auto mt-8 border-l-4 border-blue-600 text-left px-6">
                    <h3 className="text-xl font-bold">Fuente</h3>
                    <p className="text-gray-700">
                        CONAGOPARE Nacional · Datos institucionales de presupuesto 2025.
                    </p>
                </div>
            </div>
        </div>
    );
}
