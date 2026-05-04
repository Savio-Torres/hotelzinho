import { useState } from 'react'
import {
  ArrowLeft,
  Baby,
  Building2,
  Camera,
  HeartHandshake,
  Music,
  ShieldCheck,
  UsersRound,
} from 'lucide-react'

const aboutDetails = {
  'predio-menores': {
    label: 'Prédio dos menores',
    title: 'Um espaço preparado para os pequenos',
    subtitle:
      'Ambiente pensado para crianças de 4 meses até 4 ou 5 anos, com cuidado, acolhimento e atenção especial.',
    icon: Baby,

    // Foto principal de cima
    heroImage: '/menores-1.png',

    // Fotos de baixo
    galleryImages: ['/menores-2.png', '/menores-3.png', '/menores-4.png'],

    sections: [
      {
        title: 'Cuidado para a primeira infância',
        text: 'O prédio dos menores é pensado para acolher crianças pequenas com mais tranquilidade, segurança e atenção. A rotina respeita o tempo de cada criança, incluindo alimentação, banho, descanso, recreação e momentos de adaptação.',
      },
      {
        title: 'Rotina com segurança',
        text: 'As atividades são organizadas para oferecer conforto e previsibilidade. O objetivo é que a criança se sinta protegida, acolhida e bem acompanhada durante todo o período.',
      },
      {
        title: 'Acompanhamento próximo',
        text: 'Por serem crianças menores, a atenção aos detalhes é ainda maior: higiene, alimentação, sono, adaptação e comunicação com os responsáveis fazem parte do cuidado diário.',
      },
    ],
    highlights: [
      'Crianças de 4 meses até 4 ou 5 anos',
      'Ambiente acolhedor e tranquilo',
      'Soneca e descanso acompanhados',
      'Cuidado com alimentação e higiene',
    ],
  },

  'predio-maiores': {
    label: 'Prédio dos maiores',
    title: 'Mais autonomia, recreação e aprendizado',
    subtitle:
      'Espaço voltado para crianças de 5 até 11 ou 12 anos, com rotina organizada, brincadeiras e apoio escolar.',
    icon: UsersRound,

    heroImage: '/maiores-1.png',
    galleryImages: ['/maiores-2.png', '/maiores-3.png', '/maiores-4.png'],

    sections: [
      {
        title: 'Atividades para crianças maiores',
        text: 'O prédio dos maiores oferece uma rotina com mais autonomia, interação e atividades adequadas para crianças que já estão em fase escolar.',
      },
      {
        title: 'Recreação e convivência',
        text: 'As crianças têm momentos de brincadeira, socialização, criatividade e atividades que ajudam no desenvolvimento e na convivência em grupo.',
      },
      {
        title: 'Apoio na rotina escolar',
        text: 'O reforço escolar faz parte da rotina da diária e da mensalidade, ajudando nas tarefas, revisões e acompanhamento das atividades escolares.',
      },
    ],
    highlights: [
      'Crianças de 5 até 11 ou 12 anos',
      'Recreação e socialização',
      'Reforço escolar incluído',
      'Rotina adequada para idade',
    ],
  },

  estrutura: {
    label: 'Estrutura',
    title: 'Uma estrutura pensada para acolher',
    subtitle:
      'Ambientes organizados para oferecer segurança, conforto e uma rotina tranquila para as crianças.',
    icon: Building2,

    heroImage: '/estrutura-1.png',
    galleryImages: ['/estrutura-2.png', '/estrutura-3.png', '/estrutura-4.png'],

    sections: [
      {
        title: 'Ambiente com clima de casa',
        text: 'A proposta da Pousada Aconchego é criar um espaço acolhedor, organizado e seguro, onde as crianças possam passar o dia com tranquilidade.',
      },
      {
        title: 'Divisão por idade',
        text: 'A separação entre prédio dos menores e prédio dos maiores ajuda a manter uma rotina mais segura e adequada para cada fase da infância.',
      },
      {
        title: 'Organização da rotina',
        text: 'A estrutura acompanha a rotina do hotelzinho: chegada, alimentação, banho, descanso, recreação, reforço e encerramento até as 20h.',
      },
    ],
    highlights: [
      'Dois prédios por faixa etária',
      'Ambiente seguro e organizado',
      'Espaços para descanso e recreação',
      'Funcionamento das 06h às 20h',
    ],
  },

  atividades: {
    label: 'Atividades',
    title: 'Brincar, aprender e se desenvolver',
    subtitle:
      'Atividades de recreação, balé, reforço escolar e momentos de socialização durante a rotina.',
    icon: Music,

    heroImage: '/atividades-1.png',
    galleryImages: ['/atividades-2.png', '/atividades-3.png', '/bale-1.png'],

    sections: [
      {
        title: 'Recreação',
        text: 'A recreação ajuda as crianças a interagirem, criarem vínculos, se expressarem e aproveitarem o dia com leveza.',
      },
      {
        title: 'Balé',
        text: 'O balé acontece nas quartas e sextas-feiras, no turno da manhã e também no turno da tarde.',
      },
      {
        title: 'Reforço escolar',
        text: 'O reforço faz parte da rotina da diária e da mensalidade, apoiando a criança nas atividades escolares.',
      },
    ],
    highlights: [
      'Recreação durante a rotina',
      'Balé nas quartas e sextas',
      'Reforço escolar incluído',
      'Atividades por faixa etária',
    ],
  },
}

function AboutDetailPage({ type }) {
  const detail = aboutDetails[type] || aboutDetails.estrutura
  const Icon = detail.icon

  return (
    <section className="min-h-screen bg-[#F4EAD6] py-10">
      <div className="max-w-7xl mx-auto px-6">
        <a
          href="/sobre"
          className="inline-flex items-center gap-2 text-[#6B722E] font-black hover:underline mb-8"
        >
          <ArrowLeft size={20} />
          Voltar para Sobre
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
                  Pontos principais
                </span>

                <h2 className="mt-5 text-3xl md:text-4xl font-black">
                  O que esse espaço oferece?
                </h2>

                <p className="mt-4 text-[#F4EAD6] text-lg">
                  Cada ambiente da Pousada Aconchego é pensado para tornar a
                  rotina mais segura, acolhedora e adequada para as crianças.
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
              href="/sobre"
              className="inline-block bg-[#F8F1E4] text-[#6B722E] border-2 border-[#6B722E] px-7 py-4 rounded-full font-black hover:bg-[#EFE4CC] transition"
            >
              Ver outros espaços
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

export default AboutDetailPage