import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const joinUrl = (base, path) => {
  if (!base || base === '/') return path;
  return `${base.replace(/\/$/, '')}${path}`;
};

const getCaballerosApiBase = () => {
  if (process.env.NODE_ENV === 'production') {
    return '';
  }
  return process.env.REACT_APP_API_URL || 'http://localhost:3000';
};

const getHuntersApiBase = () => {
  if (process.env.NODE_ENV === 'production') {
    return '/api-hxh';
  }
  return process.env.REACT_APP_HXH_API_URL || 'http://localhost:8000/api-hxh';
};

const CAB_API_BASE = getCaballerosApiBase();
const HUNTER_API_BASE = getHuntersApiBase();

const PROJECTS = {
  caballeros: {
    label: 'Caballeros del Zodiaco',
    description: 'Los 12 caballeros dorados de Atena',
    loadingText: 'Cargando Caballeros del Zodiaco... ⚡',
    docsUrl: joinUrl(CAB_API_BASE, '/api-docs'),
  },
  hunters: {
    label: 'Hunter x Hunter',
    description: 'Cazadores licenciados por la Asociación',
    loadingText: 'Cargando Cazadores de Hunter x Hunter... 🐜',
    docsUrl: joinUrl(HUNTER_API_BASE, '/docs'),
  },
};

function App() {
  const [activeProject, setActiveProject] = useState('caballeros');
  const [caballeros, setCaballeros] = useState([]);
  const [hunters, setHunters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showHunterForm, setShowHunterForm] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    edad: '',
    altura: '',
    constelacion: '',
    imagen_url: '',
  });
  const [hunterForm, setHunterForm] = useState({
    nombre: '',
    edad: '',
    nen_tipo: '',
    afiliacion: '',
    imagen_url: '',
  });

  useEffect(() => {
    if (activeProject === 'caballeros') {
      fetchCaballeros();
    } else {
      fetchHunters();
    }
  }, [activeProject]);

  const fetchCaballeros = async () => {
    try {
      setLoading(true);
      const response = await axios.get(joinUrl(CAB_API_BASE, '/api/caballeros'));
      setCaballeros(response.data.caballeros);
      setError(null);
    } catch (err) {
      console.error('Error fetching caballeros:', err);
      setError('Error al cargar los Caballeros. Verifica el backend de Node.js.');
    } finally {
      setLoading(false);
    }
  };

  const fetchHunters = async () => {
    try {
      setLoading(true);
      const response = await axios.get(joinUrl(HUNTER_API_BASE, '/hunters'));
      setHunters(response.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching hunters:', err);
      setError('Error al cargar los Cazadores. Verifica el backend de Hunter x Hunter.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(joinUrl(CAB_API_BASE, '/api/caballeros'), formData);
      setShowForm(false);
      setFormData({
        nombre: '',
        edad: '',
        altura: '',
        constelacion: '',
        imagen_url: '',
      });
      fetchCaballeros();
    } catch (err) {
      alert('Error al crear caballero: ' + (err.response?.data?.error || err.message));
    }
  };

  const handleHunterSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(joinUrl(HUNTER_API_BASE, '/hunters'), {
        ...hunterForm,
        edad: hunterForm.edad ? Number(hunterForm.edad) : undefined,
      });
      setShowHunterForm(false);
      setHunterForm({
        nombre: '',
        edad: '',
        nen_tipo: '',
        afiliacion: '',
        imagen_url: '',
      });
      fetchHunters();
    } catch (err) {
      alert('Error al crear cazador: ' + (err.response?.data?.detail || err.message));
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este caballero?')) {
      try {
        await axios.delete(joinUrl(CAB_API_BASE, `/api/caballeros/${id}`));
        fetchCaballeros();
      } catch (err) {
        alert('Error al eliminar caballero');
      }
    }
  };

  const handleHunterDelete = async (id) => {
    if (window.confirm('¿Eliminar este cazador?')) {
      try {
        await axios.delete(joinUrl(HUNTER_API_BASE, `/hunters/${id}`));
        fetchHunters();
      } catch (err) {
        alert('Error al eliminar cazador');
      }
    }
  };

  const handleProjectChange = (project) => {
    setActiveProject(project);
    setShowForm(false);
    setShowHunterForm(false);
    setError(null);
    setLoading(true);
  };

  const renderCaballerosView = () => (
    <>
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
    </>
  );

  const renderHuntersView = () => (
    <>
      <header className="header hunters-header">
        <h1>🪙 Hunter x Hunter 🐜</h1>
        <p>Cazadores licenciados por la Asociación</p>
        <div className="header-buttons">
          <button
            className="btn btn-primary"
            onClick={() => setShowHunterForm(!showHunterForm)}
          >
            {showHunterForm ? '❌ Cancelar' : '➕ Agregar Cazador'}
          </button>
          <button className="btn btn-secondary" onClick={fetchHunters}>
            🔄 Actualizar
          </button>
        </div>
      </header>

      {error && (
        <div className="error-message">
          ⚠️ {error}
        </div>
      )}

      {showHunterForm && (
        <div className="form-container">
          <h2>Nuevo Cazador</h2>
          <form onSubmit={handleHunterSubmit} className="form">
            <input
              type="text"
              placeholder="Nombre *"
              value={hunterForm.nombre}
              onChange={(e) => setHunterForm({ ...hunterForm, nombre: e.target.value })}
              required
            />
            <input
              type="number"
              placeholder="Edad"
              value={hunterForm.edad}
              onChange={(e) => setHunterForm({ ...hunterForm, edad: e.target.value })}
            />
            <input
              type="text"
              placeholder="Tipo de Nen"
              value={hunterForm.nen_tipo}
              onChange={(e) => setHunterForm({ ...hunterForm, nen_tipo: e.target.value })}
            />
            <input
              type="text"
              placeholder="Afiliación"
              value={hunterForm.afiliacion}
              onChange={(e) => setHunterForm({ ...hunterForm, afiliacion: e.target.value })}
            />
            <input
              type="url"
              placeholder="URL de Imagen *"
              value={hunterForm.imagen_url}
              onChange={(e) => setHunterForm({ ...hunterForm, imagen_url: e.target.value })}
              required
            />
            <button type="submit" className="btn btn-primary">
              ✅ Guardar Cazador
            </button>
          </form>
        </div>
      )}

      <div className="stats">
        <div className="stat-card">
          <span className="stat-number">{hunters.length}</span>
          <span className="stat-label">Cazadores</span>
        </div>
        <div className="stat-card">
          <span className="stat-number">
            {[...new Set(hunters.map(h => h.nen_tipo).filter(Boolean))].length}
          </span>
          <span className="stat-label">Tipos de Nen</span>
        </div>
        <div className="stat-card">
          <span className="stat-number">
            {[...new Set(hunters.map(h => h.afiliacion).filter(Boolean))].length}
          </span>
          <span className="stat-label">Afiliaciones</span>
        </div>
      </div>

      <div className="hunters-grid">
        {hunters.map((hunter) => (
          <div key={hunter._id} className="hunter-card">
            <div className="hunter-image-container">
              <img
                src={hunter.imagen_url}
                alt={hunter.nombre}
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/300x400?text=' + encodeURIComponent(hunter.nombre);
                }}
              />
            </div>
            <div className="hunter-info">
              <h3>{hunter.nombre}</h3>
              <div className="hunter-details">
                {hunter.nen_tipo && <span className="detail">✨ Nen: {hunter.nen_tipo}</span>}
                {hunter.afiliacion && <span className="detail">🏛️ {hunter.afiliacion}</span>}
                {hunter.edad && <span className="detail">🎂 {hunter.edad} años</span>}
              </div>
              <button
                className="btn btn-danger btn-small"
                onClick={() => handleHunterDelete(hunter._id)}
              >
                🗑️ Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );

  if (loading) {
    return (
      <div className="app">
        <div className="loading">{PROJECTS[activeProject].loadingText}</div>
      </div>
    );
  }

  return (
    <div className="app">
      <div className="project-switch">
        {Object.entries(PROJECTS).map(([key, project]) => (
          <button
            key={key}
            className={`project-btn ${activeProject === key ? 'active' : ''}`}
            onClick={() => handleProjectChange(key)}
          >
            {project.label}
          </button>
        ))}
      </div>

      {activeProject === 'caballeros' ? renderCaballerosView() : renderHuntersView()}

      <footer className="footer">
        <p>
          {activeProject === 'caballeros'
            ? `Total: ${caballeros.length} Caballeros ⚔️`
            : `Total: ${hunters.length} Cazadores 🪙`}
        </p>
        <p className="footer-link">
          📚{' '}
          <a
            href={PROJECTS[activeProject].docsUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Ver Swagger de {PROJECTS[activeProject].label}
          </a>
        </p>
      </footer>
    </div>
  );
}

export default App;

