# ⚔️ Caballeros del Zodiaco - Fullstack App 🦁

Aplicación fullstack moderna para gestionar información de los Caballeros del Zodiaco con Node.js, Express, PostgreSQL y React.

## 🎯 Características

- ✅ **Backend REST API** con Node.js y Express
- ✅ **Base de datos PostgreSQL** en Railway
- ✅ **Frontend React** con diseño moderno
- ✅ **Swagger documentation** integrada
- ✅ **12 personajes pre-cargados** de Caballeros del Zodiaco
- ✅ **CRUD completo**: Crear, Leer, Actualizar, Eliminar
- ✅ **Responsive design** para móvil y desktop
- ✅ **Despliegue automático** en Railway
- ✅ **Switch** entre Caballeros del Zodiaco y Hunter x Hunter (FastAPI + MongoDB)

## 🛠️ Stack Tecnológico

### Backend
- **Node.js** + **Express** - Servidor API
- **PostgreSQL** - Base de datos relacional
- **Swagger/OpenAPI** - Documentación
- **CORS** - Acceso cruzado

### Frontend
- **React** - Framework UI
- **Axios** - HTTP client
- **CSS3** - Estilos modernos

### DevOps
- **Railway** - Hosting y base de datos
- **Git** - Control de versiones

## 🧿 Proyectos Disponibles
- **Caballeros del Zodiaco:** Node.js + Express + PostgreSQL + Swagger
- **Hunter x Hunter:** FastAPI + MongoDB + Swagger (nuevo backend en Python)
- Un **switch** en el frontend permite seleccionar qué catálogo ver y administrar

## 📋 Requisitos Previos

- Node.js 16+ instalado
- Cuenta en Railway (gratis)
- Git instalado

## 🚀 Instalación Local

### 1. Clonar el repositorio

```bash
git clone <tu-repo-url>
cd caballeros-zodiaco
```

### 2. Instalar dependencias

**Opción A: Automático (backend + frontend)**
```bash
npm run install-all
```

**Opción B: Manual**

Backend:
```bash
cd backend
npm install
```

Frontend:
```bash
cd frontend
npm install
```

Backend Hunter x Hunter (Python):
```bash
cd hxh_backend
pip install -r requirements.txt
```

### 3. Configurar variables de entorno

Backend - crea `backend/.env`:
```env
PORT=3000
DATABASE_URL=postgresql://usuario:password@localhost:5432/caballeros
NODE_ENV=development
HXH_SERVICE_URL=http://localhost:8000
```

Frontend - crea `frontend/.env`:
```env
REACT_APP_API_URL=http://localhost:3000
REACT_APP_HXH_API_URL=http://localhost:8000/api-hxh
```

Backend Hunter x Hunter (FastAPI) - crea `hxh_backend/.env`:
```env
MONGO_URL=mongodb://usuario:password@localhost:27017
MONGO_DB=hunterxhunter_db
PORT=8000
```

### 4. Ejecutar aplicación

**Modo desarrollo (backend + frontend)**
```bash
npm run dev
```

**Solo backend**
```bash
npm run dev:backend
```

**Solo frontend**
```bash
npm run dev:frontend
```

**Backend Hunter x Hunter (FastAPI)**
```bash
cd hxh_backend
uvicorn main:app --reload
```

### 5. Acceder a la aplicación

- **Frontend:** http://localhost:3000
- **API:** http://localhost:3000/api/caballeros
- **Swagger:** http://localhost:3000/api-docs
- **Hunter x Hunter API:** http://localhost:8000/api-hxh/hunters
- **Swagger HXH:** http://localhost:8000/api-hxh/docs

## 🌐 Despliegue en Railway

Railway es la forma más fácil de desplegar esta aplicación.

### Paso 1: Preparar repositorio

```bash
git init
git add .
git commit -m "Initial commit: Caballeros del Zodiaco"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/caballeros-zodiaco.git
git push -u origin main
```

### Paso 2: Crear proyecto en Railway

1. Ve a [railway.app](https://railway.app)
2. Login with GitHub
3. Click **"New Project"**
4. Selecciona **"Deploy from GitHub repo"**
5. Elige tu repositorio

### Paso 3: Agregar PostgreSQL

1. En tu proyecto, click **"+ New"**
2. Selecciona **"Database"** → **"PostgreSQL"**
3. Railway configura automáticamente `DATABASE_URL`

### Paso 4: Configurar build

1. Ve a tu servicio
2. Settings → Deploy
3. Build command: `cd backend && npm install`
4. Start command: `cd backend && npm start`
5. Root directory: (deja vacío)

### Paso 5: Variables de entorno

Railway agrega automáticamente:
- ✅ `DATABASE_URL` (desde PostgreSQL)

Agrega manualmente:
```
NODE_ENV=production
PORT=3000
SWAGGER_SERVER_URL=https://tu-app.railway.app
```

### Paso 6: Verificar

Tu app estará en: `https://tu-app.railway.app`

## 🐜 Backend Hunter x Hunter (FastAPI + MongoDB)
1. En Railway crea **otro servicio** (New → Deploy from GitHub repo) seleccionando la carpeta `hxh_backend/`.
2. Crea o reutiliza un servicio **MongoDB** y copia su cadena `MONGO_URL`.
3. Variables en el servicio FastAPI:
   ```
   MONGO_URL=<cadena de Mongo>
   MONGO_DB=hunterxhunter_db
   PORT=8000
   ```
4. Comando de inicio: `uvicorn main:app --host 0.0.0.0 --port $PORT`
5. Copia la URL pública del servicio (por ejemplo `https://hunter-api.up.railway.app`)
6. En el servicio Node.js agrega la variable:
   ```
   HXH_SERVICE_URL=https://hunter-api.up.railway.app
   ```
   Con esto, cualquier request a `/api-hxh/*` será redirigida automáticamente al backend de FastAPI.

## 📚 API Endpoints

### Documentación Swagger

```
GET /api-docs
```

### Endpoints

#### Obtener todos los caballeros
```http
GET /api/caballeros
```

Response:
```json
{
  "total": 12,
  "caballeros": [
    {
      "id": 1,
      "nombre": "Seiya de Pegaso",
      "edad": 13,
      "altura": 165.0,
      "constelacion": "Pegaso",
      "imagen_url": "https://..."
    }
  ]
}
```

#### Obtener caballero por ID
```http
GET /api/caballeros/:id
```

#### Crear caballero
```http
POST /api/caballeros
Content-Type: application/json

{
  "nombre": "Nuevo Caballero",
  "edad": 20,
  "altura": 180.0,
  "constelacion": "Test",
  "imagen_url": "https://example.com/image.jpg"
}
```

#### Eliminar caballero
```http
DELETE /api/caballeros/:id
```

### Hunter x Hunter API (FastAPI + MongoDB)

#### Swagger
```
GET /api-hxh/docs
```

#### Obtener cazadores
```http
GET /api-hxh/hunters
```

#### Crear cazador
```http
POST /api-hxh/hunters
Content-Type: application/json

{
  "nombre": "Gon Freecss",
  "edad": 12,
  "nen_tipo": "Refuerzo",
  "afiliacion": "Cazador",
  "imagen_url": "https://example.com/gon.jpg"
}
```

#### Eliminar cazador
```http
DELETE /api-hxh/hunters/{id}
```

## 📊 Base de Datos

### Tabla: caballeros

```sql
CREATE TABLE caballeros (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  edad INTEGER,
  altura FLOAT,
  constelacion VARCHAR(100),
  imagen_url VARCHAR(500) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Personajes Incluidos

1. Seiya de Pegaso
2. Shiryu del Dragón
3. Hyoga del Cisne
4. Shun de Andrómeda
5. Ikki del Fénix
6. Aldebarán de Tauro
7. Saga de Géminis
8. Máscara de la Muerte de Cáncer
9. Aioria del León
10. Shaka de Virgo
11. Dohko de Libra
12. Milo de Escorpio

## 📁 Estructura del Proyecto

```
caballeros-zodiaco/
├── backend/
│   ├── config/
│   │   └── database.js      # Configuración PostgreSQL
│   ├── routes/
│   │   └── caballeros.js    # Rutas API
│   ├── server.js            # Servidor Express
│   ├── package.json
│   └── .env.example
├── hxh_backend/
│   ├── main.py               # FastAPI + MongoDB
│   ├── requirements.txt
│   └── README.md
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── App.js           # Componente principal
│   │   ├── App.css          # Estilos
│   │   ├── index.js
│   │   └── index.css
│   └── package.json
├── package.json             # Root (scripts)
├── README.md
└── .gitignore
```

## 🧪 Testing

### Probar API con Postman

1. Importa la colección
2. Configura base URL: `https://tu-app.railway.app`
3. Ejecuta requests

### Probar localmente

```bash
# Backend en puerto 3000
curl http://localhost:3000/api/caballeros

# Verificar frontend
curl http://localhost:3001
```

## 🐛 Troubleshooting

### Error: Cannot connect to database

**Solución:**
- Verifica `DATABASE_URL` en Railway
- Asegúrate de que PostgreSQL esté activo
- Revisa logs: `railway logs`

### Frontend no carga datos

**Solución:**
- Verifica `REACT_APP_API_URL` está configurada
- Asegúrate de que el backend esté corriendo
- Revisa la consola del navegador

## 🔀 Frontend Switch
- Selector superior para elegir entre **Caballeros del Zodiaco** y **Hunter x Hunter**
- Cada vista tiene su propio formulario y estadísticas
- Caballeros consume `/api/caballeros`
- Hunter x Hunter consume `/api-hxh/hunters` (proxificado hacia FastAPI)
- Variables clave:
  - `frontend/.env` → `REACT_APP_API_URL`, `REACT_APP_HXH_API_URL`
  - `backend/.env` → `HXH_SERVICE_URL`

### Puerto ya en uso

**Solución:**
- Cambia el puerto en `.env`
- O mata el proceso: `lsof -ti:3000 | xargs kill`

## 📸 Capturas

- Dashboard de Railway con servicios activos
- Swagger UI mostrando documentación
- Frontend con los 12 caballeros
- Frontend mostrando la vista de Hunter x Hunter
- Formulario de creación funcionando
- API respondiendo correctamente

## 🎓 Próximos Pasos

- [ ] Autenticación JWT
- [ ] Búsqueda y filtros
- [ ] Paginación
- [ ] Tests automatizados
- [ ] CI/CD pipeline
- [ ] Docker containerization

## 📄 Licencia

MIT License - Libre para usar

## 👨‍💻 Autor

Desarrollado con ⚔️ y 🦁

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea tu feature branch
3. Commit tus cambios
4. Push al branch
5. Abre un Pull Request

---

**¡Disfruta gestionando a tus Caballeros del Zodiaco!** ⚔️✨
