export default function EgresosHospitalariosPage() {
    return (
        <div className="p-6 sm:p-10 md:p-16 bg-white">
            <div className="max-w-5xl mx-auto flex flex-col items-center text-center">
                <h1 className="text-3xl font-heading font-bold text-gray-800 mb-4">Egresos Hospitalarios</h1>
                <p className="text-base max-w-3xl mb-6">
                    Se presenta egresos hospitalarios del 2023, discriminando entre altas vivas y fallecimientos. Incluye datos por género, tipo de institución (rural o urbana), y provincia. Refleja la cobertura real de salud y las condiciones de atención médica en el país.
                </p>
                <div className="w-full aspect-video rounded-xl overflow-hidden shadow-lg">
                    <iframe
                        title="Centros Médicos"
                        src="https://app.powerbi.com/view?r=eyJrIjoiMjMwMWY4NzYtNjRhYy00MWI1LWFhNDktYzRkMjNjMjRmODQxIiwidCI6IjhjYTUyZTJiLTFkMjAtNDI3NC05YTEzLWJkNzZlY2NiODFkMSIsImMiOjR9"
                        className="w-full h-full"
                        frameBorder="0"
                        allowFullScreen
                    ></iframe>
                </div>
            </div>
        </div>
    );
}
