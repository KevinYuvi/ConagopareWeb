export default function SeguridadPage() {
    return (
        <div className="p-6 sm:p-10 md:p-16 bg-white">
            <div className="max-w-5xl mx-auto flex flex-col items-center text-center">
                <h1 className="text-3xl font-heading font-bold text-gray-800 mb-4">Seguridad</h1>
                <p className="text-base max-w-3xl mb-6">
                    Visualiza los homicidios intencionales desde 2014, clasificados por tipo (sicariato, femicidio, asesinato, etc.). Muestra tendencias por género, zona (rural/urbana), y territorio. Permite entender la inseguridad como problema estructural en el Ecuador rural.
                </p>
                <div className="w-full aspect-video rounded-xl overflow-hidden shadow-lg">
                    <iframe
                        title="Centros Médicos"
                        src="https://app.powerbi.com/view?r=eyJrIjoiMmJkZjA1ZjUtZjczNC00NTc1LTgwY2MtMDZiYzNiYmZmZTJkIiwidCI6IjhjYTUyZTJiLTFkMjAtNDI3NC05YTEzLWJkNzZlY2NiODFkMSIsImMiOjR9"
                        className="w-full h-full"
                        frameBorder="0"
                        allowFullScreen
                    ></iframe>
                </div>
            </div>
        </div>
    );
}
