import React from 'react';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const Login = () => {
  const navigate = useNavigate();

  return (
    <>
      <Header />
      {/* Container starts here */}
      <div className="login-container">
        
        <div className="login-card">
          <h2 className="login-title">Acesse sua conta</h2>
          <p className="login-subtitle">Bem-vindo de volta à Reuel Pet Shop!</p>
          
          <form className="login-form">
            <div className="form-group">
              <label htmlFor="email">E-mail</label>
              <input type="email" id="email" placeholder="Digite seu e-mail" />
            </div>
            
            <div className="form-group">
              <label htmlFor="password">Senha</label>
              <input type="password" id="password" placeholder="Digite sua senha" />
            </div>

            <button type="submit" className="login-btn">Entrar</button>
          </form>

          <div className="login-footer">
            <a href="#">Esqueci minha senha</a>
            <p>Ainda não tem conta? <a href="#">Cadastre-se</a></p>
          </div>
        </div>

        {/* MOVED: Button is now INSIDE the container so it stays near the card */}
        <div className="back-button-container" style={{ marginTop: '20px', marginBottom: '0' }}>
          <button className="back-btn" onClick={() => navigate('/')}>
            <i className="fas fa-arrow-left"></i> Voltar para o Início
          </button>
        </div>

      </div> {/* Container ends here */}
    </>
  );
};

export default Login;