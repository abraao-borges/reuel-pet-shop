import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'; // 1. Import the hook
import Header from '../components/Header';
import { fetchOrders } from '../api/ordersApi';
import '../App.css';

const Orders = () => {
  const navigate = useNavigate(); // 2. Initialize the function
  const [openOrderIds, setOpenOrderIds] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders()
      .then((data) => {
        setOrders(data || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Failed to load orders:', error);
        setOrders([]);
        setLoading(false);
      });
  }, []);

  const toggleOrderDetails = (orderId) => {
    setOpenOrderIds((prev) =>
      prev.includes(orderId)
        ? prev.filter((id) => id !== orderId)
        : [...prev, orderId],
    );
  };

  const handleBuyAgain = () => {
    navigate('/');
  };
  // Helper to determine status color
  const getStatusClass = (status) => {
    switch (status) {
      case 'DELIVERED': return 'status-delivered';
      case 'IN_TRANSIT': return 'status-transit';
      case 'CANCELED': return 'status-cancelled';
      default: return '';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'CREATED': return 'Criado';
      case 'PREPARING': return 'Preparando';
      case 'IN_TRANSIT': return 'Em Trânsito';
      case 'DELIVERED': return 'Entregue';
      case 'CANCELED': return 'Cancelado';
      default: return status;
    }
  };

  const formatDate = (value) => {
    if (!value) return '';
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return value;
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  if (loading) {
    return (
      <>
        <Header />
        <div className="page-container">
          <div className="orders-wrapper">
            <h2 className="section-title">Meus Pedidos</h2>
            <p>Carregando pedidos...</p>
          </div>
        </div>
      </>
    );
  }

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
                      <span className="order-date">{formatDate(order.createdAt)}</span>
                    </div>
                    <span className={`order-status ${getStatusClass(order.status)}`}>
                      {getStatusLabel(order.status)}
                    </span>
                  </div>

                  <div className="order-items">
                    <div className="order-item-row">
                      <div className="order-item-details">
                        <h4>{order.customerName || 'Cliente'}</h4>
                        <p>Status atual: {getStatusLabel(order.status)}</p>
                      </div>
                    </div>
                  </div>

                  <hr className="divider" />

                  {/* Order Footer */}
                  <div className="order-footer">
                    <div className="order-total">
                      <span>Total:</span>
                      <strong>R$ {Number(order.totalAmount || 0).toFixed(2)}</strong>
                    </div>
                    <div className="order-actions">
                      <button
                        className="secondary-btn"
                        onClick={() => toggleOrderDetails(order.id)}
                      >
                        {openOrderIds.includes(order.id) ? 'Ocultar' : 'Detalhes'}
                      </button>
                      <button className="primary-btn" onClick={handleBuyAgain}>
                        <i className="fas fa-redo"></i> Comprar Novamente
                      </button>
                    </div>
                  </div>

                  {openOrderIds.includes(order.id) && (
                    <div className="order-extra-details">
                      <p><strong>Código:</strong> {order.orderCode}</p>
                      <p><strong>Data do pedido:</strong> {formatDate(order.createdAt)}</p>
                    </div>
                  )}

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