# Enlaces para Probar la API con Postman

## 📍 Información General

**Base URL:** `https://tu-app-caballeros.herokuapp.com`  
**Swagger UI:** `https://tu-app-caballeros.herokuapp.com/api/docs`  
**Versión API:** 1.0.0  
**Fecha:** 2024

---

## 🌐 Endpoints Disponibles

### 1️⃣ Consulta de Todos los Caballeros

**Método:** GET  
**URL:** `https://tu-app-caballeros.herokuapp.com/api/caballeros`  
**Descripción:** Retorna la lista completa de todos los caballeros registrados

**Ejemplo de Respuesta:**
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

**Pasos en Postman:**
1. Selecciona método **GET**
2. Ingresa la URL
3. Click en **Send**
4. Verifica que retorne 200 OK con los 12 caballeros

---

### 2️⃣ Consulta de Caballero por ID

**Método:** GET  
**URL:** `https://tu-app-caballeros.herokuapp.com/api/caballeros/{id}`  
**Descripción:** Retorna información de un caballero específico

**Ejemplos:**
- `https://tu-app-caballeros.herokuapp.com/api/caballeros/1` (Seiya)
- `https://tu-app-caballeros.herokuapp.com/api/caballeros/2` (Shiryu)
- `https://tu-app-caballeros.herokuapp.com/api/caballeros/5` (Ikki)

**Ejemplo de Respuesta:**
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

**Pasos en Postman:**
1. Selecciona método **GET**
2. Ingresa la URL con ID
3. Click en **Send**
4. Verifica que retorne el caballero solicitado

---

### 3️⃣ Inserción de Nuevo Caballero

**Método:** POST  
**URL:** `https://tu-app-caballeros.herokuapp.com/api/caballeros`  
**Descripción:** Crea un nuevo registro de caballero

**Headers:**
```
Content-Type: application/json
```

**Body (raw - JSON):**
```json
{
  "nombre": "Mu de Aries",
  "edad": 20,
  "altura": 182.0,
  "constelacion": "Aries",
  "imagen_url": "https://i.imgur.com/test-mu.jpg"
}
```

**Campos Obligatorios:**
- `nombre` (string)
- `imagen_url` (string, URL válida)

**Campos Opcionales:**
- `edad` (integer)
- `altura` (float)
- `constelacion` (string)

**Ejemplo de Respuesta:**
```json
{
  "mensaje": "Caballero creado exitosamente",
  "caballero": {
    "id": 13,
    "nombre": "Mu de Aries",
    "edad": 20,
    "altura": 182.0,
    "constelacion": "Aries",
    "imagen_url": "https://i.imgur.com/test-mu.jpg"
  }
}
```

**Pasos en Postman:**
1. Selecciona método **POST**
2. Ingresa la URL
3. Ve a la pestaña **Headers**
4. Agrega: Key `Content-Type`, Value `application/json`
5. Ve a la pestaña **Body**
6. Selecciona **raw** y tipo **JSON**
7. Copia el JSON del ejemplo
8. Click en **Send**
9. Verifica que retorne 201 Created

---

### 4️⃣ Eliminación de Caballero

**Método:** DELETE  
**URL:** `https://tu-app-caballeros.herokuapp.com/api/caballeros/{id}`  
**Descripción:** Elimina un caballero de la base de datos

**Ejemplo:**
`https://tu-app-caballeros.herokuapp.com/api/caballeros/13`

**Ejemplo de Respuesta:**
```json
{
  "mensaje": "Caballero eliminado exitosamente"
}
```

**Pasos en Postman:**
1. Selecciona método **DELETE**
2. Ingresa la URL con ID
3. Click en **Send**
4. Verifica que retorne 200 OK

---

### 5️⃣ Información de la API

**Método:** GET  
**URL:** `https://tu-app-caballeros.herokuapp.com/`  
**Descripción:** Retorna información general de la API

**Ejemplo de Respuesta:**
```json
{
  "mensaje": "API de Caballeros del Zodiaco",
  "version": "1.0.0",
  "endpoints": {
    "consultar_todos": "/api/caballeros",
    "consultar_por_id": "/api/caballeros/<id>",
    "insertar": "/api/caballeros",
    "swagger": "/api/docs"
  }
}
```

---

## 🧪 Casos de Prueba

### Caso 1: Obtener Lista Completa
✅ GET todos los caballeros y verificar que hay 12 registros

### Caso 2: Obtener Caballero Específico
✅ GET caballero con ID 1 (Seiya) y verificar datos

### Caso 3: Crear Nuevo Caballero
✅ POST nuevo caballero y verificar que se creó con ID asignado

### Caso 4: Verificar Validaciones
✅ POST sin campo `nombre` → debe retornar 400
✅ POST sin campo `imagen_url` → debe retornar 400

### Caso 5: Eliminar Caballero
✅ DELETE caballero recién creado y verificar eliminación

### Caso 6: Obtener Caballero Inexistente
✅ GET caballero con ID 999 → debe retornar 404

---

## 📊 Personajes Pre-registrados

La base de datos contiene 12 personajes iniciales:

| ID | Nombre | Constelación | Edad |
|----|--------|--------------|------|
| 1 | Seiya de Pegaso | Pegaso | 13 |
| 2 | Shiryu del Dragón | Dragón | 14 |
| 3 | Hyoga del Cisne | Cisne | 14 |
| 4 | Shun de Andrómeda | Andrómeda | 13 |
| 5 | Ikki del Fénix | Fénix | 15 |
| 6 | Aldebarán de Tauro | Tauro | 20 |
| 7 | Saga de Géminis | Géminis | 28 |
| 8 | Máscara de la Muerte de Cáncer | Cáncer | 23 |
| 9 | Aioria del León | León | 20 |
| 10 | Shaka de Virgo | Virgo | 20 |
| 11 | Dohko de Libra | Libra | 261 |
| 12 | Milo de Escorpio | Escorpio | 20 |

---

## 🔗 Enlaces Importantes

### Documentación Interactiva (Swagger)
```
https://tu-app-caballeros.herokuapp.com/api/docs
```

En Swagger puedes:
- Ver todos los endpoints documentados
- Probar cada endpoint directamente
- Ver las respuestas y códigos de estado
- Revisar los esquemas de datos

### Información de la API
```
https://tu-app-caballeros.herokuapp.com/
```

### Repositorio GitHub
```
https://github.com/tu-usuario/caballeros-zodiaco-api
```

---

## ⚠️ Códigos de Estado HTTP

| Código | Significado | Cuándo Ocurre |
|--------|-------------|---------------|
| 200 | OK | Operación exitosa (GET, DELETE) |
| 201 | Created | Recursion creada exitosamente (POST) |
| 400 | Bad Request | Datos inválidos o campos faltantes |
| 404 | Not Found | Recurso no encontrado |
| 500 | Internal Server Error | Error del servidor |

---

## 📝 Notas Importantes

1. **URLs de Imágenes**: Las URLs de imágenes deben ser válidas y accesibles públicamente
2. **Validación**: Los campos `nombre` e `imagen_url` son obligatorios
3. **IDs**: Los IDs son autoincrementales, no se pueden especificar manualmente
4. **Swagger**: La mejor forma de explorar la API es mediante Swagger UI

---

## 🎬 Prueba Rápida con cURL

Si prefieres usar terminal en lugar de Postman:

```bash
# GET todos
curl https://tu-app-caballeros.herokuapp.com/api/caballeros

# GET por ID
curl https://tu-app-caballeros.herokuapp.com/api/caballeros/1

# POST nuevo
curl -X POST https://tu-app-caballeros.herokuapp.com/api/caballeros \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Test",
    "edad": 25,
    "altura": 175.0,
    "constelacion": "Test",
    "imagen_url": "https://example.com/test.jpg"
  }'

# DELETE
curl -X DELETE https://tu-app-caballeros.herokuapp.com/api/caballeros/13
```

---

**Fecha de Creación:** 2024  
**Última Actualización:** 2024  
**Autor:** [Tu nombre]

