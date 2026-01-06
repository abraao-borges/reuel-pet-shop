import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'; // Added Link import
import './App.css'; 

// Import Components
import Header from './components/Header';
import Navbar from './components/Navbar';
import HeroCarousel from './components/HeroCarousel';
import ProductCard from './components/ProductCard';
import ServiceCard from './components/ServiceCard';
import InstagramFeed from './components/InstagramFeed';
import Login from './pages/Login';
import Orders from './pages/Pedidos';
import Cart from './pages/Cart';

// Service Pages
import BanhoTosa from './pages/BanhoTosa';
import CorteUnhas from './pages/CorteUnhas';
import PlanoSaude from './pages/PlanoSaude';
import Veterinario from './pages/Veterianio'; // Check spelling: is it 'Veterinario.js' or 'Veterianio.js'?

const Home = () => {
  // Mock Data for Products (Unchanged)
  const promoProduct_1 = { title: "Ração Golden Special 15kg", price: 149.90, subscriberPrice: 129.90, image: "/images/racao_4.png" };
  const promoProduct_2 = { title: "Ração Golden Special 15kg", price: 149.90, subscriberPrice: 129.90, image: "/images/racao_1.png" };
  const promoProduct_3 = { title: "Ração Golden Special 15kg", price: 149.90, subscriberPrice: 129.90, image: "/images/racao_2.png" };
  const promoProduct_4 = { title: "Ração Golden Special 15kg", price: 149.90, subscriberPrice: 129.90, image: "/images/racao_3.png" };
  const recommendProduct_1 = { title: "Spary Bucal Petyc", price: 39.90, subscriberPrice: 35.90, image: "/images/pet_higiene_1.jpg" };
  const recommendProduct_2 = { title: "Tigela de Ração", price: 39.90, subscriberPrice: 35.90, image: "/images/pet-food-in-bowl-png.png" };
  const recommendProduct_3 = { title: "Brinquedo Mordedor Resistente", price: 39.90, subscriberPrice: 35.90, image: "/images/pet_toy_1.png" };
  const recommendProduct_4 = { title: "Galinha Brinquedo Mordedor", price: 39.90, subscriberPrice: 35.90, image: "/images/pet_toy_2.png" };

  // 1. UPDATED SERVICES DATA WITH PATHS
  // I changed "Hotelzinho" to "Plano de Saúde" so it links to your new page
  const services = [
    { 
      title: "Banho e Tosa", 
      desc: "Deixe seu pet cheiroso e estiloso.", 
      icon: "fas fa-shower",
      path: "/banho-tosa" 
    },
    { 
      title: "Corte de Unhas", 
      desc: "Cuidado e higiene para as patinhas.", 
      icon: "fas fa-paw",
      path: "/corte-unhas" 
    },
    { 
      title: "Veterinário", 
      desc: "Consultas e vacinação em dia.", 
      icon: "fas fa-user-md",
      path: "/veterinario" 
    },
    { 
      title: "Plano de Saúde", 
      desc: "A melhor proteção para seu amigo.", 
      icon: "fas fa-heart", // Changed icon to heart for health plan
      path: "/plano-saude" 
    }
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
              // 2. WRAPPED IN LINK TO MAKE IT CLICKABLE
              <Link to={service.path} key={idx} className="service-link">
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
          <h2 className="section-title" style={{color: '#ffffffff'}}>🔥 Ofertas Relâmpago</h2>
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
        <Route path="/orders" element={<Orders />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cart" element={<Cart />} />
        
        {/* Service Routes */}
        <Route path="/banho-tosa" element={<BanhoTosa />} />
        <Route path="/corte-unhas" element={<CorteUnhas />} />
        <Route path="/veterinario" element={<Veterinario />} />
        <Route path="/plano-saude" element={<PlanoSaude />} />
      </Routes>
    </Router>
  );
}

export default App;