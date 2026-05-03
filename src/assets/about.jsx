function About() {
  return (
    <section id="sobre" className="py-24 bg-[#EAF6FF] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <div className="relative">
          <div className="absolute -top-6 -left-6 w-24 h-24 bg-[#FFD84D] rounded-full opacity-70"></div>
          <div className="absolute -bottom-6 -right-6 w-28 h-28 bg-[#FF3B3B] rounded-full opacity-20"></div>

          <div className="relative bg-white rounded-[2.5rem] p-8 shadow-2xl border-4 border-white">
            <div className="bg-gradient-to-br from-[#FFF7ED] to-[#EAF6FF] rounded-[2rem] h-96 flex items-center justify-center">
              <div className="text-center px-6">
                <div className="text-8xl mb-5">🏡</div>

                <h3 className="text-2xl font-black text-[#1238A8]">
                  Cuidado das 06h às 20h
                </h3>

                <p className="mt-3 text-gray-600 font-semibold">
                  Uma rotina completa com alimentação, banho, recreação, reforço
                  escolar e atividades especiais.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <span className="inline-flex bg-[#FFD84D] text-[#1238A8] px-5 py-2 rounded-full font-black mb-5">
            Sobre o Hotelzinho Criativa
          </span>

          <h2 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight">
            Um espaço pensado para acolher, cuidar e desenvolver.
          </h2>

          <p className="mt-6 text-lg text-gray-600">
            O Hotelzinho Criativa oferece uma rotina completa para crianças,
            funcionando das 06h às 20h, com momentos de cuidado, alimentação,
            higiene, recreação e reforço escolar.
          </p>

          <p className="mt-4 text-lg text-gray-600">
            As crianças são organizadas por faixa etária em dois prédios:
            um espaço voltado para os menores e outro preparado para os maiores,
            garantindo mais segurança, conforto e atividades adequadas para cada fase.
          </p>

          <div className="mt-8 grid sm:grid-cols-2 gap-4">
            <div className="bg-white rounded-3xl p-5 shadow border border-blue-100">
              <div className="text-4xl">👶</div>

              <h3 className="mt-3 font-black text-gray-900">
                Menores
              </h3>

              <p className="mt-2 text-gray-600 text-sm">
                De 4 meses até 4 ou 5 anos, com cuidado especial para a primeira infância.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-5 shadow border border-yellow-100">
              <div className="text-4xl">🧒</div>

              <h3 className="mt-3 font-black text-gray-900">
                Maiores
              </h3>

              <p className="mt-2 text-gray-600 text-sm">
                De 5 até 11 ou 12 anos, com recreação, reforço e atividades adequadas.
              </p>
            </div>
          </div>

          <div className="mt-5 bg-white rounded-3xl p-5 shadow border border-red-100">
            <div className="flex items-start gap-4">
              <div className="text-4xl">🩰</div>

              <div>
                <h3 className="font-black text-gray-900">
                  Atividade especial: balé
                </h3>

                <p className="mt-2 text-gray-600 text-sm">
                  O balé acontece nas quartas e sextas-feiras, tanto no turno da
                  manhã quanto no turno da tarde.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About