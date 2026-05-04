import { Menu } from 'lucide-react'

function Header() {
  return (
    <header className="w-full bg-[#F4EAD6]/95 backdrop-blur-md fixed top-0 left-0 z-50 border-b border-[#D8C8AA] shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        <a href="/" className="flex items-center gap-3">
          <img
            src="/logo-pousada-aconchego.png"
            alt="Pousada Aconchego"
            className="w-36 md:w-44"
          />
        </a>

        <nav className="hidden md:flex items-center gap-8 text-[#4A3A2A] font-bold">
          <a href="/sobre" className="hover:text-[#6B722E] transition">
            Sobre
          </a>

          <a href="/servicos" className="hover:text-[#6B722E] transition">
            Serviços
          </a>

          <a href="/#rotina" className="hover:text-[#6B722E] transition">
            Rotina
          </a>

          <a href="/solicitacao" className="hover:text-[#6B722E] transition">
            Solicitação
          </a>

          <a href="/entrar" className="hover:text-[#6B722E] transition">
            Portal
          </a>
        </nav>

        <a
          href="/solicitacao"
          className="hidden sm:inline-block bg-[#6B722E] text-white px-5 py-3 rounded-full font-bold hover:bg-[#596025] transition shadow-md"
        >
          Fazer solicitação
        </a>

        <button className="md:hidden w-11 h-11 rounded-full bg-white border border-[#D8C8AA] flex items-center justify-center text-[#6B722E]">
          <Menu size={22} />
        </button>
      </div>
    </header>
  )
}

export default Header