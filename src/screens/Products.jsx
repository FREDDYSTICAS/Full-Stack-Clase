/*
-use state() para manejar el estado de los productos
-use effect() para cargar los productos desde una API o base de datos
-fetch(url) para obtener los productos desde una API
-then() para manejar la respuesta de la API y actualizar el estado de los productos
setProducts(data) para actualizar el estado de los productos con los datos obtenidos de la API

*/
import { useEffect, useState } from "react";
import Toast from "../components/ui/Toast";

export default function Products({ onAddToCart, toast }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  return (
    <div className="pt-24 px-6">
      <h1 className="text-4xl font-bold text-gray-900">Productos</h1>
      {/* GRID RESPONSIVE */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
        {products.map(product => (
          <div key={product.id} className="bg-white rounded-lg shadow-md p-4">
            <img src={product.image} alt={product.title} className="h-48 w-full object-contain mb-4" />

            {/* Título */}
            <h2 className="text-lg font-semibold text-gray-900">{product.title}</h2>
            
            {/* Category */}
            <p className="text-sm text-gray-500 mt-1">{product.category}</p>
            
            {/* Descripción */}
            <p className="text-gray-600 text-sm mt-2 line-clamp-3">{product.description}</p>
            <p className="text-sm text-gray-700 mt-1">Puntuación: {product.rating?.rate ?? 0} </p>
            
            {/* Puntuación: Rate y Count */}
            <div className="flex items-center gap-2 mt-3">
              <span className="text-gray-500 text-sm">({product.rating?.count} reviews)</span>
            </div>
            
            {/* Precio y botón Comprar */}
            <div className="flex items-center justify-between mt-4">
              <span className="text-xl font-bold text-gray-900">${product.price}</span>
              <button 
                onClick={() => onAddToCart(product)}
                className="bg-blue-400 text-white px-4 py-2 rounded-lg hover:bg-blue-500 transition"
              >
                Comprar
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {/* Notificación Toast */}
      {toast && <Toast message={toast} />}
    </div>
  );
}

