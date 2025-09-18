import React from 'react';
import Header from '../components/Header';
import RegisterForm from '../components/RegisterForm';
import { Link } from 'react-router-dom';

const Register = () => {
  return (
    <div>
      <Header />
      <div className="auth-container">
        <h2 className="auth-title">Crear Nuevo Usuario</h2>
        <RegisterForm />
        <p className="auth-link-text">
          ¿Ya tienes cuenta?{" "}
          <Link to="/login" className="auth-link">
            Inicia sesión
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;