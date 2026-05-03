import { useState } from 'react'

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
    <section className="min-h-screen bg-[#F8FBFF] flex items-center justify-center px-6 py-10">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <img
            src="/Logo-hotelzinho.png"
            alt="Logo Hotelzinho Criativa"
            className="w-56 mx-auto mb-6"
          />

          <span className="inline-flex bg-[#FFD84D] text-[#1238A8] px-5 py-2 rounded-full font-black">
            Área administrativa
          </span>

          <h1 className="mt-5 text-4xl font-black text-gray-900">
            Acesso ao painel
          </h1>

          <p className="mt-3 text-gray-600">
            Entre com suas credenciais para continuar.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-[2.5rem] p-8 shadow-xl border border-blue-100"
        >
          <div>
            <label className="block text-sm font-black text-gray-600 mb-2">
              Usuário
            </label>

            <input
              type="text"
              name="username"
              placeholder="Digite o usuário"
              value={loginData.username}
              onChange={handleChange}
              className="w-full border-2 border-blue-100 rounded-2xl px-5 py-4 outline-none focus:border-[#1238A8]"
            />
          </div>

          <div className="mt-5">
            <label className="block text-sm font-black text-gray-600 mb-2">
              Senha
            </label>

            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Digite a senha"
                value={loginData.password}
                onChange={handleChange}
                className="w-full border-2 border-blue-100 rounded-2xl px-5 py-4 pr-24 outline-none focus:border-[#1238A8]"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#1238A8] font-black text-sm"
              >
                {showPassword ? 'Ocultar' : 'Mostrar'}
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
            className="w-full mt-6 bg-[#1238A8] text-white py-4 rounded-full font-black hover:bg-blue-900 transition shadow-lg"
          >
            Entrar
          </button>

          <a
            href="/"
            className="block text-center mt-5 text-[#1238A8] font-black hover:underline"
          >
            Voltar para o site
          </a>
        </form>
      </div>
    </section>
  )
}

export default AdminLogin