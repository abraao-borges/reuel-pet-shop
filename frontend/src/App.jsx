import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Orders from './pages/Pedidos';
import Cart from './pages/Cart';
import BanhoTosa from './pages/BanhoTosa';
import PlanoSaude from './pages/PlanoSaude';
import Veterinario from './pages/Veterianio';
import Completion from './pages/Completion';
import OwnerAdmin from './pages/OwnerAdmin';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/completion" element={<Completion />} />
        <Route path="/owner" element={<OwnerAdmin />} />
        
        {/* Service Routes */}
        <Route path="/banho-tosa" element={<BanhoTosa />} />
        <Route path="/veterinario" element={<Veterinario />} />
        <Route path="/plano-saude" element={<PlanoSaude />} />
      </Routes>
    </Router>
  );
}

export default App;