const services = [
  {
    icon: '🏡',
    title: 'Cuidado integral',
    description:
      'Atendimento completo durante o dia, com acolhimento, alimentação, descanso, recreação e acompanhamento da rotina da criança.',
    color: 'bg-[#EAF6FF]',
    border: 'border-blue-100',
  },
  {
    icon: '🍽️',
    title: 'Café da manhã e lanche',
    description:
      'A rotina alimentar inclui café da manhã, almoço, lanche da tarde, janta e lanche da noite, conforme o período da criança.',
    color: 'bg-[#FFF9D9]',
    border: 'border-yellow-100',
  },
  {
    icon: '🛁',
    title: 'Banho e higiene',
    description:
      'Momentos de banho, cuidado pessoal e organização para garantir bem-estar, conforto e uma rotina mais tranquila.',
    color: 'bg-[#EFFDF3]',
    border: 'border-green-100',
  },
  {
    icon: '🧸',
    title: 'Recreação',
    description:
      'Brincadeiras, atividades lúdicas e momentos de socialização para estimular criatividade, alegria e interação.',
    color: 'bg-[#FFECEC]',
    border: 'border-red-100',
  },
  {
    icon: '📚',
    title: 'Reforço escolar',
    description:
      'Apoio nas atividades escolares, acompanhamento das tarefas e incentivo ao aprendizado durante a rotina.',
    color: 'bg-[#EAF6FF]',
    border: 'border-blue-100',
  },
  {
    icon: '🩰',
    title: 'Balé',
    description:
      'Atividade especial realizada nas quartas e sextas-feiras, tanto pela manhã quanto pela tarde.',
    color: 'bg-[#F5EDFF]',
    border: 'border-purple-100',
  },
  {
    icon: '👶',
    title: 'Divisão por idade',
    description:
      'As crianças são divididas em dois prédios: menores, de 4 meses até 4 ou 5 anos, e maiores, de 5 até 11 ou 12 anos.',
    color: 'bg-[#FFF7ED]',
    border: 'border-orange-100',
  },
  {
    icon: '⏰',
    title: 'Funcionamento das 06h às 20h',
    description:
      'O hotelzinho funciona de segunda a sexta, das 06:00 da manhã até 20:00 da noite, oferecendo apoio durante todo o dia.',
    color: 'bg-[#EAF6FF]',
    border: 'border-blue-100',
  },
]

function Services() {
  return (
    <section id="servicos" className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto">
          <span className="inline-flex bg-[#FFD84D] text-[#1238A8] px-5 py-2 rounded-full font-black">
            Nossos serviços
          </span>

          <h2 className="mt-5 text-4xl md:text-5xl font-black text-gray-900">
            Uma rotina completa para cuidar, brincar e aprender
          </h2>

          <p className="mt-4 text-gray-600 text-lg">
            O Hotelzinho Criativa oferece uma rotina organizada para crianças de
            diferentes idades, com cuidado, alimentação, higiene, recreação,
            reforço escolar e atividades especiais.
          </p>
        </div>

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-7">
          {services.map((service) => (
            <div
              key={service.title}
              className={`${service.color} ${service.border} border-2 rounded-[2rem] p-7 shadow-sm hover:shadow-xl hover:-translate-y-1 transition`}
            >
              <div className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center text-4xl shadow">
                {service.icon}
              </div>

              <h3 className="mt-6 text-2xl font-black text-gray-900">
                {service.title}
              </h3>

              <p className="mt-3 text-gray-600">
                {service.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-[#1238A8] rounded-[2.5rem] p-8 md:p-10 text-white shadow-2xl">
          <div className="grid lg:grid-cols-3 gap-8 items-center">
            <div className="lg:col-span-2">
              <span className="inline-flex bg-[#FFD84D] text-[#1238A8] px-5 py-2 rounded-full font-black">
                Diferenciais do Hotelzinho Criativa
              </span>

              <h3 className="mt-5 text-3xl md:text-4xl font-black">
                Mais do que cuidar, é criar uma rotina segura e acolhedora.
              </h3>

              <p className="mt-4 text-blue-100 text-lg">
                Com horários bem definidos, espaços separados por faixa etária e
                atividades pensadas para cada momento do dia, o hotelzinho
                oferece apoio real para as famílias e uma experiência mais
                tranquila para as crianças.
              </p>
            </div>

            <div className="bg-white text-gray-900 rounded-[2rem] p-6 shadow-xl">
              <div className="text-5xl">🌈</div>

              <h4 className="mt-4 text-2xl font-black text-[#1238A8]">
                Das 06h às 20h
              </h4>

              <p className="mt-3 text-gray-600 font-semibold">
                Uma rotina completa com alimentação, descanso, banho, recreação,
                reforço escolar e balé em dias específicos.
              </p>

              <a
                href="#reserva"
                className="inline-block mt-6 bg-[#FF3B3B] text-white px-6 py-3 rounded-full font-black hover:bg-red-600 transition"
              >
                Solicitar reserva
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Services