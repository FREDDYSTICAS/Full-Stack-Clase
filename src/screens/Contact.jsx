import { useState } from "react";
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaFacebookF, FaInstagram, FaWhatsapp, FaPaperPlane } from "react-icons/fa";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "El nombre es requerido";
    if (!formData.email.trim()) {
      newErrors.email = "El email es requerido";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Email inválido";
    }
    if (!formData.message.trim()) newErrors.message = "El mensaje es requerido";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
      }, 3000);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  return (
    <div className="pt-24 px-4 md:px-6 pb-16 min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-[#101828] mb-3">Contáctanos</h1>
          <p className="text-[#101828]/60 text-lg">Estamos aquí para ayudarte</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Información de contacto */}
          <div className="bg-white rounded-2xl shadow-sm border border-[#101828]/10 p-8">
            <h2 className="text-xl font-bold text-[#101828] mb-6">Información de contacto</h2>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-blue-50 w-12 h-12 rounded-xl flex items-center justify-center shrink-0">
                  <FaPhone className="text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#101828]">Teléfono</h3>
                  <p className="text-[#101828]/60">+54 11 1234-5678</p>
                  <p className="text-[#101828]/40 text-sm">Lun - Vie: 9am - 6pm</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-blue-50 w-12 h-12 rounded-xl flex items-center justify-center shrink-0">
                  <FaEnvelope className="text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#101828]">Email</h3>
                  <p className="text-[#101828]/60">info@devmarket.com</p>
                  <p className="text-[#101828]/40 text-sm">Respondemos en 24h</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-blue-50 w-12 h-12 rounded-xl flex items-center justify-center shrink-0">
                  <FaMapMarkerAlt className="text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#101828]">Ubicación</h3>
                  <p className="text-[#101828]/60">Buenos Aires, Argentina</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-blue-50 w-12 h-12 rounded-xl flex items-center justify-center shrink-0">
                  <FaClock className="text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#101828]">Horario</h3>
                  <p className="text-[#101828]/60">Lun - Sáb: 9am - 8pm</p>
                  <p className="text-[#101828]/40 text-sm">Domingos: 10am - 4pm</p>
                </div>
              </div>
            </div>

            {/* Redes sociales */}
            <div className="mt-8 pt-6 border-t border-[#101828]/10">
              <h3 className="font-semibold text-[#101828] mb-4">Síguenos en redes</h3>
              <div className="flex gap-3">
                <a href="#" className="bg-[#101828] w-10 h-10 rounded-lg flex items-center justify-center text-white hover:bg-blue-600 transition">
                  <FaFacebookF />
                </a>
                <a href="#" className="bg-[#101828] w-10 h-10 rounded-lg flex items-center justify-center text-white hover:bg-pink-600 transition">
                  <FaInstagram />
                </a>
                <a href="#" className="bg-[#101828] w-10 h-10 rounded-lg flex items-center justify-center text-white hover:bg-green-500 transition">
                  <FaWhatsapp />
                </a>
              </div>
            </div>
          </div>

          {/* Formulario */}
          <div className="bg-white rounded-2xl shadow-sm border border-[#101828]/10 p-8">
            <h2 className="text-xl font-bold text-[#101828] mb-6">Envíanos un mensaje</h2>
            
            {submitted ? (
              <div className="text-center py-12">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaPaperPlane className="text-green-600 text-2xl" />
                </div>
                <h3 className="text-xl font-bold text-[#101828] mb-2">¡Mensaje enviado!</h3>
                <p className="text-[#101828]/60">Gracias por contactarnos. Te responderemos pronto.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-[#101828] mb-2">Nombre *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-xl border ${errors.name ? "border-red-500" : "border-[#101828]/20"} focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition`}
                      placeholder="Tu nombre"
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#101828] mb-2">Teléfono</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-[#101828]/20 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition"
                      placeholder="+54 9 XX XXXX-XXXX"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#101828] mb-2">Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-xl border ${errors.email ? "border-red-500" : "border-[#101828]/20"} focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition`}
                    placeholder="tu@email.com"
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#101828] mb-2">Asunto</label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-[#101828]/20 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition appearance-none bg-white"
                  >
                    <option value="">Selecciona un asunto</option>
                    <option value="general">Consulta general</option>
                    <option value="pedido">Información de pedido</option>
                    <option value="soporte">Soporte técnico</option>
                    <option value="sugerencia">Sugerencia</option>
                    <option value="otro">Otro</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#101828] mb-2">Mensaje *</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className={`w-full px-4 py-3 rounded-xl border ${errors.message ? "border-red-500" : "border-[#101828]/20"} focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition resize-none`}
                    placeholder="Escribe tu mensaje..."
                  />
                  {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 rounded-xl transition flex items-center justify-center gap-2"
                >
                  <FaPaperPlane />
                  Enviar mensaje
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}