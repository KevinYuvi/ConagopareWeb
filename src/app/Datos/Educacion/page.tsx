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
                        src="https://app.powerbi.com/view?r=eyJrIjoiN2MwOWY4ODItY2QxMi00YjhlLWJkMTAtYWYxZGJkNTgxY2Q1IiwidCI6IjhjYTUyZTJiLTFkMjAtNDI3NC05YTEzLWJkNzZlY2NiODFkMSIsImMiOjR9"
                        className="w-full h-full"
                        allowFullScreen
                    ></iframe>
                </div>
            </div>
        </div>
    );
}
