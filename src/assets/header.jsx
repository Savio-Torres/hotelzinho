function Header() {
  return (
    <header className="w-full bg-white/90 backdrop-blur-md fixed top-0 left-0 z-50 border-b border-blue-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        <a href="/" className="flex items-center gap-3">
          <img
            src="/Logo-hotelzinho.png"
            alt="Logo Hotelzinho Criativa"
            className="w-36 md:w-44"
          />
        </a>

        <nav className="hidden md:flex items-center gap-8 text-gray-700 font-bold">
          <a href="#sobre" className="hover:text-[#1238A8] transition">
            Sobre
          </a>

          <a href="#servicos" className="hover:text-[#1238A8] transition">
            Serviços
          </a>

          <a href="#rotina" className="hover:text-[#1238A8] transition">
            Rotina
          </a>

          <a href="#reserva" className="hover:text-[#1238A8] transition">
            Reserva
          </a>
        </nav>

        <a
          href="#reserva"
          className="hidden sm:inline-block bg-[#FF3B3B] text-white px-5 py-3 rounded-full font-extrabold hover:bg-red-600 transition shadow-md"
        >
          Solicitar reserva
        </a>
      </div>
    </header>
  )
}

export default Header