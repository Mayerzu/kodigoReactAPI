import React from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from './LoadingSpinner';

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
    <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
      <div className="form-group">
        <label>Usuario</label>
        <input
          {...register('username', {
            required: 'El nombre de usuario es requerido',
            minLength: { value: 3, message: 'Mínimo 3 caracteres' }
          })}
          type="text"
          placeholder="Tu usuario"
        />
        {errors.username && <p className="form-error">{errors.username.message}</p>}
      </div>

      <div className="form-group">
        <label>Contraseña</label>
        <input
          {...register('password', {
            required: 'La contraseña es requerida',
            minLength: { value: 6, message: 'Mínimo 6 caracteres' }
          })}
          type="password"
          placeholder="••••••••"
        />
        {errors.password && <p className="form-error">{errors.password.message}</p>}
      </div>

      <button type="submit" className="btn btn-primary">
        Registrarse
      </button>
    </form>
  );
};

export default RegisterForm;
