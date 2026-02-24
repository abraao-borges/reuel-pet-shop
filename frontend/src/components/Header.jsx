import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import the hook

const Header = ({ searchTerm = '', onSearchChange }) => {
  const navigate = useNavigate(); // Initialize the hook
  const [localSearch, setLocalSearch] = useState(searchTerm);

  useEffect(() => {
    setLocalSearch(searchTerm);
  }, [searchTerm]);

  const inputValue = onSearchChange ? searchTerm : localSearch;

  const handleSearchChange = (event) => {
    const value = event.target.value;
    if (onSearchChange) {
      onSearchChange(value);
      return;
    }

    setLocalSearch(value);
  };

  return (
    <header className="header">
      <div className="header-container">
        {/* Logo (Clicking logo goes home) */}
        <a onClick={() => navigate('/')} className="logo" style={{cursor: 'pointer'}}>
          <img src="/images/reuel_pet_shop_logo_no_background.png" alt="Reuel" />
        </a>
        
        <div className="search-bar">
          <input
            type="text"
            placeholder="O que seu pet precisa hoje?"
            value={inputValue}
            onChange={handleSearchChange}
          />
          <button aria-label="Search"><i className="fas fa-search"></i></button>
        </div>

        <div className="user-actions">
          <div className="user-action-item" onClick={() => navigate('/orders')}>
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