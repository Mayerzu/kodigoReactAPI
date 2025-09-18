import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import { Navigate, Link } from 'react-router-dom';
import Header from '../components/Header';

const Dashboard = () => {
  const { user, isAuthenticated } = useAuth();
  const [bootcamps, setBootcamps] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) return;

    const token = localStorage.getItem('token');
    axios.get('http://localhost:3000/api/auth/bootcamps/all', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(response => {
      setBootcamps(response.data.filter(b => b.active));
    })
    .catch(error => console.error('Error:', error))
    .finally(() => setLoading(false));
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (loading) return <p>Cargando dashboard...</p>;

  return (
    <div>
      <Header />
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
        <h2>Dashboard de {user?.username}</h2>
        <h3>Detalles de Bootcamps</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px' }}>
          {bootcamps.map(bootcamp => (
            <div key={bootcamp.id} style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '10px', width: '300px' }}>
              <h3>{bootcamp.name}</h3>
              <p>{bootcamp.description}</p>
              <ul>
                {bootcamp.technologies.map(tech => <li key={tech}>{tech}</li>)}
              </ul>
            </div>
          ))}
        </div>
        <Link to="/" style={{ display: 'block', margin: '20px auto', padding: '10px 20px', background: '#4facfe', color: 'white', textDecoration: 'none', borderRadius: '5px', width: '200px' }}>
          Volver a Inicio
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;