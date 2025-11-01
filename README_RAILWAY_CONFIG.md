# ⚙️ Configuración de Railway - Guía Visual

## 🎯 Pasos EXACTOS para configurar Railway

### 1️⃣ Crear PostgreSQL (PRIMERO)

```
Railway Dashboard
    ↓
"+ New" button
    ↓
"Database"
    ↓
"PostgreSQL"
    ↓
Esperar a que se cree
```

**✅ Deberías ver:** Un servicio verde con el nombre "PostgreSQL"

---

### 2️⃣ Conectar Repo de GitHub

```
Railway Dashboard
    ↓
"+ New" button
    ↓
"GitHub Repo"
    ↓
Seleccionar: "caballeros-zodiaco"
    ↓
Railway detecta Node.js
```

**✅ Deberías ver:** Un servicio azul con el nombre "web" o "caballeros-zodiaco"

---

### 3️⃣ Configurar Variables (CRÍTICO)

**En el servicio PostgreSQL:**
```
PostgreSQL Service
    ↓
Tab "Variables"
    ↓
Buscar: DATABASE_URL
    ↓
Copiar el valor COMPLETO
```

**En el servicio Node.js:**
```
Node.js Service
    ↓
Tab "Variables"
    ↓
"+ Add Variable"
    ↓
Key: DATABASE_URL
Value: (pegar lo copiado)
    ↓
"Add"
```

**Agregar más variables:**
```
+ "New Variable"
  Key: NODE_ENV
  Value: production

+ "New Variable"
  Key: PORT
  Value: 3000
```

**✅ Deberías tener:** 3 variables en el servicio Node.js

---

### 4️⃣ Configurar Build Settings

**En el servicio Node.js:**

```
Node.js Service
    ↓
Tab "Settings"
    ↓
Scroll down a "Deploy"
    ↓
Build Command: cd backend && npm install
    ↓
Start Command: cd backend && npm start
    ↓
Root Directory: (vacío)
```

---

### 5️⃣ Redeploy

```
Node.js Service
    ↓
Tab "Deployments"
    ↓
Click "..." en el último deploy
    ↓
"Redeploy"
    ↓
Esperar...
```

---

### 6️⃣ Verificar Logs

**En el servicio Node.js:**

```
Tab "Deployments"
    ↓
Click en el deploy en proceso
    ↓
Ver "Logs"
```

**✅ Busca estos mensajes:**
```
🔌 Conectando a PostgreSQL...
✅ Conectado a PostgreSQL
✅ Tabla caballeros creada/verificada
✅ Datos iniciales insertados
🚀 Servidor corriendo en puerto 3000
```

**❌ Si ves errores:**
- Lee el error completo
- Verifica las variables
- Vuelve al paso 3

---

## 🎯 Estructura Visual en Railway

```
Tu Proyecto (Caballeros Zodiaco)
│
├── 📦 PostgreSQL Service (verde)
│   ├── Variables:
│   │   └── DATABASE_URL
│   └── Data Tab
│
└── 🚀 Node.js Service (azul)
    ├── Variables:
    │   ├── DATABASE_URL ✅
    │   ├── NODE_ENV ✅
    │   └── PORT ✅
    ├── Settings:
    │   └── Build/Start configurado ✅
    └── Deployments:
        └── Último deploy: SUCCESS ✅
```

---

## 📋 Checklist Final

Antes de probar tu app:

- [ ] PostgreSQL service existe
- [ ] Node.js service existe
- [ ] DATABASE_URL copiada correctamente
- [ ] NODE_ENV = production
- [ ] PORT = 3000
- [ ] Build command configurado
- [ ] Start command configurado
- [ ] Último redeploy completado
- [ ] Logs muestran "Conectado a PostgreSQL"
- [ ] No hay errores rojos

---

## 🌐 Obtener tu URL

```
Tu Proyecto
    ↓
Settings (wheel icon)
    ↓
Tab "Network"
    ↓
Primera URL pública:
https://tu-app.up.railway.app
```

**Esta es tu URL final!** ✅

---

## 🧪 Probar tu App

### Test 1: Info
```
GET https://tu-app.up.railway.app/
```

### Test 2: Caballeros
```
GET https://tu-app.up.railway.app/api/caballeros
```

### Test 3: Swagger
```
Abre: https://tu-app.up.railway.app/api-docs
```

---

## 🆘 Problemas Comunes

### "DATABASE_URL not defined"
→ No copiaste la variable desde PostgreSQL

### "Cannot connect"
→ PostgreSQL no está activo

### "Module not found"
→ Build command incorrecto

### "Port in use"
→ Normal, Railway maneja puertos

---

**Si sigues estos pasos exactamente, funcionará!** ✅

