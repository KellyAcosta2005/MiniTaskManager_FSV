import api from "./http";

export const createTask = (data) => api.post("/api/tasks/create", data);
export const getMyTasks = ({search, status, page, limit}) => api.get("/api/tasks/me", { params: {search, status, page, limit}});
export const updateTask = (id, data) => api.put(`/api/tasks/update/${id}`, data);
export const toggleTask = (id) => api.patch(`/api/tasks/toggle/${id}`);
export const deleteTask = (id) => api.delete(`/api/tasks/delete/${id}`);
