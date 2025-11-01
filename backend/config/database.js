const { Pool } = require('pg');

// Configuración de conexión con manejo robusto
const getPool = () => {
  const databaseUrl = process.env.DATABASE_URL;
  
  if (!databaseUrl) {
    console.error('⚠️ DATABASE_URL no está configurada');
    console.error('En Railway, asegúrate de:');
    console.error('1. Crear un servicio PostgreSQL');
    console.error('2. La variable DATABASE_URL se configurará automáticamente');
    throw new Error('DATABASE_URL no configurada');
  }

  // Parsear DATABASE_URL para configurar SSL correctamente
  const isProduction = process.env.NODE_ENV === 'production';
  
  return new Pool({
    connectionString: databaseUrl,
    ssl: isProduction ? { rejectUnauthorized: false } : false,
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 20000,
    keepAlive: true,
    keepAliveInitialDelayMillis: 0
  });
};

const pool = getPool();

// Inicializar base de datos
async function init() {
  try {
    console.log('🔌 Conectando a PostgreSQL...');
    
    // Test de conexión
    await pool.query('SELECT NOW()');
    console.log('✅ Conectado a PostgreSQL');

    // Crear tabla si no existe
    await pool.query(`
      CREATE TABLE IF NOT EXISTS caballeros (
        id SERIAL PRIMARY KEY,
        nombre VARCHAR(100) NOT NULL,
        edad INTEGER,
        altura FLOAT,
        constelacion VARCHAR(100),
        imagen_url VARCHAR(500) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ Tabla caballeros creada/verificada');

    // Verificar si hay datos
    const countResult = await pool.query('SELECT COUNT(*) FROM caballeros');
    const count = parseInt(countResult.rows[0].count);

    if (count === 0) {
      await insertInitialData();
      console.log('✅ Datos iniciales insertados');
    } else {
      console.log(`✅ Base de datos lista con ${count} caballeros`);
    }
  } catch (error) {
    console.error('❌ Error inicializando BD:', error.message);
    console.error('Detalles:', error);
    throw error;
  }
}

// Insertar datos iniciales
async function insertInitialData() {
  const caballeros = [
    {
      nombre: 'Seiya de Pegaso',
      edad: 13,
      altura: 165.0,
      constelacion: 'Pegaso',
      imagen_url: 'https://i.imgur.com/OvXjbxO.jpg'
    },
    {
      nombre: 'Shiryu del Dragón',
      edad: 14,
      altura: 172.0,
      constelacion: 'Dragón',
      imagen_url: 'https://i.imgur.com/Rtc6pSd.jpg'
    },
    {
      nombre: 'Hyoga del Cisne',
      edad: 14,
      altura: 173.0,
      constelacion: 'Cisne',
      imagen_url: 'https://i.imgur.com/9m8J2aC.jpg'
    },
    {
      nombre: 'Shun de Andrómeda',
      edad: 13,
      altura: 165.0,
      constelacion: 'Andrómeda',
      imagen_url: 'https://i.imgur.com/JxK3fLd.jpg'
    },
    {
      nombre: 'Ikki del Fénix',
      edad: 15,
      altura: 175.0,
      constelacion: 'Fénix',
      imagen_url: 'https://i.imgur.com/M7wP4nJ.jpg'
    },
    {
      nombre: 'Aldebarán de Tauro',
      edad: 20,
      altura: 210.0,
      constelacion: 'Tauro',
      imagen_url: 'https://i.imgur.com/QrN8KxL.jpg'
    },
    {
      nombre: 'Saga de Géminis',
      edad: 28,
      altura: 188.0,
      constelacion: 'Géminis',
      imagen_url: 'https://i.imgur.com/V3mK7nP.jpg'
    },
    {
      nombre: 'Máscara de la Muerte de Cáncer',
      edad: 23,
      altura: 184.0,
      constelacion: 'Cáncer',
      imagen_url: 'https://i.imgur.com/W9xJ8nM.jpg'
    },
    {
      nombre: 'Aioria del León',
      edad: 20,
      altura: 185.0,
      constelacion: 'León',
      imagen_url: 'https://i.imgur.com/X4mJ9nR.jpg'
    },
    {
      nombre: 'Shaka de Virgo',
      edad: 20,
      altura: 182.0,
      constelacion: 'Virgo',
      imagen_url: 'https://i.imgur.com/Y5mJ0nS.jpg'
    },
    {
      nombre: 'Dohko de Libra',
      edad: 261,
      altura: 170.0,
      constelacion: 'Libra',
      imagen_url: 'https://i.imgur.com/Z6mJ1nT.jpg'
    },
    {
      nombre: 'Milo de Escorpio',
      edad: 20,
      altura: 185.0,
      constelacion: 'Escorpio',
      imagen_url: 'https://i.imgur.com/A7mJ2nU.jpg'
    }
  ];

  for (const caballero of caballeros) {
    await pool.query(
      'INSERT INTO caballeros (nombre, edad, altura, constelacion, imagen_url) VALUES ($1, $2, $3, $4, $5)',
      [caballero.nombre, caballero.edad, caballero.altura, caballero.constelacion, caballero.imagen_url]
    );
  }
}

module.exports = {
  pool,
  init
};

