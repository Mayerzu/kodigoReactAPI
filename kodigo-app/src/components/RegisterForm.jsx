import React from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const result = await registerUser(data.username, data.password);
    if (result.success) {
      alert('Usuario registrado exitosamente. Por favor, inicia sesión.');
      reset();
      navigate('/login');
    } else {
      alert(result.error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div style={{ marginBottom: '15px' }}>
        <label>Username:</label>
        <input
          {...register('username', { required: 'Username es requerido', minLength: { value: 3, message: 'Mínimo 3 caracteres' } })}
          type="text"
          style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
        />
        {errors.username && <p style={{ color: 'red' }}>{errors.username.message}</p>}
      </div>
      <div style={{ marginBottom: '15px' }}>
        <label>Password:</label>
        <input
          {...register('password', { required: 'Password es requerido', minLength: { value: 6, message: 'Mínimo 6 caracteres' } })}
          type="password"
          style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
        />
        {errors.password && <p style={{ color: 'red' }}>{errors.password.message}</p>}
      </div>
      <button type="submit" style={{ width: '100%', padding: '10px', background: '#4facfe', color: 'white', border: 'none', borderRadius: '4px' }}>
        Registrarse
      </button>
    </form>
  );
};

export default RegisterForm;