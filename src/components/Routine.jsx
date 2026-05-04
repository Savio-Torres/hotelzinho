import {
  Bed,
  BookOpen,
  Clock,
  Coffee,
  Droplets,
  Home,
  Moon,
  Palette,
  Utensils,
} from 'lucide-react'

const morningRoutine = [
  {
    time: '06:00',
    activity: 'Chegada e acolhimento',
    description: 'Recepção das crianças com carinho, atenção e organização.',
    icon: Home,
  },
  {
    time: '06:30',
    activity: 'Soneca opcional',
    description: 'Para as crianças que chegam cedo e desejam descansar um pouco.',
    icon: Bed,
  },
  {
    time: '07:00',
    activity: 'Café da manhã',
    description: 'Momento de alimentação para começar bem o dia.',
    icon: Coffee,
  },
  {
    time: '08:00',
    activity: 'Banho e organização',
    description: 'Cuidado com higiene e bem-estar da criança.',
    icon: Droplets,
  },
  {
    time: '09:00',
    activity: 'Recreação',
    description: 'Brincadeiras, atividades lúdicas e socialização.',
    icon: Palette,
  },
  {
    time: '10:30',
    activity: 'Reforço escolar',
    description: 'Apoio nas atividades escolares e desenvolvimento.',
    icon: BookOpen,
  },
]

const lunchRoutine = [
  {
    time: '12:00',
    activity: 'Almoço',
    description: 'Refeição principal do dia, com acompanhamento e cuidado.',
    icon: Utensils,
  },
  {
    time: '13:00',
    activity: 'Soneca pós-almoço',
    description: 'Momento de descanso para recuperar as energias.',
    icon: Bed,
  },
]

const afternoonRoutine = [
  {
    time: '14:00',
    activity: 'Lanche da tarde',
    description: 'Pausa para alimentação e retomada das atividades.',
    icon: Coffee,
  },
  {
    time: '14:30',
    activity: 'Banho e cuidados',
    description: 'Momento de higiene, cuidado e organização.',
    icon: Droplets,
  },
  {
    time: '15:00',
    activity: 'Recreação',
    description: 'Atividades criativas, brincadeiras e interação.',
    icon: Palette,
  },
  {
    time: '16:30',
    activity: 'Reforço escolar',
    description: 'Acompanhamento das tarefas e apoio pedagógico.',
    icon: BookOpen,
  },
]

const endDayRoutine = [
  {
    time: '18:00',
    activity: 'Janta',
    description: 'Refeição para as crianças que permanecem até o final do dia.',
    icon: Utensils,
  },
  {
    time: '19:00',
    activity: 'Lanche do fim do dia',
    description: 'Último lanche antes da saída, dentro do horário de funcionamento.',
    icon: Coffee,
  },
  {
    time: '20:00',
    activity: 'Encerramento',
    description: 'Finalização das atividades e saída das crianças até as 20h.',
    icon: Moon,
  },
]

function Routine() {
  return (
    <section id="rotina" className="py-24 bg-[#F4EAD6]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto">
          <span className="inline-flex bg-[#C99A3D] text-white px-5 py-2 rounded-full font-black">
            Rotina do hotelzinho
          </span>

          <h2 className="mt-5 text-4xl md:text-5xl font-black text-[#2F2A22]">
            Uma rotina completa das 06h às 20h
          </h2>

          <p className="mt-4 text-[#5B4A39] text-lg">
            A rotina da Pousada Aconchego inclui alimentação, banho, descanso,
            recreação, reforço escolar e atividades especiais ao longo do dia.
          </p>
        </div>

        <div className="mt-12 bg-white rounded-[2.5rem] p-6 md:p-8 shadow-md border border-[#D8C8AA]">
          <div className="grid md:grid-cols-4 gap-5 text-center">
            <InfoCard
              icon={Clock}
              title="Funcionamento"
              text="06:00 às 20:00"
            />

            <InfoCard
              icon={Utensils}
              title="Alimentação"
              text="Café, almoço, lanches e janta"
            />

            <InfoCard
              icon={Bed}
              title="Descanso"
              text="Soneca opcional e pós-almoço"
            />

            <InfoCard
              icon={BookOpen}
              title="Reforço"
              text="Acompanhamento escolar"
            />
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

        <div className="mt-14 bg-[#6B722E] rounded-[2.5rem] p-8 md:p-10 text-white shadow-xl">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <span className="inline-flex bg-[#C99A3D] text-white px-5 py-2 rounded-full font-black">
                Organização por idade
              </span>

              <h3 className="mt-5 text-3xl md:text-4xl font-black">
                Dois prédios preparados para cada fase da criança
              </h3>

              <p className="mt-4 text-[#F4EAD6] text-lg">
                O espaço é dividido para oferecer mais segurança, conforto e
                atividades adequadas para cada idade.
              </p>
            </div>

            <div className="grid gap-5">
              <AgeCard
                title="Prédio dos menores"
                text="Crianças de 4 meses até 4 ou 5 anos."
              />

              <AgeCard
                title="Prédio dos maiores"
                text="Crianças de 5 até 11 ou 12 anos."
              />
            </div>
          </div>
        </div>

        <div className="mt-10 bg-white rounded-[2rem] p-6 border border-[#D8C8AA] shadow-sm text-center">
          <p className="text-[#5B4A39] font-semibold">
            A Pousada Aconchego não possui funcionamento após as 20h. Todas as
            atividades e saídas acontecem dentro do horário informado.
          </p>
        </div>
      </div>
    </section>
  )
}

function RoutineGroup({ title, subtitle, items }) {
  return (
    <div className="bg-white rounded-[2.5rem] p-6 shadow-md border border-[#D8C8AA]">
      <div className="mb-6">
        <span className="inline-flex bg-[#E6D7B8] text-[#6B722E] px-5 py-2 rounded-full font-black">
          {title}
        </span>

        <h3 className="mt-4 text-2xl md:text-3xl font-black text-[#2F2A22]">
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

function RoutineCard({ item }) {
  const Icon = item.icon

  return (
    <div className="bg-white rounded-[2rem] p-5 shadow-sm border border-[#D8C8AA] hover:shadow-md hover:-translate-y-1 transition">
      <div className="flex items-start gap-4">
        <div className="w-14 h-14 rounded-2xl bg-[#F4EAD6] flex items-center justify-center text-[#6B722E] border border-[#D8C8AA]">
          <Icon size={24} />
        </div>

        <div>
          <span className="inline-block text-[#6B722E] font-black">
            {item.time}
          </span>

          <h3 className="text-xl font-black text-[#2F2A22]">
            {item.activity}
          </h3>

          <p className="mt-2 text-[#5B4A39] text-sm">
            {item.description}
          </p>
        </div>
      </div>
    </div>
  )
}

function InfoCard({ icon: Icon, title, text }) {
  return (
    <div className="bg-[#F8F1E4] rounded-3xl p-6 border border-[#D8C8AA]">
      <div className="w-12 h-12 rounded-2xl bg-white border border-[#D8C8AA] flex items-center justify-center text-[#6B722E] mx-auto">
        <Icon size={24} />
      </div>

      <h3 className="mt-4 text-xl font-black text-[#6B722E]">
        {title}
      </h3>

      <p className="mt-2 text-[#5B4A39] font-bold">
        {text}
      </p>
    </div>
  )
}

function AgeCard({ title, text }) {
  return (
    <div className="bg-white text-[#2F2A22] rounded-3xl p-6">
      <h4 className="text-xl font-black text-[#6B722E]">
        {title}
      </h4>

      <p className="mt-2 text-[#5B4A39] font-semibold">
        {text}
      </p>
    </div>
  )
}

export default Routine