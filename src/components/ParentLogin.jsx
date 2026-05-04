import { useState } from 'react'
import { ArrowLeft, IdCard, Phone, ShieldCheck } from 'lucide-react'

function ParentLogin() {
  const [loginData, setLoginData] = useState({
    phone: '',
    cpf: '',
  })

  const [errorMessage, setErrorMessage] = useState('')

  function getSavedRequests() {
    return JSON.parse(localStorage.getItem('hotelzinho_reservations')) || []
  }

  function onlyNumbers(value) {
    return value.replace(/\D/g, '')
  }

  function formatPhone(value) {
    const numbers = onlyNumbers(value).slice(0, 11)

    if (numbers.length <= 2) {
      return numbers
    }

    if (numbers.length <= 7) {
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`
    }

    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7)}`
  }

  function formatCpf(value) {
    const numbers = onlyNumbers(value).slice(0, 11)

    if (numbers.length <= 3) {
      return numbers
    }

    if (numbers.length <= 6) {
      return `${numbers.slice(0, 3)}.${numbers.slice(3)}`
    }

    if (numbers.length <= 9) {
      return `${numbers.slice(0, 3)}.${numbers.slice(3, 6)}.${numbers.slice(6)}`
    }

    return `${numbers.slice(0, 3)}.${numbers.slice(3, 6)}.${numbers.slice(
      6,
      9
    )}-${numbers.slice(9)}`
  }

  function handleChange(event) {
    const { name, value } = event.target

    if (name === 'phone') {
      setLoginData({
        ...loginData,
        phone: formatPhone(value),
      })

      return
    }

    if (name === 'cpf') {
      setLoginData({
        ...loginData,
        cpf: formatCpf(value),
      })

      return
    }

    setLoginData({
      ...loginData,
      [name]: value,
    })
  }

  function handleSubmit(event) {
    event.preventDefault()

    const phoneNumbers = onlyNumbers(loginData.phone)
    const cpfNumbers = onlyNumbers(loginData.cpf)

    if (phoneNumbers.length !== 11) {
      setErrorMessage('Digite um telefone válido com DDD.')
      return
    }

    if (cpfNumbers.length !== 11) {
      setErrorMessage('Digite um CPF válido.')
      return
    }

    const savedRequests = getSavedRequests()

    const foundResponsible = savedRequests.find((request) => {
      const savedPhone = onlyNumbers(request.phone || '')
      const savedCpf = onlyNumbers(request.guardianCpf || '')

      return savedPhone === phoneNumbers && savedCpf === cpfNumbers
    })

    if (!foundResponsible) {
      setErrorMessage(
        'Não encontramos solicitação vinculada a esse telefone e CPF. Verifique os dados ou faça uma solicitação primeiro.'
      )
      return
    }

    sessionStorage.setItem('parent_logged', 'true')
    sessionStorage.setItem('parent_phone', phoneNumbers)
    sessionStorage.setItem('parent_cpf', cpfNumbers)

    window.location.href = '/portal'
  }

  return (
    <section className="min-h-screen bg-[#F4EAD6] flex items-center justify-center px-6 py-10">
      <div className="w-full max-w-md">
        <a
          href="/"
          className="inline-flex items-center gap-2 text-[#6B722E] font-black hover:underline mb-6"
        >
          <ArrowLeft size={20} />
          Voltar para o site
        </a>

        <div className="bg-white rounded-[2.5rem] p-8 shadow-xl border border-[#D8C8AA]">
          <div className="text-center">
            <img
              src="/logo-pousada-aconchego.png"
              alt="Pousada Aconchego"
              className="w-56 mx-auto mb-6"
            />

            <span className="inline-flex bg-[#E6D7B8] text-[#6B722E] px-5 py-2 rounded-full font-black">
              Portal dos responsáveis
            </span>

            <h1 className="mt-5 text-4xl font-black text-[#2F2A22]">
              Acessar portal
            </h1>

            <p className="mt-3 text-[#5B4A39]">
              Entre com telefone e CPF usados na solicitação.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8">
            <div>
              <label className="block text-sm font-black text-[#5B4A39] mb-2">
                Telefone principal
              </label>

              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6B722E]">
                  <Phone size={20} />
                </div>

                <input
                  type="tel"
                  name="phone"
                  placeholder="(81) 99999-9999"
                  value={loginData.phone}
                  onChange={handleChange}
                  maxLength="15"
                  className="w-full border-2 border-[#D8C8AA] rounded-2xl px-5 py-4 pl-12 outline-none focus:border-[#6B722E] bg-white text-[#2F2A22] placeholder:text-[#9F8F75]"
                />
              </div>
            </div>

            <div className="mt-5">
              <label className="block text-sm font-black text-[#5B4A39] mb-2">
                CPF do responsável
              </label>

              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6B722E]">
                  <IdCard size={20} />
                </div>

                <input
                  type="text"
                  name="cpf"
                  placeholder="000.000.000-00"
                  value={loginData.cpf}
                  onChange={handleChange}
                  maxLength="14"
                  className="w-full border-2 border-[#D8C8AA] rounded-2xl px-5 py-4 pl-12 outline-none focus:border-[#6B722E] bg-white text-[#2F2A22] placeholder:text-[#9F8F75]"
                />
              </div>
            </div>

            {errorMessage && (
              <div className="mt-5 bg-red-50 border-2 border-red-200 text-red-700 px-5 py-4 rounded-2xl font-bold">
                {errorMessage}
              </div>
            )}

            <button
              type="submit"
              className="w-full mt-6 bg-[#6B722E] text-white py-4 rounded-full font-black hover:bg-[#596025] transition shadow-lg flex items-center justify-center gap-2"
            >
              <ShieldCheck size={20} />
              Entrar no portal
            </button>
          </form>
        </div>

        <div className="mt-6 bg-white rounded-3xl p-5 border border-[#D8C8AA] text-center">
          <p className="text-sm text-[#5B4A39]">
            O acesso funciona para responsáveis que já fizeram alguma solicitação.
          </p>
        </div>
      </div>
    </section>
  )
}

export default ParentLogin