export default function DesnutricionPage() {
    return (
        <div className="p-6 sm:p-10 md:p-16 bg-white">
            <div className="max-w-5xl mx-auto flex flex-col items-center text-center">
                <h1 className="text-3xl font-heading font-bold text-gray-800 mb-4">Desnutrición Infantil</h1>
                <p className="text-base max-w-3xl mb-6">                
                    Incluye indicadores sobre la prevalencia de desnutrición crónica y aguda en niños según género, etnia, quintil de ingresos y zona. Segmentado por provincia, este módulo alerta sobre una de las crisis más silenciosas del Ecuador rural.
                </p>
                <div className="w-full aspect-video rounded-xl overflow-hidden shadow-lg">
                    <iframe
                        title="Centros Médicos"
                        src="https://app.powerbi.com/view?r=eyJrIjoiY2NhZTk1OTMtNTMyNC00YWNiLThkNWQtNmFkZjVjNmExMTNmIiwidCI6IjhjYTUyZTJiLTFkMjAtNDI3NC05YTEzLWJkNzZlY2NiODFkMSIsImMiOjR9"
                        className="w-full h-full"
                        frameBorder="0"
                        allowFullScreen
                    ></iframe>
                </div>
            </div>
        </div>
    );
}
