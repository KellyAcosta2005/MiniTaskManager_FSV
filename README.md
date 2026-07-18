# MiniTaskManager FSV

Aplicación full-stack de gestión de tareas con autenticación JWT. Incluye integración con WordPress REST API para visualizar posts.

| Capa | Tecnología | Directorio |
|------|------------|------------|
| Frontend | React 19 + Vite 8 + Tailwind CSS v4 + Axios | [`frontend/`](frontend/) |
| Backend | Express 5 + Mongoose + MongoDB | [`backend/`](backend/) |
| API Spec | OpenAPI 3.1 | `openapi.yaml` |

---

## Requisitos

- **Node.js** 20+
- **npm** 9+
- **MongoDB** 7+ (local o Atlas)
- **WordPress** (opcional) — solo para la sección de posts

---

## Estructura del proyecto

```
MiniTaskManager_FSV/
├── frontend/                 → SPA React + Vite
│   ├── src/
│   │   ├── app/              → Entry point y componente raíz
│   │   ├── components/       → Componentes reutilizables (Navbar, TaskCard, TaskForm, ProtectedRoute)
│   │   ├── context/          → AuthContext (autenticación vía Context API)
│   │   ├── pages/            → Páginas (Login, Register, Dashboard, WPPosts)
│   │   ├── services/         → Capa API (http, auth, tasks, wordpress)
│   │   └── styles/           → Estilos globales (Tailwind)
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
├── backend/                  → API REST Express + MongoDB
│   ├── src/
│   │   ├── config/           → Conexión a DB y variables de entorno
│   │   ├── controllers/      → Handlers HTTP
│   │   ├── middlewares/      → Auth JWT
│   │   ├── models/           → Schemas Mongoose (User, Task)
│   │   ├── routes/           → Definición de rutas
│   │   ├── services/         → Lógica de negocio
│   │   └── utils/            → Utilidades (JWT)
│   ├── api/index.js          → Entry point serverless (Vercel)
│   ├── server.js             → Entry point local
│   ├── vercel.json
│   └── package.json
├── openapi.yaml              → Especificación OpenAPI 3.1
└── README.md
```

---

## Backend

API RESTful con JWT, CRUD de tareas, búsqueda, filtros por estado y paginación.  
[Documentación completa del backend →](backend/README.md)

### Endpoints principales

| Método | Ruta | Auth | Descripción |
|--------|------|------|-------------|
| POST | `/api/auth/register` | No | Registrar usuario |
| POST | `/api/auth/login` | No | Iniciar sesión |
| GET | `/api/tasks/me` | JWT | Listar tareas (con paginación, búsqueda y filtros) |
| POST | `/api/tasks/create` | JWT | Crear tarea |
| PATCH | `/api/tasks/toggle/:id` | JWT | Cambiar estado completado |
| DELETE | `/api/tasks/delete/:id` | JWT | Eliminar tarea |

### Variables de entorno

```
PORT=3050
HOST=127.0.0.1
MONGODB_URI=mongodb://localhost:27017/miBase
JWT_SECRET=tu_secreto
JWT_EXPIRES_IN=24h
```

---

## Frontend

SPA construida con React 19, Vite 8, Tailwind CSS v4 y Axios.  
[Documentación completa del frontend →](frontend/README.md)

### Funcionalidades

- **Autenticación** (login/registro/logout) con JWT y rutas protegidas
- **CRUD de tareas** con búsqueda, filtros por estado, ordenamiento y paginación
- **Integración WordPress** — visualización de posts desde una API WordPress externa

### Variables de entorno

```
VITE_API_URL=http://127.0.0.1:3050
```

---

## Instalación y ejecución local

### 1. Backend

```bash
cd backend
npm install
# Configurar .env con MONGODB_URI y JWT_SECRET
npm run dev        # Desarrollo (nodemon)
# o
npm start          # Producción
```

### 2. Frontend

```bash
cd frontend
npm install
# Opcional: crear .env con VITE_API_URL (default: http://127.0.0.1:3050)
npm run dev        # http://localhost:5173
```

### 3. WordPress (opcional)

Para usar la sección de posts, necesitás una instancia de WordPress corriendo en `http://localhost:8080` con la API REST habilitada (lo está por defecto). Si hay problemas de CORS, instalá un plugin como [WP CORS](https://wordpress.org/plugins/wp-cors/) o agregá el header en el `wp-config.php`.

---

## Despliegue

Ambos proyectos desplegados por separado en Vercel:

| Proyecto | Directorio | URL |
|----------|------------|-----|
| Backend | `backend/` | `minitaskback` |
| Frontend | `frontend/` | `minitaskfront` |

El backend incluye `vercel.json` y `api/index.js` para despliegue serverless. La conexión a MongoDB es lazy para evitar timeouts en funciones serverless.

---

## Tecnologías

| Frontend | Backend |
|----------|---------|
| React 19 | Express 5 |
| Vite 8 | Mongoose 9 |
| Tailwind CSS v4 | MongoDB 7+ |
| Axios | jsonwebtoken |
| React Router v7 | bcryptjs |

---

## Licencia

ISC
