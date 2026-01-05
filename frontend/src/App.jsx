import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'; 

// Import Components
import Header from './components/Header';
import Navbar from './components/Navbar';
import HeroCarousel from './components/HeroCarousel';
import ProductCard from './components/ProductCard';
import ServiceCard from './components/ServiceCard'; // New Import
import InstagramFeed from './components/InstagramFeed';
import Login from './pages/Login';
import Cart from './components/Cart';

const Home = () => {
  // Mock Data for Products
  const promoProduct_1 = {
    title: "Ração Golden Special 15kg",
    price: 149.90,
    subscriberPrice: 129.90,
    image: "/images/racao_4.png"
  };

  const promoProduct_2 = {
    title: "Ração Golden Special 15kg",
    price: 149.90,
    subscriberPrice: 129.90,
    image: "/images/racao_1.png"
  };

  const promoProduct_3 = {
    title: "Ração Golden Special 15kg",
    price: 149.90,
    subscriberPrice: 129.90,
    image: "/images/racao_2.png"
  };

  const promoProduct_4 = {
    title: "Ração Golden Special 15kg",
    price: 149.90,
    subscriberPrice: 129.90,
    image: "/images/racao_3.png"
  };

  const recommendProduct_1 = {
    title: "Spary Bucal Petyc",
    price: 39.90,
    subscriberPrice: 35.90,
    image: "/images/pet_higiene_1.jpg"
  };

  const recommendProduct_2 = {
    title: "Tigela de Ração",
    price: 39.90,
    subscriberPrice: 35.90,
    image: "/images/pet-food-in-bowl-png.png"
  };

  const recommendProduct_3 = {
    title: "Brinquedo Mordedor Resistente",
    price: 39.90,
    subscriberPrice: 35.90,
    image: "/images/pet_toy_1.png"
  };

  const recommendProduct_4 = {
    title: "Galinha Brinquedo Mordedor",
    price: 39.90,
    subscriberPrice: 35.90,
    image: "/images/pet_toy_2.png"
  };

  // Mock Data for Services
  const services = [
    { title: "Banho e Tosa", desc: "Deixe seu pet cheiroso e estiloso.", icon: "fas fa-shower" },
    { title: "Corte de Unhas", desc: "Cuidado e higiene para as patinhas.", icon: "fas fa-paw" },
    { title: "Veterinário", desc: "Consultas e vacinação em dia.", icon: "fas fa-user-md" },
    { title: "Hotelzinho", desc: "Um lugar seguro enquanto você viaja.", icon: "fas fa-home" }
  ];

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
              <ServiceCard 
                key={idx} 
                title={service.title} 
                description={service.desc} 
                icon={service.icon} 
              />
            ))}
          </div>
        </section>

        {/* --- SECTION 2: PROMOTIONS --- */}
        <section className="section-container promo-bg">
          <h2 className="section-title" style={{color: '#d32f2f'}}>🔥 Ofertas Relâmpago</h2>
          <div className="product-grid">
            <ProductCard product={promoProduct_1} />
            <ProductCard product={promoProduct_2} />
            <ProductCard product={promoProduct_3} />
            <ProductCard product={promoProduct_4} />
          </div>
        </section>

        {/* --- SECTION 3: RECOMMENDED --- */}
        <section className="section-container">
          <h2 className="section-title">Recomendados para Você</h2>
          <div className="product-grid">
            <ProductCard product={recommendProduct_1} />
            <ProductCard product={recommendProduct_2} />
            <ProductCard product={recommendProduct_3} />
            <ProductCard product={recommendProduct_4} />
          </div>
        </section>

        <InstagramFeed />
      </main>
    </>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </Router>
  );
}

export default App;