export default function Home() {
  return (
    <div 
      className="pt-32 px-6 bg-cover bg-center bg-no-repeat min-h-[400px] relative"
      style={{
        backgroundImage: "url('https://cdn.dribbble.com/userupload/17579164/file/original-dfaf81a9e0daa572d4e1790e3f3fb4e2.jpg?resize=1024x768&vertical=center')"
      }}
    >
      {/* Overlay oscuro para mejorar legibilidad */}
      <div className="absolute inset-0 bg-black bg-opacity-40 -z-10"></div>
      
      {/* Contenido */}
      <div className="relative z-10">
        <h1 className="text-4xl font-bold text-white drop-shadow-lg">Bienvenido a DevMarket</h1>
      </div>
    </div>
  );
}