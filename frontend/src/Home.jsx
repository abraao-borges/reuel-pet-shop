import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './App.css'; 

// Import Components
import Header from './components/Header';
import Navbar from './components/Navbar';
import HeroCarousel from './components/HeroCarousel';
import ServiceCard from './components/ServiceCard';
import InstagramFeed from './components/InstagramFeed';
import Toast from './components/Toast';
import ProductSection from './components/ProductSection';
import { fetchProducts } from './api/productsApi';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState({ message: '', visible: false });
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecies, setSelectedSpecies] = useState('ALL');

  const showToast = (message) => {
    setToast({ message, visible: true });
    window.setTimeout(() => {
      setToast({ message: '', visible: false });
    }, 1800);
  };

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setLoading(true);

      fetchProducts({ query: searchTerm, petSpecies: selectedSpecies })
        .then((data) => {
          setProducts(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error:', error);
          setLoading(false);
        });
    }, 250);

    return () => window.clearTimeout(timeoutId);
  }, [searchTerm, selectedSpecies]);

  const addToCart = (product) => {
    const existingCart = JSON.parse(localStorage.getItem('cart')) || [];
    const itemIndex = existingCart.findIndex(item => item.id === product.id);

    if (itemIndex > -1) {
      existingCart[itemIndex].quantity += 1;
    } else {
      existingCart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(existingCart));
    showToast(`${product.title} foi para o seu carrinho! 🐾`);
  };

  // Filter products based on the 'category' field we set in Java
  const promoProducts = products.filter(p => p.category === 'PROMO');
  const recommendedProducts = products.filter(p => p.category === 'RECOMMENDED');

  const services = [
    { title: "Banho e Tosa", desc: "Deixe seu pet cheiroso e estiloso.", icon: "fas fa-shower", path: "/banho-tosa" },
    { title: "Veterinário", desc: "Consultas e vacinação em dia.", icon: "fas fa-user-md", path: "/veterinario" },
    { title: "Plano de Saúde", desc: "A melhor proteção para seu amigo.", icon: "fas fa-heart", path: "/plano-saude" }
  ];

  if (loading) {
    return (
      <div className="loading-screen" style={{ textAlign: 'center', marginTop: '50px' }}>
        <h2>Carregando web site Reuel Pet Shop...</h2>
      </div>
    );
  }

  return (
    <>
      <Header searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      <Navbar selectedSpecies={selectedSpecies} onSpeciesChange={setSelectedSpecies} />
      <HeroCarousel />
      
      <main>
        {/* --- SECTION 1: SERVICES --- */}
        <section className="section-container services-section">
          <h2 className="section-title">Nossos Serviços</h2>
          <div className="services-grid">
            {services.map((service, idx) => (
              <Link to={service.path} key={idx} className="service-link" style={{ textDecoration: 'none', color: 'inherit' }}>
                <ServiceCard 
                  title={service.title} 
                  description={service.desc} 
                  icon={service.icon} 
                />
              </Link>
            ))}
          </div>
        </section>

        {/* --- SECTION 2: PROMOTIONS --- */}
        <ProductSection
          className="section-container promo-bg"
          title="🔥 Ofertas Relâmpago"
          titleStyle={{ color: '#ffffff' }}
          products={promoProducts}
          onAddToCart={addToCart}
          emptyMessage="Nenhuma oferta encontrada para este filtro."
          darkPager
        />

        {/* --- SECTION 3: RECOMMENDED --- */}
        <ProductSection
          className="section-container"
          title="Recomendados para Você"
          products={recommendedProducts}
          onAddToCart={addToCart}
          emptyMessage="Nenhum produto recomendado encontrado para este filtro."
        />

        <InstagramFeed />
      </main>

      <Toast message={toast.message} visible={toast.visible} />
    </>
  );
};

export default Home;