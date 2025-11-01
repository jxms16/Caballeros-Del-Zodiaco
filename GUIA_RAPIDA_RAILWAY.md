# 🚂 Guía Rápida: Railway con PostgreSQL

## ⚡ Pasos en 3 Minutos

### 1️⃣ Sube tu código a GitHub

```bash
git init
git add .
git commit -m "API Caballeros del Zodiaco"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/caballeros-zodiaco-api.git
git push -u origin main
```

### 2️⃣ Crea proyecto en Railway

1. Ve a **railway.app** → Login with GitHub
2. Click **"New Project"**
3. Selecciona **"Deploy from GitHub repo"**
4. Elige tu repositorio

### 3️⃣ Agrega PostgreSQL

1. En tu proyecto, click **"+ New"**
2. Selecciona **"Database"** → **"PostgreSQL"**
3. ¡Listo! Se configura automáticamente

### 4️⃣ Obtén tu URL

1. Ve a **"Settings"** de tu servicio
2. Copia la URL generada
3. ¡Tu API está funcionando!

---

## 🔗 URLs de tu API

```
✅ API Principal: https://tu-app.railway.app
✅ Swagger: https://tu-app.railway.app/api/docs
✅ Get Todos: https://tu-app.railway.app/api/caballeros
✅ Get por ID: https://tu-app.railway.app/api/caballeros/1
```

---

## 🎯 Diagrama de Arquitectura

```
GitHub Repo
    ↓
Railway detecta Python
    ↓
PostgreSQL (agregado)
    ↓
Railway configura DATABASE_URL
    ↓
App se despliega automáticamente
    ↓
init_db() crea tablas
    ↓
12 caballeros insertados
    ↓
✅ API lista en https://tu-app.railway.app
```

---

## 📋 Lo que Railway hace automáticamente

| Tarea | Railway |
|-------|---------|
| Instalar Python | ✅ Auto-detecta |
| Instalar requirements.txt | ✅ Automático |
| Configurar DATABASE_URL | ✅ Automático |
| Detectar Procfile | ✅ Automático |
| Ejecutar gunicorn | ✅ Automático |
| Asignar puerto | ✅ Automático |
| Hacer disponible online | ✅ Automático |

**Tu código ya hace:**
- ✅ Crear tablas automáticamente
- ✅ Insertar 12 caballeros
- ✅ Configurar rutas API
- ✅ Configurar Swagger

---

## 🧪 Probar Inmediatamente

### Desde Swagger
```
Ve a: https://tu-app.railway.app/api/docs
Click en: GET /api/caballeros
Click "Execute"
Verás los 12 caballeros ✅
```

### Desde Postman
```
GET https://tu-app.railway.app/api/caballeros

Headers: none
Body: none

Deberías ver: JSON con 12 caballeros
```

### Desde Navegador
```
Abre: https://tu-app.railway.app/api/caballeros

Deberías ver: JSON formateado
```

---

## 📊 Estructura en Railway

```
Tu Proyecto Railway
│
├── Servicio 1: Python App
│   ├── Variables:
│   │   └── DATABASE_URL (automático)
│   ├── Deploy:
│   │   └── Desde GitHub
│   └── URL:
│       └── https://tu-app.railway.app
│
└── Servicio 2: PostgreSQL
    ├── Variables:
    │   ├── PGHOST
    │   ├── PGPORT
    │   ├── PGUSER
    │   └── PGPASSWORD
    ├── Data:
    │   └── Tabla: caballeros
    └── Dashboard:
        └── Ver datos visualmente
```

---

## 🔍 Verificar que funciona

### Paso 1: Dashboard de Railway
```
✅ Ver que PostgreSQL está activo
✅ Ver que Python App está activo
✅ Ver que el deploy fue exitoso
```

### Paso 2: Logs
```
Click en "Deployments" → Ver logs
Buscar: "Datos iniciales insertados correctamente"
```

### Paso 3: Prueba GET
```
curl https://tu-app.railway.app/api/caballeros
Debería retornar JSON con 12 caballeros
```

### Paso 4: Prueba POST
```bash
curl -X POST https://tu-app.railway.app/api/caballeros \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Test",
    "edad": 25,
    "imagen_url": "https://example.com/test.jpg"
  }'
```

---

## 🐛 Problemas Comunes

### App no responde
```
1. Verifica que el deploy se completó
2. Revisa logs para ver errores
3. Verifica que PostgreSQL está activo
```

### Base de datos vacía
```
1. Revisa logs: debería decir "Datos iniciales insertados"
2. Verifica que la tabla existe en PostgreSQL Dashboard
3. Si está vacía, reinicia el servicio
```

### Error de conexión
```
1. Verifica que DATABASE_URL está configurada
2. Railway la configura automáticamente
3. Si no está, el deploy fallará
```

---

## 📸 Capturas Necesarias

Para tu entrega, toma capturas de:

1. **Dashboard de Railway** mostrando servicios activos
2. **PostgreSQL Dashboard** mostrando la tabla `caballeros`
3. **Logs** mostrando "Datos iniciales insertados correctamente"
4. **Swagger** en el navegador funcionando
5. **GET response** con los 12 caballeros
6. **POST response** creando nuevo caballero

---

## 🎉 ¡Ya tienes todo!

Tu aplicación está lista para Railway porque:

✅ **app.py** detecta `DATABASE_URL` automáticamente  
✅ **Procfile** le dice a Railway cómo ejecutar la app  
✅ **requirements.txt** tiene todas las dependencias  
✅ **init_db()** crea tablas y datos automáticamente  
✅ **Swagger** está configurado  

**Solo falta desplegar y probar!** 🚀

---

## 📝 Checklist Final

Antes de entregar, verifica:

- [ ] Código subido a GitHub
- [ ] Proyecto Railway creado
- [ ] PostgreSQL agregado
- [ ] Deploy exitoso
- [ ] GET /api/caballeros funciona
- [ ] GET /api/caballeros/1 funciona
- [ ] POST /api/caballeros funciona
- [ ] DELETE /api/caballeros/{id} funciona
- [ ] Swagger /api/docs funciona
- [ ] 12 caballeros en la base de datos
- [ ] Capturas de pantalla tomadas
- [ ] PDF con enlaces creado

---

**¿Preguntas?** Revisa los archivos:
- `README.md` - Documentación general
- `DESPLIEGUE.md` - Guía detallada
- `RAILWAY_POSTGRES.md` - PostgreSQL específico
- `ENLACES_POSTMAN.md` - Pruebas con Postman

¡Buena suerte! 🎯

