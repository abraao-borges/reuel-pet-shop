import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import the hook

const Header = () => {
  const navigate = useNavigate(); // Initialize the hook

  return (
    <header className="header">
      <div className="header-container">
        {/* Logo (Clicking logo goes home) */}
        <a onClick={() => navigate('/')} className="logo" style={{cursor: 'pointer'}}>
          <img src="/images/reuel_pet_shop_logo_no_background.png" alt="Reuel" />
        </a>
        
        <div className="search-bar">
          <input type="text" placeholder="O que seu pet precisa hoje?" />
          <button aria-label="Search"><i className="fas fa-search"></i></button>
        </div>

        <div className="user-actions">
          {/* Add onClick event to navigate to login */}
          <div className="user-action-item" onClick={() => navigate('/login')}>
            <i className="fas fa-user-circle"></i>
            <span>Entrar</span>
          </div>
          
          <div className="user-action-item">
            <i className="fas fa-box"></i>
            <span>Pedidos</span>
          </div>
          <div className="user-action-item" onClick={() => navigate('/cart')}>
            <i className="fas fa-shopping-cart"></i>
            <span>Carrinho</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;