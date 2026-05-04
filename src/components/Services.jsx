import {
  Baby,
  BookOpen,
  Clock,
  Droplets,
  HeartHandshake,
  Music,
  Palette,
  Utensils,
} from 'lucide-react'

const services = [
  {
    icon: HeartHandshake,
    title: 'Cuidado integral',
    description:
      'Atendimento durante o dia com acolhimento, alimentação, descanso, recreação e acompanhamento da rotina da criança.',
  },
  {
    icon: Utensils,
    title: 'Alimentação completa',
    description:
      'A rotina inclui café da manhã, almoço, lanche da tarde, janta e lanche do fim do dia, conforme o horário da criança.',
  },
  {
    icon: Droplets,
    title: 'Banho e higiene',
    description:
      'Momentos de banho, cuidado pessoal e organização para garantir conforto e bem-estar ao longo do dia.',
  },
  {
    icon: Palette,
    title: 'Recreação',
    description:
      'Brincadeiras, atividades lúdicas e momentos de socialização para estimular criatividade, alegria e interação.',
  },
  {
    icon: BookOpen,
    title: 'Reforço escolar',
    description:
      'Apoio nas atividades escolares, acompanhamento das tarefas e incentivo ao aprendizado.',
  },
  {
    icon: Music,
    title: 'Balé',
    description:
      'Atividade especial realizada nas quartas e sextas-feiras, no turno da manhã e no turno da tarde.',
  },
  {
    icon: Baby,
    title: 'Divisão por idade',
    description:
      'As crianças são divididas em dois prédios: menores, de 4 meses até 4 ou 5 anos, e maiores, de 5 até 11 ou 12 anos.',
  },
  {
    icon: Clock,
    title: 'Funcionamento das 06h às 20h',
    description:
      'O atendimento acontece durante o dia, das 06:00 às 20:00, sem funcionamento após esse horário.',
  },
]

function Services() {
  return (
    <section id="servicos" className="py-24 bg-[#FFFDF8]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto">
          <span className="inline-flex bg-[#E6D7B8] text-[#6B722E] px-5 py-2 rounded-full font-black">
            Nossos serviços
          </span>

          <h2 className="mt-5 text-4xl md:text-5xl font-black text-[#2F2A22]">
            Uma rotina completa para cuidar, brincar e aprender
          </h2>

          <p className="mt-4 text-[#5B4A39] text-lg">
            A Pousada Aconchego oferece um ambiente organizado, acolhedor e
            seguro para crianças durante o dia, com atividades pensadas para
            cada fase da infância.
          </p>
        </div>

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <ServiceCard
              key={service.title}
              icon={service.icon}
              title={service.title}
              description={service.description}
            />
          ))}
        </div>

        <div className="mt-16 bg-[#6B722E] rounded-[2.5rem] p-8 md:p-10 text-white shadow-xl">
          <div className="grid lg:grid-cols-3 gap-8 items-center">
            <div className="lg:col-span-2">
              <span className="inline-flex bg-[#C99A3D] text-white px-5 py-2 rounded-full font-black">
                Diferencial da Pousada Aconchego
              </span>

              <h3 className="mt-5 text-3xl md:text-4xl font-black">
                Cuidado durante o dia, com rotina organizada e acolhedora.
              </h3>

              <p className="mt-4 text-[#F4EAD6] text-lg">
                O funcionamento acontece das 06h às 20h, com alimentação,
                descanso, banho, recreação, reforço escolar e atividades
                especiais dentro desse período.
              </p>
            </div>

            <div className="bg-white text-[#2F2A22] rounded-[2rem] p-6 shadow-lg">
              <div className="w-14 h-14 rounded-2xl bg-[#F4EAD6] border border-[#D8C8AA] flex items-center justify-center text-[#6B722E]">
                <Clock size={28} />
              </div>

              <h4 className="mt-4 text-2xl font-black text-[#6B722E]">
                06h às 20h
              </h4>

              <p className="mt-3 text-[#5B4A39] font-semibold">
                Atendimento diurno, com ambiente tranquilo, seguro e charmoso.
              </p>

              <a
                href="/solicitacao"
                className="inline-block mt-6 bg-[#9A4F2E] text-white px-6 py-3 rounded-full font-black hover:bg-[#7E3F25] transition"
              >
                Fazer solicitação
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function ServiceCard({ icon: Icon, title, description }) {
  return (
    <div className="bg-[#F8F1E4] border border-[#D8C8AA] rounded-[2rem] p-7 shadow-sm hover:shadow-lg hover:-translate-y-1 transition">
      <div className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center text-[#6B722E] shadow-sm border border-[#D8C8AA]">
        <Icon size={30} />
      </div>

      <h3 className="mt-6 text-2xl font-black text-[#2F2A22]">
        {title}
      </h3>

      <p className="mt-3 text-[#5B4A39]">
        {description}
      </p>
    </div>
  )
}

export default Services