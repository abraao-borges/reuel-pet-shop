import React, { useState } from 'react';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom'; // 1. Import the hook
import '../App.css'; // Ensure global styles are applied

const Cart = () => {
  const navigate = useNavigate(); // 2. Initialize the function
  // Mock State for Cart Items
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      title: "Creme Dental Pet Clean 60g",
      price: 20.00,
      image: "/images/produto_higiene_1.jpg",
      quantity: 1
    },
    {
      id: 2,
      title: "Ração Golden Special 15kg",
      price: 149.90,
      image: "/images/produto_higiene_1.jpg", // Using placeholder
      quantity: 2
    }
  ]);

  // Handle Quantity Change
  const updateQuantity = (id, delta) => {
    setCartItems(cartItems.map(item => {
      if (item.id === id) {
        const newQuantity = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQuantity };
      }
      return item;
    }));
  };

  // Handle Remove Item
  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  // Calculations
  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const shipping = subtotal > 100 ? 0 : 15.00; // Free shipping over R$ 100
  const total = subtotal + shipping;

  return (
    <>
      <Header />
      <div className="cart-page">
        <h2 className="section-title">Meu Carrinho</h2>
        <button className="back-btn" onClick={() => navigate('/')}>
          <i className="fas fa-arrow-left"></i> Voltar para o Início
        </button>
        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <i className="fas fa-shopping-basket"></i>
            <p>Seu carrinho está vazio!</p>
            <button className="add-btn" style={{maxWidth: '200px'}}>Voltar a comprar</button>
          </div>
        ) : (
          <div className="cart-container">
            {/* Left: Product List */}
            <div className="cart-items">
              {cartItems.map(item => (
                <div key={item.id} className="cart-item">
                  <img src={item.image} alt={item.title} className="cart-item-image" />
                  
                  <div className="cart-item-info">
                    <h3>{item.title}</h3>
                    <p className="item-price">R$ {item.price.toFixed(2)}</p>
                  </div>

                  <div className="cart-controls">
                    <button onClick={() => updateQuantity(item.id, -1)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                  </div>

                  <div className="cart-item-total">
                    R$ {(item.price * item.quantity).toFixed(2)}
                  </div>

                  <button className="remove-btn" onClick={() => removeItem(item.id)}>
                    <i className="fas fa-trash"></i>
                  </button>
                </div>
              ))}
            </div>

            {/* Right: Summary */}
            <div className="cart-summary">
              <h3>Resumo do Pedido</h3>
              <div className="summary-row">
                <span>Subtotal</span>
                <span>R$ {subtotal.toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Frete</span>
                <span style={{color: shipping === 0 ? 'green' : '#333'}}>
                  {shipping === 0 ? 'Grátis' : `R$ ${shipping.toFixed(2)}`}
                </span>
              </div>
              <hr />
              <div className="summary-row total">
                <span>Total</span>
                <span>R$ {total.toFixed(2)}</span>
              </div>
              <button className="checkout-btn">Finalizar Compra</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;