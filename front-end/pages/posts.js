import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { usePosts } from '../hooks/usePosts';

export default function Posts() {
  const [showPosts, setShowPosts] = useState(true);
  const { posts, loading, error, refreshPosts } = usePosts(5);

  const togglePosts = () => {
    setShowPosts(!showPosts);
  };

  return (
    <>
      <Head>
        <title>Posts Collection - Next.js App</title>
        <meta name="description" content="Professional posts collection with minimalist dark design" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </Head>

      <main className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 py-12 px-4">
        <div className="container max-w-4xl mx-auto">
          {/* Navigation */}
          <nav className="mb-12">
            <Link 
              href="/" 
              className="inline-flex items-center text-gray-400 hover:text-white transition-colors duration-200"
              aria-label="Return to homepage"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Home
            </Link>
          </nav>

          {/* Header Section */}
          <header className="text-center mb-16">
            <h1 className="text-5xl font-extrabold text-white mb-6 tracking-tight">
              Posts Collection
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed mx-auto mb-8">
              Discover our curated selection of professional content from our content library
            </p>
            
            {/* Action Buttons */}
            <div className="flex gap-4 justify-center mb-8">
              <button
                onClick={togglePosts}
                className="btn btn-secondary"
                aria-label={showPosts ? 'Hide posts collection' : 'Show posts collection'}
              >
                {showPosts ? 'Hide Collection' : 'Show Collection'}
              </button>
              
              <button
                onClick={refreshPosts}
                className="btn btn-primary"
                aria-label="Refresh posts collection"
                disabled={loading}
              >
                {loading ? 'Refreshing...' : 'Refresh'}
              </button>
            </div>
          </header>

          {/* Loading State */}
          {loading && (
            <section className="flex justify-center items-center py-16">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
                <p className="text-gray-400 text-lg">Loading collection...</p>
              </div>
            </section>
          )}

          {/* Error State */}
          {error && (
            <section className="card mb-8">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg className="w-6 h-6 text-red-500 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-white">Error Loading Collection</h3>
                  <p className="text-gray-400 mt-1">{error}</p>
                </div>
              </div>
            </section>
          )}

          {/* Posts List */}
          {!loading && !error && showPosts && (
            <section className="card">
              <header className="mb-8">
                <h2 className="text-3xl font-bold text-white mb-2">
                  Featured Posts
                </h2>
                <p className="text-gray-400">
                  Professional content curated for exceptional reading experience
                </p>
              </header>
              
              {posts.length > 0 ? (
                <ul className="space-y-6" role="list">
                  {posts.map((post, index) => (
                    <li
                      key={post.id}
                      className="group p-4 border-b border-gray-700 hover:bg-gray-800 transition-all duration-200"
                      role="listitem"
                    >
                      <div className="flex items-center">
                        <span className="text-gray-500 text-lg font-medium mr-4 min-w-[2rem]">
                          {index + 1}.
                        </span>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm font-medium text-white leading-relaxed group-hover:text-blue-400 transition-colors duration-200">
                            {post.title}
                          </h3>
                          <p className="text-xs text-gray-500 mt-1">
                            Post ID: {post.id}
                          </p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="text-center py-16">
                  <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">No Posts Available</h3>
                  <p className="text-gray-400">The collection is currently empty</p>
                </div>
              )}
            </section>
          )}

          {/* Hidden State Message */}
          {!loading && !error && !showPosts && (
            <section className="card text-center">
              <div className="w-20 h-20 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-white mb-4">
                Collection Hidden
              </h2>
              <p className="text-gray-400 text-lg">
                Click "Show Collection" to reveal the featured posts
              </p>
            </section>
          )}

          {/* Footer */}
          <footer className="text-center mt-16">
            <div className="border-t border-gray-800 pt-8">
              <p className="text-gray-500">
                Data sourced from{' '}
                <a
                  href="https://jsonplaceholder.typicode.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-blue-400 underline transition-colors duration-200"
                >
                  JSONPlaceholder API
                </a>
              </p>
              <p className="text-sm text-gray-600 mt-2">
                Professional content delivery platform
              </p>
            </div>
          </footer>
        </div>
      </main>
    </>
  );
}
