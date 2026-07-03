import { useState } from 'react'
import * as tasksApi from '../api/tasks'

export default function TaskCard({ task, onUpdate, onDelete }) {
  const [toggling, setToggling] = useState(false)

  const handleToggle = async () => {
    setToggling(true)
    try {
      const res = await tasksApi.toggleTask(task._id)
      onUpdate(res.data)
    } catch {
      // ignore
    } finally {
      setToggling(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm('¿Eliminar esta tarea?')) return
    try {
      await tasksApi.deleteTask(task._id)
      onDelete(task._id)
    } catch {
      // ignore
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 flex items-start gap-3">
      <button
        onClick={handleToggle}
        disabled={toggling}
        className={`mt-0.5 shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors cursor-pointer ${
          task.completed
            ? 'bg-green-500 border-green-500'
            : 'border-gray-300 hover:border-indigo-400'
        }`}
      >
        {task.completed && (
          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        )}
      </button>

      <div className="flex-1 min-w-0">
        <h3 className={`font-medium ${task.completed ? 'line-through text-gray-400' : 'text-gray-900'}`}>
          {task.title}
        </h3>
        {task.description && (
          <p className={`mt-1 text-sm ${task.completed ? 'text-gray-300' : 'text-gray-500'}`}>
            {task.description}
          </p>
        )}
      </div>

      <div className="flex items-center gap-1 shrink-0">
        <button
          onClick={onUpdate}
          className="p-1.5 text-gray-400 hover:text-indigo-600 rounded transition-colors cursor-pointer"
          title="Editar"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        </button>
        <button
          onClick={handleDelete}
          className="p-1.5 text-gray-400 hover:text-red-600 rounded transition-colors cursor-pointer"
          title="Eliminar"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    </div>
  )
}
