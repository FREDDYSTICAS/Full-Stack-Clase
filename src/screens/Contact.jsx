export default function Contact() {
  // Redirige al footer donde está la información de contacto
  return (
    <div className="pt-32 px-6 max-w-4xl mx-auto text-center">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">
        Información de Contacto
      </h1>
      <p className="text-lg text-gray-600 mb-8">
        Puedes encontrar toda nuestra información de contacto en la parte inferior de la página.
      </p>
      <a 
        href="#contacto" 
        className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg transition"
      >
        Ir a Contacto
      </a>
    </div>
  );
}