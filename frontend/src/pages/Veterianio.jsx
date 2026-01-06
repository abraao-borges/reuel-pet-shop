import React from 'react';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom'; // 1. Import the hook
import '../App.css';

const Veterinario = () => {
  const navigate = useNavigate(); // 2. Initialize the function
  return (
    <>
      <Header />
      <div className="service-detail-container">
        <div className="service-info">
          <button className="back-btn" onClick={() => navigate('/')}>
            <i className="fas fa-arrow-left"></i> Voltar para o Início
          </button>
          <h1>Clínica Veterinária</h1>
          <p>Nossa equipe de veterinários está pronta para atender seu pet com todo carinho e profissionalismo. Realizamos consultas, exames e vacinação.</p>
          
          <div className="service-price-list">
            <h3>Serviços Médicos</h3>
            <div className="price-row"><span>Consulta Geral</span> <strong>R$ 120,00</strong></div>
            <div className="price-row"><span>Consulta Especialista</span> <strong>R$ 180,00</strong></div>
            <div className="price-row"><span>Vacina V10 / V8</span> <strong>R$ 90,00</strong></div>
            <div className="price-row"><span>Vacina Antirrábica</span> <strong>R$ 60,00</strong></div>
            <div className="price-row"><span>Microchipagem</span> <strong>R$ 150,00</strong></div>
          </div>

          <button className="service-btn" style={{background:'#d32f2f', width:'100%', padding: '15px'}}>
            <i className="fas fa-ambulance"></i> Plantão de Emergência (Ligar)
          </button>
        </div>

        <div className="service-image-col">
           <img src="https://img.freepik.com/free-photo/veterinarian-checking-dog-medium-shot_23-2149143871.jpg?w=740" alt="Veterinário" className="service-image-large" />
        </div>
      </div>
    </>
  );
};

export default Veterinario;