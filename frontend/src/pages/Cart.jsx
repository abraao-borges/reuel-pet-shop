import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../components/Header";

const Cart = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [cartItems, setCartItems] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [customer, setCustomer] = useState({
    name: "",
    cellphone: "",
    email: "",
    taxId: "",
  });
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("PIX");

  // Load items from LocalStorage on mount
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(savedCart);
  }, []);

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const status = (query.get("status") || "").toLowerCase();
    const successParam = (query.get("success") || "").toLowerCase();
    const paidParam = (query.get("paid") || "").toLowerCase();

    const successStatuses = [
      "success",
      "paid",
      "approved",
      "completed",
      "succeeded",
    ];

    const isPaymentSuccess =
      successStatuses.includes(status) ||
      successParam === "true" ||
      paidParam === "true";

    if (isPaymentSuccess) {
      localStorage.removeItem("cart");
      setCartItems([]);
      navigate("/cart", { replace: true });
    }
  }, [location.search, navigate]);

  // Sync state with LocalStorage whenever items change
  const updateCart = (newItems) => {
    setCartItems(newItems);
    localStorage.setItem("cart", JSON.stringify(newItems));
  };

  const updateQuantity = (id, delta) => {
    const updated = cartItems.map((item) =>
      item.id === id
        ? { ...item, quantity: Math.max(1, item.quantity + delta) }
        : item,
    );
    updateCart(updated);
  };

  const removeItem = (id) => {
    const updated = cartItems.filter((item) => item.id !== id);
    updateCart(updated);
  };

  const updateCustomerField = (field, value) => {
    setCustomer((prev) => ({ ...prev, [field]: value }));
  };

  const handleCheckout = async () => {
    if (cartItems.length === 0 || isProcessing) {
      return;
    }

    if (
      !customer.name.trim() ||
      !customer.cellphone.trim() ||
      !customer.email.trim() ||
      !customer.taxId.trim() ||
      !deliveryAddress.trim()
    ) {
      alert("Preencha todos os campos obrigatórios.");
      return;
    }

    const BACKEND_URL = "http://localhost:8080";
    const paymentWindow = window.open("", "_blank");
    const frontendOrigin = window.location.origin;

    const payload = {
      cartItems: cartItems.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
      })),
      method: "PIX",
      frequency: "ONE_TIME",
      returnUrl: `${frontendOrigin}/cart`,
      completionUrl: `${frontendOrigin}/completion`,
      customer,
      deliveryAddress,
      paymentMethod,
    };

    try {
      setIsProcessing(true);

      const response = await fetch(`${BACKEND_URL}/api/payment/checkout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Falha ao criar checkout");
      }

      const data = await response.json();
      if (data.url) {
        if (paymentWindow) {
          paymentWindow.location.href = data.url;
        } else {
          window.open(data.url, "_blank");
        }
      } else {
        if (paymentWindow) {
          paymentWindow.close();
        }
        alert("Não foi possível iniciar o pagamento.");
      }
    } catch (error) {
      if (paymentWindow) {
        paymentWindow.close();
      }
      console.error("Erro ao processar pagamento:", error);
      alert("Erro ao processar pagamento. Tente novamente.");
    } finally {
      setIsProcessing(false);
    }
  };

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );
  const shipping = subtotal > 100 || cartItems.length === 0 ? 0 : 15.0;
  const total = subtotal + shipping;

  return (
    <>
      <Header />
      <div className="cart-page">
        <h2 className="section-title">Meu Carrinho</h2>
        <button className="back-btn" onClick={() => navigate("/")}>
          <i className="fas fa-arrow-left"></i> Voltar para o Início
        </button>
        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <i className="fas fa-shopping-basket"></i>
            <p>Seu carrinho está vazio!</p>
            <button
              className="add-btn"
              style={{ maxWidth: "200px" }}
              onClick={() => navigate("/")}
            >
              Voltar a comprar
            </button>
          </div>
        ) : (
          <div className="cart-container">
            {/* Left: Product List */}
            <div className="cart-items">
              {cartItems.map((item) => (
                <div key={item.id} className="cart-item">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="cart-item-image"
                  />

                  <div className="cart-item-info">
                    <h3>{item.title}</h3>
                    <p className="item-price">R$ {item.price.toFixed(2)}</p>
                  </div>

                  <div className="cart-controls">
                    <button onClick={() => updateQuantity(item.id, -1)}>
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, 1)}>
                      +
                    </button>
                  </div>

                  <div className="cart-item-total">
                    R$ {(item.price * item.quantity).toFixed(2)}
                  </div>

                  <button
                    className="remove-btn"
                    onClick={() => removeItem(item.id)}
                  >
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
                <span style={{ color: shipping === 0 ? "green" : "#333" }}>
                  {shipping === 0 ? "Grátis" : `R$ ${shipping.toFixed(2)}`}
                </span>
              </div>
              <hr />
              <div className="summary-row total">
                <span>Total</span>
                <span>R$ {total.toFixed(2)}</span>
              </div>

              <div className="checkout-customer-fields">
                <input
                  type="text"
                  placeholder="Nome"
                  value={customer.name}
                  onChange={(e) => updateCustomerField("name", e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Celular"
                  value={customer.cellphone}
                  onChange={(e) =>
                    updateCustomerField("cellphone", e.target.value)
                  }
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={customer.email}
                  onChange={(e) => updateCustomerField("email", e.target.value)}
                />
                <input
                  type="text"
                  placeholder="ID / CPF"
                  value={customer.taxId}
                  onChange={(e) => updateCustomerField("taxId", e.target.value)}
                />
                <textarea
                  placeholder="Endereço de Entrega"
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                  style={{ minHeight: '80px', fontFamily: 'inherit' }}
                />
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                >
                  <option value="PIX">PIX</option>
                  <option value="CREDIT_CARD">Cartão de Crédito</option>
                  <option value="DEBIT_CARD">Cartão de Débito</option>
                </select>
              </div>

              <button
                className="checkout-btn"
                onClick={handleCheckout}
                disabled={isProcessing}
              >
                {isProcessing ? "Processando..." : "Finalizar Compra"} (R${" "}
                {total.toFixed(2)})
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
