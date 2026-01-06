import React from 'react';
import { useNavigate } from 'react-router-dom'; // 1. Import the hook
import Header from '../components/Header';
import '../App.css';

const CorteUnhas = () => {
  const navigate = useNavigate(); // 2. Initialize the function
  return (
    <>
      <Header />
      <div className="service-detail-container">
        <div className="service-image-col">
           <img src="/images/pet_unha_1.jpg" />
        </div>
        
        <div className="service-info">
          <button className="back-btn" onClick={() => navigate('/')}>
            <i className="fas fa-arrow-left"></i> Voltar para o Início
          </button>
          <h1>Corte de Unhas</h1>
          <p>O corte regular das unhas evita problemas na locomoção e arranhões indesejados. Procedimento rápido, seguro e sem estresse para o animal.</p>
          
          <div className="service-price-list">
            <div className="price-row"><span>Corte de Unhas (Cães)</span> <strong>R$ 20,00</strong></div>
            <div className="price-row"><span>Corte de Unhas (Gatos)</span> <strong>R$ 25,00</strong></div>
            <div className="price-row"><span>Combo (Banho + Unhas)</span> <strong>Grátis no banho</strong></div>
          </div>

          <button className="service-btn" style={{width:'100%', padding: '15px'}}>Agendar Horário</button>
        </div>
      </div>
    </>
  );
};

export default CorteUnhas;