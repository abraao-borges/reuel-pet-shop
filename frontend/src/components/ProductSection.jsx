import React, { useEffect, useMemo, useState } from "react";
import ProductCard from "./ProductCard";

const ITEMS_PER_PAGE = 4;

const ProductSection = ({
  className = "section-container",
  title,
  titleStyle,
  products,
  onAddToCart,
  emptyMessage,
  darkPager = false,
}) => {
  const [page, setPage] = useState(1);

  useEffect(() => {
    setPage(1);
  }, [products]);

  const totalPages = Math.max(1, Math.ceil(products.length / ITEMS_PER_PAGE));

  const visibleProducts = useMemo(() => {
    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    return products.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [products, page]);

  return (
    <section className={className}>
      <h2 className="section-title" style={titleStyle}>{title}</h2>

      <div className="product-grid">
        {products.length > 0 ? (
          visibleProducts.map((product) => (
            <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
          ))
        ) : (
          <p style={titleStyle}>{emptyMessage}</p>
        )}
      </div>

      {products.length > ITEMS_PER_PAGE && (
        <div className={`products-pager ${darkPager ? "products-pager-dark" : ""}`}>
          <button
            className="pager-btn"
            onClick={() => setPage((prev) => Math.max(1, prev - 1))}
            disabled={page === 1}
          >
            Anterior
          </button>

          <span className="pager-info">Página {page} de {totalPages}</span>

          <button
            className="pager-btn"
            onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
            disabled={page === totalPages}
          >
            Próxima
          </button>
        </div>
      )}
    </section>
  );
};

export default ProductSection;
