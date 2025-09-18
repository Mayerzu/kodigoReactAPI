import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";
import BootcampCard from "./BootcampCard";
import LoadingSpinner from "./LoadingSpinner";

const staticBootcamps = [
  {
    id: 1,
    name: "Java Developer",
    description:
      "Aprende Java desde cero hasta un nivel avanzado, incluyendo el desarrollo de aplicaciones backend robustas.",
    technologies: ["Java", "Spring Boot", "MySQL"],
    active: true,
  },
  {
    id: 2,
    name: "Fullstack Jr",
    description:
      "Curso orientado a aprender desarrollo Fullstack con ReactJS, Laravel y MySQL.",
    technologies: ["ReactJS", "Laravel", "MySQL"],
    active: true,
  },
  {
    id: 3,
    name: "Data Analytics",
    description:
      "Curso de análisis de datos con enfoque en Python, PowerBI y R para generar insights y visualización de datos.",
    technologies: ["Python", "PowerBI", "R"],
    active: true,
  },
];

const LandingPage = () => {
  const { isAuthenticated } = useAuth();
  const [bootcamps, setBootcamps] = useState([]);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    if (isAuthenticated) {
      setLoading(true);
      const token = localStorage.getItem("token");
      axios
        .get("http://localhost:3000/api/auth/bootcamps/all", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setBootcamps(response.data.filter((b) => b.active));
        })
        .catch((error) => console.error("Error fetching bootcamps:", error))
        .finally(() => setLoading(false));
    } else {
      setBootcamps(staticBootcamps.filter((b) => b.active));
    }
  }, [isAuthenticated]);

  return (
    <div className="landing">

      <header className="hero">
  <div className="hero-content">

    <div className="hero-text">
      <h1 className="hero-title">
        Transforma tu <span className="highlight">Carrera Tech</span>
      </h1>
      <p className="hero-subtitle">
        Aprende las tecnologías más demandadas del mercado con nuestros
        bootcamps intensivos. De cero a desarrollador en meses, no años.
      </p>
      {!isAuthenticated && (
        <div className="hero-actions">
          <Link to="/register" className="btn btn-primary">
            Comenzar Ahora →
          </Link>
          <Link to="/login" className="btn btn-ghost">
            Inicia Sesión
          </Link>
        </div>
      )}
    </div>

    {/* Columna derecha: Imagen */}
    <div className="hero-image">
      <img
        src="https://plink.solutions/wp-content/uploads/JAVA-DEV.webp"
        alt="Bootcamp coding"
      />
    </div>
  </div>
</header>


      {/* ===== Estadísticas ===== */}
      <section className="stats-section">
        <div className="stat-card">
          <h3>3,750+</h3>
          <p>Estudiantes Graduados</p>
        </div>
        <div className="stat-card">
          <h3>92%</h3>
          <p>Tasa de Empleabilidad</p>
        </div>
        <div className="stat-card">
          <h3>10,000+++</h3>
          <p>Proyectos Completados</p>
        </div>
        <div className="stat-card">
          <h3>4.9/5</h3>
          <p>Calificación Promedio</p>
        </div>
      </section>


      <section className="why-section">
        <h2 className="section-title">¿Por qué elegirnos?</h2>
        <p className="why-subtitle">
          Nuestra metodología probada ha ayudado a miles de estudiantes a
          conseguir trabajos en tecnología en tiempo récord.
        </p>

        <div className="why-grid">
          <div className="why-card">
            <h3>⚡ Aprendizaje Acelerado</h3>
            <img src="https://www.cinconoticias.com/wp-content/uploads/aprendizaje-acelerado.jpg" alt="Aprendizaje Acelerado" />
            <p>
              Metodología intensiva diseñada para maximizar tu aprendizaje en el
              menor tiempo posible.
            </p>
          </div>
          <div className="why-card">
            <h3>🛠️ Enfoque Práctico</h3>
            <img src="https://i.pinimg.com/736x/28/ee/1e/28ee1ef707b6d762a9815138328719f1.jpg" alt="Enfoque Práctico" />
            <p>
              Proyectos reales desde el primer día. Construye un portafolio
              mientras aprendes.
            </p>
          </div>
          <div className="why-card">
            <h3>👩‍🏫 Mentorías Personalizadas</h3>
            <img src="https://i.pinimg.com/736x/c8/80/70/c88070a5fa7d478a6f1d8f3dbe0556c9.jpg" alt="Mentorías Personalizadas" />
            <p>
              Acompañamiento 1:1 con desarrolladores senior de la industria.
            </p>
          </div>
          <div className="why-card">
            <h3>🎓 Certificación Reconocida</h3>
            <img src="https://i.pinimg.com/736x/87/4d/fb/874dfbdf19e564c1b381388e50c46c35.jpg" alt="Certificación Reconocida" />
            <p>
              Certificados avalados por empresas líderes en tecnología.
            </p>
          </div>
        </div>
      </section>

      {/* ===== Bootcamps ===== */}
      <section className="bootcamps-section">
        <h2 className="section-title">Nuestros Bootcamps</h2>
        {loading ? (
          <LoadingSpinner />
        ) : (
          <div className="bootcamps-grid">
            {bootcamps.map((bootcamp) => (
              <BootcampCard key={bootcamp.id} bootcamp={bootcamp} />
            ))}
          </div>
        )}
        {isAuthenticated && (
          <Link to="/dashboard" className="btn btn-primary dashboard-link">
            Ver Dashboard →
          </Link>
        )}
      </section>


      <footer className="footer">
        <p>
          &copy; {new Date().getFullYear()} Kodigo Bootcamps. Todos los derechos
          reservados.
        </p>
      </footer>
    </div>
  );
};

export default LandingPage;
