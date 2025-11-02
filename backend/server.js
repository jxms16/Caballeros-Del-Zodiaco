const express = require('express');
const cors = require('cors');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
require('dotenv').config();

const db = require('./config/database');
const caballerosRoutes = require('./routes/caballeros');

const app = express();
const PORT = process.env.PORT || 3000;

// Configuración de Swagger
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Caballeros del Zodiaco',
      version: '1.0.0',
      description: 'Microservicios REST para gestionar información de los Caballeros del Zodiaco',
      contact: {
        name: 'Soporte API',
        email: 'soporte@caballeros.com'
      }
    },
    servers: [
      {
        url: '/',
        description: 'Servidor principal (relativo)'
      }
    ],
    tags: [
      {
        name: 'Consulta',
        description: 'Endpoints para consultar información de caballeros'
      },
      {
        name: 'Inserción',
        description: 'Endpoints para insertar nuevos caballeros'
      },
      {
        name: 'Eliminación',
        description: 'Endpoints para eliminar caballeros'
      }
    ]
  },
  apis: ['./routes/*.js']
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Middleware
app.use(cors());
app.use(express.json());

// Servir archivos estáticos del frontend
const path = require('path');
app.use(express.static(path.join(__dirname, '../frontend/build')));

// Rutas API
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api/caballeros', caballerosRoutes);

// Ruta API info
app.get('/api', (req, res) => {
  res.json({
    mensaje: 'API de Caballeros del Zodiaco',
    version: '1.0.0',
    endpoints: {
      consultar_todos: '/api/caballeros',
      consultar_por_id: '/api/caballeros/:id',
      insertar: '/api/caballeros',
      swagger: '/api-docs'
    }
  });
});

// Catch-all handler para servir el frontend React
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
});

// Inicializar base de datos
async function initApp() {
  try {
    await db.init();
    console.log('✅ Base de datos conectada y lista');
    
    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
      console.log(`📚 Swagger UI: http://localhost:${PORT}/api-docs`);
    });
  } catch (error) {
    console.error('❌ Error al iniciar la aplicación:', error);
    process.exit(1);
  }
}

initApp();

module.exports = app;

