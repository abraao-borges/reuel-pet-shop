import React from 'react';

const ServiceCard = ({ title, description, icon }) => {
  return (
    <div className="service-card">
      <div className="service-icon">
        <i className={icon}></i>
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
      <button className="service-btn">Agendar</button>
    </div>
  );
};

export default ServiceCard;