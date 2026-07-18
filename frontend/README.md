# MiniTaskManager FSV — Frontend

SPA de gestión de tareas con autenticación JWT e integración con WordPress REST API.

---

## Tech Stack

| Herramienta | Versión |
|-------------|---------|
| React | ^19.2.7 |
| Vite | ^8.1.0 |
| Tailwind CSS | ^4.3.1 |
| Axios | ^1.18.1 |
| React Router | ^7.18.0 |

---

## Requisitos

- Node.js 20+
- npm 9+

---

## Estructura

```
src/
├── app/
│   ├── main.jsx              → Entry point (renderiza <App />)
│   └── App.jsx               → Componente raíz: BrowserRouter + AuthProvider + Routes
├── components/
│   ├── Navbar.jsx            → Barra superior con navegación y logout
│   ├── TaskCard.jsx          → Card individual de tarea
│   ├── TaskForm.jsx          → Modal para crear/editar tarea
│   └── ProtectedRoute.jsx    → Guard que redirige a /login si no hay sesión
├── context/
│   └── AuthContext.jsx        → Context + Provider de autenticación
├── pages/
│   ├── Login.jsx             → Página de inicio de sesión
│   ├── Register.jsx          → Página de registro
│   ├── Dashboard.jsx         → CRUD de tareas con búsqueda, filtros y paginación
│   └── WPPosts.jsx           → Visualización de posts desde WordPress REST API
├── services/
│   ├── http.js               → Instancia Axios con interceptors (token JWT, 401 redirect)
│   ├── auth.js               → API de autenticación (register, login, logout, getMe)
│   ├── tasks.js              → API de tareas (CRUD + filtros)
│   └── wordpress.js          → API de WordPress REST (getPosts, getPost)
└── styles/
    └── index.css             → @import "tailwindcss"
```

---

## Rutas

| Ruta | Acceso | Descripción |
|------|--------|-------------|
| `/login` | Público | Inicio de sesión |
| `/register` | Público | Registro de usuario |
| `/dashboard` | Privado | CRUD de tareas |
| `/wp-posts` | Privado | Posts de WordPress |
| `*` | - | Redirige a `/dashboard` |

---

## Variables de Entorno

| Variable | Default | Descripción |
|----------|---------|-------------|
| `VITE_API_URL` | `http://127.0.0.1:3050` | URL del backend |

Crear un archivo `.env` en la raíz del frontend solo si necesitás cambiar la URL del backend.

---

## Instalación y Ejecución

```bash
# Instalar dependencias
npm install

# Desarrollo (HMR en http://localhost:5173)
npm run dev

# Build producción
npm run build

# Preview del build
npm run preview

# Linter
npm run lint
```

---

## Integración WordPress

La página `/wp-posts` consume la REST API de WordPress desde `http://localhost:8080/wp-json/wp/v2`.

- Usa una instancia independiente de Axios (sin interceptors de JWT)
- Los posts se listan con paginación y búsqueda
- Requiere CORS habilitado en el WordPress (instalar [WP CORS](https://wordpress.org/plugins/wp-cors/) o agregar header en `wp-config.php`)

---

## Arquitectura

- **Estado global**: Solo autenticación via Context API (`AuthContext`). Tareas y posts usan estado local con `useState`.
- **API layer**: Servicios modulares en `services/`, cada uno exporta funciones que devuelven promesas de Axios.
- **Routing**: Definido en `App.jsx` con React Router v7. Rutas privadas envueltas en `ProtectedRoute`.
- **Estilos**: Tailwind CSS v4 con plugin de Vite (sin PostCSS ni archivo de configuración).
