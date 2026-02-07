import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './App.css'; 

// Import Components
import Header from './components/Header';
import Navbar from './components/Navbar';
import HeroCarousel from './components/HeroCarousel';
import ProductCard from './components/ProductCard';
import ServiceCard from './components/ServiceCard';
import InstagramFeed from './components/InstagramFeed';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const BACKEND_URL = "https://reuel-pet-shop.onrender.com";

    fetch(`${BACKEND_URL}/api/products`)
      .then(response => {
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
      })
      .then(data => {
        console.log("Products loaded:", data); // Debugging log
        setProducts(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error:', error);
        setLoading(false);
      });
  }, []);

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
        <h2>Carregando ofertas do ReuelPet...</h2>
        <p>Verifique se o backend está rodando na porta 8080</p>
      </div>
    );
  }

  return (
    <>
      <Header />
      <Navbar />
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
        <section className="section-container promo-bg">
          <h2 className="section-title" style={{color: '#ffffff'}}>🔥 Ofertas Relâmpago</h2>
          <div className="product-grid">
            {promoProducts.length > 0 ? (
              promoProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : <p style={{color: 'white'}}>Nenhuma oferta encontrada.</p>}
          </div>
        </section>

        {/* --- SECTION 3: RECOMMENDED --- */}
        <section className="section-container">
          <h2 className="section-title">Recomendados para Você</h2>
          <div className="product-grid">
            {recommendedProducts.length > 0 ? (
              recommendedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : <p>Carregando recomendações...</p>}
          </div>
        </section>

        <InstagramFeed />
      </main>
    </>
  );
};

export default Home;