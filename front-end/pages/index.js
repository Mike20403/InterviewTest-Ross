import Head from 'next/head';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <Head>
        <title>Next.js Posts App</title>
        <meta name="description" content="A professional Next.js application for displaying posts with minimalist dark design" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </Head>

      <main className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center px-4">
        <div className="container max-w-2xl mx-auto">
          <header className="text-center mb-16">
            <h1 className="text-6xl font-extrabold text-white mb-6 tracking-tight">
              Next.js
              <span className="block text-blue-500">Posts App</span>
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed mx-auto">
              A professional platform for curated content with minimalist design and exceptional user experience
            </p>
          </header>

          <section className="card text-center mb-12">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">
                Discover Our Collection
              </h2>
              <p className="text-gray-400 text-lg">
                Explore carefully curated posts from our professional content library
              </p>
            </div>

            <div className="space-y-6">
              <Link
                href="/posts"
                className="btn btn-primary w-full text-lg py-4"
                aria-label="Navigate to posts collection"
              >
                View Posts Collection
              </Link>
              
              <div className="text-sm text-gray-500">
                <p>Powered by JSONPlaceholder API</p>
                <p className="mt-1">Professional content delivery</p>
              </div>
            </div>
          </section>

          <footer className="text-center">
            <div className="border-t border-gray-800 pt-8">
              <p className="text-sm text-gray-500">
                Built with Next.js, React, and Tailwind CSS
              </p>
              <p className="text-xs text-gray-600 mt-2">
                Professional minimalist design
              </p>
            </div>
          </footer>
        </div>
      </main>
    </>
  );
}
