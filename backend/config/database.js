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
      imagen_url: 'https://i.pinimg.com/736x/39/cc/20/39cc201a59ac4aa4cdd26d8769ab35d8.jpg'
    },
    {
      nombre: 'Shiryu del Dragón',
      edad: 14,
      altura: 172.0,
      constelacion: 'Dragón',
      imagen_url: 'https://i.pinimg.com/736x/f9/84/fa/f984fa19152c03cf49d51fbc06e38757.jpg'
    },
    {
      nombre: 'Hyoga del Cisne',
      edad: 14,
      altura: 173.0,
      constelacion: 'Cisne',
      imagen_url: 'https://i.pinimg.com/videos/thumbnails/originals/65/99/3d/65993dc6eb65e6edfd6494b507883e36.0000000.jpg'
    },
    {
      nombre: 'Shun de Andrómeda',
      edad: 13,
      altura: 165.0,
      constelacion: 'Andrómeda',
      imagen_url: 'https://i.pinimg.com/videos/thumbnails/originals/14/01/74/140174561189d8d6d6a65df7ea67de0c.0000000.jpg'
    },
    {
      nombre: 'Ikki del Fénix',
      edad: 15,
      altura: 175.0,
      constelacion: 'Fénix',
      imagen_url: 'https://i.pinimg.com/736x/d8/75/85/d875853c6f5c6d6136050ec2e46dde9d.jpg'
    },
    {
      nombre: 'Aldebarán de Tauro',
      edad: 20,
      altura: 210.0,
      constelacion: 'Tauro',
      imagen_url: 'https://i.pinimg.com/1200x/d2/70/f7/d270f7120d87c89fa629e37d4bfc2e8a.jpg'
    },
    {
      nombre: 'Saga de Géminis',
      edad: 28,
      altura: 188.0,
      constelacion: 'Géminis',
      imagen_url: 'https://i.pinimg.com/736x/cc/fe/b7/ccfeb76d2dfb67d26c74c0f61133b2fe.jpg'
    },
    {
      nombre: 'Máscara de la Muerte de Cáncer',
      edad: 23,
      altura: 184.0,
      constelacion: 'Cáncer',
      imagen_url: 'https://i.pinimg.com/1200x/c6/03/01/c60301084e4ba440bf51c76ee678e20b.jpg'
    },
    {
      nombre: 'Aioria del León',
      edad: 20,
      altura: 185.0,
      constelacion: 'León',
      imagen_url: 'https://i.pinimg.com/736x/bb/d7/ca/bbd7cabb200831eae413a13b988c3749.jpg'
    },
    {
      nombre: 'Shaka de Virgo',
      edad: 20,
      altura: 182.0,
      constelacion: 'Virgo',
      imagen_url: 'https://i.pinimg.com/1200x/07/84/aa/0784aad82c763bfe61e122c8da410dee.jpg'
    },
    {
      nombre: 'Dohko de Libra',
      edad: 261,
      altura: 170.0,
      constelacion: 'Libra',
      imagen_url: 'https://i.pinimg.com/1200x/cc/f7/98/ccf798acf26b3c55a4f9238606625dcf.jpg'
    },
    {
      nombre: 'Milo de Escorpio',
      edad: 20,
      altura: 185.0,
      constelacion: 'Escorpio',
      imagen_url: 'https://i.pinimg.com/736x/83/f6/24/83f624a8f73c19cf8c4e5b14d3cf2fbf.jpg'
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
  init,
  insertInitialData
};

