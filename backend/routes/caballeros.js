const express = require('express');
const router = express.Router();
const db = require('../config/database');

/**
 * @swagger
 * /api/caballeros:
 *   get:
 *     summary: Obtener todos los caballeros
 *     tags: [Consulta]
 *     responses:
 *       200:
 *         description: Lista de todos los caballeros
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 total:
 *                   type: integer
 *                   example: 12
 *                 caballeros:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Caballero'
 *             example:
 *               total: 12
 *               caballeros:
 *                 - id: 1
 *                   nombre: "Seiya de Pegaso"
 *                   edad: 13
 *                   altura: 165.0
 *                   constelacion: "Pegaso"
 *                   imagen_url: "https://example.com/seiya.jpg"
 */
router.get('/', async (req, res) => {
  try {
    const result = await db.pool.query('SELECT * FROM caballeros ORDER BY id');
    res.json({
      total: result.rows.length,
      caballeros: result.rows
    });
  } catch (error) {
    console.error('Error obteniendo caballeros:', error);
    res.status(500).json({ error: 'Error del servidor' });
  }
});

/**
 * @swagger
 * /api/caballeros/{id}:
 *   get:
 *     summary: Obtener caballero por ID
 *     tags: [Consulta]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del caballero
 *     responses:
 *       200:
 *         description: Datos del caballero
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Caballero'
 *       404:
 *         description: Caballero no encontrado
 */
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.pool.query('SELECT * FROM caballeros WHERE id = $1', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Caballero no encontrado' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error obteniendo caballero:', error);
    res.status(500).json({ error: 'Error del servidor' });
  }
});

/**
 * @swagger
 * /api/caballeros:
 *   post:
 *     summary: Crear un nuevo caballero
 *     tags: [Inserción]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CaballeroInput'
 *           example:
 *             nombre: "Mu de Aries"
 *             edad: 20
 *             altura: 185
 *             constelacion: "Aries"
 *             imagen_url: "https://example.com/mu.jpg"
 *     responses:
 *       201:
 *         description: Caballero creado exitosamente
 *         content:
 *           application/json:
 *             example:
 *               mensaje: "Caballero creado exitosamente"
 *               caballero:
 *                 id: 13
 *                 nombre: "Mu de Aries"
 *                 edad: 20
 *                 altura: 185
 *                 constelacion: "Aries"
 *                 imagen_url: "https://example.com/mu.jpg"
 *       400:
 *         description: Datos inválidos
 *         content:
 *           application/json:
 *             example:
 *               error: "Los campos nombre e imagen_url son obligatorios"
 */
router.post('/', async (req, res) => {
  try {
    const { nombre, edad, altura, constelacion, imagen_url } = req.body;
    
    if (!nombre || !imagen_url) {
      return res.status(400).json({ 
        error: 'Los campos nombre e imagen_url son obligatorios' 
      });
    }
    
    const result = await db.pool.query(
      'INSERT INTO caballeros (nombre, edad, altura, constelacion, imagen_url) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [nombre, edad, altura, constelacion, imagen_url]
    );
    
    res.status(201).json({
      mensaje: 'Caballero creado exitosamente',
      caballero: result.rows[0]
    });
  } catch (error) {
    console.error('Error creando caballero:', error);
    res.status(400).json({ error: 'Error al crear caballero' });
  }
});

/**
 * @swagger
 * /api/caballeros/{id}:
 *   delete:
 *     summary: Eliminar caballero por ID
 *     tags: [Eliminación]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del caballero a eliminar
 *     responses:
 *       200:
 *         description: Caballero eliminado exitosamente
 *       404:
 *         description: Caballero no encontrado
 */
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.pool.query('DELETE FROM caballeros WHERE id = $1 RETURNING *', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Caballero no encontrado' });
    }
    
    res.json({ mensaje: 'Caballero eliminado exitosamente' });
  } catch (error) {
    console.error('Error eliminando caballero:', error);
    res.status(500).json({ error: 'Error del servidor' });
  }
});

/**
 * @swagger
 * components:
 *   schemas:
 *     Caballero:
 *       type: object
 *       required:
 *         - id
 *         - nombre
 *         - imagen_url
 *       properties:
 *         id:
 *           type: integer
 *           description: ID único del caballero
 *         nombre:
 *           type: string
 *           description: Nombre completo del caballero
 *         edad:
 *           type: integer
 *           description: Edad del caballero
 *         altura:
 *           type: number
 *           description: Altura en centímetros
 *         constelacion:
 *           type: string
 *           description: Nombre de la constelación
 *         imagen_url:
 *           type: string
 *           format: uri
 *           description: URL de la imagen del personaje
 *         created_at:
 *           type: string
 *           format: date-time
 *         updated_at:
 *           type: string
 *           format: date-time
 *     CaballeroInput:
 *       type: object
 *       required:
 *         - nombre
 *         - imagen_url
 *       properties:
 *         nombre:
 *           type: string
 *           description: Nombre completo del caballero
 *         edad:
 *           type: integer
 *           description: Edad del caballero
 *         altura:
 *           type: number
 *           description: Altura en centímetros
 *         constelacion:
 *           type: string
 *           description: Nombre de la constelación
 *         imagen_url:
 *           type: string
 *           format: uri
 *           description: URL de la imagen del personaje (obligatorio)
 */

module.exports = router;

