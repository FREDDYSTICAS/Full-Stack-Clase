import { Link } from "react-router-dom";
import { FaShoppingBag, FaShippingFast, FaHeadset, FaArrowRight, FaBox, FaShieldAlt, FaCreditCard } from "react-icons/fa";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section 
        className="relative pt-28 pb-24 px-6 bg-cover bg-center min-h-[85vh] flex items-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1920&q=80')"
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/70 to-slate-800/50 -z-10"></div>
        
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block bg-blue-500/20 text-blue-300 px-4 py-2 rounded-full text-sm font-medium mb-6 border border-blue-500/30">
            ✨ Nueva colección disponible
          </span>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Encuentra todo lo que <span className="text-blue-400">necesitas</span>
          </h1>
          <p className="text-lg text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed">
            Los mejores productos tecnológicos, accesorios y más. 
            Envío gratis en pedidos mayores a $100. Calidad garantizada.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/products" 
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-xl transition duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              Ver Productos
              <FaArrowRight className="text-sm" />
            </Link>
            <Link 
              to="/contact" 
              className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-semibold px-8 py-4 rounded-xl transition duration-200 border border-white/20"
            >
              Contáctanos
            </Link>
          </div>
        </div>
      </section>

      {/* Features / Beneficios */}
      <section className="py-16 px-6 -mt-12 relative z-20">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition duration-300 border border-slate-100">
            <div className="bg-blue-50 w-14 h-14 rounded-xl flex items-center justify-center mb-4">
              <FaShippingFast className="text-xl text-blue-600" />
            </div>
            <h3 className="text-lg font-bold text-[#101828] mb-2">Envío Gratis</h3>
            <p className="text-slate-500 text-sm">En pedidos superiores a $100</p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition duration-300 border border-slate-100">
            <div className="bg-emerald-50 w-14 h-14 rounded-xl flex items-center justify-center mb-4">
              <FaShieldAlt className="text-xl text-emerald-600" />
            </div>
            <h3 className="text-lg font-bold text-[#101828] mb-2">Garantía Total</h3>
            <p className="text-slate-500 text-sm">30 días para cambios y devoluciones</p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition duration-300 border border-slate-100">
            <div className="bg-purple-50 w-14 h-14 rounded-xl flex items-center justify-center mb-4">
              <FaHeadset className="text-xl text-purple-600" />
            </div>
            <h3 className="text-lg font-bold text-[#101828] mb-2">Soporte 24/7</h3>
            <p className="text-slate-500 text-sm">Atención al cliente siempre disponible</p>
          </div>
        </div>
      </section>

      {/* Categorías */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#101828] mb-3">Explora nuestras categorías</h2>
            <p className="text-slate-500">Encuentra exactamente lo que buscas</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "Electrónica", img: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&q=80" },
              { name: "Accesorios", img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80" },
              { name: "Moda", img: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&q=80" },
              { name: "Hogar", img: "https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=400&q=80" }
            ].map((cat, idx) => (
              <Link 
                key={idx} 
                to="/products"
                className="group relative overflow-hidden rounded-2xl shadow-md hover:shadow-2xl transition duration-300"
              >
                <img 
                  src={cat.img} 
                  alt={cat.name}
                  className="w-full h-56 object-cover group-hover:scale-110 transition duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <span className="text-white text-lg font-semibold">{cat.name}</span>
                  <span className="ml-2 text-blue-300 text-sm opacity-0 group-hover:opacity-100 transition duration-300">Ver más →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Cómo funciona */}
      <section className="py-16 px-6 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-[#101828] text-center mb-12">¿Cómo comprar?</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { icon: FaBox, title: "1. Elige", desc: "Navega nuestro catálogo" },
              { icon: FaShoppingBag, title: "2. Agrega", desc: "Añade al carrito" },
              { icon: FaCreditCard, title: "3. Paga", desc: "De forma segura" },
              { icon: FaShippingFast, title: "4. Recibe", desc: "Entrega a domicilio" }
            ].map((step, idx) => (
              <div key={idx} className="text-center">
                <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <step.icon className="text-2xl text-white" />
                </div>
                <h3 className="font-bold text-[#101828] mb-1">{step.title}</h3>
                <p className="text-slate-500 text-sm">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 px-6 bg-gradient-to-r from-blue-600 to-blue-700">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">¿Listo para comenzar?</h2>
          <p className="text-blue-100 text-lg mb-8">
            Miles de productos te esperan. Envío rápido y seguro.
          </p>
          <Link 
            to="/products" 
            className="inline-block bg-white text-blue-600 font-bold px-10 py-4 rounded-xl hover:bg-blue-50 transition duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
          >
            Explorar Productos
          </Link>
        </div>
      </section>
    </div>
  );
}