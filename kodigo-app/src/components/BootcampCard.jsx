import React from 'react';

const BootcampCard = ({ bootcamp }) => {
  return (
    <div className="bootcamp-card">
      <h3>{bootcamp.name}</h3>
      <p>{bootcamp.description}</p>
      <ul className="tech-list">
        {bootcamp.technologies.map((tech) => (
          <li key={tech}>{tech}</li>
        ))}
      </ul>
    </div>
  );
};

export default BootcampCard;
