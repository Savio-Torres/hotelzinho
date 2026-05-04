import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Services from './components/Services'
import Routine from './components/Routine'

import AdminDashboard from './components/AdminDashboard'
import AdminLogin from './components/AdminLogin'

import SolicitationPage from './components/SolicitationPage'

import AboutPage from './components/AboutPage'
import AboutDetailPage from './components/AboutDetailPage'

import ServicesPage from './components/ServicesPage'
import ServicesDetailPage from './components/ServicesDetailPage'

import ParentLogin from './components/ParentLogin'
import ParentPortal from './components/ParentPortal'

function App() {
  const currentPath = window.location.pathname

  const isAdminLogged =
    sessionStorage.getItem('hotelzinho_admin_logged') === 'true'

  const isParentLogged =
    sessionStorage.getItem('parent_logged') === 'true'

  if (currentPath === '/admin-login') {
    return <AdminLogin />
  }

  if (currentPath === '/admin') {
    if (!isAdminLogged) {
      return <AdminLogin />
    }

    return <AdminDashboard />
  }

  if (currentPath === '/entrar') {
    return <ParentLogin />
  }

  if (currentPath === '/portal') {
    if (!isParentLogged) {
      return <ParentLogin />
    }

    return <ParentPortal />
  }

  if (currentPath === '/solicitacao') {
    return <SolicitationPage />
  }

  if (currentPath === '/sobre') {
    return <AboutPage />
  }

  if (currentPath.startsWith('/sobre/')) {
    const type = currentPath.replace('/sobre/', '')

    return <AboutDetailPage type={type} />
  }

  if (currentPath === '/servicos') {
    return <ServicesPage />
  }

  if (currentPath.startsWith('/servicos/')) {
    const type = currentPath.replace('/servicos/', '')

    return <ServicesDetailPage type={type} />
  }

  return (
    <>
      <Header />
      <Hero />
      <About />
      <Services />
      <Routine />

      <section className="py-20 bg-[#EFE4CC]">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <span className="inline-flex bg-[#C99A3D] text-white px-5 py-2 rounded-full font-black">
            Solicitações
          </span>

          <h2 className="mt-5 text-4xl md:text-5xl font-black text-[#2F2A22]">
            Quer conhecer ou solicitar uma vaga?
          </h2>

          <p className="mt-4 text-[#5B4A39] text-lg max-w-2xl mx-auto">
            Agende uma visita, solicite diária, mensalidade ou matrícula no balé.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/solicitacao"
              className="inline-block bg-[#6B722E] text-white px-8 py-4 rounded-full font-black hover:bg-[#596025] transition shadow-lg"
            >
              Fazer solicitação
            </a>

            <a
              href="/entrar"
              className="inline-block bg-white text-[#6B722E] border-2 border-[#6B722E] px-8 py-4 rounded-full font-black hover:bg-[#F8F1E4] transition"
            >
              Portal dos responsáveis
            </a>
          </div>
        </div>
      </section>

      <footer className="bg-[#2F2A22] text-white py-10 text-center">
        <p className="font-black text-lg">
          Pousada Aconchego
        </p>

        <p className="text-[#D8C8AA] mt-2">
          Hotelzinho charmoso, seguro e acolhedor para crianças das 06h às 20h.
        </p>

        <p className="text-[#9F8F75] text-sm mt-5">
          © 2026 Pousada Aconchego. Todos os direitos reservados.
        </p>
      </footer>
    </>
  )
}

export default App