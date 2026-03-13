import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center text-gray-900">
      <main className="max-w-md w-full space-y-8">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900">
          Secure Vehicle Contact with QR
        </h1>

        <p className="text-lg text-gray-600">
          Solve parking issues instantly. Let anyone contact you without exposing your phone number visibly.
        </p>

        <div className="pt-4">
          <Link
            href="/create"
            className="w-full inline-flex justify-center rounded-xl border border-transparent bg-blue-600 px-6 py-4 text-base font-semibold text-white shadow-sm hover:bg-blue-700 hover:scale-[1.02] transition-all"
          >
            Create Your Vehicle QR
          </Link>
        </div>
      </main>

      <footer className="absolute bottom-6 text-sm text-gray-400">
        Powered by ScanMyCar
      </footer>
    </div>
  );
}
