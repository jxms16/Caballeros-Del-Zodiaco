# Configuración de PostgreSQL en Railway

Esta guía detalla cómo configurar y usar PostgreSQL en Railway para tu proyecto.

## 🚂 Paso 1: Crear Proyecto en Railway

1. Ve a [Railway.app](https://railway.app/)
2. Haz clic en "Start a New Project"
3. Selecciona "Deploy from GitHub repo"
4. Conecta tu cuenta de GitHub
5. Selecciona el repositorio `caballeros-zodiaco-api`

## 🗄️ Paso 2: Agregar PostgreSQL

1. En tu proyecto de Railway, haz clic en **"+ New"**
2. Selecciona **"Database"**
3. Elige **"PostgreSQL"**
4. Railway creará automáticamente una base de datos PostgreSQL

## ⚙️ Paso 3: Configuración Automática

Railway configura automáticamente la variable de entorno `DATABASE_URL` para tu aplicación.

La URL se verá así:
```
postgresql://postgres:contraseña@containers-us-west-XXX.railway.app:5432/railway
```

## 🔗 Paso 4: Conectar tu App con PostgreSQL

Tu aplicación **ya está configurada** para usar PostgreSQL automáticamente:

```python
# En app.py línea 12
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL', 'sqlite:///...')
```

Esto significa que:
- ✅ En **producción** (Railway): usará PostgreSQL de `DATABASE_URL`
- ✅ En **desarrollo local**: usará SQLite como fallback

## 🔍 Paso 5: Verificar la Conexión

Después del despliegue:

1. Ve a **"Variables"** en tu servicio
2. Verifica que existe `DATABASE_URL`
3. Revisa los **logs** del despliegue
4. Busca el mensaje: "Datos iniciales insertados correctamente"

## 📊 Paso 6: Estructura de la Tabla

La tabla se creará automáticamente cuando la app inicie. Estructura:

```sql
CREATE TABLE caballeros (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    edad INTEGER,
    altura FLOAT,
    constelacion VARCHAR(100),
    imagen_url VARCHAR(500) NOT NULL
);
```

**Diferencias con SQLite:**
- PostgreSQL usa `SERIAL` en lugar de `INTEGER` para autoincrement
- PostgreSQL es más robusto y escalable
- PostgreSQL soporta mejores tipos de datos

## 🧪 Paso 7: Probar la Base de Datos

### Opción A: Desde la API

1. Abre: `https://tu-app.railway.app/api/caballeros`
2. Deberías ver los 12 caballeros

### Opción B: Desde PostgreSQL Dashboard

Railway ofrece un dashboard para ver la base de datos:

1. Ve a tu servicio de PostgreSQL
2. Click en **"Data"** tab
3. Puedes ver las tablas y datos

### Opción C: Conectarse con cliente externo

Railway proporciona credenciales para conectar con herramientas como:

- **pgAdmin**
- **DBeaver**
- **TablePlus**
- **psql** (línea de comandos)

Credenciales disponibles en: Variables > `PGHOST`, `PGPORT`, `PGUSER`, `PGPASSWORD`

## 🔐 Paso 8: Variables de Entorno en Railway

Railway configura automáticamente estas variables:

| Variable | Descripción |
|----------|-------------|
| `DATABASE_URL` | URL completa de conexión |
| `PGHOST` | Host del servidor |
| `PGPORT` | Puerto (5432) |
| `PGUSER` | Usuario (postgres) |
| `PGPASSWORD` | Contraseña generada |
| `PGDATABASE` | Nombre de la base de datos |

Tu app solo necesita `DATABASE_URL`.

## 📝 Paso 9: Migrar Datos (si es necesario)

Si ya tenías datos en SQLite local:

1. Exporta datos de SQLite:
```python
# Script temporal
from app import app, db, Caballero
import json

with app.app_context():
    caballeros = Caballero.query.all()
    data = [c.to_dict() for c in caballeros]
    with open('datos.json', 'w') as f:
        json.dump(data, f, indent=2)
```

2. Importa en PostgreSQL via Railway:
   - Usa el dashboard de Railway
   - O conéctate con psql y ejecuta INSERT

**Nota:** En tu caso no es necesario porque la app inserta los 12 caballeros automáticamente.

## 🚀 Paso 10: Desplegar

Cuando conectas PostgreSQL, Railway:

1. ✅ Detecta automáticamente que usas Python
2. ✅ Instala dependencias de `requirements.txt`
3. ✅ Ejecuta tu app con `Procfile`
4. ✅ Configura `DATABASE_URL`
5. ✅ Crea las tablas automáticamente
6. ✅ Inserta los datos iniciales

## 🧪 Verificación Final

### Checklist:

- [ ] Proyecto creado en Railway
- [ ] PostgreSQL agregado
- [ ] App conectada a PostgreSQL
- [ ] App desplegada exitosamente
- [ ] `DATABASE_URL` configurada
- [ ] Tabla creada automáticamente
- [ ] 12 caballeros insertados
- [ ] API responde correctamente
- [ ] Swagger funciona
- [ ] Postman puede consultar datos

### URLs para Probar:

```
Base: https://tu-app-production.railway.app
Swagger: https://tu-app-production.railway.app/api/docs
API: https://tu-app-production.railway.app/api/caballeros
```

## 🐛 Solución de Problemas

### Problema: "Error conectando a PostgreSQL"

**Solución:**
1. Verifica que `DATABASE_URL` esté configurada
2. Revisa logs: `railway logs`
3. Asegúrate de que PostgreSQL está activo

### Problema: "Table does not exist"

**Solución:**
1. La tabla se crea en el primer request
2. Verifica los logs para ver "create_all"
3. Reinicia el servicio si es necesario

### Problema: "Datos no insertados"

**Solución:**
1. Revisa logs buscando "Datos iniciales insertados"
2. Verifica que la tabla esté vacía antes de insertar
3. Ejecuta manualmente los INSERT si es necesario

### Problema: "Connection pool exhausted"

**Solución:**
1. Railway PostgreSQL gratuito tiene límites
2. Asegúrate de cerrar conexiones correctamente
3. SQLAlchemy lo maneja automáticamente

## 📊 Ventajas de PostgreSQL en Railway

✅ **Gratis** para proyectos pequeños  
✅ **Configuración automática**  
✅ **Respaldos automáticos**  
✅ **Dashboard visual**  
✅ **Escalable** fácilmente  
✅ **Producción-ready**  

## 💰 Límites del Plan Gratuito

- 5 GB de almacenamiento
- 512 MB RAM
- Ancho de banda generoso
- Más que suficiente para este proyecto

## 🔄 Backup y Restauración

Railway hace backups automáticos, pero puedes exportar datos:

```sql
-- Exportar
pg_dump -h HOST -U USER -d DATABASE > backup.sql

-- Importar
psql -h HOST -U USER -d DATABASE < backup.sql
```

## 📚 Comandos Útiles de PostgreSQL

Si te conectas con `psql`:

```sql
-- Ver bases de datos
\l

-- Conectar a tu base
\c railway

-- Ver tablas
\dt

-- Ver estructura de tabla
\d caballeros

-- Ver datos
SELECT * FROM caballeros;

-- Ver conteo
SELECT COUNT(*) FROM caballeros;
```

## 🎉 Resumen

Tu aplicación está lista para usar PostgreSQL en Railway sin cambios adicionales. Solo necesitas:

1. ✅ Agregar PostgreSQL en Railway
2. ✅ Railway configura todo automáticamente
3. ✅ Tu código ya detecta PostgreSQL
4. ✅ Las tablas se crean solas
5. ✅ Los datos se insertan automáticamente

**¡Todo funcionará out-of-the-box!** 🚀

---

**Próximos pasos:**
1. Despliega en Railway
2. Agrega PostgreSQL
3. Prueba los endpoints
4. Toma capturas de pantalla
5. ¡Listo para entregar!

