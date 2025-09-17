export default function Home() {
    return (
        <div className="font-sans flex items-center justify-center h-full">
            <main className="h-screen w-screen bg-blue-100">
                <header>Header</header>
                <div className="h-full bg-amber-200">
                    <canvas className="bg-blue-300 w-screen"></canvas>
                </div>
            </main>
        </div>
    );
}
