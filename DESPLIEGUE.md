# Guía de Despliegue - Microservicios Caballeros del Zodiaco

Esta guía detalla el proceso completo para desplegar los microservicios online.

## 🚀 Paso a Paso del Despliegue

### 1️⃣ Preparación del Código

Asegúrate de tener todos los archivos necesarios:
- ✅ `app.py`
- ✅ `requirements.txt`
- ✅ `Procfile`
- ✅ `runtime.txt`
- ✅ `static/swagger.json`

### 2️⃣ Crear Repositorio en GitHub

1. Inicia sesión en [GitHub](https://github.com)
2. Crea un nuevo repositorio llamado `caballeros-zodiaco-api`
3. Sube tus archivos:

```bash
git init
git add .
git commit -m "Initial commit: API Caballeros del Zodiaco"
git branch -M main
git remote add origin https://github.com/tu-usuario/caballeros-zodiaco-api.git
git push -u origin main
```

### 3️⃣ Desplegar en Heroku (Opción Recomendada)

#### A. Crear Cuenta y App en Heroku

1. Ve a [Heroku](https://www.heroku.com/) y crea una cuenta
2. Descarga e instala [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli)
3. Inicia sesión:

```bash
heroku login
```

4. Crea la aplicación:

```bash
heroku create tu-app-caballeros
```

#### B. Conectar con GitHub

1. En el dashboard de Heroku, ve a tu app
2. Click en "Deploy"
3. Selecciona "Connect to GitHub"
4. Conecta tu repositorio
5. Click en "Deploy Branch"

#### C. Verificar Despliegue

Tu aplicación estará disponible en:
- **API:** `https://tu-app-caballeros.herokuapp.com`
- **Swagger:** `https://tu-app-caballeros.herokuapp.com/api/docs`

### 4️⃣ Desplegar en Railway (Alternativa)

Railway es otra excelente opción gratuita con PostgreSQL incluido.

#### A. Crear Cuenta

1. Ve a [Railway.app](https://railway.app/)
2. Haz clic en "Login with GitHub"
3. Autoriza Railway

#### B. Crear Proyecto

1. Click en "New Project"
2. Selecciona "Deploy from GitHub repo"
3. Elige tu repositorio
4. Railway detectará automáticamente que es Python
5. El despliegue comenzará automáticamente

#### C. Obtener URL

1. Ve a "Settings"
2. Copia la URL generada automáticamente
3. Tu API estará disponible en esa URL

### 5️⃣ Configurar Base de Datos en la Nube (Opcional)

Para usar PostgreSQL en producción:

#### Opción A: Heroku Postgres

1. En Heroku, ve a tu app
2. Click en "Resources"
3. Busca "Heroku Postgres"
4. Click "Add" (versión gratuita)
5. Se configura automáticamente con `DATABASE_URL`

#### Opción B: Supabase (Recomendado - Gratis)

1. Ve a [Supabase](https://supabase.com/)
2. Crea una cuenta gratuita
3. Crea nuevo proyecto
4. Ve a Settings > Database
5. Copia la "Connection string"
6. En Heroku: Settings > Config Vars > Add
   - Key: `DATABASE_URL`
   - Value: tu connection string de Supabase

#### Opción C: Railway PostgreSQL

1. En Railway, click "New"
2. Selecciona "Database > PostgreSQL"
3. Se crea automáticamente
4. La variable `DATABASE_URL` se configura sola

### 6️⃣ Actualizar URL en Swagger

Edita `static/swagger.json` línea 11 y actualiza:

```json
"servers": [
  {
    "url": "https://tu-app-caballeros.herokuapp.com",
    "description": "Servidor de producción"
  }
]
```

Luego haz commit:

```bash
git add static/swagger.json
git commit -m "Update Swagger server URL"
git push heroku main
```

### 7️⃣ Probar la API

#### Desde el Navegador

1. Ve a: `https://tu-app-caballeros.herokuapp.com`
2. Deberías ver la información de la API

3. Ve a: `https://tu-app-caballeros.herokuapp.com/api/docs`
4. Swagger UI cargará con la documentación

5. Prueba GET `/api/caballeros`
6. Deberías ver los 12 personajes

#### Desde Postman

**GET todos los caballeros:**
```
GET https://tu-app-caballeros.herokuapp.com/api/caballeros
```

**GET caballero por ID:**
```
GET https://tu-app-caballeros.herokuapp.com/api/caballeros/1
```

**POST nuevo caballero:**
```
POST https://tu-app-caballeros.herokuapp.com/api/caballeros
Content-Type: application/json

{
  "nombre": "Mu de Aries",
  "edad": 20,
  "altura": 182.0,
  "constelacion": "Aries",
  "imagen_url": "https://example.com/mu.jpg"
}
```

**DELETE caballero:**
```
DELETE https://tu-app-caballeros.herokuapp.com/api/caballeros/13
```

### 8️⃣ Monitoreo y Logs

#### En Heroku

Ver logs en tiempo real:

```bash
heroku logs --tail
```

#### En Railway

1. Ve a tu proyecto
2. Click en "Deployments"
3. Ve los logs del despliegue en tiempo real

### 9️⃣ Solución de Problemas Comunes

#### Error: "No module named flask"

Verifica que `requirements.txt` tenga todas las dependencias:
```bash
pip install -r requirements.txt
```

#### Error: "Port already in use"

En producción, Heroku/Railway asignan el puerto automáticamente.

#### La base de datos está vacía

Revisa los logs:
```bash
heroku logs --tail
```
Busca el mensaje "Datos iniciales insertados correctamente"

#### Swagger no carga

Verifica que el archivo `static/swagger.json` exista y sea accesible.

#### Error de CORS

Si pruebas desde el navegador y tienes problemas CORS, la app ya está configurada para aceptar todas las solicitudes.

### 🔟 Entregables Finales

#### Capturas de Pantalla Necesarias

1. ✅ Swagger UI mostrando la documentación completa
2. ✅ GET /api/caballeros retornando los 12 personajes
3. ✅ POST /api/caballeros creando un nuevo caballero
4. ✅ GET /api/caballeros/1 mostrando un personaje específico
5. ✅ Dashboard de Heroku/Railway con la app desplegada

#### Documento PDF

Crea un PDF con:

**TÍTULO:** Microservicios Caballeros del Zodiaco - Enlaces de Prueba

**CONTENIDO:**

```
Base URL: https://tu-app-caballeros.herokuapp.com
Swagger: https://tu-app-caballeros.herokuapp.com/api/docs

Endpoints:
- GET /api/caballeros - Consultar todos
- GET /api/caballeros/{id} - Consultar por ID
- POST /api/caballeros - Insertar nuevo
- DELETE /api/caballeros/{id} - Eliminar

Repositorio: https://github.com/tu-usuario/caballeros-zodiaco-api
```

## 📊 Recursos Adicionales

- **Heroku Docs:** https://devcenter.heroku.com/articles/getting-started-with-python
- **Railway Docs:** https://docs.railway.app
- **Supabase:** https://supabase.com/docs
- **Swagger OpenAPI:** https://swagger.io/specification/

---

**¡Tu API está lista para desplegar!** 🎉

