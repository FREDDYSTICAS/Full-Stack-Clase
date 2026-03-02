import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";

import Home from "./screens/Home";
import Products from "./screens/Products";
import Contact from "./screens/Contact";

export default function App() {
// Carrito sea global
const [cart, setCart] = useState([]);



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
      <MainLayout cartCount={cart.length}>
        <Routes>
          <Route path="/" element={<Home />} />
           {/*notificacion visible solo cuando toast tiene texto*/}
          <Route path="/products" element={<Products onAddToCart={handleAddToCart} toast={toast} />} />
          <Route path="/contact" element={<Contact />} />

          {/*notificacion visible solo cuando toast tiene texto*/}
          {toast && <toast message={toast} />}
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}


// browser router para manejar las rutas de la aplicación
// routes para definir las rutas de la aplicación
// main layout para envolver las pantallas y mostrar el header y footer en todas las página
