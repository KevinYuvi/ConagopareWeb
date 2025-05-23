export default function PresupuestoPage() {
    return (
        <div className="p-6 sm:p-10 md:p-16 bg-white">
            <div className="max-w-5xl mx-auto flex flex-col items-center text-center">
                <h1 className="text-3xl font-heading font-bold text-gray-800 mb-4">Presupuesto Parroquial 2025</h1>
                <p className="text-base max-w-3xl mb-6">
                    Explora la asignación presupuestaria 2025 para los GAD parroquiales. Compara montos por año, provincia, cantón y parroquia. Esta sección revela la inequidad en el financiamiento estatal y su impacto en el desarrollo local.
                </p>
                <div className="w-full aspect-video rounded-xl overflow-hidden shadow-lg">
                    <iframe
                        title="Centros Médicos"
                        src="https://app.powerbi.com/view?r=eyJrIjoiZjlmNzY5MmEtMzhjYS00M2QwLThlNTYtNjg0ZmE0M2FjZjYwIiwidCI6IjhjYTUyZTJiLTFkMjAtNDI3NC05YTEzLWJkNzZlY2NiODFkMSIsImMiOjR9"
                        className="w-full h-full"
                        frameBorder="0"
                        allowFullScreen
                    ></iframe>
                </div>
            </div>
        </div>
    );
}
