# 🚂 Guía de Despliegue en Railway

Guía paso a paso para desplegar tu aplicación de Caballeros del Zodiaco en Railway.

## ✅ Pre-requisitos

- [ ] Código subido a GitHub
- [ ] Cuenta de Railway creada
- [ ] Node.js 18+ instalado localmente

## 🚀 Paso 1: Preparar Repositorio

```bash
# Ya deberías tener esto hecho
cd caballeros-zodiaco
git status

# Si no has hecho commit
git add .
git commit -m "Initial commit: Node.js + React"
git push
```

## 🌐 Paso 2: Crear Proyecto en Railway

1. **Ve a Railway**
   - Abre: https://railway.app
   - Click en "Login with GitHub"
   - Autoriza Railway

2. **Crear Nuevo Proyecto**
   - Click en "New Project"
   - Selecciona "Deploy from GitHub repo"
   - Elige tu repositorio: `caballeros-zodiaco`
   - Railway comenzará a desplegar automáticamente

## 🗄️ Paso 3: Agregar PostgreSQL

1. **En tu proyecto de Railway**
   - Click en el botón **"+ New"**
   - Selecciona **"Database"**
   - Elige **"PostgreSQL"**
   - Railway creará la base de datos automáticamente

2. **Variables automáticas**
   - Railway configura automáticamente `DATABASE_URL`
   - Esta variable será usada por tu backend

## ⚙️ Paso 4: Configurar Variables de Entorno

1. **Ve a tu servicio Node.js**
   - Click en el servicio que muestra "web"
   - Click en "Variables"

2. **Agregar variables**
   - Railway ya agregó `DATABASE_URL` automáticamente
   - Agrega estas adicionales:

```
NODE_ENV=production
PORT=3000
SWAGGER_SERVER_URL=https://tu-app.railway.app
```

**Nota:** Reemplaza `tu-app.railway.app` con tu URL real (la verás en Settings del proyecto).

## 🔧 Paso 5: Configurar Deploy

Railway detecta automáticamente que es Node.js, pero verifica:

1. **Settings → Deploy**
2. **Build Command:**
   ```
   cd backend && npm install
   ```
3. **Start Command:**
   ```
   cd backend && npm start
   ```
4. **Root Directory:**
   ```
   (dejar vacío)
   ```

## 🧪 Paso 6: Verificar Despliegue

### Revisar Logs

1. Ve a tu servicio
2. Click en "Deployments"
3. Click en el deployment más reciente
4. Revisa los logs

**Deberías ver:**
```
✅ Tabla caballeros creada/verificada
✅ Datos iniciales insertados
✅ Base de datos conectada y lista
🚀 Servidor corriendo en puerto 3000
📚 Swagger UI: http://localhost:3000/api-docs
```

### Obtener URL

1. Ve a **Settings** de tu proyecto
2. Busca **"Networking"** o **"Domains"**
3. Copia la URL generada

Ejemplo: `https://caballeros-production.up.railway.app`

## 🧪 Paso 7: Probar la API

### Test 1: Endpoint Principal
```
GET https://tu-app.railway.app/
```

Response:
```json
{
  "mensaje": "API de Caballeros del Zodiaco",
  "version": "1.0.0",
  "endpoints": {...}
}
```

### Test 2: Obtener Caballeros
```
GET https://tu-app.railway.app/api/caballeros
```

Response:
```json
{
  "total": 12,
  "caballeros": [...]
}
```

### Test 3: Swagger UI
```
Abre: https://tu-app.railway.app/api-docs
```

Deberías ver la documentación interactiva de Swagger.

## 🎨 Paso 8: Configurar Frontend (Opcional)

Para desplegar el frontend también:

1. **Agregar nuevo servicio**
   - Click "+ New" → "Empty Service"
   - Configura:
     - Build: `cd frontend && npm install && npm run build`
     - Start: `cd frontend && npx serve -s build -l 3001`
   - Variables:
     ```
     REACT_APP_API_URL=https://tu-backend.railway.app
     ```

O usa el frontend solo localmente conectado al backend en producción.

## 🔍 Solución de Problemas

### ❌ Error: "Cannot connect to database"

**Causa:** `DATABASE_URL` no está configurada

**Solución:**
1. Verifica que PostgreSQL esté creado
2. Ve a Variables del servicio
3. Confirma que `DATABASE_URL` existe
4. Si no existe, copia desde PostgreSQL service

### ❌ Error: "Module not found"

**Causa:** Dependencias no instaladas

**Solución:**
1. Verifica que el Build Command sea correcto
2. Revisa logs del build
3. Asegúrate de tener `backend/package.json`

### ❌ Error: "Port already in use"

**Causa:** Conflicto de puerto

**Solución:**
Railway asigna el puerto automáticamente. Tu código ya usa `process.env.PORT`.

### ❌ Error: "DATABASE_URL not set"

**Causa:** PostgreSQL no conectado

**Solución:**
1. Ve a PostgreSQL service
2. Click "Variables"
3. Copia `DATABASE_URL`
4. Pégalo en tu servicio Node.js

## 📊 Estructura en Railway

```
Proyecto: Caballeros del Zodiaco
│
├── Servicio 1: PostgreSQL 🗄️
│   ├── Variables:
│   │   ├── DATABASE_URL
│   │   ├── PGHOST
│   │   ├── PGPORT
│   │   └── PGPASSWORD
│   └── Dashboard: Ver datos
│
└── Servicio 2: Node.js API 🚀
    ├── Source: GitHub
    ├── Build: cd backend && npm install
    ├── Start: cd backend && npm start
    ├── Variables:
    │   ├── DATABASE_URL (linked)
    │   ├── NODE_ENV=production
    │   └── PORT=3000
    └── URL: https://tu-app.railway.app
```

## ✅ Checklist de Verificación

Después del despliegue, verifica:

- [ ] PostgreSQL está activo
- [ ] Node.js está deployed
- [ ] No hay errores en logs
- [ ] `GET /` responde
- [ ] `GET /api/caballeros` retorna 12 caballeros
- [ ] `/api-docs` muestra Swagger
- [ ] Variables de entorno configuradas
- [ ] URL accesible públicamente

## 📸 Capturas Necesarias

Para tu entrega, toma capturas de:

1. ✅ Dashboard de Railway mostrando 2 servicios
2. ✅ PostgreSQL Dashboard con la tabla `caballeros`
3. ✅ Logs mostrando "Datos iniciales insertados"
4. ✅ Swagger UI funcionando
5. ✅ GET /api/caballeros con 12 resultados
6. ✅ POST creando nuevo caballero

## 🎉 ¡Despliegue Completado!

Tu aplicación debería estar funcionando en:
```
https://tu-app.railway.app
```

Endpoints disponibles:
- `https://tu-app.railway.app/` - Info
- `https://tu-app.railway.app/api/caballeros` - Lista todos
- `https://tu-app.railway.app/api/caballeros/:id` - Por ID
- `https://tu-app.railway.app/api-docs` - Swagger

## 🔗 Próximos Pasos

1. [ ] Prueba todos los endpoints con Postman
2. [ ] Toma capturas de pantalla
3. [ ] Crea documento PDF con enlaces
4. [ ] Actualiza README con URLs reales
5. [ ] Comparte tu app 🎯

---

**¡Tu API está lista para ser probada!** ⚔️✨

