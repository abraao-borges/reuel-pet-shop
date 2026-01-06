import React from 'react';
import { useNavigate } from 'react-router-dom'; // 1. Import the hook
import Header from '../components/Header';
import '../App.css';

const BanhoTosa = () => {
  const navigate = useNavigate(); // 2. Initialize the function

  return (
    <>
      <Header />
      <div className="service-detail-container">
        <div className="service-image-col">
          <img 
            src="/images/pet_banho_1.jpg" 
            alt="Banho e Tosa" 
            className="service-image-large with-padding" 
          />
        </div>
        
        <div className="service-info">
          {/* 3. Set the route to '/' for Home */}
          <button className="back-btn" onClick={() => navigate('/')}>
            <i className="fas fa-arrow-left"></i> Voltar para o Início
          </button>

          <h1>Banho e Tosa</h1>
          <p>Utilizamos produtos hipoalergênicos e toalhas esterilizadas. Seu pet sai daqui limpo, cheiroso e com o visual renovado!</p>
          
          <div className="service-price-list">
            <h3>Tabela de Preços</h3>
            <div className="price-row"><span>Banho (Pequeno Porte)</span> <strong>R$ 45,00</strong></div>
            <div className="price-row"><span>Banho (Médio Porte)</span> <strong>R$ 60,00</strong></div>
            <div className="price-row"><span>Banho + Tosa Higiênica</span> <strong>+ R$ 20,00</strong></div>
            <div className="price-row"><span>Tosa Completa (Tesoura/Máquina)</span> <strong>A partir de R$ 80,00</strong></div>
          </div>

          <div style={{display:'flex', gap:'15px'}}>
            <button className="service-btn" style={{flex:1, padding: '15px'}}>Agendar pelo WhatsApp</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default BanhoTosa;