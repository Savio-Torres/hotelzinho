const morningRoutine = [
  {
    time: '06:00',
    activity: 'Chegada e acolhimento',
    description: 'Recepção das crianças com carinho, atenção e organização.',
    icon: '🤗',
  },
  {
    time: '06:30',
    activity: 'Soneca opcional',
    description: 'Para as crianças que chegam cedo e desejam descansar um pouco.',
    icon: '😴',
  },
  {
    time: '07:00',
    activity: 'Café da manhã',
    description: 'Momento de alimentação para começar bem o dia.',
    icon: '🍞',
  },
  {
    time: '08:00',
    activity: 'Banho e organização',
    description: 'Cuidado com higiene e bem-estar da criança.',
    icon: '🛁',
  },
  {
    time: '09:00',
    activity: 'Recreação',
    description: 'Brincadeiras, atividades lúdicas e socialização.',
    icon: '🧸',
  },
  {
    time: '10:30',
    activity: 'Reforço escolar',
    description: 'Apoio nas atividades escolares e desenvolvimento.',
    icon: '📚',
  },
]

const lunchRoutine = [
  {
    time: '12:00',
    activity: 'Almoço',
    description: 'Refeição principal do dia, com acompanhamento e cuidado.',
    icon: '🍽️',
  },
  {
    time: '13:00',
    activity: 'Soneca pós-almoço',
    description: 'Momento de descanso para recuperar as energias.',
    icon: '🛏️',
  },
]

const afternoonRoutine = [
  {
    time: '14:00',
    activity: 'Lanche da tarde',
    description: 'Pausa para alimentação e retomada das atividades.',
    icon: '🍎',
  },
  {
    time: '14:30',
    activity: 'Banho e cuidados',
    description: 'Momento de higiene, cuidado e organização.',
    icon: '🛁',
  },
  {
    time: '15:00',
    activity: 'Recreação',
    description: 'Atividades criativas, brincadeiras e interação.',
    icon: '🎨',
  },
  {
    time: '16:30',
    activity: 'Reforço escolar',
    description: 'Acompanhamento das tarefas e apoio pedagógico.',
    icon: '✏️',
  },
]

const endDayRoutine = [
  {
    time: '18:00',
    activity: 'Janta',
    description: 'Refeição para as crianças que permanecem até o final do dia.',
    icon: '🍛',
  },
  {
    time: '19:00',
    activity: 'Lanche do fim do dia',
    description: 'Último lanche antes da saída, dentro do horário de funcionamento.',
    icon: '🥛',
  },
  {
    time: '20:00',
    activity: 'Encerramento',
    description: 'Finalização das atividades e saída das crianças até as 20h.',
    icon: '🏡',
  },
]

function RoutineCard({ item }) {
  return (
    <div className="bg-white rounded-[2rem] p-5 shadow-sm border border-blue-100 hover:shadow-lg hover:-translate-y-1 transition">
      <div className="flex items-start gap-4">
        <div className="w-14 h-14 rounded-2xl bg-[#EAF6FF] flex items-center justify-center text-2xl border border-blue-100">
          {item.icon}
        </div>

        <div>
          <span className="inline-block text-[#1238A8] font-black">
            {item.time}
          </span>

          <h3 className="text-xl font-black text-gray-900">
            {item.activity}
          </h3>

          <p className="mt-2 text-gray-600 text-sm">
            {item.description}
          </p>
        </div>
      </div>
    </div>
  )
}

function RoutineGroup({ title, subtitle, items }) {
  return (
    <div className="bg-white rounded-[2.5rem] p-6 shadow-md border border-blue-100">
      <div className="mb-6">
        <span className="inline-flex bg-[#FFD84D] text-[#1238A8] px-5 py-2 rounded-full font-black">
          {title}
        </span>

        <h3 className="mt-4 text-2xl md:text-3xl font-black text-gray-900">
          {subtitle}
        </h3>
      </div>

      <div className="space-y-5">
        {items.map((item) => (
          <RoutineCard key={item.time + item.activity} item={item} />
        ))}
      </div>
    </div>
  )
}

function Routine() {
  return (
    <section id="rotina" className="py-24 bg-[#F8FBFF]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto">
          <span className="inline-flex bg-[#FFD84D] text-[#1238A8] px-5 py-2 rounded-full font-black">
            Rotina do Hotelzinho
          </span>

          <h2 className="mt-5 text-4xl md:text-5xl font-black text-gray-900">
            Uma rotina completa das 06h às 20h
          </h2>

          <p className="mt-4 text-gray-600 text-lg">
            A rotina do Hotelzinho Criativa inclui alimentação, banho, descanso,
            recreação, reforço escolar e atividades especiais ao longo do dia,
            sempre dentro do horário de funcionamento.
          </p>
        </div>

        <div className="mt-12 bg-white rounded-[2.5rem] p-6 md:p-8 shadow-md border border-blue-100">
          <div className="grid md:grid-cols-4 gap-5 text-center">
            <div className="bg-[#F8FBFF] rounded-3xl p-6 border border-blue-100">
              <div className="text-4xl">⏰</div>

              <h3 className="mt-3 text-xl font-black text-[#1238A8]">
                Funcionamento
              </h3>

              <p className="mt-2 text-gray-700 font-bold">
                06:00 às 20:00
              </p>
            </div>

            <div className="bg-[#F8FBFF] rounded-3xl p-6 border border-blue-100">
              <div className="text-4xl">🍽️</div>

              <h3 className="mt-3 text-xl font-black text-[#1238A8]">
                Alimentação
              </h3>

              <p className="mt-2 text-gray-700 font-bold">
                Café, almoço, lanches e janta
              </p>
            </div>

            <div className="bg-[#F8FBFF] rounded-3xl p-6 border border-blue-100">
              <div className="text-4xl">😴</div>

              <h3 className="mt-3 text-xl font-black text-[#1238A8]">
                Descanso
              </h3>

              <p className="mt-2 text-gray-700 font-bold">
                Soneca opcional e pós-almoço
              </p>
            </div>

            <div className="bg-[#F8FBFF] rounded-3xl p-6 border border-blue-100">
              <div className="text-4xl">🩰</div>

              <h3 className="mt-3 text-xl font-black text-[#1238A8]">
                Balé
              </h3>

              <p className="mt-2 text-gray-700 font-bold">
                Quartas e sextas
              </p>
            </div>
          </div>
        </div>

        <div className="mt-14 grid lg:grid-cols-2 gap-8">
          <RoutineGroup
            title="Manhã"
            subtitle="Acolhimento, descanso, cuidado e aprendizado"
            items={morningRoutine}
          />

          <RoutineGroup
            title="Meio do dia"
            subtitle="Almoço e momento de descanso"
            items={lunchRoutine}
          />

          <RoutineGroup
            title="Tarde"
            subtitle="Lanche, recreação e reforço escolar"
            items={afternoonRoutine}
          />

          <RoutineGroup
            title="Fim do dia"
            subtitle="Janta, lanche e encerramento até as 20h"
            items={endDayRoutine}
          />
        </div>

        <div className="mt-14 bg-[#1238A8] rounded-[2.5rem] p-8 md:p-10 text-white shadow-xl">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <span className="inline-flex bg-[#FFD84D] text-[#1238A8] px-5 py-2 rounded-full font-black">
                Organização por idade
              </span>

              <h3 className="mt-5 text-3xl md:text-4xl font-black">
                Dois prédios preparados para cada fase da criança
              </h3>

              <p className="mt-4 text-blue-100 text-lg">
                O espaço é dividido para oferecer mais segurança, conforto e
                atividades adequadas para cada idade.
              </p>
            </div>

            <div className="grid gap-5">
              <div className="bg-white text-gray-900 rounded-3xl p-6">
                <div className="text-4xl">👶</div>

                <h4 className="mt-3 text-xl font-black text-[#1238A8]">
                  Prédio dos menores
                </h4>

                <p className="mt-2 text-gray-600 font-semibold">
                  Crianças de 4 meses até 4 ou 5 anos.
                </p>
              </div>

              <div className="bg-white text-gray-900 rounded-3xl p-6">
                <div className="text-4xl">🧒</div>

                <h4 className="mt-3 text-xl font-black text-[#1238A8]">
                  Prédio dos maiores
                </h4>

                <p className="mt-2 text-gray-600 font-semibold">
                  Crianças de 5 até 11 ou 12 anos.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 bg-white rounded-[2rem] p-6 border border-blue-100 shadow-sm text-center">
          <p className="text-gray-600 font-semibold">
            O Hotelzinho Criativa não possui funcionamento após as 20h. Todas as
            atividades e saídas acontecem dentro do horário informado.
          </p>
        </div>
      </div>
    </section>
  )
}

export default Routine