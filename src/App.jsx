import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import CartModal from "./components/ui/CartModal";

import Home from "./screens/Home";
import Products from "./screens/Products";

export default function App() {
// Carrito sea global
const [cart, setCart] = useState([]);

// Estado para el modal del carrito
const [isCartOpen, setIsCartOpen] = useState(false);

// estado para la notificacion
const [toast, setToast] = useState("");




// funcion para mostrar la notificacion
const showToast = (text) => {
  setToast(text);
  setTimeout(() => setToast(""), 2000); // dura 2sg
};


// funcion para agregar productos al carrito
const handleAddToCart = (product) => {
  // Verificar si el producto ya existe en el carrito
  const existingProduct = cart.find(item => item.id === product.id);
  
  if (existingProduct) {
    // Si existe, incrementar cantidad
    setCart(cart.map(item => 
      item.id === product.id 
        ? { ...item, quantity: (item.quantity || 1) + 1 }
        : item
    ));
    showToast("Cantidad actualizada en el carrito 📦");
  } else {
    // Si no existe, agregar con cantidad 1
    setCart([...cart, { ...product, quantity: 1 }]);
    showToast("Producto agregado al carrito ");
  }
};

// funcion para eliminar productos del carrito
const handleRemoveFromCart = (productId) => {
  setCart(cart.filter(item => item.id !== productId));
  showToast("Producto eliminado del carrito 🗑️");
};

// funcion para actualizar cantidad
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

// funcion para vaciar el carrito
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
        </Routes>
      </MainLayout>
      
      {/* Modal del carrito */}
      <CartModal 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        cart={cart}
        onRemove={handleRemoveFromCart}
        onUpdateQuantity={handleUpdateQuantity}
        onClearCart={handleClearCart}
      />
    </BrowserRouter>
  );
}


// browser router para manejar las rutas de la aplicación
// routes para definir las rutas de la aplicación
// main layout para envolver las pantallas y mostrar el header y footer en todas las página
