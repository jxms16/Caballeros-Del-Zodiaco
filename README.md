# API de Caballeros del Zodiaco 🦁

Sistema de microservicios REST para gestionar información de los Caballeros del Zodiaco, desplegado online con documentación Swagger.

## 📋 Descripción

Este proyecto implementa una API REST que permite consultar e insertar datos de personajes de la serie "Caballeros del Zodiaco" en una base de datos relacional. Incluye 12 personajes iniciales preconfigurados.

## 🎯 Características

- ✅ Base de datos con mínimo 12 personajes de Caballeros del Zodiaco
- ✅ Microservicio de consulta (GET)
- ✅ Microservicio de inserción (POST)
- ✅ Documentación interactiva con Swagger
- ✅ Desplegado online
- ✅ Campos: nombre, edad, altura, constelación, URL de imagen

## 🛠️ Tecnologías Utilizadas

- **Flask**: Framework web para Python
- **Flask-SQLAlchemy**: ORM para gestión de base de datos
- **Flask-Swagger-UI**: Interfaz de documentación API
- **SQLite/PostgreSQL**: Base de datos relacional
- **Gunicorn**: Servidor WSGI para producción

## 📦 Instalación Local

### Requisitos Previos
- Python 3.11 o superior
- pip (gestor de paquetes de Python)

### Pasos de Instalación

1. Clonar el repositorio o descargar los archivos
2. Instalar dependencias:
```bash
pip install -r requirements.txt
```

3. Ejecutar la aplicación:
```bash
python app.py
```

4. Acceder a la API:
- API Principal: http://localhost:5000
- Swagger UI: http://localhost:5000/api/docs

## 🌐 Despliegue Online

### Opción 1: Heroku (Recomendado)

1. Crear cuenta en [Heroku](https://www.heroku.com/)
2. Instalar Heroku CLI
3. Login en Heroku:
```bash
heroku login
```

4. Crear aplicación:
```bash
heroku create tu-app-nombre
```

5. Desplegar:
```bash
git init
git add .
git commit -m "Initial commit"
git push heroku main
```

6. Acceder a tu API:
```
https://tu-app-nombre.herokuapp.com
https://tu-app-nombre.herokuapp.com/api/docs
```

### Opción 2: Railway

1. Crear cuenta en [Railway](https://railway.app/)
2. Conectar con GitHub
3. Crear nuevo proyecto desde repositorio
4. Configurar variables de entorno si usas PostgreSQL

## 📚 Endpoints de la API

### Documentación Swagger
```
GET /api/docs
```
Interfaz interactiva para probar todos los endpoints

### Información Principal
```
GET /
```
Muestra información general de la API

### Microservicio de Consulta

#### Obtener todos los caballeros
```
GET /api/caballeros
```
**Respuesta:**
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
      "imagen_url": "https://i.imgur.com/OvXjbxO.jpg"
    }
  ]
}
```

#### Obtener caballero por ID
```
GET /api/caballeros/{id}
```
**Respuesta:**
```json
{
  "id": 1,
  "nombre": "Seiya de Pegaso",
  "edad": 13,
  "altura": 165.0,
  "constelacion": "Pegaso",
  "imagen_url": "https://i.imgur.com/OvXjbxO.jpg"
}
```

### Microservicio de Inserción

#### Crear nuevo caballero
```
POST /api/caballeros
```
**Cuerpo (JSON):**
```json
{
  "nombre": "Nuevo Caballero",
  "edad": 20,
  "altura": 180.0,
  "constelacion": "Escorpio",
  "imagen_url": "https://example.com/imagen.jpg"
}
```
**Nota:** Los campos `nombre` e `imagen_url` son obligatorios.

**Respuesta:**
```json
{
  "mensaje": "Caballero creado exitosamente",
  "caballero": {
    "id": 13,
    "nombre": "Nuevo Caballero",
    "edad": 20,
    "altura": 180.0,
    "constelacion": "Escorpio",
    "imagen_url": "https://example.com/imagen.jpg"
  }
}
```

### Eliminar Caballero
```
DELETE /api/caballeros/{id}
```

## 🧪 Pruebas con Postman

1. Importa el archivo de colección (si está disponible)
2. O usa los siguientes endpoints:

### GET Request
- **URL:** `https://tu-app.herokuapp.com/api/caballeros`
- **Método:** GET
- **Headers:** Ninguno requerido

### POST Request
- **URL:** `https://tu-app.herokuapp.com/api/caballeros`
- **Método:** POST
- **Headers:** 
  - `Content-Type: application/json`
- **Body (raw JSON):**
```json
{
  "nombre": "Test Caballero",
  "edad": 25,
  "altura": 175.5,
  "constelacion": "Test",
  "imagen_url": "https://example.com/test.jpg"
}
```

## 📊 Estructura de Base de Datos

```sql
CREATE TABLE caballeros (
    id INTEGER PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    edad INTEGER,
    altura FLOAT,
    constelacion VARCHAR(100),
    imagen_url VARCHAR(500) NOT NULL
);
```

## 📝 Personajes Incluidos

La base de datos viene precargada con 12 personajes:

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

## 📄 Archivos del Proyecto

- `app.py` - Aplicación principal Flask
- `requirements.txt` - Dependencias del proyecto
- `Procfile` - Configuración para Heroku
- `runtime.txt` - Versión de Python
- `static/swagger.json` - Especificación OpenAPI/Swagger
- `README.md` - Este archivo

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:
1. Fork el proyecto
2. Crea tu branch (`git checkout -b feature/NuevaFuncionalidad`)
3. Commit tus cambios (`git commit -m 'Agregar nueva funcionalidad'`)
4. Push al branch (`git push origin feature/NuevaFuncionalidad`)
5. Abre un Pull Request

## 📧 Contacto

Para preguntas o soporte, contactar a través de los issues del repositorio.

## 📜 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

