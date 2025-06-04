export default function SeguridadPage() {
    return (
        <div className="p-8 sm:px-12 md:px-16">
            <div className="max-w-5xl mx-auto flex flex-col items-center text-center gap-6">
                <h1 className="text-3xl font-heading">Seguridad</h1>
                <p className="max-w-3xl">
                    Visualiza los homicidios intencionales desde 2014 hasta el 2024, clasificados por tipo (sicariato, femicidio, asesinato, etc.). Muestra tendencias por género, zona (rural/urbana), y territorio. Permite entender la inseguridad como problema estructural en el Ecuador rural.
                </p>
                <div className="w-full aspect-video rounded-xl overflow-hidden shadow-lg">
                    <iframe
                        title="Seguridad"
                        src="https://app.powerbi.com/view?r=eyJrIjoiMmJkZjA1ZjUtZjczNC00NTc1LTgwY2MtMDZiYzNiYmZmZTJkIiwidCI6IjhjYTUyZTJiLTFkMjAtNDI3NC05YTEzLWJkNzZlY2NiODFkMSIsImMiOjR9"
                        className="w-full h-full"
                        allowFullScreen
                    ></iframe>
                </div>
            </div>
        </div>
    );
}
