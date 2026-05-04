import {
  ArrowLeft,
  Baby,
  Building2,
  Clock,
  HeartHandshake,
  Home,
  Leaf,
  Music,
  ShieldCheck,
  UsersRound,
} from 'lucide-react'

const aboutCards = [
  {
    href: '/sobre/predio-menores',
    icon: Baby,
    title: 'Prédio dos menores',
    text: 'Espaço para crianças de 4 meses até 4 ou 5 anos, com cuidado especial para a primeira infância.',
  },
  {
    href: '/sobre/predio-maiores',
    icon: UsersRound,
    title: 'Prédio dos maiores',
    text: 'Ambiente para crianças de 5 até 11 ou 12 anos, com recreação, rotina e reforço escolar.',
  },
  {
    href: '/sobre/estrutura',
    icon: Building2,
    title: 'Estrutura',
    text: 'Conheça melhor os ambientes da Pousada Aconchego e sua organização por idade.',
  },
  {
    href: '/sobre/atividades',
    icon: Music,
    title: 'Atividades',
    text: 'Recreação, balé, reforço escolar e momentos pensados para o desenvolvimento infantil.',
  },
]

function AboutPage() {
  return (
    <section className="min-h-screen bg-[#F4EAD6] py-10">
      <div className="max-w-7xl mx-auto px-6">
        <a
          href="/"
          className="inline-flex items-center gap-2 text-[#6B722E] font-black hover:underline mb-8"
        >
          <ArrowLeft size={20} />
          Voltar para o site
        </a>

        <div className="bg-white rounded-[2.5rem] p-6 md:p-10 shadow-xl border border-[#D8C8AA]">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <span className="inline-flex items-center gap-2 bg-[#E6D7B8] text-[#6B722E] px-5 py-2 rounded-full font-black">
                <Leaf size={18} />
                Sobre nós
              </span>

              <h1 className="mt-5 text-4xl md:text-6xl font-black text-[#2F2A22] leading-tight">
                Pousada Aconchego, um hotelzinho com clima de casa.
              </h1>

              <p className="mt-6 text-lg text-[#5B4A39]">
                Um espaço infantil pensado para acolher, cuidar e acompanhar
                crianças durante o dia, oferecendo uma rotina segura, organizada
                e cheia de carinho.
              </p>

              <p className="mt-4 text-lg text-[#5B4A39]">
                Conheça melhor os prédios, a estrutura e as atividades que fazem
                parte da rotina da Pousada Aconchego.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <a
                  href="/solicitacao"
                  className="bg-[#6B722E] text-white px-7 py-4 rounded-full font-black hover:bg-[#596025] transition text-center"
                >
                  Fazer solicitação
                </a>

                <a
                  href="/servicos"
                  className="bg-white text-[#6B722E] border-2 border-[#6B722E] px-7 py-4 rounded-full font-black hover:bg-[#F8F1E4] transition text-center"
                >
                  Ver serviços
                </a>
              </div>
            </div>

            <div className="bg-[#F8F1E4] rounded-[2.5rem] p-8 border border-[#D8C8AA]">
              <img
                src="/logo-pousada-aconchego.png"
                alt="Pousada Aconchego"
                className="w-full max-w-md mx-auto"
              />

              <div className="mt-6 bg-white rounded-3xl p-5 border border-[#D8C8AA]">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#F4EAD6] border border-[#D8C8AA] flex items-center justify-center text-[#6B722E]">
                    <HeartHandshake size={24} />
                  </div>

                  <div>
                    <h3 className="text-xl font-black text-[#2F2A22]">
                      Cuidado com acolhimento
                    </h3>

                    <p className="mt-2 text-[#5B4A39]">
                      Um espaço pensado para que a criança se sinta segura,
                      acolhida e bem acompanhada.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {aboutCards.map((card) => (
              <AboutCard
                key={card.title}
                href={card.href}
                icon={card.icon}
                title={card.title}
                text={card.text}
              />
            ))}
          </div>

          <div className="mt-14 grid md:grid-cols-3 gap-6">
            <InfoCard
              icon={Clock}
              title="Funcionamento"
              text="Atendimento das 06h às 20h, sem funcionamento após esse horário."
            />

            <InfoCard
              icon={ShieldCheck}
              title="Segurança"
              text="Rotina organizada, acompanhamento e atenção aos cuidados de cada criança."
            />

            <InfoCard
              icon={Home}
              title="Ambiente acolhedor"
              text="Um espaço com clima de casa, pensado para acolher crianças e famílias."
            />
          </div>
        </div>
      </div>
    </section>
  )
}

function AboutCard({ href, icon: Icon, title, text }) {
  return (
    <a
      href={href}
      className="group bg-[#F8F1E4] rounded-[2rem] p-6 border border-[#D8C8AA] hover:shadow-lg hover:-translate-y-1 transition block"
    >
      <div className="w-14 h-14 rounded-2xl bg-white border border-[#D8C8AA] flex items-center justify-center text-[#6B722E] group-hover:bg-[#6B722E] group-hover:text-white transition">
        <Icon size={28} />
      </div>

      <h3 className="mt-5 text-2xl font-black text-[#2F2A22]">
        {title}
      </h3>

      <p className="mt-3 text-[#5B4A39]">
        {text}
      </p>

      <p className="mt-5 text-[#6B722E] font-black">
        Ver detalhes →
      </p>
    </a>
  )
}

function InfoCard({ icon: Icon, title, text }) {
  return (
    <div className="bg-[#F8F1E4] rounded-[2rem] p-6 border border-[#D8C8AA]">
      <div className="w-14 h-14 rounded-2xl bg-white border border-[#D8C8AA] flex items-center justify-center text-[#6B722E]">
        <Icon size={28} />
      </div>

      <h3 className="mt-5 text-2xl font-black text-[#2F2A22]">
        {title}
      </h3>

      <p className="mt-3 text-[#5B4A39]">
        {text}
      </p>
    </div>
  )
}

export default AboutPage