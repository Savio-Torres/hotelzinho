import { useState } from 'react'
import {
  ArrowLeft,
  CalendarDays,
  Camera,
  Droplets,
  HeartHandshake,
  Music,
  Palette,
  ReceiptText,
  ShieldCheck,
  Utensils,
} from 'lucide-react'

const serviceDetails = {
  'cuidado-integral': {
    label: 'Cuidado integral',
    title: 'Cuidado, acolhimento e rotina organizada',
    subtitle:
      'Acompanhamento durante o dia com atenção, carinho e uma rotina pensada para o bem-estar da criança.',
    icon: HeartHandshake,
    heroImage: '/cuidado-1.png',
    galleryImages: ['/cuidado-2.png', '/cuidado-3.png', '/cuidado-4.png'],
    sections: [
      {
        title: 'Acompanhamento durante o dia',
        text: 'O cuidado integral envolve atenção à rotina da criança, alimentação, higiene, descanso, recreação e acompanhamento das necessidades individuais.',
      },
      {
        title: 'Ambiente acolhedor',
        text: 'A proposta é fazer com que a criança se sinta segura e bem recebida, em um espaço com clima familiar e organizado.',
      },
      {
        title: 'Comunicação com responsáveis',
        text: 'As informações importantes sobre cuidados, observações e necessidades da criança podem ser registradas para melhor acompanhamento.',
      },
    ],
    highlights: [
      'Rotina organizada',
      'Acolhimento durante o dia',
      'Atenção às necessidades da criança',
      'Ambiente seguro e familiar',
    ],
  },

  alimentacao: {
    label: 'Alimentação',
    title: 'Refeições durante a rotina',
    subtitle:
      'Café da manhã, almoço, lanche da tarde, janta e lanche da noite, conforme o horário da criança.',
    icon: Utensils,
    heroImage: '/alimentacao-1.png',
    galleryImages: ['/alimentacao-2.png', '/alimentacao-3.png'],
    sections: [
      {
        title: 'Alimentação ao longo do dia',
        text: 'A rotina pode incluir café da manhã, almoço, lanche da tarde, janta e lanche da noite, de acordo com o período em que a criança permanece no hotelzinho.',
      },
      {
        title: 'Atenção às restrições',
        text: 'As restrições alimentares e alergias devem ser informadas pelos responsáveis no momento da solicitação.',
      },
      {
        title: 'Organização dos horários',
        text: 'As refeições fazem parte da rotina diária, ajudando a manter previsibilidade e cuidado com o bem-estar da criança.',
      },
    ],
    highlights: [
      'Café da manhã',
      'Almoço',
      'Lanche da tarde',
      'Janta e lanche da noite',
    ],
  },

  'banho-higiene': {
    label: 'Banho e higiene',
    title: 'Cuidado com higiene e conforto',
    subtitle:
      'Momentos de banho, higiene e organização pessoal para garantir conforto durante o dia.',
    icon: Droplets,
    heroImage: '/banho-1.png',
    galleryImages: ['/banho-2.png', '/banho-3.png'],
    sections: [
      {
        title: 'Banho e cuidado pessoal',
        text: 'O banho e os cuidados de higiene fazem parte da rotina, oferecendo mais conforto para a criança durante o período no hotelzinho.',
      },
      {
        title: 'Organização da criança',
        text: 'A equipe acompanha os momentos de higiene com atenção, respeitando a idade e as necessidades de cada criança.',
      },
      {
        title: 'Bem-estar',
        text: 'A higiene adequada ajuda a criança a se sentir melhor, mais confortável e tranquila ao longo do dia.',
      },
    ],
    highlights: [
      'Banho durante a rotina',
      'Cuidado com higiene',
      'Mais conforto para a criança',
      'Atenção individual',
    ],
  },

  recreacao: {
    label: 'Recreação',
    title: 'Brincar também faz parte do cuidado',
    subtitle:
      'Atividades lúdicas, brincadeiras, criatividade e socialização durante a rotina.',
    icon: Palette,
    heroImage: '/recreacao-1.png',
    galleryImages: ['/recreacao-2.png', '/recreacao-3.png', '/recreacao-4.png'],
    sections: [
      {
        title: 'Brincadeiras e socialização',
        text: 'A recreação ajuda a criança a interagir, criar vínculos, desenvolver criatividade e aproveitar melhor a rotina.',
      },
      {
        title: 'Atividades por idade',
        text: 'As atividades são pensadas de acordo com a faixa etária, respeitando o desenvolvimento e o ritmo de cada criança.',
      },
      {
        title: 'Momentos leves e criativos',
        text: 'A rotina inclui momentos de brincadeira, expressão, convivência e atividades que tornam o dia mais agradável.',
      },
    ],
    highlights: [
      'Brincadeiras',
      'Socialização',
      'Criatividade',
      'Atividades por idade',
    ],
  },

  bale: {
    label: 'Balé',
    title: 'Balé nas quartas e sextas',
    subtitle:
      'Atividade especial realizada nas quartas e sextas-feiras, no turno da manhã e da tarde.',
    icon: Music,
    heroImage: '/bale-1.png',
    galleryImages: ['/bale-2.png', '/bale-3.png'],
    price: 'R$ 100,00 por mês',
    sections: [
      {
        title: 'Atividade especial',
        text: 'O balé é uma atividade complementar que trabalha movimento, disciplina, coordenação e expressão corporal.',
      },
      {
        title: 'Dias de aula',
        text: 'As aulas acontecem nas quartas e sextas-feiras, com disponibilidade nos turnos da manhã e da tarde.',
      },
      {
        title: 'Mensalidade do balé',
        text: 'O valor mensal definido para o balé é de R$ 100,00.',
      },
    ],
    highlights: [
      'Quartas e sextas-feiras',
      'Manhã e tarde',
      'R$ 100,00 por mês',
      'Atividade complementar',
    ],
  },

  diaria: {
    label: 'Diária',
    title: 'Diária para necessidades pontuais',
    subtitle:
      'Ideal para responsáveis que precisam do hotelzinho em um dia específico ou período combinado.',
    icon: CalendarDays,
    heroImage: '/diaria-1.png',
    galleryImages: ['/diaria-2.png', '/diaria-3.png'],
    price: 'R$ 70,00 por diária',
    sections: [
      {
        title: 'Atendimento por dia',
        text: 'A diária é indicada para quando o responsável precisa deixar a criança no hotelzinho em um dia específico.',
      },
      {
        title: 'Rotina incluída',
        text: 'A diária inclui os cuidados da rotina, como alimentação conforme horário, banho, recreação, descanso e reforço escolar quando necessário.',
      },
      {
        title: 'Valor da diária',
        text: 'O valor definido para a diária é de R$ 70,00.',
      },
    ],
    highlights: [
      'R$ 70,00 por diária',
      'Horário combinado',
      'Rotina incluída',
      'Ideal para dias pontuais',
    ],
  },

  mensalidade: {
    label: 'Mensalidade',
    title: 'Planos mensais para uma rotina contínua',
    subtitle:
      'Opções de mensalidade para manhã, tarde ou período integral, conforme a necessidade da família.',
    icon: ReceiptText,
    heroImage: '/mensalidade-1.png',
    galleryImages: ['/mensalidade-2.png', '/mensalidade-3.png'],
    sections: [
      {
        title: 'Mensalidade período da manhã',
        text: 'Plano mensal para crianças que frequentam o hotelzinho no período da manhã. Valor: R$ 400,00.',
      },
      {
        title: 'Mensalidade período da tarde',
        text: 'Plano mensal para crianças que frequentam o hotelzinho no período da tarde. Valor: R$ 400,00.',
      },
      {
        title: 'Mensalidade integral',
        text: 'Plano mensal para crianças que ficam em período integral. Valor: R$ 800,00.',
      },
    ],
    highlights: [
      'Manhã: R$ 400,00',
      'Tarde: R$ 400,00',
      'Integral: R$ 800,00',
      'Rotina contínua',
    ],
  },
}

function ServicesDetailPage({ type }) {
  const detail = serviceDetails[type] || serviceDetails['cuidado-integral']
  const Icon = detail.icon

  return (
    <section className="min-h-screen bg-[#F4EAD6] py-10">
      <div className="max-w-7xl mx-auto px-6">
        <a
          href="/servicos"
          className="inline-flex items-center gap-2 text-[#6B722E] font-black hover:underline mb-8"
        >
          <ArrowLeft size={20} />
          Voltar para Serviços
        </a>

        <div className="bg-white rounded-[2.5rem] p-6 md:p-10 shadow-xl border border-[#D8C8AA]">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <span className="inline-flex items-center gap-2 bg-[#E6D7B8] text-[#6B722E] px-5 py-2 rounded-full font-black">
                <Icon size={18} />
                {detail.label}
              </span>

              <h1 className="mt-5 text-4xl md:text-6xl font-black text-[#2F2A22] leading-tight">
                {detail.title}
              </h1>

              <p className="mt-5 text-lg text-[#5B4A39]">
                {detail.subtitle}
              </p>

              {detail.price && (
                <div className="mt-6 inline-flex items-center gap-2 bg-[#F8F1E4] border border-[#D8C8AA] text-[#6B722E] px-5 py-3 rounded-2xl font-black">
                  <ReceiptText size={20} />
                  {detail.price}
                </div>
              )}

              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <a
                  href="/solicitacao"
                  className="bg-[#6B722E] text-white px-7 py-4 rounded-full font-black hover:bg-[#596025] transition text-center"
                >
                  Fazer solicitação
                </a>

                <a
                  href="/sobre"
                  className="bg-white text-[#6B722E] border-2 border-[#6B722E] px-7 py-4 rounded-full font-black hover:bg-[#F8F1E4] transition text-center"
                >
                  Conhecer estrutura
                </a>
              </div>
            </div>

            <PhotoCard src={detail.heroImage} title={detail.label} large />
          </div>

          {detail.galleryImages?.length > 0 && (
            <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {detail.galleryImages.map((image, index) => (
                <PhotoCard
                  key={image}
                  src={image}
                  title={`${detail.label} ${index + 1}`}
                />
              ))}
            </div>
          )}

          <div className="mt-14 grid lg:grid-cols-3 gap-6">
            {detail.sections.map((section) => (
              <div
                key={section.title}
                className="bg-[#F8F1E4] rounded-[2rem] p-6 border border-[#D8C8AA]"
              >
                <div className="w-12 h-12 rounded-2xl bg-white border border-[#D8C8AA] flex items-center justify-center text-[#6B722E]">
                  <HeartHandshake size={24} />
                </div>

                <h3 className="mt-4 text-2xl font-black text-[#2F2A22]">
                  {section.title}
                </h3>

                <p className="mt-3 text-[#5B4A39]">
                  {section.text}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-14 bg-[#6B722E] rounded-[2.5rem] p-8 md:p-10 text-white">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <span className="inline-flex bg-[#C99A3D] text-white px-5 py-2 rounded-full font-black">
                  Resumo do serviço
                </span>

                <h2 className="mt-5 text-3xl md:text-4xl font-black">
                  Principais informações
                </h2>

                <p className="mt-4 text-[#F4EAD6] text-lg">
                  Veja os pontos principais desse serviço e escolha a melhor
                  opção para a rotina da criança.
                </p>
              </div>

              <div className="grid gap-4">
                {detail.highlights.map((item) => (
                  <div
                    key={item}
                    className="bg-white rounded-3xl p-5 text-[#2F2A22] flex items-start gap-4"
                  >
                    <div className="w-11 h-11 rounded-2xl bg-[#F4EAD6] border border-[#D8C8AA] flex items-center justify-center text-[#6B722E]">
                      <ShieldCheck size={22} />
                    </div>

                    <p className="font-black text-[#5B4A39]">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <a
              href="/servicos"
              className="inline-block bg-[#F8F1E4] text-[#6B722E] border-2 border-[#6B722E] px-7 py-4 rounded-full font-black hover:bg-[#EFE4CC] transition"
            >
              Ver outros serviços
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

function PhotoCard({ src, title, large = false }) {
  const [hasError, setHasError] = useState(false)

  return (
    <div
      className={`bg-[#F8F1E4] border border-[#D8C8AA] rounded-[2rem] overflow-hidden shadow-sm ${
        large ? 'min-h-[360px]' : 'min-h-[260px]'
      }`}
    >
      {!hasError ? (
        <img
          src={src}
          alt={title}
          onError={() => setHasError(true)}
          className={`w-full object-cover ${
            large ? 'h-[360px]' : 'h-[260px]'
          }`}
        />
      ) : (
        <div
          className={`flex flex-col items-center justify-center text-center px-6 ${
            large ? 'h-[360px]' : 'h-[260px]'
          }`}
        >
          <div className="w-16 h-16 rounded-3xl bg-white border border-[#D8C8AA] flex items-center justify-center text-[#6B722E] mb-4">
            <Camera size={30} />
          </div>

          <h3 className="text-xl font-black text-[#2F2A22]">
            Espaço para foto
          </h3>

          <p className="mt-2 text-[#5B4A39] text-sm">
            Coloque a imagem em:
          </p>

          <p className="mt-1 text-[#6B722E] font-black text-sm break-all">
            public{src}
          </p>
        </div>
      )}
    </div>
  )
}

export default ServicesDetailPage