export default function ConectividadPage() {
    return (
        <div className="p-6 sm:p-10 md:p-16 bg-white">
            <div className="max-w-5xl mx-auto flex flex-col items-center text-center">
                <h1 className="text-3xl font-heading font-bold text-gray-800 mb-4">Internet y Conectividad</h1>
                <p className="text-base max-w-3xl mb-6">
                    Muestra el acceso a internet móvil y fijo por parroquia, tipo de proveedor y zona geográfica. Analiza la brecha digital que limita la educación, el emprendimiento y la participación política de las comunidades rurales.                </p>
                <div className="w-full aspect-video rounded-xl overflow-hidden shadow-lg">
                    <iframe
                        title="Centros Médicos"
                        src="https://app.powerbi.com/view?r=eyJrIjoiYWM5YTNjN2EtOTg1NC00YTIwLTlkZDktODc5ODY5MjM0OTQ4IiwidCI6IjhjYTUyZTJiLTFkMjAtNDI3NC05YTEzLWJkNzZlY2NiODFkMSIsImMiOjR9"
                        className="w-full h-full"
                        frameBorder="0"
                        allowFullScreen
                    ></iframe>
                </div>
            </div>
        </div>
    );
}
