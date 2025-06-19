export default function EgresosHospitalariosPage() {
    return (
        <div className="p-8 sm:px-12 md:px-16">
            <div className="max-w-5xl mx-auto flex flex-col items-center text-center gap-6">
                <h1 className="text-3xl font-heading">Egresos Hospitalarios</h1>
                <p className="max-w-3xl">
                    Se presenta egresos hospitalarios del 2023, discriminando entre altas vivas y fallecimientos. Incluye datos por género, tipo de institución (rural o urbana), y provincia. Refleja la cobertura real de salud y las condiciones de atención médica en el país.
                </p>
                <div className="w-full aspect-video rounded-xl overflow-hidden shadow-lg">
                    <iframe
                        title="Egresos Hospitalarios"
                        src="https://app.powerbi.com/view?r=eyJrIjoiNDQzMWQxOGEtNTFmYy00NTFmLWJmZTItZmViMDk2N2Y2MTNkIiwidCI6IjhjYTUyZTJiLTFkMjAtNDI3NC05YTEzLWJkNzZlY2NiODFkMSIsImMiOjR9"
                        className="w-full h-full"
                        allowFullScreen
                    ></iframe>
                </div>
                <div className="mx-auto mt-8 border-l-4 border-blue-600 text-left px-6">
                    <h3 className="text-xl font-bold">Fuente</h3>
                    <p>
                        INEC · Datos sobre camas y egresos hospitalarios.{' '}
                        <a
                            href="https://www.ecuadorencifras.gob.ec/camas-y-egresos-hospitalarios/"
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
