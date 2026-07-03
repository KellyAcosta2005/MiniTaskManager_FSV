import api from './axios'

export const createTask = (data) => api.post('/api/tasks/create', data)
export const getMyTasks = (params) => api.get('/api/tasks/me', { params })
export const updateTask = (id, data) => api.put(`/api/tasks/update/${id}`, data)
export const toggleTask = (id) => api.patch(`/api/tasks/toggle/${id}`)
export const deleteTask = (id) => api.delete(`/api/tasks/delete/${id}`)
