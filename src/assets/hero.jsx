function Hero() {
  return (
    <section className="min-h-screen bg-gradient-to-br from-[#FFF7ED] via-white to-[#EAF6FF] flex items-center pt-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <span className="inline-flex items-center gap-2 bg-[#FFD84D] text-[#1238A8] px-5 py-2 rounded-full font-extrabold mb-6 shadow-sm">
            ✏️ Cuidado infantil criativo
          </span>

          <h1 className="text-4xl md:text-6xl font-black text-gray-900 leading-tight">
            Um lugar cheio de carinho, segurança e diversão.
          </h1>

          <p className="mt-6 text-lg text-gray-600 max-w-xl">
            No Hotelzinho Criativa, cada criança encontra um ambiente acolhedor,
            colorido e preparado para brincar, descansar e se sentir segura.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <a
              href="#reserva"
              className="bg-[#1238A8] text-white px-8 py-4 rounded-full font-extrabold text-center hover:bg-blue-900 transition shadow-lg"
            >
              Solicitar reserva
            </a>

            <a
              href="#servicos"
              className="bg-white text-[#1238A8] px-8 py-4 rounded-full font-extrabold text-center border-2 border-[#1238A8] hover:bg-[#EAF6FF] transition"
            >
              Conhecer serviços
            </a>
          </div>

          <div className="mt-10 grid grid-cols-3 gap-4 max-w-md">
            <div className="bg-white rounded-3xl p-4 text-center shadow border border-blue-100">
              <div className="text-3xl">🧸</div>
              <p className="mt-2 text-sm font-bold text-gray-700">
                Brincar
              </p>
            </div>

            <div className="bg-white rounded-3xl p-4 text-center shadow border border-yellow-100">
              <div className="text-3xl">🍎</div>
              <p className="mt-2 text-sm font-bold text-gray-700">
                Cuidar
              </p>
            </div>

            <div className="bg-white rounded-3xl p-4 text-center shadow border border-red-100">
              <div className="text-3xl">🌙</div>
              <p className="mt-2 text-sm font-bold text-gray-700">
                Descansar
              </p>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -top-10 -right-6 w-28 h-28 bg-[#FFD84D] rounded-full opacity-70 blur-sm"></div>
          <div className="absolute -bottom-8 -left-6 w-24 h-24 bg-[#FF3B3B] rounded-full opacity-30 blur-sm"></div>

          <div className="relative bg-white rounded-[2.5rem] p-8 shadow-2xl border-4 border-[#EAF6FF]">
            <img
              src="/Logo-hotelzinho.png"
              alt="Logo Hotelzinho Criativa"
              className="w-full max-w-lg mx-auto"
            />

            <div className="mt-6 bg-[#EAF6FF] rounded-3xl p-5 text-center">
              <p className="text-[#1238A8] font-black text-xl">
                Criatividade, carinho e segurança em cada detalhe.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero