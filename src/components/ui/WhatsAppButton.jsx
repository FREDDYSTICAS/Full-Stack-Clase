import { FaWhatsapp } from "react-icons/fa";

export default function WhatsAppButton() {
  // Número de WhatsApp (cambiar por el real)
  const phoneNumber = "5491234567890"; // Formato internacional sin + ni espacios
  const message = "Hola! Me interesa conocer más sobre los productos de DevMarket";
  
  const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-float bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-lg transition-all duration-300"
      aria-label="Contactar por WhatsApp"
    >
      <FaWhatsapp className="text-3xl" />
    </a>
  );
}