
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function MainLayout({ children, cartCount, onCartClick }) {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar cartCount={cartCount} onCartClick={onCartClick} />

      <main className="flex-1 w-full px-6 py-10 animate-fadeIn">
        {children}
      </main>

      <Footer />
    </div>
  );
}