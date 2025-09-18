import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Header = () => {
  const { user, logout, isAuthenticated } = useAuth();

  return (
    <header style={{ background: '#f0f0f0', padding: '15px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
      <h3><Link to="/" style={{ textDecoration: 'none', color: '#333' }}>Kodigo Bootcamps</Link></h3>
      <nav style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
        {isAuthenticated ? (
          <>
            <span style={{ marginRight: '15px' }}>Hola, {user.username}</span>
            <Link to="/dashboard" style={{ textDecoration: 'none', color: '#4facfe' }}>Dashboard</Link>
            <button onClick={logout} style={{ padding: '5px 10px', background: '#ff4d4d', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
              Cerrar Sesión
            </button>
          </>
        ) : (
          <>
            <Link to="/register" style={{ textDecoration: 'none', color: '#4facfe' }}>Registrarse</Link>
            <Link to="/login" style={{ textDecoration: 'none', color: '#4facfe' }}>Iniciar Sesión</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;