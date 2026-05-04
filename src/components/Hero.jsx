import {
  ArrowRight,
  Clock,
  HeartHandshake,
  Home,
  Leaf,
  ShieldCheck,
} from 'lucide-react'

function Hero() {
  return (
    <section className="min-h-screen bg-[#F4EAD6] flex items-center pt-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <span className="inline-flex items-center gap-2 bg-[#E6D7B8] text-[#6B722E] px-5 py-2 rounded-full font-black mb-6">
            <Leaf size={18} />
            Hotelzinho charmoso e acolhedor
          </span>

          <h1 className="text-4xl md:text-6xl font-black text-[#2F2A22] leading-tight">
            Um cantinho de cuidado, carinho e aconchego para crianças.
          </h1>

          <p className="mt-6 text-lg text-[#5B4A39] max-w-xl">
            A Pousada Aconchego é um hotelzinho infantil pensado para receber as
            crianças em um ambiente seguro, tranquilo e cheio de cuidado durante
            o dia.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <a
              href="/solicitacao"
              className="bg-[#9A4F2E] text-white px-8 py-4 rounded-full font-black text-center hover:bg-[#7E3F25] transition shadow-lg inline-flex items-center justify-center gap-2"
            >
              Fazer solicitação
              <ArrowRight size={20} />
            </a>

            <a
              href="#servicos"
              className="bg-white text-[#6B722E] px-8 py-4 rounded-full font-black text-center border-2 border-[#6B722E] hover:bg-[#EFE4CC] transition"
            >
              Conhecer serviços
            </a>
          </div>

          <div className="mt-10 grid sm:grid-cols-3 gap-4 max-w-xl">
            <HeroInfo icon={Home} title="Ambiente acolhedor" />
            <HeroInfo icon={Clock} title="Das 06h às 20h" />
            <HeroInfo icon={ShieldCheck} title="Cuidado seguro" />
          </div>
        </div>

        <div className="relative">
          <div className="absolute -top-8 -right-6 w-28 h-28 bg-[#C99A3D]/40 rounded-full blur-sm"></div>
          <div className="absolute -bottom-8 -left-6 w-28 h-28 bg-[#6B722E]/25 rounded-full blur-sm"></div>

          <div className="relative bg-white rounded-[2.5rem] p-8 shadow-2xl border border-[#D8C8AA]">
            <img
              src="/logo-pousada-aconchego.png"
              alt="Pousada Aconchego"
              className="w-full max-w-md mx-auto"
            />

            <div className="mt-6 bg-[#F4EAD6] rounded-3xl p-5 border border-[#D8C8AA]">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-white border border-[#D8C8AA] flex items-center justify-center text-[#6B722E]">
                  <HeartHandshake size={24} />
                </div>

                <div>
                  <h3 className="text-[#2F2A22] font-black text-xl">
                    Cuidado com clima de casa
                  </h3>

                  <p className="mt-2 text-[#5B4A39]">
                    Rotina organizada, ambiente tranquilo e acompanhamento
                    durante o dia.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function HeroInfo({ icon: Icon, title }) {
  return (
    <div className="bg-white rounded-3xl p-4 shadow-sm border border-[#D8C8AA]">
      <div className="w-11 h-11 rounded-2xl bg-[#F4EAD6] flex items-center justify-center text-[#6B722E] border border-[#D8C8AA]">
        <Icon size={22} />
      </div>

      <p className="mt-3 text-sm font-black text-[#4A3A2A]">
        {title}
      </p>
    </div>
  )
}

export default Hero