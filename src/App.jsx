import Header from './assets/header'
import Hero from './assets/hero'
import About from './assets/about'
import Services from './assets/service'
import Routine from './assets/Routine'
import ReservationForm from './assets/ReservationForm'
import AdminDashboard from './assets/AdminDashboard'
import AdminLogin from './assets/AdminLogin'

function App() {
  const currentPath = window.location.pathname
  const isAdminLogged =
    sessionStorage.getItem('hotelzinho_admin_logged') === 'true'

  if (currentPath === '/admin-login') {
    return <AdminLogin />
  }

  if (currentPath === '/admin') {
    if (!isAdminLogged) {
      return <AdminLogin />
    }

    return <AdminDashboard />
  }

  return (
    <>
      <Header />
      <Hero />
      <About />
      <Services />
      <Routine />
      <ReservationForm />

      <footer className="bg-gray-900 text-white py-10 text-center">
        <p className="font-black text-lg">
          Hotelzinho Criativa
        </p>

        <p className="text-gray-400 mt-2">
          Cuidado, segurança e carinho para crianças das 06h às 20h.
        </p>

        <p className="text-gray-500 text-sm mt-5">
          © 2026 Hotelzinho Criativa. Todos os direitos reservados.
        </p>
      </footer>
    </>
  )
}

export default App