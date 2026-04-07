import { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes, FaShoppingCart } from "react-icons/fa";

export default function Navbar({ cartCount = 0, onCartClick }) {
  // Estado del menú móvil (true = abierto)
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="w-full bg-[#101828] text-white shadow-lg fixed top-0 left-0 z-50">
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
            <a href="#contacto">Contacto</a>
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

        {/* --- CONTROLES MÓVIL: CARRITO + HAMBURGUESA --- */}
        <div className="md:hidden flex items-center space-x-4">
          
          {/* Icono del Carrito en Móvil */}
          <button
            className="relative text-2xl hover:text-blue-400 transition"
            onClick={onCartClick}
          >
            <FaShoppingCart />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs px-1.5 py-0.5 rounded-full">
                {cartCount}
              </span>
            )}
          </button>

          {/* Botón Hamburguesa */}
          <button
            className="text-2xl"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* --- MENÚ MÓVIL DESPLEGABLE --- */}
      {menuOpen && (
        <div className="md:hidden bg-[#101828] px-6 py-6 space-y-6 animate-fadeIn">
          
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

          <a
            href="#contacto"
            className="block text-lg hover:text-blue-400"
            onClick={() => setMenuOpen(false)}
          >
            Contacto
          </a>
        </div>
      )}
    </nav>
  );
}


