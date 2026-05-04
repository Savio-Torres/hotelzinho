import {
  ArrowLeft,
  Baby,
  CalendarDays,
  Droplets,
  HeartHandshake,
  Home,
  Music,
  Palette,
  ReceiptText,
  Utensils,
} from 'lucide-react'

const services = [
  {
    href: '/servicos/cuidado-integral',
    icon: HeartHandshake,
    title: 'Cuidado integral',
    text: 'Acompanhamento durante o dia com acolhimento, atenção e cuidado com a rotina da criança.',
  },
  {
    href: '/servicos/alimentacao',
    icon: Utensils,
    title: 'Alimentação',
    text: 'Café da manhã, almoço, lanche da tarde, janta e lanche do fim do dia, conforme o horário.',
  },
  {
    href: '/servicos/banho-higiene',
    icon: Droplets,
    title: 'Banho e higiene',
    text: 'Momentos de banho, cuidado pessoal e organização para garantir conforto e bem-estar.',
  },
  {
    href: '/servicos/recreacao',
    icon: Palette,
    title: 'Recreação',
    text: 'Atividades lúdicas, brincadeiras, socialização e momentos criativos ao longo da rotina.',
  },
  {
    href: '/servicos/bale',
    icon: Music,
    title: 'Balé',
    text: 'Atividade especial realizada nas quartas e sextas-feiras, no turno da manhã e da tarde.',
  },
  {
    href: '/servicos/mensalidade',
    icon: ReceiptText,
    title: 'Mensalidade',
    text: 'Planos mensais para manhã, tarde ou período integral, conforme a necessidade da família.',
  },
  {
    href: '/servicos/diaria',
    icon: CalendarDays,
    title: 'Diária',
    text: 'Ideal para responsáveis que precisam de atendimento em um dia específico ou período combinado.',
  },
  {
    href: '/sobre',
    icon: Baby,
    title: 'Divisão por idade',
    text: 'Organização das crianças em prédio dos menores e prédio dos maiores, conforme a faixa etária.',
  },
]

function ServicesPage() {
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
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-flex bg-[#E6D7B8] text-[#6B722E] px-5 py-2 rounded-full font-black">
              Serviços
            </span>

            <h1 className="mt-5 text-4xl md:text-6xl font-black text-[#2F2A22]">
              Serviços da Pousada Aconchego
            </h1>

            <p className="mt-5 text-lg text-[#5B4A39]">
              Conheça os principais serviços oferecidos no hotelzinho. Clique em
              cada card para ver mais detalhes, fotos, rotina e valores.
            </p>
          </div>

          <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service) => (
              <ServiceCard
                key={service.title}
                href={service.href}
                icon={service.icon}
                title={service.title}
                text={service.text}
              />
            ))}
          </div>

          <div className="mt-14 grid lg:grid-cols-3 gap-6">
            <PlanCard
              icon={CalendarDays}
              title="Diária"
              price="R$ 70,00"
              text="Para um dia específico ou período combinado."
              href="/servicos/diaria"
              buttonText="Ver diária"
            />

            <PlanCard
              icon={ReceiptText}
              title="Mensalidade"
              price="A partir de R$ 400,00"
              text="Planos para manhã, tarde ou período integral."
              href="/servicos/mensalidade"
              buttonText="Ver mensalidade"
            />

            <PlanCard
              icon={Music}
              title="Balé"
              price="R$ 100,00/mês"
              text="Atividade especial nas quartas e sextas-feiras."
              href="/servicos/bale"
              buttonText="Ver balé"
            />
          </div>

          <div className="mt-14 bg-[#6B722E] rounded-[2.5rem] p-8 md:p-10 text-white">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <span className="inline-flex bg-[#C99A3D] text-white px-5 py-2 rounded-full font-black">
                  Rotina completa
                </span>

                <h2 className="mt-5 text-3xl md:text-4xl font-black">
                  Atendimento das 06h às 20h, com cuidado durante todo o dia.
                </h2>

                <p className="mt-4 text-[#F4EAD6] text-lg">
                  A rotina inclui alimentação, banho, descanso, recreação,
                  acompanhamento escolar e atividades especiais, sempre dentro
                  do horário de funcionamento.
                </p>
              </div>

              <div className="grid gap-4">
                <RoutinePoint
                  title="Funcionamento"
                  text="Das 06h às 20h"
                />

                <RoutinePoint
                  title="Alimentação"
                  text="Café da manhã, almoço, lanches e janta conforme o período."
                />

                <RoutinePoint
                  title="Balé"
                  text="Quartas e sextas-feiras, manhã e tarde."
                />
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <a
              href="/solicitacao"
              className="inline-block bg-[#9A4F2E] text-white px-8 py-4 rounded-full font-black hover:bg-[#7E3F25] transition shadow-lg"
            >
              Fazer solicitação
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

function ServiceCard({ href, icon: Icon, title, text }) {
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

function PlanCard({ icon: Icon, title, price, text, href, buttonText }) {
  return (
    <div className="bg-white rounded-[2rem] p-6 border border-[#D8C8AA] shadow-sm">
      <div className="w-14 h-14 rounded-2xl bg-[#F4EAD6] border border-[#D8C8AA] flex items-center justify-center text-[#6B722E]">
        <Icon size={28} />
      </div>

      <h3 className="mt-5 text-2xl font-black text-[#2F2A22]">
        {title}
      </h3>

      <p className="mt-2 text-2xl font-black text-[#6B722E]">
        {price}
      </p>

      <p className="mt-3 text-[#5B4A39]">
        {text}
      </p>

      <a
        href={href}
        className="inline-block mt-6 bg-[#6B722E] text-white px-5 py-3 rounded-full font-black hover:bg-[#596025] transition"
      >
        {buttonText}
      </a>
    </div>
  )
}

function RoutinePoint({ title, text }) {
  return (
    <div className="bg-white rounded-3xl p-5 text-[#2F2A22]">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-2xl bg-[#F4EAD6] border border-[#D8C8AA] flex items-center justify-center text-[#6B722E]">
          <Home size={24} />
        </div>

        <div>
          <h3 className="font-black text-[#6B722E]">
            {title}
          </h3>

          <p className="mt-1 text-[#5B4A39] font-semibold">
            {text}
          </p>
        </div>
      </div>
    </div>
  )
}

export default ServicesPage