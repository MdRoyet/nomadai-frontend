export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-6 p-24">
      <h1 className="text-4xl font-bold text-primary">
        NomadAI Setup Complete
      </h1>
      <p className="text-neutral-500 font-sans">
        Ready to build the future of travel.
      </p>
      <div className="flex gap-4">
        <button className="bg-primary text-white px-6 py-3 rounded-xl shadow-teal hover:bg-primary-700 transition">
          Primary Button
        </button>
        <button className="bg-secondary text-white px-6 py-3 rounded-xl hover:bg-secondary-600 transition">
          Secondary Button
        </button>
      </div>
    </main>
  );
}
