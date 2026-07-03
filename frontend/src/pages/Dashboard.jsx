import { useState, useEffect, useCallback } from 'react'
import * as tasksApi from '../api/tasks'
import TaskCard from '../components/TaskCard'
import TaskForm from '../components/TaskForm'
import Navbar from '../components/Navbar'

export default function Dashboard() {
  const [tasks, setTasks] = useState([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalTasks, setTotalTasks] = useState(0)
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('')
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingTask, setEditingTask] = useState(null)

  const fetchTasks = useCallback(async () => {
    setLoading(true)
    try {
      const params = { page, limit: 10 }
      if (search.trim()) params.search = search.trim()
      if (status) params.status = status
      const res = await tasksApi.getMyTasks(params)
      setTasks(res.data.tasks)
      setTotalPages(res.data.totalPages)
      setTotalTasks(res.data.totalTasks)
    } catch {
      // ignore
    } finally {
      setLoading(false)
    }
  }, [page, search, status])

  useEffect(() => {
    fetchTasks()
  }, [fetchTasks])

  const handleUpdateTask = (updatedTask) => {
    setTasks((prev) => prev.map((t) => (t._id === updatedTask._id ? updatedTask : t)))
  }

  const handleDeleteTask = (taskId) => {
    setTasks((prev) => prev.filter((t) => t._id !== taskId))
    setTotalTasks((prev) => prev - 1)
  }

  const handleSavedTask = (savedTask) => {
    if (editingTask) {
      handleUpdateTask(savedTask)
    } else {
      setTasks((prev) => [savedTask, ...prev])
      setTotalTasks((prev) => prev + 1)
    }
  }

  const openCreate = () => {
    setEditingTask(null)
    setShowForm(true)
  }

  const openEdit = (task) => {
    setEditingTask(task)
    setShowForm(true)
  }

  const closeForm = () => {
    setShowForm(false)
    setEditingTask(null)
  }

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    setPage(1)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="max-w-5xl mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Mis tareas</h2>
            <p className="text-sm text-gray-500 mt-0.5">{totalTasks} tarea{totalTasks !== 1 ? 's' : ''}</p>
          </div>
          <button
            onClick={openCreate}
            className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors cursor-pointer"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            Nueva tarea
          </button>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <form onSubmit={handleSearchSubmit} className="flex-1">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar tareas..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </form>
          <select
            value={status}
            onChange={(e) => { setStatus(e.target.value); setPage(1) }}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
          >
            <option value="">Todas</option>
            <option value="pending">Pendientes</option>
            <option value="completed">Completadas</option>
          </select>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-600" />
          </div>
        ) : tasks.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">No hay tareas aún</p>
            <p className="text-gray-400 text-sm mt-1">Crea tu primera tarea para empezar</p>
          </div>
        ) : (
          <div className="space-y-3">
            {tasks.map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                onUpdate={(updated) => handleUpdateTask(updated)}
                onDelete={handleDeleteTask}
                onUpdate={() => openEdit(task)}
              />
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-8">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              Anterior
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`px-3 py-1.5 text-sm rounded-lg cursor-pointer ${
                  p === page
                    ? 'bg-indigo-600 text-white'
                    : 'border border-gray-300 hover:bg-gray-100'
                }`}
              >
                {p}
              </button>
            ))}
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              Siguiente
            </button>
          </div>
        )}
      </main>

      {showForm && (
        <TaskForm
          task={editingTask}
          onClose={closeForm}
          onSaved={handleSavedTask}
        />
      )}
    </div>
  )
}
