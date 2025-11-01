# 🚀 Instrucciones Rápidas de Despliegue

## ⚡ 3 Pasos para Desplegar

### 1️⃣ Subir a GitHub

```bash
cd "C:\Users\Juans\Downloads\Caballeros Del Zodiaco"
git init
git add .
git commit -m "Caballeros Zodiaco - Node.js + React"
git branch -M main
# Crea el repo en GitHub primero
git remote add origin https://github.com/TU-USUARIO/caballeros-zodiaco.git
git push -u origin main
```

### 2️⃣ Crear Proyecto en Railway

1. **Ve a:** https://railway.app
2. **Login** con GitHub
3. **New Project** → **Deploy from GitHub repo**
4. **Selecciona** tu repositorio
5. **Espera** a que Railway despliegue

### 3️⃣ Agregar PostgreSQL

1. En tu proyecto Railway: **"+ New"**
2. **"Database"** → **"PostgreSQL"**
3. **¡Listo!** Tu app ya funciona

---

## 🌐 Tu App Estará En

```
https://tu-app.railway.app
```

Verifica:
- ✅ GET / → Info de la API
- ✅ GET /api/caballeros → 12 caballeros
- ✅ GET /api-docs → Swagger UI

---

## 🧪 Probar

### Desde el navegador
```
https://tu-app.railway.app/api/caballeros
```

### Crear nuevo caballero
```
POST https://tu-app.railway.app/api/caballeros
Content-Type: application/json

{
  "nombre": "Test",
  "imagen_url": "https://example.com/test.jpg"
}
```

---

## 📸 Capturas Necesarias

1. Dashboard de Railway con servicios
2. PostgreSQL mostrando tabla
3. Swagger UI funcionando
4. GET /api/caballeros con datos

---

## ⚠️ Si hay problemas

1. Ve a **Logs** en Railway
2. Busca errores
3. Verifica que PostgreSQL esté activo
4. Revisa variables de entorno

---

**¡Eso es todo!** 🎉

