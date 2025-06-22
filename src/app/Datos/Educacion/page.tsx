export default function EducacionPage() {
    return (
        <div className="p-8 sm:px-12 md:px-16">
            <div className="max-w-5xl mx-auto flex flex-col items-center text-center gap-6">
                <h1 className="text-3xl font-heading">Educación</h1>
                <p className="max-w-3xl">
                    Esta página examina niveles de escolaridad, tasas de deserción escolar y acceso a centros educativos en el sector rural. La visualización pone en evidencia las barreras estructurales que afectan el derecho a la educación en las zonas más alejadas, incluyendo variables como transporte y cobertura docente.
                </p>
                <div className="w-full aspect-video rounded-xl overflow-hidden shadow-lg">
                    <iframe
                        title="Educación"
                        src="https://app.powerbi.com/view?r=eyJrIjoiYmM1NzRjZTYtNTBlZC00ZDY4LWJiODktMTU4NGUyMjYyZjdkIiwidCI6IjhjYTUyZTJiLTFkMjAtNDI3NC05YTEzLWJkNzZlY2NiODFkMSIsImMiOjR9"
                        className="w-full h-full"
                        allowFullScreen
                    ></iframe>
                </div>
                <div className="mx-auto mt-8 border-l-4 border-blue-600 text-left px-6">
                    <h3 className="text-xl font-bold">Fuente</h3>
                    <p>
                        Ministerio de Educación · Repositorio de bases de datos y publicaciones.{' '}
                        <a
                            href="https://educacion.gob.ec/base-de-datos/"
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
