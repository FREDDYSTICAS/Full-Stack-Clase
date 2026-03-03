import { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes, FaShoppingCart } from "react-icons/fa";

export default function Navbar({ cartCount = 0, onCartClick }) {
  // Estado del menú móvil (true = abierto)
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="w-full bg-gray-900 text-white shadow-lg fixed top-0 left-0 z-50">
      {/* CONTENEDOR PRINCIPAL */}
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* LOGO / MARCA */}
        <Link to="/" className="text-2xl font-bold tracking-tight">
          DevMarket
        </Link>

        {/* --- MENÚ DESKTOP (visible en pantallas medianas o más) --- */}
        <ul className="hidden md:flex space-x-8 text-lg items-center">

          {/* Links de navegación */}
          <li className="hover:text-blue-400 transition">
            <Link to="/">Inicio</Link>
          </li>

          <li className="hover:text-blue-400 transition">
            <Link to="/products">Productos</Link>
          </li>

          <li className="hover:text-blue-400 transition">
            <Link to="/contact">Contacto</Link>
          </li>

          {/* Carrito */}
          <li 
            className="relative cursor-pointer hover:text-blue-400 transition"
            onClick={onCartClick}
          >
            <FaShoppingCart className="text-2xl" />

            {/* Número del carrito */}
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-3 bg-blue-600 text-white text-xs px-2 py-0.5 rounded-full">
                {cartCount}
              </span>
            )}
          </li>
        </ul>

        {/* --- BOTÓN HAMBURGUESA (visible solo en móvil) --- */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* --- MENÚ MÓVIL DESPLEGABLE --- */}
      {menuOpen && (
        <div className="md:hidden bg-gray-800 px-6 py-6 space-y-6 animate-fadeIn">
          
          <Link
            to="/"
            className="block text-lg hover:text-blue-400"
            onClick={() => setMenuOpen(false)}
          >
            Inicio
          </Link>

          <Link
            to="/products"
            className="block text-lg hover:text-blue-400"
            onClick={() => setMenuOpen(false)}
          >
            Productos
          </Link>

          <Link
            to="/contact"
            className="block text-lg hover:text-blue-400"
            onClick={() => setMenuOpen(false)}
          >
            Contacto
          </Link>

          {/* Carrito en móvil */}
          <div 
            className="flex items-center text-lg space-x-3 cursor-pointer hover:text-blue-400 transition"
            onClick={() => { onCartClick(); setMenuOpen(false); }}
          >
            <FaShoppingCart className="text-2xl" />
            <span>Carrito: {cartCount}</span>
          </div>
        </div>
      )}
    </nav>
  );
}