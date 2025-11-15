# Hunter x Hunter API (FastAPI + MongoDB)

## 🚀 Características
- Backend en **Python + FastAPI**
- Base de datos **MongoDB** (Railway)
- Documentación interactiva con **Swagger** (`/api-hxh/docs`)
- Endpoints:
  - `GET /api-hxh/hunters`
  - `GET /api-hxh/hunters/{id}`
  - `POST /api-hxh/hunters`
  - `DELETE /api-hxh/hunters/{id}`
- Datos iniciales de 12 cazadores

## ⚙️ Variables de entorno
Crear `.env` dentro de `hxh_backend/`:
```
MONGO_URL=mongodb://usuario:password@host:27017
MONGO_DB=hunterxhunter_db
PORT=8000
```

## ▶️ Ejecutar localmente
```bash
cd hxh_backend
pip install -r requirements.txt
uvicorn main:app --reload
```

Swagger disponible en `http://localhost:8000/api-hxh/docs`

## ☁️ Deploy en Railway
1. Crear **nuevo servicio** → "Deploy from Repo"
2. Elegir la carpeta `hxh_backend/`
3. Variables:
   - `MONGO_URL` (proporcionada por Railway MongoDB)
   - `MONGO_DB` (opcional, por defecto `hunterxhunter_db`)
4. Comando de inicio: `uvicorn main:app --host 0.0.0.0 --port $PORT`

## 🔗 Integración con el frontend
En el servicio Node.js, configura:
```
HXH_SERVICE_URL=https://tu-servicio-fastapi.up.railway.app
```

El frontend consumirá `https://tu-front.railway.app/api-hxh/...` y el backend Node redirigirá al servicio Python.

