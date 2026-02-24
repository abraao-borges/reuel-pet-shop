// ProductCard.jsx
const ProductCard = ({ product, onAddToCart }) => (
  <div className="product-card">
    <img
      src={product.image}
      alt={product.title}
      className="product-image"
      onError={(event) => {
        event.currentTarget.onerror = null;
        event.currentTarget.src = "/images/reuel_pet_shop_logo_no_background.png";
      }}
    />
    <div className="product-info">
      <h3 className="product-title">{product.title}</h3>
      <div className="product-price">R$ {product.price.toFixed(2)}</div>
      <div className="subscriber-price">
        R$ {product.subscriberPrice.toFixed(2)} para assinantes
      </div>
    </div>
    <button className="add-btn" onClick={() => onAddToCart?.(product)}>
      Adicionar
    </button>
  </div>
);

export default ProductCard;