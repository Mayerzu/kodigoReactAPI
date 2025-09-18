import React from 'react';
import Header from '../components/Header';
import LoginForm from '../components/LoginForm';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div>
      <Header />
      <div className="auth-container">
        <h2 className="auth-title">Iniciar Sesión</h2>
        <LoginForm />
        <p className="auth-link-text">
          ¿No tienes cuenta?{" "}
          <Link to="/register" className="auth-link">
            Regístrate
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
