import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Navbar({ brand }) {
  const [menuOpen, setMenuOpen] = useState(false)

  const links = [
    { to: '/', label: 'Inicio' },
    { to: '/products', label: 'Productos' },
    { to: '/contact', label: 'Contacto' },
    { to: '/profile', label: 'Card Profile' },
  ]

  return (
    <nav className="flex flex-wrap items-center justify-between gap-4 px-4 py-3 md:px-6 md:py-4 bg-neutral-900 text-white shadow-lg">
      {/* Brand */}
      <Link to="/" className="text-lg font-bold tracking-tight hover:text-neutral-200 transition-colors">
        {brand}
      </Link>

      {/* Botón hamburguesa: solo visible en móvil */}
      <button
        type="button"
        onClick={() => setMenuOpen(!menuOpen)}
        className="md:hidden p-2 rounded-lg hover:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-neutral-500"
        aria-expanded={menuOpen}
        aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
      >
        {menuOpen ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>

      {/* Lista de enlaces: en desktop siempre visible, en móvil solo si menuOpen */}
      <ul
        className={`w-full md:w-auto flex flex-col md:flex-row gap-1 md:gap-6 list-none m-0 p-0 ${
          menuOpen ? 'flex' : 'hidden md:flex'
        }`}
      >
        {links.map(({ to, label }) => (
          <li key={to}>
            <Link
              to={to}
              onClick={() => setMenuOpen(false)}
              className="block py-2 px-3 md:py-1 rounded-lg text-neutral-200 hover:text-white hover:bg-neutral-700 transition-colors"
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
