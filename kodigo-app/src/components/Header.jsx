import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Header() {
  const { user, logout, isAuthenticated } = useAuth();

  return (
    <header className="header" role="banner" aria-label="Main header">
      <div className="header-inner">
        
        {/* Brand */}
        <div className="brand">
          <Link to="/" className="brand-link" aria-label="Kodigo home">
            <div className="brand-logo">K</div>
            <span className="brand-name">Kodigo</span>
          </Link>
        </div>
        
        {/* Center Navigation */}
        <nav className="nav-center" aria-label="Main navigation">
          <Link to="/" className="nav-item">Inicio</Link>
        </nav>

        {/* Right Actions */}
        <div className="nav-actions">
          {isAuthenticated ? (
            <>
              <div className="header-user" aria-hidden>
                Hola, <strong>{user?.username ?? user?.name}</strong>
              </div>
              <button className="btn btn-danger" onClick={logout} aria-label="Cerrar sesión">
                Cerrar Sesión
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-ghost" aria-label="Iniciar sesión">
                Iniciar Sesión
              </Link>
              <Link to="/register" className="btn btn-primary" aria-label="Registrarse">
                Registrarse
              </Link>
            </>
          )}
        </div>

      </div>
    </header>
  );
}
