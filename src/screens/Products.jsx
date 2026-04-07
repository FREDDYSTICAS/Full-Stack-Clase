import { useEffect, useState, useMemo } from "react";
import Toast from "../components/ui/Toast";
import { FaSpinner, FaExclamationTriangle, FaSearch, FaFilter, FaStar, FaShoppingCart } from "react-icons/fa";

const CATEGORIES = ["all", "electronics", "jewelery", "men's clothing", "women's clothing"];

export default function Products({ onAddToCart, toast }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("default");

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then(res => {
        if (!res.ok) throw new Error("Error al cargar productos");
        return res.json();
      })
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (search) {
      const searchLower = search.toLowerCase();
      result = result.filter(p => 
        p.title.toLowerCase().includes(searchLower) ||
        p.description.toLowerCase().includes(searchLower)
      );
    }

    if (category !== "all") {
      result = result.filter(p => p.category === category);
    }

    if (sort === "price-asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (sort === "price-desc") {
      result.sort((a, b) => b.price - a.price);
    } else if (sort === "name-asc") {
      result.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sort === "name-desc") {
      result.sort((a, b) => b.title.localeCompare(a.title));
    }

    return result;
  }, [products, search, category, sort]);

  if (loading) {
    return (
      <div className="pt-24 px-6 flex justify-center items-center min-h-[50vh]">
        <div className="text-center">
          <FaSpinner className="animate-spin text-4xl text-blue-600 mx-auto mb-4" />
          <p className="text-[#101828]/70">Cargando productos...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="pt-24 px-6 flex justify-center items-center min-h-[50vh]">
        <div className="text-center">
          <FaExclamationTriangle className="text-4xl text-red-500 mx-auto mb-4" />
          <p className="text-lg font-semibold text-[#101828]">Error: {error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 px-4 md:px-6 pb-12">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-[#101828]">Catálogo</h1>
        <p className="text-[#101828]/60 mt-2">{filteredProducts.length} productos</p>
      </div>

      {/* Controls */}
      <div className="max-w-7xl mx-auto mb-8 bg-white rounded-2xl shadow-sm border border-[#101828]/10 p-4">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Busqueda */}
          <div className="relative flex-1">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-[#101828]/40" />
            <input
              type="text"
              placeholder="Buscar productos..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-[#101828]/20 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition"
            />
          </div>

          {/* Filtro categoría */}
          <div className="relative min-w-[180px]">
            <FaFilter className="absolute left-4 top-1/2 -translate-y-1/2 text-[#101828]/40" />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-[#101828]/20 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition appearance-none bg-white cursor-pointer"
            >
              {CATEGORIES.map(cat => (
                <option key={cat} value={cat}>
                  {cat === "all" ? "Todas las categorías" : cat.charAt(0).toUpperCase() + cat.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {/* Ordenamiento */}
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="min-w-[180px] px-4 py-3 rounded-xl border border-[#101828]/20 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition appearance-none bg-white cursor-pointer"
          >
            <option value="default">Ordenar por</option>
            <option value="price-asc">Precio: menor a mayor</option>
            <option value="price-desc">Precio: mayor a menor</option>
            <option value="name-asc">Nombre: A-Z</option>
            <option value="name-desc">Nombre: Z-A</option>
          </select>
        </div>
      </div>

      {/* Grid */}
      {filteredProducts.length === 0 ? (
        <div className="max-w-7xl mx-auto text-center py-16">
          <p className="text-[#101828]/60 text-lg">No se encontraron productos</p>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <div 
              key={product.id} 
              className="bg-white rounded-2xl shadow-sm hover:shadow-xl border border-[#101828]/10 overflow-hidden transition duration-300 group"
            >
              {/* Imagen */}
              <div className="relative bg-gray-50 p-4 h-56 flex items-center justify-center">
                <img 
                  src={product.image} 
                  alt={product.title} 
                  className="max-h-full max-w-full object-contain group-hover:scale-105 transition duration-300"
                />
                <span className="absolute top-3 left-3 bg-[#101828]/10 text-[#101828]/70 text-xs px-3 py-1 rounded-full capitalize">
                  {product.category}
                </span>
              </div>

              {/* Contenido */}
              <div className="p-5">
                <h2 className="text-sm font-semibold text-[#101828] line-clamp-2 min-h-[2.5rem] group-hover:text-blue-600 transition">
                  {product.title}
                </h2>

                {/* Rating */}
                <div className="flex items-center gap-2 mt-3">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <FaStar 
                        key={i} 
                        className={`text-xs ${i < Math.round(product.rating?.rate || 0) ? "text-yellow-400" : "text-gray-300"}`} 
                      />
                    ))}
                  </div>
                  <span className="text-xs text-[#101828]/50">({product.rating?.count || 0})</span>
                </div>

                {/* Precio y botón */}
                <div className="flex items-center justify-between mt-4">
                  <span className="text-xl font-bold text-[#101828]">${product.price.toFixed(2)}</span>
                  <button 
                    onClick={() => onAddToCart(product)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium text-sm flex items-center gap-2 transition hover:scale-105"
                  >
                    <FaShoppingCart className="text-xs" />
                    Agregar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {toast && <Toast message={toast} />}
    </div>
  );
}