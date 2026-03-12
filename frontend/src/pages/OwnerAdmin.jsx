import React, { useEffect, useMemo, useState } from 'react';
import {
  createAdminProduct,
  deleteAdminProduct,
  fetchAdminOrders,
  fetchAdminProducts,
  reorderAdminProducts,
  updateAdminOrderStatus,
  updateAdminProduct,
  verifyOwnerCredentials,
} from '../api/adminApi';
import '../App.css';

const STORAGE_KEY = 'owner-basic-token';

const initialProductForm = {
  title: '',
  price: '',
  subscriberPrice: '',
  image: '',
  category: 'PROMO',
  petSpecies: [],
  stockQuantity: 0,
};

const statusLabels = {
  CREATED: 'Criado',
  PREPARING: 'Preparando',
  IN_TRANSIT: 'Em Trânsito',
  DELIVERED: 'Entregue',
  CANCELED: 'Cancelado',
};

const formatCurrency = (value) =>
  Number(value || 0).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

const OwnerAdmin = () => {
  const [basicToken, setBasicToken] = useState(localStorage.getItem(STORAGE_KEY) || '');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [form, setForm] = useState(initialProductForm);
  const [editingId, setEditingId] = useState(null);
  const [activeTab, setActiveTab] = useState('products');
  const [message, setMessage] = useState('');

  const isAuthenticated = useMemo(() => basicToken.length > 0, [basicToken]);

  const handleUnauthorized = () => {
    setBasicToken('');
    localStorage.removeItem(STORAGE_KEY);
    setAuthError('Sessão expirada ou credenciais inválidas.');
  };

  const loadDashboard = async (token) => {
    setIsLoading(true);
    try {
      const [productsResponse, ordersResponse] = await Promise.all([
        fetchAdminProducts(token),
        fetchAdminOrders(token),
      ]);
      setProducts(productsResponse);
      setOrders(ordersResponse);
    } catch (error) {
      if (error.message === 'UNAUTHORIZED') {
        handleUnauthorized();
      } else {
        setMessage('Falha ao carregar dados do painel.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (basicToken) {
      loadDashboard(basicToken);
    }
  }, [basicToken]);

  const login = async (event) => {
    event.preventDefault();
    setAuthError('');
    setMessage('');

    const token = btoa(`${username}:${password}`);

    setIsLoading(true);
    try {
      await verifyOwnerCredentials(token);
      localStorage.setItem(STORAGE_KEY, token);
      setBasicToken(token);
      setUsername('');
      setPassword('');
    } catch {
      setAuthError('Credenciais inválidas.');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setBasicToken('');
    localStorage.removeItem(STORAGE_KEY);
    setProducts([]);
    setOrders([]);
    setEditingId(null);
    setForm(initialProductForm);
  };

  const resetForm = () => {
    setEditingId(null);
    setForm(initialProductForm);
  };

  const saveProduct = async (event) => {
    event.preventDefault();
    if (!basicToken) return;

    const payload = {
      ...form,
      price: Number(form.price),
      subscriberPrice: Number(form.subscriberPrice),
      stockQuantity: Number(form.stockQuantity),
    };

    try {
      if (editingId) {
        await updateAdminProduct(basicToken, editingId, payload);
        setMessage('Produto atualizado com sucesso.');
      } else {
        await createAdminProduct(basicToken, payload);
        setMessage('Produto criado com sucesso.');
      }

      resetForm();
      const refreshed = await fetchAdminProducts(basicToken);
      setProducts(refreshed);
    } catch (error) {
      if (error.message === 'UNAUTHORIZED') {
        handleUnauthorized();
      } else {
        setMessage('Não foi possível salvar o produto.');
      }
    }
  };

  const editProduct = (product) => {
    setEditingId(product.id);
    setForm({
      title: product.title,
      price: product.price,
      subscriberPrice: product.subscriberPrice,
      image: product.image,
      category: product.category,
      petSpecies: Array.isArray(product.petSpecies) ? product.petSpecies : [product.petSpecies],
      stockQuantity: product.stockQuantity,
    });
  };

  const removeProduct = async (productId) => {
    if (!basicToken) return;

    try {
      await deleteAdminProduct(basicToken, productId);
      setProducts((previous) => previous.filter((product) => product.id !== productId));
      setMessage('Produto removido.');
    } catch (error) {
      if (error.message === 'UNAUTHORIZED') {
        handleUnauthorized();
      } else {
        setMessage('Falha ao remover produto.');
      }
    }
  };

  const moveProduct = async (index, direction) => {
    if (!basicToken) return;

    const target = index + direction;
    if (target < 0 || target >= products.length) return;

    const reordered = [...products];
    [reordered[index], reordered[target]] = [reordered[target], reordered[index]];

    setProducts(reordered);

    try {
      const orderedIds = reordered.map((product) => product.id);
      const response = await reorderAdminProducts(basicToken, orderedIds);
      setProducts(response);
    } catch (error) {
      if (error.message === 'UNAUTHORIZED') {
        handleUnauthorized();
      } else {
        setMessage('Falha ao reorganizar produtos.');
      }
    }
  };

  const changeOrderStatus = async (orderId, status) => {
    if (!basicToken) return;

    try {
      const updated = await updateAdminOrderStatus(basicToken, orderId, status);
      setOrders((previous) => previous.map((order) => (order.id === orderId ? updated : order)));
      setMessage('Status do pedido atualizado.');
    } catch (error) {
      if (error.message === 'UNAUTHORIZED') {
        handleUnauthorized();
      } else {
        setMessage('Falha ao atualizar status do pedido.');
      }
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="admin-auth-shell">
        <form className="admin-auth-card" onSubmit={login}>
          <h1>Painel do Proprietário</h1>
          <p>Acesso restrito para gerenciamento da loja.</p>

          <input
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            placeholder="Usuário"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Senha"
            required
          />
          <button type="submit" disabled={isLoading}>Entrar</button>

          {authError && <span className="admin-error">{authError}</span>}
        </form>
      </div>
    );
  }

  return (
    <div className="admin-shell">
      <header className="admin-header">
        <h1>Painel do Proprietário</h1>
        <button onClick={logout}>Sair</button>
      </header>

      <div className="admin-tabs">
        <button
          className={activeTab === 'products' ? 'active' : ''}
          onClick={() => setActiveTab('products')}
        >
          Produtos
        </button>
        <button
          className={activeTab === 'orders' ? 'active' : ''}
          onClick={() => setActiveTab('orders')}
        >
          Entregas
        </button>
      </div>

      {message && <p className="admin-message">{message}</p>}

      {isLoading ? (
        <p className="admin-message">Carregando painel...</p>
      ) : (
        <>
          {activeTab === 'products' && (
            <div className="admin-grid">
              <section className="admin-card">
                <h2>{editingId ? 'Editar Produto' : 'Novo Produto'}</h2>
                <form className="admin-form" onSubmit={saveProduct}>
                  <div>
                    <label style={{ fontSize: '14px', fontWeight: '600', color: '#333', marginBottom: '6px', display: 'block' }}>Título</label>
                    <input
                      value={form.title}
                      onChange={(event) => setForm({ ...form, title: event.target.value })}
                      required
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '14px', fontWeight: '600', color: '#333', marginBottom: '6px', display: 'block' }}>Preço</label>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={form.price}
                      onChange={(event) => setForm({ ...form, price: event.target.value })}
                      required
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '14px', fontWeight: '600', color: '#333', marginBottom: '6px', display: 'block' }}>Preço Assinante</label>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={form.subscriberPrice}
                      onChange={(event) => setForm({ ...form, subscriberPrice: event.target.value })}
                      required
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '14px', fontWeight: '600', color: '#333', marginBottom: '6px', display: 'block' }}>Imagem</label>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <button
                        type="button"
                        onClick={() => document.getElementById('image-file-input').click()}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          padding: '10px 16px',
                          backgroundColor: '#0c6efc',
                          color: '#fff',
                          border: 'none',
                          borderRadius: '8px',
                          cursor: 'pointer',
                          fontSize: '14px',
                          fontWeight: '600',
                        }}
                      >
                        📁 Selecionar
                      </button>
                      {form.image && (
                        <span style={{ fontSize: '13px', color: '#666', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '200px' }}>
                          {form.image.substring(form.image.lastIndexOf('/') + 1).substring(0, 20)}
                        </span>
                      )}
                    </div>
                    <input
                      id="image-file-input"
                      type="file"
                      accept="image/*"
                      onChange={(event) => {
                        const file = event.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onload = (e) => {
                            setForm({ ...form, image: e.target?.result });
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                      style={{ display: 'none' }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '14px', fontWeight: '600', color: '#333', marginBottom: '6px', display: 'block' }}>Categoria</label>
                    <select
                      value={form.category}
                      onChange={(event) => setForm({ ...form, category: event.target.value })}
                    >
                      <option value="PROMO">Promoção</option>
                      <option value="RECOMMENDED">Recomendado</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ fontSize: '14px', fontWeight: '600', color: '#333', marginBottom: '10px', display: 'block' }}>Animais</label>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                      {['DOG', 'CAT', 'BIRD', 'FISH', 'RABBIT', 'HAMSTER', 'EXOTIC'].map((species) => (
                        <label key={species} style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                          <input
                            type="checkbox"
                            checked={form.petSpecies.includes(species)}
                            onChange={(event) => {
                              const updated = event.target.checked
                                ? [...form.petSpecies, species]
                                : form.petSpecies.filter((s) => s !== species);
                              setForm({ ...form, petSpecies: updated });
                            }}
                          />
                          {species === 'DOG' && 'Cachorro'}
                          {species === 'CAT' && 'Gato'}
                          {species === 'BIRD' && 'Pássaro'}
                          {species === 'FISH' && 'Peixe'}
                          {species === 'RABBIT' && 'Coelho'}
                          {species === 'HAMSTER' && 'Hamster'}
                          {species === 'EXOTIC' && 'Exótico'}
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label style={{ fontSize: '14px', fontWeight: '600', color: '#333', marginBottom: '6px', display: 'block' }}>Estoque</label>
                    <input
                      type="number"
                      min="0"
                      value={form.stockQuantity}
                      onChange={(event) => setForm({ ...form, stockQuantity: event.target.value })}
                      required
                    />
                  </div>

                  <div className="admin-form-actions">
                    <button type="submit">{editingId ? 'Atualizar' : 'Criar'}</button>
                    {editingId && (
                      <button type="button" onClick={resetForm} className="secondary">
                        Cancelar
                      </button>
                    )}
                  </div>
                </form>
              </section>

              <section className="admin-card">
                <h2>Catálogo</h2>
                <div className="admin-list">
                  {products.map((product, index) => (
                    <div key={product.id} className="admin-list-item" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                      <img
                        src={product.image}
                        alt={product.title}
                        style={{
                          width: '80px',
                          height: '80px',
                          objectFit: 'contain',
                          border: '1px solid #edf0f4',
                          borderRadius: '8px',
                          padding: '5px',
                          flexShrink: 0,
                        }}
                      />
                      <div style={{ flex: 1 }}>
                        <strong>{product.title}</strong>
                        <p>
                          {formatCurrency(product.price)} · Estoque: {product.stockQuantity}
                        </p>
                      </div>
                      <div className="admin-row-actions">
                        <button type="button" onClick={() => moveProduct(index, -1)}>↑</button>
                        <button type="button" onClick={() => moveProduct(index, 1)}>↓</button>
                        <button type="button" onClick={() => editProduct(product)}>Editar</button>
                        <button type="button" onClick={() => removeProduct(product.id)} className="danger">
                          Excluir
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          )}

          {activeTab === 'orders' && (
            <section className="admin-card">
              <h2>Pedidos e Entregas</h2>
              <div style={{ display: 'grid', gap: '20px' }}>
                {orders.map((order) => {
                  let items = [];
                  try {
                    items = order.itemsJson ? JSON.parse(order.itemsJson) : [];
                  } catch (e) {
                    items = [];
                  }
                  
                  const formattedDate = new Date(order.createdAt).toLocaleDateString('pt-BR', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                  });

                  return (
                    <div
                      key={order.id}
                      style={{
                        border: '1px solid #edf0f4',
                        borderRadius: '8px',
                        padding: '16px',
                        backgroundColor: '#fff',
                      }}
                    >
                      {/* Header */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '12px' }}>
                        <div>
                          <strong style={{ fontSize: '16px' }}>{order.orderCode}</strong>
                          <p style={{ fontSize: '13px', color: '#666', margin: '4px 0 0 0' }}>
                            {formattedDate}
                          </p>
                        </div>
                        <select
                          value={order.status}
                          onChange={(event) => changeOrderStatus(order.id, event.target.value)}
                          style={{
                            padding: '6px 10px',
                            borderRadius: '6px',
                            border: '1px solid #d7dbe0',
                            fontSize: '13px',
                          }}
                        >
                          {Object.entries(statusLabels).map(([value, label]) => (
                            <option key={value} value={value}>
                              {label}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Customer & Order Info */}
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px', fontSize: '13px', color: '#555' }}>
                        <p><strong>Cliente:</strong> {order.customerName}</p>
                        <p><strong>Telefone:</strong> {order.customerPhone || 'N/A'}</p>
                        <p><strong>Email:</strong> {order.customerEmail || 'N/A'}</p>
                        <p><strong>Método de Pagamento:</strong> {order.paymentMethod || 'N/A'}</p>
                      </div>

                      {/* Delivery Address */}
                      {order.deliveryAddress && (
                        <div style={{ marginBottom: '12px', padding: '10px', backgroundColor: '#f9fafb', borderRadius: '6px', fontSize: '13px' }}>
                          <strong>Endereço de Entrega:</strong>
                          <p style={{ margin: '4px 0 0 0', color: '#555', whiteSpace: 'pre-wrap' }}>{order.deliveryAddress}</p>
                        </div>
                      )}

                      {/* Items */}
                      {items.length > 0 && (
                        <div style={{ marginBottom: '12px' }}>
                          <strong style={{ fontSize: '13px', display: 'block', marginBottom: '8px' }}>Produtos:</strong>
                          <div style={{ display: 'grid', gap: '8px' }}>
                            {items.map((item, idx) => (
                              <div
                                key={idx}
                                style={{
                                  display: 'flex',
                                  gap: '10px',
                                  padding: '8px',
                                  backgroundColor: '#f9fafb',
                                  borderRadius: '6px',
                                  alignItems: 'flex-start',
                                }}
                              >
                                {item.image && (
                                  <img
                                    src={item.image}
                                    alt={item.title}
                                    style={{
                                      width: '50px',
                                      height: '50px',
                                      objectFit: 'contain',
                                      border: '1px solid #eee',
                                      borderRadius: '4px',
                                      padding: '2px',
                                      flexShrink: 0,
                                    }}
                                  />
                                )}
                                <div style={{ fontSize: '13px', flex: 1 }}>
                                  <p style={{ margin: '0 0 2px 0', fontWeight: '500' }}>
                                    {item.title}
                                  </p>
                                  <p style={{ margin: '0', color: '#666' }}>
                                    {item.quantity}x {formatCurrency(item.price)}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Total */}
                      <div style={{ textAlign: 'right', paddingTop: '12px', borderTop: '1px solid #eee', fontSize: '14px', fontWeight: '600' }}>
                        Total: {formatCurrency(order.totalAmount)}
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          )}
        </>
      )}
    </div>
  );
};

export default OwnerAdmin;
