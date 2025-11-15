import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

// Usar la misma URL del servidor en producción, solo cambiar en desarrollo
const getApiUrl = () => {
  if (process.env.NODE_ENV === 'production') {
    return ''; // Mismo dominio
  }
  return process.env.REACT_APP_API_URL || 'http://localhost:3000';
};

const API_URL = getApiUrl();

function App() {
  const [caballeros, setCaballeros] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    edad: '',
    altura: '',
    constelacion: '',
    imagen_url: ''
  });

  useEffect(() => {
    fetchCaballeros();
  }, []);

  const fetchCaballeros = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/api/caballeros`);
      setCaballeros(response.data.caballeros);
      setError(null);
    } catch (err) {
      console.error('Error fetching caballeros:', err);
      setError('Error al cargar los datos. Verifica que el backend esté corriendo.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/api/caballeros`, formData);
      setShowForm(false);
      setFormData({
        nombre: '',
        edad: '',
        altura: '',
        constelacion: '',
        imagen_url: ''
      });
      fetchCaballeros();
    } catch (err) {
      alert('Error al crear caballero: ' + (err.response?.data?.error || err.message));
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este caballero?')) {
      try {
        await axios.delete(`${API_URL}/api/caballeros/${id}`);
        fetchCaballeros();
      } catch (err) {
        alert('Error al eliminar caballero');
      }
    }
  };

  if (loading) {
    return (
      <div className="app">
        <div className="loading">Cargando Caballeros del Zodiaco... ⚡</div>
      </div>
    );
  }

  return (
    <div className="app">
      <header className="header">
        <h1>⚔️ Caballeros del Zodiaco 🦁</h1>
        <p>Los 12 caballeros dorados de Atena</p>
        <div className="header-buttons">
          <button 
            className="btn btn-primary" 
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? '❌ Cancelar' : '➕ Agregar Caballero'}
          </button>
          <button className="btn btn-secondary" onClick={fetchCaballeros}>
            🔄 Actualizar
          </button>
        </div>
      </header>

      {error && (
        <div className="error-message">
          ⚠️ {error}
          <div className="error-hint">
            Asegúrate de que el backend esté corriendo en {API_URL}
          </div>
        </div>
      )}

      {showForm && (
        <div className="form-container">
          <h2>Nuevo Caballero</h2>
          <form onSubmit={handleSubmit} className="form">
            <input
              type="text"
              placeholder="Nombre *"
              value={formData.nombre}
              onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
              required
            />
            <input
              type="number"
              placeholder="Edad"
              value={formData.edad}
              onChange={(e) => setFormData({ ...formData, edad: e.target.value })}
            />
            <input
              type="number"
              step="0.1"
              placeholder="Altura (cm)"
              value={formData.altura}
              onChange={(e) => setFormData({ ...formData, altura: e.target.value })}
            />
            <input
              type="text"
              placeholder="Constelación"
              value={formData.constelacion}
              onChange={(e) => setFormData({ ...formData, constelacion: e.target.value })}
            />
            <input
              type="url"
              placeholder="URL de Imagen *"
              value={formData.imagen_url}
              onChange={(e) => setFormData({ ...formData, imagen_url: e.target.value })}
              required
            />
            <button type="submit" className="btn btn-primary">
              ✅ Guardar Caballero
            </button>
          </form>
        </div>
      )}

      <div className="stats">
        <div className="stat-card">
          <span className="stat-number">{caballeros.length}</span>
          <span className="stat-label">Caballeros</span>
        </div>
        <div className="stat-card">
          <span className="stat-number">
            {caballeros.filter(c => c.edad).length}
          </span>
          <span className="stat-label">Con Edad</span>
        </div>
        <div className="stat-card">
          <span className="stat-number">
            {[...new Set(caballeros.map(c => c.constelacion).filter(Boolean))].length}
          </span>
          <span className="stat-label">Constelaciones</span>
        </div>
      </div>

      <div className="caballeros-grid">
        {caballeros.map((caballero) => (
          <div key={caballero.id} className="caballero-card">
            <div className="caballero-image-container">
              <img 
                src={caballero.imagen_url} 
                alt={caballero.nombre}
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/300x400?text=' + encodeURIComponent(caballero.nombre);
                }}
              />
            </div>
            <div className="caballero-info">
              <h3>{caballero.nombre}</h3>
              {caballero.constelacion && (
                <p className="constelacion">⭐ {caballero.constelacion}</p>
              )}
              <div className="caballero-details">
                {caballero.edad && (
                  <span className="detail">🎂 {caballero.edad} años</span>
                )}
                {caballero.altura && (
                  <span className="detail">📏 {caballero.altura} cm</span>
                )}
              </div>
              <button 
                className="btn btn-danger btn-small"
                onClick={() => handleDelete(caballero.id)}
              >
                🗑️ Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>

      <footer className="footer">
        <p>Total: {caballeros.length} Caballeros ⚔️</p>
        <p className="footer-link">
          📚 <a href={`${API_URL}/api-docs`} target="_blank" rel="noopener noreferrer">
            Ver Documentación Swagger
          </a>
        </p>
      </footer>
    </div>
  );
}

export default App;

