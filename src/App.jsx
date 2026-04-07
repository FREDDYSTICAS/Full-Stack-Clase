import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import CartModal from "./components/ui/CartModal";
import WhatsAppButton from "./components/ui/WhatsAppButton";

import Home from "./screens/Home";
import Products from "./screens/Products";
import Contact from "./screens/Contact";

export default function App() {
const [cart, setCart] = useState(() => {
  const saved = localStorage.getItem("cart");
  return saved ? JSON.parse(saved) : [];
});

const [isCartOpen, setIsCartOpen] = useState(false);
const [toast, setToast] = useState("");

useEffect(() => {
  localStorage.setItem("cart", JSON.stringify(cart));
}, [cart]);

const showToast = (text) => {
  setToast(text);
  setTimeout(() => setToast(""), 2000);
};

const handleAddToCart = (product) => {
  const existingProduct = cart.find(item => item.id === product.id);
  
  if (existingProduct) {
    setCart(cart.map(item => 
      item.id === product.id 
        ? { ...item, quantity: (item.quantity || 1) + 1 }
        : item
    ));
    showToast("Cantidad actualizada en el carrito 📦");
  } else {
    setCart([...cart, { ...product, quantity: 1 }]);
    showToast("Producto agregado al carrito ");
  }
};

const handleRemoveFromCart = (productId) => {
  setCart(cart.filter(item => item.id !== productId));
  showToast("Producto eliminado del carrito 🗑️");
};

const handleUpdateQuantity = (productId, newQuantity) => {
  if (newQuantity <= 0) {
    handleRemoveFromCart(productId);
  } else {
    setCart(cart.map(item => 
      item.id === productId 
        ? { ...item, quantity: newQuantity }
        : item
    ));
  }
};

const handleClearCart = () => {
  setCart([]);
  showToast("Carrito vaciado ");
};

  return (
    <BrowserRouter>
      <MainLayout cartCount={cart.reduce((total, item) => total + (item.quantity || 1), 0)} onCartClick={() => setIsCartOpen(true)}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products onAddToCart={handleAddToCart} toast={toast} />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </MainLayout>
      
      <CartModal 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        cart={cart}
        onRemove={handleRemoveFromCart}
        onUpdateQuantity={handleUpdateQuantity}
        onClearCart={handleClearCart}
      />
      
      <WhatsAppButton />
    </BrowserRouter>
  );
}


// browser router para manejar las rutas de la aplicación
// routes para definir las rutas de la aplicación
// main layout para envolver las pantallas y mostrar el header y footer en todas las página
