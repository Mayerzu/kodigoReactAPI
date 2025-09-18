import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';

const staticBootcamps = [
  {
    id: 1,
    name: "Java Developer",
    description: "Aprende Java desde cero hasta un nivel avanzado, incluyendo el desarrollo de aplicaciones backend robustas.",
    technologies: ["Java", "Spring Boot", "MySQL"],
    active: true
  },
  {
    id: 2,
    name: "Fullstack Jr",
    description: "Curso orientado a aprender desarrollo Fullstack con ReactJS, Laravel y MySQL.",
    technologies: ["ReactJS", "Laravel", "MySQL"],
    active: true
  },
  {
    id: 3,
    name: "Data Analytics",
    description: "Curso de análisis de datos con enfoque en Python, PowerBI y R para generar insights y visualización de datos.",
    technologies: ["Python", "PowerBI", "R"],
    active: true
  }
];

const LandingPage = () => {
  const { isAuthenticated } = useAuth();
  const [bootcamps, setBootcamps] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      setLoading(true);
      const token = localStorage.getItem('token');
      axios.get('http://localhost:3000/api/auth/bootcamps/all', {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(response => {
        setBootcamps(response.data.filter(b => b.active));
      })
      .catch(error => console.error('Error fetching bootcamps:', error))
      .finally(() => setLoading(false));
    } else {
      setBootcamps(staticBootcamps.filter(b => b.active));
    }
  }, [isAuthenticated]);

  return (
    <div style={{ fontFamily: 'Arial', maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      <header style={{ textAlign: 'center', background: 'linear-gradient(to right, #4facfe, #00f2fe)', color: 'white', padding: '50px 20px', borderRadius: '10px' }}>
        <h1>Bienvenido a Kodigo Bootcamps</h1>
        <p>Transforma tu carrera con nuestros bootcamps intensivos en programación y tecnología.</p>
        {!isAuthenticated && (
          <div>
            <Link to="/register" style={{ margin: '10px', padding: '10px 20px', background: 'white', color: '#4facfe', textDecoration: 'none', borderRadius: '5px' }}>Regístrate</Link>
            <Link to="/login" style={{ margin: '10px', padding: '10px 20px', background: 'white', color: '#4facfe', textDecoration: 'none', borderRadius: '5px' }}>Inicia Sesión</Link>
          </div>
        )}
      </header>

      <section style={{ padding: '40px 20px', textAlign: 'center' }}>
        <h2>Nuestros Bootcamps</h2>
        {loading ? (
          <p>Cargando bootcamps...</p>
        ) : (
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px' }}>
            {bootcamps.map(bootcamp => (
              <div key={bootcamp.id} style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '10px', width: '300px', background: '#fff', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
                <h3>{bootcamp.name}</h3>
                <p>{bootcamp.description}</p>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {bootcamp.technologies.map(tech => (
                    <li key={tech} style={{ margin: '5px 0' }}>• {tech}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
        {isAuthenticated && <Link to="/dashboard" style={{ display: 'block', margin: '20px auto', padding: '10px 20px', background: '#4facfe', color: 'white', textDecoration: 'none', borderRadius: '5px', width: '200px' }}>Ver Dashboard</Link>}
      </section>

      <footer style={{ textAlign: 'center', padding: '20px', background: '#f0f0f0' }}>
        <p>&copy; 2025 Kodigo Bootcamps. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};

export default LandingPage;