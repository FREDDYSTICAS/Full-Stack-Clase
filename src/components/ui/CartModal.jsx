import { useState } from "react";
import { FaTimes, FaArrowLeft, FaArrowRight, FaCheckCircle } from "react-icons/fa";

export default function CartModal({ isOpen, onClose, cart, onClearCart }) {
  const [view, setView] = useState("cart"); // "cart" o "checkout"
  const [showSuccess, setShowSuccess] = useState(false);

  if (!isOpen) return null;

  // Calcular el total
  const total = cart.reduce((sum, product) => sum + product.price, 0);

  // Función para cambiar a checkout
  const goToCheckout = () => {
    setView("checkout");
  };

  // Función para volver al carrito
  const goToCart = () => {
    setView("cart");
  };

  // Resetear vista al cerrar
  const handleClose = () => {
    setView("cart");
    onClose();
  };

  // Función para confirmar compra
  const handleConfirmPurchase = () => {
    setShowSuccess(true);
    onClearCart(); // Vaciar el carrito
    setTimeout(() => {
      setShowSuccess(false);
      handleClose();
    }, 3000);
  };

  return (
    <>
      {/* Overlay transparente para cerrar al hacer clic fuera */}
      <div 
        className="fixed inset-0 z-40"
        onClick={handleClose}
      />
      
      {/* Dropdown del Carrito anclado a la derecha */}
      <div className="fixed top-16 right-4 bg-white rounded-lg shadow-2xl z-50 w-full max-w-sm animate-fadeIn">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50">
          <h2 className="text-lg font-bold text-gray-900 flex-1">
            {view === "cart" ? `Carrito (${cart.length})` : "Checkout"}
          </h2>
          <button 
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-700 transition"
          >
            <FaTimes className="text-xl" />
          </button>
        </div>

        {/* Vista del Carrito */}
        {view === "cart" && (
          <>
            {/* Contenido */}
            <div className="p-4 overflow-y-auto max-h-[400px]">
              {cart.length === 0 ? (
                <p className="text-center text-gray-500 py-8">
                  Tu carrito está vacío
                </p>
              ) : (
                <div className="space-y-3">
                  {cart.map((product, index) => (
                    <div 
                      key={index} 
                      className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
                    >
                      <img 
                        src={product.image} 
                        alt={product.title}
                        className="w-16 h-16 object-contain rounded"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 text-sm line-clamp-1">
                          {product.title}
                        </h3>
                        <p className="text-xs text-gray-500">
                          {product.category}
                        </p>
                        <p className="text-sm font-bold text-gray-900 mt-1">
                          ${product.price.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer con total */}
            {cart.length > 0 && (
              <div className="p-4 border-t border-gray-200 bg-gray-50">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-base font-semibold text-gray-700">
                    Total:
                  </span>
                  <span className="text-xl font-bold text-gray-900">
                    ${total.toFixed(2)}
                  </span>
                </div>
                <button 
                  onClick={goToCheckout}
                  className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition flex items-center justify-center gap-2"
                >
                  Proceder al pago
                  <FaArrowRight />
                </button>
              </div>
            )}
          </>
        )}

        {/* Vista de Checkout */}
        {view === "checkout" && (
          <div className="p-6">
            {/* Resumen */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-3">Resumen de compra</h3>
              <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Productos ({cart.length})</span>
                  <span className="font-semibold">${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Envío</span>
                  <span className="font-semibold text-green-600">Gratis</span>
                </div>
                <div className="border-t border-gray-200 pt-2 mt-2">
                  <div className="flex justify-between">
                    <span className="font-bold text-gray-900">Total</span>
                    <span className="font-bold text-xl text-gray-900">${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Botones */}
            <div className="space-y-2">
              <button 
                onClick={handleConfirmPurchase}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                Confirmar Compra
              </button>
              <button 
                onClick={goToCart}
                className="w-full bg-gray-200 text-gray-700 py-2.5 rounded-lg font-semibold hover:bg-gray-300 transition flex items-center justify-center gap-2"
              >
                <FaArrowLeft />
                Volver al Carrito
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Mensaje de Éxito Flotante */}
      {showSuccess && (
        <div className="fixed top-24 left-4 z-[60] animate-fadeIn">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-4 rounded-lg shadow-2xl flex items-center gap-3 max-w-sm">
            <FaCheckCircle className="text-3xl flex-shrink-0" />
            <div>
              <h3 className="font-bold text-lg">¡Compra exitosa! </h3>
              <p className="text-sm text-blue-100">Tu pedido ha sido procesado correctamente</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

