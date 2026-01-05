import React from 'react';
import Header from '../components/Header'; // Reusing your existing header
import '../App.css'; // Ensure styles are available

const Login = () => {
  return (
    <>
      <Header />
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
      </div>
    </>
  );
};

export default Login;