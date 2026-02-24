import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../components/Header";

const Completion = () => {
  const location = useLocation();
  const navigate = useNavigate();

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

  const isSuccess =
    successStatuses.includes(status) ||
    successParam === "true" ||
    paidParam === "true";

  return (
    <>
      <Header />
      <div className="completion-page">
        <div className="completion-card">
          <h2 className="section-title">
            {isSuccess ? "Pagamento confirmado" : "Pagamento não confirmado"}
          </h2>
          <p>
            {isSuccess
              ? "Seu pagamento foi concluído com sucesso. Obrigado pela compra!"
              : "Não foi possível confirmar o pagamento. Você pode tentar novamente no carrinho."}
          </p>
          <div className="completion-actions">
            <button className="secondary-btn" onClick={() => navigate("/")}>
              Ir para início
            </button>
            <button className="checkout-btn" onClick={() => navigate("/cart")}>
              Voltar ao carrinho
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Completion;
