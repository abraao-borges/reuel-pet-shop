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
  petSpecies: 'DOG',
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
      petSpecies: product.petSpecies,
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
                  <input
                    value={form.title}
                    onChange={(event) => setForm({ ...form, title: event.target.value })}
                    placeholder="Título"
                    required
                  />
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={form.price}
                    onChange={(event) => setForm({ ...form, price: event.target.value })}
                    placeholder="Preço"
                    required
                  />
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={form.subscriberPrice}
                    onChange={(event) => setForm({ ...form, subscriberPrice: event.target.value })}
                    placeholder="Preço assinante"
                    required
                  />
                  <input
                    value={form.image}
                    onChange={(event) => setForm({ ...form, image: event.target.value })}
                    placeholder="Imagem (/images/exemplo.png)"
                    required
                  />

                  <select
                    value={form.category}
                    onChange={(event) => setForm({ ...form, category: event.target.value })}
                  >
                    <option value="PROMO">Promoção</option>
                    <option value="RECOMMENDED">Recomendado</option>
                  </select>

                  <select
                    value={form.petSpecies}
                    onChange={(event) => setForm({ ...form, petSpecies: event.target.value })}
                  >
                    <option value="DOG">Cachorro</option>
                    <option value="CAT">Gato</option>
                    <option value="BIRD">Pássaro</option>
                    <option value="FISH">Peixe</option>
                    <option value="RABBIT">Coelho</option>
                    <option value="HAMSTER">Hamster</option>
                    <option value="EXOTIC">Exótico</option>
                    <option value="ALL">Todos</option>
                  </select>

                  <input
                    type="number"
                    min="0"
                    value={form.stockQuantity}
                    onChange={(event) => setForm({ ...form, stockQuantity: event.target.value })}
                    placeholder="Estoque"
                    required
                  />

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
                    <div key={product.id} className="admin-list-item">
                      <div>
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
              <div className="admin-list">
                {orders.map((order) => (
                  <div key={order.id} className="admin-list-item">
                    <div>
                      <strong>{order.orderCode}</strong>
                      <p>
                        {order.customerName} · {formatCurrency(order.totalAmount)}
                      </p>
                    </div>
                    <select
                      value={order.status}
                      onChange={(event) => changeOrderStatus(order.id, event.target.value)}
                    >
                      {Object.entries(statusLabels).map(([value, label]) => (
                        <option key={value} value={value}>
                          {label}
                        </option>
                      ))}
                    </select>
                  </div>
                ))}
              </div>
            </section>
          )}
        </>
      )}
    </div>
  );
};

export default OwnerAdmin;
