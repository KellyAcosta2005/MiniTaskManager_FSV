# MiniTaskManager FSV — Backend

API RESTful para gestion de tareas con autenticacion JWT. Construida con Express 5 y MongoDB.

---

## Tech Stack

| Herramienta | Version |
|-------------|---------|
| Node.js | 20+ |
| Express | ^5.2.1 |
| Mongoose | ^9.7.3 |
| MongoDB | 7+ |
| jsonwebtoken | ^9.0.3 |
| bcryptjs | ^3.0.3 |
| dotenv | ^17.4.2 |
| cors | ^2.8.6 |

---

## Arquitectura

Capas separadas con responsabilidades definidas:

```
server.js                        → Entry point, levanta el servidor
src/
  app.js                         → Configura Express (cors, json, rutas, errores)
  config/
    env.js                       → Variables de entorno
    db.js                        → Conexion a MongoDB
  routes/
    index.js                     → Agregador de rutas
    auth.routes.js               → Rutas de autenticacion
    task.routes.js               → Rutas de tareas
  controllers/
    auth.controller.js           → Handlers HTTP de auth (validan request, responden)
    task.controller.js           → Handlers HTTP de tareas
  services/
    auth.service.js              → Logica de negocio: registro, login
    task.service.js              → Logica de negocio: CRUD, filtros, paginacion
  models/
    User.js                      → Schema de usuario con hash de password
    Task.js                      → Schema de tarea
  middlewares/
    auth.middleware.js           → Protege rutas con JWT
  utils/
    generateToken.js             → Genera tokens JWT
api/
  index.js                       → Entry point para Vercel (serverless)
```

**Flujo tipico:** `Route → Controller → Service → Model (Mongoose)`

---

## Endpoints

### Salud

| Metodo | Ruta | Auth | Descripcion |
|--------|------|------|-------------|
| GET | `/` | No | Health check |

### Autenticacion (`/api/auth`)

| Metodo | Ruta | Auth | Descripcion |
|--------|------|------|-------------|
| POST | `/register` | No | Registrar usuario |
| POST | `/login` | No | Iniciar sesion |
| POST | `/logout` | JWT | Cerrar sesion |
| GET | `/me` | JWT | Obtener usuario actual |

### Tareas (`/api/tasks`)

| Metodo | Ruta | Auth | Descripcion |
|--------|------|------|-------------|
| POST | `/create` | JWT | Crear tarea |
| GET | `/me` | JWT | Listar tareas del usuario |
| PUT | `/update/:id` | JWT | Actualizar tarea |
| PATCH | `/toggle/:id` | JWT | Cambiar estado completado |
| DELETE | `/delete/:id` | JWT | Eliminar tarea |

### Parametros de consulta — `GET /api/tasks/me`

| Parametro | Tipo | Default | Descripcion |
|-----------|------|---------|-------------|
| `search` | string | - | Busqueda por titulo o descripcion (regex, case-insensitive) |
| `status` | `completed` / `pending` | - | Filtrar por estado |
| `page` | integer | `1` | Numero de pagina |
| `limit` | integer | `10` | Tareas por pagina |
| `order` | `1` / `-1` | `1` | Orden ascendente (1) o descendente (-1) por `createdAt` |

---

## Modelos de Datos

### User

```json
{
  "user": "String (requerido, unico)",
  "email": "String (requerido, unico)",
  "password": "String (hasheado con bcrypt)",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

Metodo de instancia: `comparePassword(candidate)` — compara password con hash.

### Task

```json
{
  "title": "String (requerido)",
  "description": "String",
  "completed": "Boolean (default: false)",
  "user": "ObjectId -> User (requerido)",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

---

## Variables de Entorno

```
PORT=3050
HOST=127.0.0.1
MONGODB_URI=mongodb://localhost:27017/miBase
JWT_SECRET=tu_secreto
JWT_EXPIRES_IN=24h
```

Todas tienen valores por defecto (ver `src/config/env.js`).

---

## Instalacion y Ejecucion

```bash
# Instalar dependencias
npm install

# Desarrollo (con nodemon)
npm run dev

# Produccion
npm start
```

## Despliegue en Vercel

El proyecto incluye `vercel.json` y `api/index.js` para despliegue serverless.
Vercel ejecuta `server.js` como funcion serverless con conexion lazy a MongoDB.

---

## OpenAPI Spec

La especificacion completa OpenAPI 3.1 esta en `openapi.yaml`. Puedes importarla en herramientas como Postman, Insomnia o Swagger UI.
