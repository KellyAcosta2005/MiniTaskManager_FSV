# MiniTaskManager FSV

Aplicacion full-stack de gestion de tareas con autenticacion JWT.

| Capa | Tecnologia | Directorio |
|------|------------|------------|
| Frontend | React + Vite + Tailwind CSS | [`frontend/`](frontend/) |
| Backend | Express 5 + Mongoose + MongoDB | [`backend/`](backend/) |
| API Spec | OpenAPI 3.1 | `backend/openapi.yaml` |

### Backend

API RESTful con JWT, CRUD de tareas, busqueda, filtros por estado y paginacion.  
[Documentacion del backend](backend/README.md)

### Frontend

SPA construida con React, contexto de autenticacion, rutas publicas/privadas y Tailwind CSS.

---

### Despliegue

Ambos proyectos desplegados en Vercel por separado:
- **Backend:** `minitaskback`
- **Frontend:** `minitaskfront`

### Licencia

ISC
