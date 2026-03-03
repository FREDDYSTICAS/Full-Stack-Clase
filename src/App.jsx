import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import CartModal from "./components/ui/CartModal";

import Home from "./screens/Home";
import Products from "./screens/Products";
import Contact from "./screens/Contact";

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
  setCart([...cart, product]);
  showToast("Producto agregado al carrito😊");
};

  return (
    <BrowserRouter>
      <MainLayout cartCount={cart.length} onCartClick={() => setIsCartOpen(true)}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products onAddToCart={handleAddToCart} toast={toast} />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </MainLayout>
      
      {/* Modal del carrito */}
      <CartModal 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        cart={cart} 
      />
    </BrowserRouter>
  );
}


// browser router para manejar las rutas de la aplicación
// routes para definir las rutas de la aplicación
// main layout para envolver las pantallas y mostrar el header y footer en todas las página
