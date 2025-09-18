import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import { Navigate, Link } from 'react-router-dom';
import Header from '../components/Header';
import BootcampCard from '../components/BootcampCard';
import LoadingSpinner from '../components/LoadingSpinner';

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

  return (
    <div>
      <Header />
      <div className="dashboard-container">
        <h2 className="dashboard-title">Bienvenido, {user?.username} 🚀</h2>
        <h3 className="dashboard-subtitle">Bootcamps Disponibles</h3>

        {loading ? (
          <LoadingSpinner />
        ) : (
          <div className="bootcamp-grid">
            {bootcamps.length > 0 ? (
              bootcamps.map(bootcamp => (
                <BootcampCard key={bootcamp.id} bootcamp={bootcamp} />
              ))
            ) : (
              <p className="no-data">No hay bootcamps disponibles en este momento.</p>
            )}
          </div>
        )}

        <Link to="/" className="btn btn-primary back-home">
          Volver al Inicio
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
