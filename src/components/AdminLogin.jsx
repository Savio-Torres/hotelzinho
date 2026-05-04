import { useState } from 'react'
import { ArrowLeft, Eye, EyeOff, LockKeyhole, UserRound } from 'lucide-react'

function AdminLogin() {
  const [loginData, setLoginData] = useState({
    username: '',
    password: '',
  })

  const [showPassword, setShowPassword] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  function handleChange(event) {
    const { name, value } = event.target

    setLoginData({
      ...loginData,
      [name]: value,
    })
  }

  function handleSubmit(event) {
    event.preventDefault()

    if (!loginData.username || !loginData.password) {
      setErrorMessage('Preencha usuário e senha para continuar.')
      return
    }

    const adminUser = 'admin'
    const adminPassword = 'criativa123'

    if (
      loginData.username === adminUser &&
      loginData.password === adminPassword
    ) {
      sessionStorage.setItem('hotelzinho_admin_logged', 'true')
      window.location.href = '/admin'
      return
    }

    setErrorMessage('Usuário ou senha incorretos.')
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
              Área administrativa
            </span>

            <h1 className="mt-5 text-4xl font-black text-[#2F2A22]">
              Acesso ao painel
            </h1>

            <p className="mt-3 text-[#5B4A39]">
              Entre com suas credenciais para continuar.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8">
            <div>
              <label className="block text-sm font-black text-[#5B4A39] mb-2">
                Usuário
              </label>

              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6B722E]">
                  <UserRound size={20} />
                </div>

                <input
                  type="text"
                  name="username"
                  placeholder="Digite o usuário"
                  value={loginData.username}
                  onChange={handleChange}
                  className="w-full border-2 border-[#D8C8AA] rounded-2xl px-5 py-4 pl-12 outline-none focus:border-[#6B722E] bg-white text-[#2F2A22] placeholder:text-[#9F8F75]"
                />
              </div>
            </div>

            <div className="mt-5">
              <label className="block text-sm font-black text-[#5B4A39] mb-2">
                Senha
              </label>

              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6B722E]">
                  <LockKeyhole size={20} />
                </div>

                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="Digite a senha"
                  value={loginData.password}
                  onChange={handleChange}
                  className="w-full border-2 border-[#D8C8AA] rounded-2xl px-5 py-4 pl-12 pr-14 outline-none focus:border-[#6B722E] bg-white text-[#2F2A22] placeholder:text-[#9F8F75]"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#6B722E]"
                >
                  {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
                </button>
              </div>
            </div>

            {errorMessage && (
              <div className="mt-5 bg-red-50 border-2 border-red-200 text-red-700 px-5 py-4 rounded-2xl font-bold">
                {errorMessage}
              </div>
            )}

            <button
              type="submit"
              className="w-full mt-6 bg-[#6B722E] text-white py-4 rounded-full font-black hover:bg-[#596025] transition shadow-lg"
            >
              Entrar
            </button>
          </form>
        </div>

        <div className="mt-6 bg-white rounded-3xl p-5 border border-[#D8C8AA] text-center">
          <p className="text-sm text-[#5B4A39]">
            Acesso restrito à administração da Pousada Aconchego.
          </p>
        </div>
      </div>
    </section>
  )
}

export default AdminLogin