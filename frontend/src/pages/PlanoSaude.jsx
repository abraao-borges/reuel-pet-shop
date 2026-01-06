import React from "react";
import { useNavigate } from "react-router-dom"; // 1. Added Import
import Header from "../components/Header";
import "../App.css";

const PlanoSaude = () => {
  const navigate = useNavigate(); // 2. Initialized Navigate

  return (
    <>
      <Header />
      <div className="pricing-header">
        <h2>Reuel Pet Club</h2>
        <p>Escolha o melhor plano de saúde para o seu melhor amigo.</p>
      </div>

      <div className="pricing-grid">
        {/* Basic Plan */}
        <div className="pricing-card">
          <span className="plan-name">Básico</span>
          <span className="plan-price">
            R$ 49<span>/mês</span>
          </span>
          <ul className="plan-features">
            <li>
              <i className="fas fa-check"></i> Consultas agendadas (2x/ano)
            </li>
            <li>
              <i className="fas fa-check"></i> Vacinação anual (V10 e Raiva)
            </li>
            <li>
              <i className="fas fa-check"></i> 10% de desconto em banhos
            </li>
            <li style={{ color: "#ccc" }}>
              <i className="fas fa-times" style={{ color: "#ccc" }}></i> Exames
              laboratoriais
            </li>
            <li style={{ color: "#ccc" }}>
              <i className="fas fa-times" style={{ color: "#ccc" }}></i>{" "}
              Urgência 24h
            </li>
          </ul>
          <button className="service-btn" style={{ width: "100%" }}>
            Assinar Básico
          </button>
        </div>

        {/* Featured Plan */}
        <div className="pricing-card featured">
          <div
            style={{
              position:'absolute', 
              top:0, 
              right:0, 
              background:'#ffd700', 
              color:'#000', 
              padding:'5px 15px', 
              fontSize:'12px', 
              fontWeight:'bold',
              borderTopRightRadius: '18px', // Matches card curve
              borderBottomLeftRadius: '12px'
            }}
          >
            POPULAR
          </div>
          <span className="plan-name">Gold</span>
          <span className="plan-price">
            R$ 99<span>/mês</span>
          </span>
          <ul className="plan-features">
            <li>
              <i className="fas fa-check"></i> Consultas ilimitadas (horário
              comercial)
            </li>
            <li>
              <i className="fas fa-check"></i> Todas as vacinas essenciais
            </li>
            <li>
              <i className="fas fa-check"></i> 20% de desconto em banho e tosa
            </li>
            <li>
              <i className="fas fa-check"></i> Exames de sangue simples
            </li>
            <li style={{ color: "rgba(255,255,255,0.5)" }}>
              <i
                className="fas fa-times"
                style={{ color: "rgba(255,255,255,0.5)" }}
              ></i>{" "}
              Cirurgias complexas
            </li>
          </ul>
          <button className="service-btn" style={{ width: "100%" }}>
            Assinar Gold
          </button>
        </div>

        {/* Premium Plan */}
        <div className="pricing-card">
          <span className="plan-name">Platinum VIP</span>
          <span className="plan-price">
            R$ 189<span>/mês</span>
          </span>
          <ul className="plan-features">
            <li>
              <i className="fas fa-check"></i> Consultas ilimitadas 24h
            </li>
            <li>
              <i className="fas fa-check"></i> Vacinas + Vermífugos inclusos
            </li>
            <li>
              <i className="fas fa-check"></i> Banho semanal grátis
            </li>
            <li>
              <i className="fas fa-check"></i> Cobertura total de exames
            </li>
            <li>
              <i className="fas fa-check"></i> Internação e cirurgias
            </li>
          </ul>
          <button className="service-btn" style={{ width: "100%" }}>
            Assinar VIP
          </button>
        </div>
      </div>

      {/* 3. Centered Button Container */}
      <div className="back-button-container">
        <button className="back-btn" onClick={() => navigate("/")}>
          <i className="fas fa-arrow-left"></i> Voltar para o Início
        </button>
      </div>
    </>
  );
};

export default PlanoSaude;
