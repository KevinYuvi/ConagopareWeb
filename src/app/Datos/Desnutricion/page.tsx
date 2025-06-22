export default function DesnutricionPage() {
    return (
        <div className="p-8 sm:px-12 md:px-16">
            <div className="max-w-5xl mx-auto flex flex-col items-center text-center gap-6">
                <h1 className="text-3xl font-heading">Desnutrición Infantil</h1>
                <p className="max-w-3xl">                
                    Incluye indicadores sobre la prevalencia de desnutrición crónica y aguda en niños según género, etnia, quintil de ingresos y zona. Segmentado por provincia, este módulo alerta sobre una de las crisis más silenciosas del Ecuador rural.
                </p>
                <div className="w-full aspect-video rounded-xl overflow-hidden shadow-lg">
                    <iframe
                        title="Desnutrición Infantil"
                        src="https://app.powerbi.com/view?r=eyJrIjoiY2NhZTk1OTMtNTMyNC00YWNiLThkNWQtNmFkZjVjNmExMTNmIiwidCI6IjhjYTUyZTJiLTFkMjAtNDI3NC05YTEzLWJkNzZlY2NiODFkMSIsImMiOjR9"
                        className="w-full h-full"
                        allowFullScreen
                    ></iframe>
                </div>
                                <div className="mx-auto mt-8 border-l-4 border-blue-600 text-left px-6">
                    <h3 className="text-xl font-bold">Fuente</h3>
                    <p>
                        SUUSEN (MIES/Infancia) · Plataforma de seguimiento nutricional.{' '}
                        <a
                            href="https://informacion.infancia.gob.ec/"
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
