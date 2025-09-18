import React from 'react';
import Header from '../components/Header';
import RegisterForm from '../components/RegisterForm';
import { Link } from 'react-router-dom';

const Register = () => {
  return (
    <div>
      <Header />
      <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px' }}>
        <h2>Crear Nuevo Usuario</h2>
        <RegisterForm />
        <p style={{ textAlign: 'center', marginTop: '20px' }}>
          ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;