import { useAuth } from '../context/AuthContext'

export default function Navbar() {
  const { user, logout } = useAuth()

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        <h1 className="text-xl font-bold text-indigo-600">MiniTaskManager</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600">
            {user?.user}
          </span>
          <button
            onClick={logout}
            className="text-sm text-red-500 hover:text-red-700 font-medium cursor-pointer"
          >
            Cerrar sesión
          </button>
        </div>
      </div>
    </nav>
  )
}
