import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Login from './pages/Login';
import Orders from './pages/Pedidos';
import Cart from './pages/Cart';
import BanhoTosa from './pages/BanhoTosa';
import CorteUnhas from './pages/CorteUnhas';
import PlanoSaude from './pages/PlanoSaude';
import Veterinario from './pages/Veterianio';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/orders" element={<Orders />} />
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