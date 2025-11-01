# 🔧 Solución: Error de Conexión a PostgreSQL en Railway

## ❌ Error que estás viendo:

```
Error: connect ECONNREFUSED ::1:5432
```

**Causa:** La variable `DATABASE_URL` no está configurada o PostgreSQL no está vinculado a tu servicio Node.js.

---

## ✅ Solución Paso a Paso

### Paso 1: Verificar que PostgreSQL existe

1. En Railway, ve a tu proyecto
2. Deberías ver **2 servicios**:
   - PostgreSQL (database)
   - Node.js (web)

**Si NO ves PostgreSQL:**
- Click **"+ New"**
- **"Database"** → **"PostgreSQL"**
- Espera a que se cree

### Paso 2: Verificar variables de entorno

1. Click en tu **servicio Node.js**
2. Ve a la pestaña **"Variables"**
3. **Busca:** `DATABASE_URL`

**Si NO está:**
- Ve al servicio **PostgreSQL**
- Pestaña **"Variables"**
- **Copia** el valor de `DATABASE_URL`
- Vuelve a tu servicio Node.js
- Click **"New Variable"**
- Nombre: `DATABASE_URL`
- Valor: pega lo que copiaste
- Click **"Add"**

### Paso 3: Reconectar servicios (Opción automática)

**La forma más fácil:**

1. En tu servicio **PostgreSQL**
2. Ve a **"Data"** tab
3. Verifica que esté activo

1. En tu servicio **Node.js**
2. Ve a **"Settings"**
3. Busca **"Service Relationships"**
4. Click **"+ Add"**
5. Selecciona tu PostgreSQL
6. Railway lo configura automáticamente

### Paso 4: Redeployar

Después de configurar las variables:

1. Ve a tu servicio Node.js
2. Click en **"Deployments"**
3. Click en los **3 puntos** del último deploy
4. Click **"Redeploy"**
5. Espera a que termine

---

## 🔍 Verificar que funciona

Revisa los **logs** del deploy. Deberías ver:

```
🔌 Conectando a PostgreSQL...
✅ Conectado a PostgreSQL
✅ Tabla caballeros creada/verificada
✅ Datos iniciales insertados
✅ Base de datos lista con 12 caballeros
🚀 Servidor corriendo en puerto 3000
📚 Swagger UI: http://localhost:3000/api-docs
```

---

## 📋 Checklist de Verificación

- [ ] PostgreSQL service creado en Railway
- [ ] Node.js service existe
- [ ] Variable `DATABASE_URL` configurada en Node.js service
- [ ] Both servicios están "Active"
- [ ] No hay errores rojos en los logs
- [ ] El último deploy fue exitoso

---

## 🎯 Alternativa: Configuración Manual

Si Railway no configura automáticamente:

### 1. Obtener DATABASE_URL

Desde tu servicio PostgreSQL → Variables:
```
DATABASE_URL=postgresql://postgres:contraseña@host:5432/railway
```

### 2. Configurar en Node.js

En tu servicio Node.js → Variables → Add:
- Key: `DATABASE_URL`
- Value: (pega la URL completa)

### 3. Variables adicionales

Agrega estas también:
- `NODE_ENV` = `production`
- `PORT` = `3000`

---

## 🆘 Si sigue sin funcionar

### Opción A: Verificar configuración de Railway

1. Ve a Settings del proyecto
2. Verifica **"Network"** está habilitado
3. Verifica **"Domains"** está configurado

### Opción B: Ver logs completos

1. Click en el servicio Node.js
2. Click en **"Logs"**
3. Revisa desde el inicio
4. Busca el primer error

### Opción C: Crear proyecto nuevo

A veces es más rápido:

1. Crea proyecto nuevo en Railway
2. Conecta tu repo de GitHub
3. **PRIMERO** agrega PostgreSQL
4. **DESPUÉS** agrega Node.js service
5. Railway conecta automáticamente

---

## 📞 Resumen

**El problema:** `DATABASE_URL` no configurada

**La solución:** 
1. Crear PostgreSQL en Railway
2. Configurar variable `DATABASE_URL` en Node.js
3. Redeployar

**Verificación:** Logs muestran "✅ Conectado a PostgreSQL"

---

## ✅ Después de solucionar

Tu app debería funcionar en:
```
https://tu-app.railway.app
```

Prueba:
- `https://tu-app.railway.app/api/caballeros`
- `https://tu-app.railway.app/api-docs`

¡Deberías ver los 12 caballeros! ⚔️

