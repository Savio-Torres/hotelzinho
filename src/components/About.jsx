import {
  Baby,
  Building2,
  HeartHandshake,
  Music,
  ShieldCheck,
  UsersRound,
} from 'lucide-react'

function About() {
  return (
    <section id="sobre" className="py-24 bg-[#F8F1E4] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <div className="relative">
          <div className="absolute -top-6 -left-6 w-24 h-24 bg-[#C99A3D]/30 rounded-full"></div>
          <div className="absolute -bottom-6 -right-6 w-28 h-28 bg-[#6B722E]/20 rounded-full"></div>

          <div className="relative bg-white rounded-[2.5rem] p-8 shadow-xl border border-[#D8C8AA]">
            <div className="bg-[#F4EAD6] rounded-[2rem] min-h-96 flex items-center justify-center border border-[#D8C8AA]">
              <div className="text-center px-6">
                <div className="w-20 h-20 rounded-[2rem] bg-white border border-[#D8C8AA] flex items-center justify-center text-[#6B722E] mx-auto mb-5">
                  <HeartHandshake size={42} />
                </div>

                <h3 className="text-2xl font-black text-[#6B722E]">
                  Um espaço com clima de casa
                </h3>

                <p className="mt-3 text-[#5B4A39] font-semibold">
                  Cuidado, rotina e acolhimento para crianças das 06h às 20h.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <span className="inline-flex bg-[#E6D7B8] text-[#6B722E] px-5 py-2 rounded-full font-black mb-5">
            Sobre a Pousada Aconchego
          </span>

          <h2 className="text-4xl md:text-5xl font-black text-[#2F2A22] leading-tight">
            Um hotelzinho charmoso, seguro e acolhedor.
          </h2>

          <p className="mt-6 text-lg text-[#5B4A39]">
            A Pousada Aconchego é um hotelzinho infantil pensado para receber
            crianças em um ambiente tranquilo, organizado e cheio de carinho.
          </p>

          <p className="mt-4 text-lg text-[#5B4A39]">
            A rotina acontece das 06h às 20h, com momentos de alimentação,
            banho, descanso, recreação, reforço escolar e atividades especiais,
            respeitando a fase e a necessidade de cada criança.
          </p>

          <div className="mt-8 grid sm:grid-cols-2 gap-4">
            <AboutCard
              icon={Baby}
              title="Prédio dos menores"
              text="Crianças de 4 meses até 4 ou 5 anos, com cuidado especial para a primeira infância."
            />

            <AboutCard
              icon={UsersRound}
              title="Prédio dos maiores"
              text="Crianças de 5 até 11 ou 12 anos, com recreação, reforço e atividades adequadas."
            />

            <AboutCard
              icon={Music}
              title="Balé"
              text="Atividade especial nas quartas e sextas, no turno da manhã e no turno da tarde."
            />

            <AboutCard
              icon={ShieldCheck}
              title="Rotina segura"
              text="Funcionamento diurno, com organização e acompanhamento ao longo do dia."
            />
          </div>

          <div className="mt-5 bg-white rounded-3xl p-5 shadow-sm border border-[#D8C8AA]">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#F4EAD6] border border-[#D8C8AA] flex items-center justify-center text-[#6B722E]">
                <Building2 size={24} />
              </div>

              <div>
                <h3 className="font-black text-[#2F2A22]">
                  Organização por idade
                </h3>

                <p className="mt-2 text-[#5B4A39] text-sm">
                  A divisão por prédios ajuda a oferecer mais segurança,
                  conforto e atividades compatíveis com cada fase da criança.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function AboutCard({ icon: Icon, title, text }) {
  return (
    <div className="bg-white rounded-3xl p-5 shadow-sm border border-[#D8C8AA]">
      <div className="w-12 h-12 rounded-2xl bg-[#F4EAD6] border border-[#D8C8AA] flex items-center justify-center text-[#6B722E]">
        <Icon size={24} />
      </div>

      <h3 className="mt-4 font-black text-[#2F2A22]">
        {title}
      </h3>

      <p className="mt-2 text-[#5B4A39] text-sm">
        {text}
      </p>
    </div>
  )
}

export default About