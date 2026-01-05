// Navbar.jsx
const Navbar = () => {
  const categories = ['Cachorro', 'Gato', 'Pássaros', 'Peixes', 'Outros Pets', 'Marcas', 'Promoções', 'Plano de Saúde'];
  return (
    <nav className="nav">
      <div className="nav-container">
        {categories.map((cat, idx) => (
          <div key={idx} className="nav-item" style={cat === 'Promoções' ? { color: 'red' } : {}}>
            {cat}
          </div>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;