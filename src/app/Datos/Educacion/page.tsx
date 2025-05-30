export default function EducacionPage() {
    return (
        <div className="p-6 sm:p-10 md:p-16 bg-white">
            <div className="max-w-5xl mx-auto flex flex-col items-center text-center">
                <h1 className="text-3xl font-heading font-bold text-gray-800 mb-4">Educación</h1>
                <p className="text-base max-w-3xl mb-6">
                    Esta página examina niveles de escolaridad, tasas de deserción escolar y acceso a centros educativos en el sector rural. La visualización pone en evidencia las barreras estructurales que afectan el derecho a la educación en las zonas más alejadas, incluyendo variables como transporte y cobertura docente.
                </p>
                <div className="w-full aspect-video rounded-xl overflow-hidden shadow-lg">
                    <iframe
                        title="Centros Médicos"
                        src="https://app.powerbi.com/view?r=eyJrIjoiN2MwOWY4ODItY2QxMi00YjhlLWJkMTAtYWYxZGJkNTgxY2Q1IiwidCI6IjhjYTUyZTJiLTFkMjAtNDI3NC05YTEzLWJkNzZlY2NiODFkMSIsImMiOjR9"
                        className="w-full h-full"
                        frameBorder="0"
                        allowFullScreen
                    ></iframe>
                </div>
            </div>
        </div>
    );
}
