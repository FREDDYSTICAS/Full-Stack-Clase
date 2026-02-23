import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Navbar from './components/layout/Navbar'
import WhatsAppButton from './ui/WhatsAppButton'

import Home from './Screens/Home'
import Products from './Screens/Products'
import Contact from './Screens/Contact'
import ProfileCardPage from './Screens/ProfileCardPage'

function App() {
  return (
    <BrowserRouter>
      <Navbar brand="DevMarket"/>

      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/products" element={<Products/>}/>
        <Route path="/contact" element={<Contact/>}/>
        <Route path="/profile" element={<ProfileCardPage/>}/>
      </Routes>

    <WhatsAppButton/> 

      </BrowserRouter>
  );
}

export default App































/*
const EXAMPLE_USER = {
  name: 'Sophie Bennett',
  verified: true,
  bio: 'Product Designer who focuses on simplicity & usability.',
  followers: 312,
  posts: 48,
  avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=300&fit=crop',
}

function App() {
  const handleFollow = () => {
    console.log('Follow clicked') 
  }

  return (
    <div className="min-h-screen bg-neutral-100 flex items-center justify-center p-4">
      <ProfileCard {...EXAMPLE_USER} onFollow={handleFollow} />
    </div>
  )
}
  /*
function App() {
  return (
    <>
      <Navbar brand="DevMarket"/>
      <Hero 
        title="Bienvenido a DevMarket"
        subtitle="Tu tienda online de tecnología y gadgets"
      />
    </>
  );
}
   
export default App
*/
/* 
function saludar {nombre}{
return "Hola + nombre}
*/
