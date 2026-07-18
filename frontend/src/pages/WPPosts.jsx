import { useCallback, useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { getPosts } from '../services/wordpress'

export default function WPPosts() {
  const [posts, setPosts] = useState([])
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const fetchPosts = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const res = await getPosts({ page, perPage: 10, search })
      setPosts(res.data)
      setTotalPages(Number(res.headers['x-wp-totalpages']) || 1)
    } catch {
      setError('No se pudieron cargar los posts')
    } finally {
      setLoading(false)
    }
  }, [page, search])

  useEffect(() => {
    fetchPosts()
  }, [fetchPosts])

  const handleSearch = (e) => {
    setSearch(e.target.value)
    setPage(1)
  }

  const stripHtml = (html) => html?.replace(/<[^>]+>/g, '') ?? ''

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="max-w-3xl mx-auto px-4 py-6 flex flex-col gap-6">
        <h2 className="text-2xl font-bold text-gray-800">Posts de WordPress</h2>

        <input
          type="text"
          placeholder="Buscar posts..."
          value={search}
          onChange={handleSearch}
          className="border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        {loading && (
          <p className="text-gray-400 text-sm text-center">Cargando posts...</p>
        )}

        {!loading && posts.length === 0 && (
          <p className="text-gray-400 text-sm text-center mt-8">
            No se encontraron posts.
          </p>
        )}

        <ul className="flex flex-col gap-4">
          {posts.map((post) => (
            <li
              key={post.id}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-5"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                {stripHtml(post.title?.rendered)}
              </h3>
              <p className="text-sm text-gray-500 mb-3">
                {new Date(post.date).toLocaleDateString('es-AR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
              <p className="text-sm text-gray-700 leading-relaxed">
                {stripHtml(post.excerpt?.rendered)}
              </p>
            </li>
          ))}
        </ul>

        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-4 mt-4">
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50 transition-opacity cursor-pointer"
            >
              Anterior
            </button>
            <span className="text-sm text-gray-600 font-medium">
              {page} / {totalPages}
            </span>
            <button
              disabled={page === totalPages}
              onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
              className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50 transition-opacity cursor-pointer"
            >
              Siguiente
            </button>
          </div>
        )}
      </main>
    </div>
  )
}
