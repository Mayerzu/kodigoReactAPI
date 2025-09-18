import React from 'react';
import Header from '../components/Header';
import LoginForm from '../components/LoginForm';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div>
      <Header />
      <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px' }}>
        <h2>Iniciar Sesión</h2>
        <LoginForm />
        <p style={{ textAlign: 'center', marginTop: '20px' }}>
          ¿No tienes cuenta? <Link to="/register">Regístrate</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;