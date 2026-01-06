import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'; // 1. Import the hook
import Header from '../components/Header';
import '../App.css';

const Orders = () => {
  const navigate = useNavigate(); // 2. Initialize the function
  // Mock Data for Orders
  const orders = [
    {
      id: "#98214",
      date: "04 Jan, 2026",
      status: "Em Trânsito",
      total: 189.80,
      paymentMethod: "Pix",
      items: [
        { name: "Ração Golden Special 15kg", image: "/images/racao_4.png", qty: 1, price: 149.90 },
        { name: "Brinquedo Mordedor", image: "/images/pet_toy_1.png", qty: 1, price: 39.90 }
      ]
    },
    {
      id: "#88102",
      date: "20 Dez, 2025",
      status: "Entregue",
      total: 39.90,
      paymentMethod: "Cartão de Crédito",
      items: [
        { name: "Tigela de Ração", image: "/images/pet-food-in-bowl-png.png", qty: 1, price: 39.90 }
      ]
    },
    {
      id: "#75001",
      date: "15 Nov, 2025",
      status: "Cancelado",
      total: 85.00,
      paymentMethod: "Boleto",
      items: [
        { name: "Shampoo Pet Clean", image: "/images/pet_higiene_1.jpg", qty: 2, price: 42.50 }
      ]
    }
  ];

  // Helper to determine status color
  const getStatusClass = (status) => {
    switch (status) {
      case 'Entregue': return 'status-delivered';
      case 'Em Trânsito': return 'status-transit';
      case 'Cancelado': return 'status-cancelled';
      default: return '';
    }
  };

  return (
    <>
      <Header />
      <div className="page-container">
        <div className="orders-wrapper">
          <h2 className="section-title">Meus Pedidos</h2>
          <button className="back-btn" onClick={() => navigate('/')}>
            <i className="fas fa-arrow-left"></i> Voltar para o Início
          </button>
          
          {orders.length === 0 ? (
            <div className="empty-state">
              <i className="fas fa-box-open"></i>
              <p>Você ainda não fez nenhum pedido.</p>
              <Link to="/" className="service-btn">Começar a comprar</Link>
            </div>
          ) : (
            <div className="orders-list">
              {orders.map((order) => (
                <div key={order.id} className="order-card">
                  
                  {/* Order Header */}
                  <div className="order-header">
                    <div>
                      <span className="order-id">Pedido {order.id}</span>
                      <span className="order-date">{order.date}</span>
                    </div>
                    <span className={`order-status ${getStatusClass(order.status)}`}>
                      {order.status}
                    </span>
                  </div>

                  {/* Order Items */}
                  <div className="order-items">
                    {order.items.map((item, index) => (
                      <div key={index} className="order-item-row">
                        <img src={item.image} alt={item.name} className="order-thumb" />
                        <div className="order-item-details">
                          <h4>{item.name}</h4>
                          <p>Qtd: {item.qty} x R$ {item.price.toFixed(2)}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <hr className="divider" />

                  {/* Order Footer */}
                  <div className="order-footer">
                    <div className="order-total">
                      <span>Total:</span>
                      <strong>R$ {order.total.toFixed(2)}</strong>
                    </div>
                    <div className="order-actions">
                      <button className="secondary-btn">Detalhes</button>
                      <button className="primary-btn">
                        <i className="fas fa-redo"></i> Comprar Novamente
                      </button>
                    </div>
                  </div>

                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Orders;