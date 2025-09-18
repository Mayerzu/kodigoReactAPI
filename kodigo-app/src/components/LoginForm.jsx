import React from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { login: loginUser } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const result = await loginUser(data.username, data.password);
    if (result.success) {
      alert('Login exitoso!');
      navigate('/');
    } else {
      alert(result.error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div style={{ marginBottom: '15px' }}>
        <label>Username:</label>
        <input
          {...register('username', { required: 'Username es requerido' })}
          type="text"
          style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
        />
        {errors.username && <p style={{ color: 'red' }}>{errors.username.message}</p>}
      </div>
      <div style={{ marginBottom: '15px' }}>
        <label>Password:</label>
        <input
          {...register('password', { required: 'Password es requerido' })}
          type="password"
          style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
        />
        {errors.password && <p style={{ color: 'red' }}>{errors.password.message}</p>}
      </div>
      <button type="submit" style={{ width: '100%', padding: '10px', background: '#4facfe', color: 'white', border: 'none', borderRadius: '4px' }}>
        Iniciar Sesión
      </button>
    </form>
  );
};

export default LoginForm;