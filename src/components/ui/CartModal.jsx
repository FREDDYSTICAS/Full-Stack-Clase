import { useState } from "react";
import { FaTimes, FaArrowLeft, FaArrowRight, FaCheckCircle, FaTrash, FaMinus, FaPlus, FaShoppingBag } from "react-icons/fa";

const SHIPPING_THRESHOLD = 100;
const SHIPPING_COST = 9.99;
const TAX_RATE = 0.16;

export default function CartModal({ isOpen, onClose, cart, onRemove, onUpdateQuantity, onClearCart }) {
  const [view, setView] = useState("cart");
  const [showSuccess, setShowSuccess] = useState(false);

  if (!isOpen) return null;

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal >= SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  const tax = subtotal * TAX_RATE;
  const total = subtotal + shipping + tax;

  const goToCheckout = () => setView("checkout");
  const goToCart = () => setView("cart");
  
  const handleClose = () => {
    setView("cart");
    onClose();
  };

  const handleConfirmPurchase = () => {
    setShowSuccess(true);
    onClearCart();
    setTimeout(() => {
      setShowSuccess(false);
      handleClose();
    }, 3000);
  };

  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm" onClick={handleClose} />
      
      <div className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col animate-fadeIn">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-[#101828]/10 bg-[#101828]">
          <h2 className="text-lg font-bold text-white">
            {view === "cart" ? `Carrito (${cart.length})` : "Checkout"}
          </h2>
          <button onClick={handleClose} className="text-white/70 hover:text-white transition">
            <FaTimes className="text-xl" />
          </button>
        </div>

        {/* Vista del Carrito */}
        {view === "cart" && (
          <>
            <div className="flex-1 overflow-y-auto p-4">
              {cart.length === 0 ? (
                <div className="text-center py-12">
                  <FaShoppingBag className="text-5xl text-[#101828]/20 mx-auto mb-4" />
                  <p className="text-[#101828]/60 text-lg">Tu carrito está vacío</p>
                  <button
                    onClick={handleClose}
                    className="mt-4 text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Ver productos
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map((item, index) => (
                    <div 
                      key={index} 
                      className="flex gap-4 p-4 bg-white rounded-xl border border-[#101828]/10 shadow-sm"
                    >
                      <img 
                        src={item.image} 
                        alt={item.title}
                        className="w-20 h-20 object-contain bg-gray-50 rounded-lg"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-[#101828] text-sm line-clamp-2">
                          {item.title}
                        </h3>
                        <p className="text-xs text-[#101828]/50 mt-1 capitalize">
                          {item.category}
                        </p>
                        <p className="text-sm font-bold text-[#101828] mt-2">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                      <div className="flex flex-col items-end justify-between">
                        <button
                          onClick={() => onRemove(item.id)}
                          className="text-red-400 hover:text-red-600 transition"
                        >
                          <FaTrash className="text-sm" />
                        </button>
                        <div className="flex items-center gap-2 bg-[#101828]/5 rounded-lg p-1">
                          <button
                            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                            className="w-6 h-6 flex items-center justify-center rounded bg-white border border-[#101828]/10 hover:bg-[#101828]/5 transition"
                          >
                            <FaMinus className="text-xs" />
                          </button>
                          <span className="text-sm font-medium text-[#101828] w-6 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                            className="w-6 h-6 flex items-center justify-center rounded bg-white border border-[#101828]/10 hover:bg-[#101828]/5 transition"
                          >
                            <FaPlus className="text-xs" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="p-5 border-t border-[#101828]/10 bg-gray-50">
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-[#101828]/60">Subtotal ({cart.reduce((a, b) => a + b.quantity, 0)} items)</span>
                    <span className="font-medium text-[#101828]">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#101828]/60">Envío</span>
                    <span className={`font-medium ${shipping === 0 ? "text-green-600" : "text-[#101828]"}`}>
                      {shipping === 0 ? "Gratis" : `$${shipping.toFixed(2)}`}
                    </span>
                  </div>
                  {subtotal < SHIPPING_THRESHOLD && (
                    <p className="text-xs text-blue-600">¡Añade ${(SHIPPING_THRESHOLD - subtotal).toFixed(2)} más para envío gratis!</p>
                  )}
                </div>
                <button 
                  onClick={goToCheckout}
                  className="w-full bg-blue-600 text-white py-3.5 rounded-xl font-semibold hover:bg-blue-700 transition flex items-center justify-center gap-2"
                >
                  Proceder al pago
                  <FaArrowRight className="text-sm" />
                </button>
              </div>
            )}
          </>
        )}

        {/* Vista de Checkout */}
        {view === "checkout" && (
          <div className="flex-1 overflow-y-auto p-5">
            <button
              onClick={goToCart}
              className="flex items-center gap-2 text-[#101828]/60 hover:text-[#101828] mb-6 transition"
            >
              <FaArrowLeft className="text-sm" />
              Volver al carrito
            </button>

            <div className="bg-white rounded-2xl border border-[#101828]/10 p-5 mb-6">
              <h3 className="font-semibold text-[#101828] mb-4">Resumen del pedido</h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-[#101828]/60">Subtotal</span>
                  <span className="font-medium text-[#101828]">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#101828]/60">Envío</span>
                  <span className={`font-medium ${shipping === 0 ? "text-green-600" : "text-[#101828]"}`}>
                    {shipping === 0 ? "Gratis" : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#101828]/60">Impuesto (16%)</span>
                  <span className="font-medium text-[#101828]">${tax.toFixed(2)}</span>
                </div>
                <div className="border-t border-[#101828]/10 pt-3 mt-3">
                  <div className="flex justify-between">
                    <span className="font-bold text-[#101828]">Total</span>
                    <span className="font-bold text-2xl text-[#101828]">${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 rounded-xl p-4 mb-6">
              <p className="text-sm text-blue-700">
                🎉 ¡Gracias por tu compra! Tu pedido será procesado y enviado en breve.
              </p>
            </div>

            <button 
              onClick={handleConfirmPurchase}
              className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 transition"
            >
              Confirmar Pedido
            </button>
          </div>
        )}
      </div>

      {/* Success Message */}
      {showSuccess && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-60 animate-fadeIn">
          <div className="bg-green-600 text-white px-8 py-5 rounded-2xl shadow-2xl flex items-center gap-4">
            <FaCheckCircle className="text-3xl" />
            <div>
              <h3 className="font-bold text-lg">¡Pedido confirmado!</h3>
              <p className="text-sm text-green-100">Recibirás un email con los detalles</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}