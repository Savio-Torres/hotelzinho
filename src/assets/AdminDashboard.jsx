import { useMemo, useState } from 'react'

function getSavedReservations() {
  const reservations =
    JSON.parse(localStorage.getItem('hotelzinho_reservations')) || []

  return reservations.sort((a, b) => {
    return new Date(b.createdAt) - new Date(a.createdAt)
  })
}

function formatDate(date) {
  if (!date) return 'Não informado'

  const [year, month, day] = date.split('-')

  if (!year || !month || !day) {
    return date
  }

  return `${day}/${month}/${year}`
}

function formatWhatsAppNumber(phone) {
  return phone.replace(/\D/g, '')
}

function getReservationAgeText(reservation) {
  if (reservation.childAgeText) {
    return reservation.childAgeText
  }

  if (reservation.childAge) {
    return `${reservation.childAge} anos`
  }

  return 'Não informado'
}

function getReservationBirthDate(reservation) {
  if (reservation.birthDateFormatted) {
    return reservation.birthDateFormatted
  }

  if (reservation.birthDate) {
    return formatDate(reservation.birthDate)
  }

  return 'Não informado'
}

function AdminDashboard() {
  const [reservations, setReservations] = useState(getSavedReservations)
  const [statusFilter, setStatusFilter] = useState('Todas')
  const [buildingFilter, setBuildingFilter] = useState('Todos')
  const [dateFilter, setDateFilter] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  const totalReservations = reservations.length

  const pendingReservations = reservations.filter(
    (reservation) => reservation.status === 'Pendente'
  ).length

  const confirmedReservations = reservations.filter(
    (reservation) => reservation.status === 'Confirmada'
  ).length

  const canceledReservations = reservations.filter(
    (reservation) => reservation.status === 'Cancelada'
  ).length

  const finishedReservations = reservations.filter(
    (reservation) => reservation.status === 'Finalizada'
  ).length

  const filteredReservations = useMemo(() => {
    return reservations.filter((reservation) => {
      const buildingLabel = getBuildingLabel(reservation)

      const matchesStatus =
        statusFilter === 'Todas' || reservation.status === statusFilter

      const matchesBuilding =
        buildingFilter === 'Todos' || buildingLabel === buildingFilter

      const matchesDate = !dateFilter || reservation.date === dateFilter

      const searchContent = `
        ${reservation.childName || ''}
        ${reservation.guardianName || ''}
        ${reservation.phone || ''}
        ${getReservationAgeText(reservation)}
        ${getReservationBirthDate(reservation)}
        ${buildingLabel}
        ${reservation.serviceType || ''}
        ${reservation.date || ''}
        ${reservation.entryTime || ''}
        ${reservation.exitTime || ''}
        ${reservation.needsSchoolSupport || ''}
        ${reservation.balletInterest || ''}
        ${reservation.allergies || ''}
        ${reservation.foodRestrictions || ''}
        ${reservation.observations || ''}
      `.toLowerCase()

      const matchesSearch = searchContent.includes(searchTerm.toLowerCase())

      return matchesStatus && matchesBuilding && matchesDate && matchesSearch
    })
  }, [reservations, statusFilter, buildingFilter, dateFilter, searchTerm])

  function saveReservations(updatedReservations) {
    setReservations(updatedReservations)

    localStorage.setItem(
      'hotelzinho_reservations',
      JSON.stringify(updatedReservations)
    )
  }

  function updateStatus(id, newStatus) {
    const updatedReservations = reservations.map((reservation) => {
      if (reservation.id === id) {
        return {
          ...reservation,
          status: newStatus,
        }
      }

      return reservation
    })

    saveReservations(updatedReservations)
  }

  function deleteReservation(id) {
    const confirmDelete = window.confirm(
      'Tem certeza que deseja excluir esta reserva?'
    )

    if (!confirmDelete) return

    const updatedReservations = reservations.filter(
      (reservation) => reservation.id !== id
    )

    saveReservations(updatedReservations)
  }

  function clearFilters() {
    setStatusFilter('Todas')
    setBuildingFilter('Todos')
    setDateFilter('')
    setSearchTerm('')
  }

  function logout() {
    sessionStorage.removeItem('hotelzinho_admin_logged')
    window.location.href = '/'
  }

  function getStatusStyle(status) {
    if (status === 'Confirmada') {
      return 'bg-green-50 text-green-700 border-green-200'
    }

    if (status === 'Cancelada') {
      return 'bg-red-50 text-red-700 border-red-200'
    }

    if (status === 'Finalizada') {
      return 'bg-blue-50 text-blue-700 border-blue-200'
    }

    return 'bg-yellow-50 text-yellow-700 border-yellow-200'
  }

  function getBuildingLabel(reservation) {
    if (reservation.ageGroup) {
      return reservation.ageGroup
    }

    if (reservation.childAgeInYears !== undefined) {
      return reservation.childAgeInYears < 5
        ? 'Prédio dos menores'
        : 'Prédio dos maiores'
    }

    const age = Number(reservation.childAge)

    if (age <= 4) {
      return 'Prédio dos menores'
    }

    return 'Prédio dos maiores'
  }

  return (
    <section className="min-h-screen bg-[#F8FBFF] py-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="bg-white rounded-[2.5rem] p-6 md:p-8 shadow-sm border border-blue-100 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <span className="inline-flex bg-[#FFD84D] text-[#1238A8] px-5 py-2 rounded-full font-black">
                Painel administrativo
              </span>

              <h1 className="mt-4 text-4xl md:text-5xl font-black text-gray-900">
                Reservas recebidas
              </h1>

              <p className="mt-3 text-gray-600 max-w-2xl">
                Gerencie as solicitações enviadas pelo formulário, acompanhe
                status, filtre por data, prédio e fale com os responsáveis.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="/"
                className="bg-white text-[#1238A8] border-2 border-[#1238A8] px-6 py-3 rounded-full font-black text-center hover:bg-[#EAF6FF] transition"
              >
                Ver site
              </a>

              <button
                type="button"
                onClick={logout}
                className="bg-[#1238A8] text-white px-6 py-3 rounded-full font-black hover:bg-blue-900 transition shadow"
              >
                Sair
              </button>
            </div>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5 mb-8">
          <SummaryCard
            title="Total"
            value={totalReservations}
            icon="📋"
            color="text-gray-900"
          />

          <SummaryCard
            title="Pendentes"
            value={pendingReservations}
            icon="⏳"
            color="text-yellow-600"
          />

          <SummaryCard
            title="Confirmadas"
            value={confirmedReservations}
            icon="✅"
            color="text-green-600"
          />

          <SummaryCard
            title="Canceladas"
            value={canceledReservations}
            icon="❌"
            color="text-red-600"
          />

          <SummaryCard
            title="Finalizadas"
            value={finishedReservations}
            icon="🏁"
            color="text-blue-600"
          />
        </div>

        <div className="bg-white rounded-[2.5rem] p-6 shadow-sm border border-blue-100 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-end gap-4">
            <div className="flex-1">
              <label className="block text-sm font-black text-gray-600 mb-2">
                Buscar reserva
              </label>

              <input
                type="text"
                placeholder="Buscar por criança, responsável, telefone, idade, serviço..."
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                className="w-full border-2 border-blue-100 rounded-2xl px-5 py-4 outline-none focus:border-[#1238A8]"
              />
            </div>

            <div className="w-full lg:w-56">
              <label className="block text-sm font-black text-gray-600 mb-2">
                Status
              </label>

              <select
                value={statusFilter}
                onChange={(event) => setStatusFilter(event.target.value)}
                className="w-full border-2 border-blue-100 rounded-2xl px-5 py-4 outline-none focus:border-[#1238A8]"
              >
                <option value="Todas">Todas</option>
                <option value="Pendente">Pendentes</option>
                <option value="Confirmada">Confirmadas</option>
                <option value="Cancelada">Canceladas</option>
                <option value="Finalizada">Finalizadas</option>
              </select>
            </div>

            <div className="w-full lg:w-64">
              <label className="block text-sm font-black text-gray-600 mb-2">
                Prédio
              </label>

              <select
                value={buildingFilter}
                onChange={(event) => setBuildingFilter(event.target.value)}
                className="w-full border-2 border-blue-100 rounded-2xl px-5 py-4 outline-none focus:border-[#1238A8]"
              >
                <option value="Todos">Todos</option>
                <option value="Prédio dos menores">Prédio dos menores</option>
                <option value="Prédio dos maiores">Prédio dos maiores</option>
              </select>
            </div>

            <div className="w-full lg:w-56">
              <label className="block text-sm font-black text-gray-600 mb-2">
                Data
              </label>

              <input
                type="date"
                value={dateFilter}
                onChange={(event) => setDateFilter(event.target.value)}
                className="w-full border-2 border-blue-100 rounded-2xl px-5 py-4 outline-none focus:border-[#1238A8]"
              />
            </div>

            <button
              type="button"
              onClick={clearFilters}
              className="bg-[#EAF6FF] text-[#1238A8] px-6 py-4 rounded-2xl font-black hover:bg-blue-100 transition"
            >
              Limpar
            </button>
          </div>

          <div className="mt-5 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <p className="text-gray-600 font-semibold">
              Mostrando{' '}
              <span className="text-[#1238A8] font-black">
                {filteredReservations.length}
              </span>{' '}
              de{' '}
              <span className="text-[#1238A8] font-black">
                {totalReservations}
              </span>{' '}
              reservas.
            </p>

            <p className="text-sm text-gray-500">
              Use os filtros para organizar o atendimento do dia.
            </p>
          </div>
        </div>

        {reservations.length === 0 ? (
          <EmptyState
            icon="📭"
            title="Nenhuma reserva cadastrada"
            text="Quando alguém enviar uma solicitação pelo formulário, ela aparecerá aqui."
          />
        ) : filteredReservations.length === 0 ? (
          <EmptyState
            icon="🔎"
            title="Nenhuma reserva encontrada"
            text="Tente mudar o filtro ou pesquisar por outro termo."
          />
        ) : (
          <div className="grid lg:grid-cols-2 gap-6">
            {filteredReservations.map((reservation) => {
              const buildingLabel = getBuildingLabel(reservation)
              const whatsAppNumber = formatWhatsAppNumber(reservation.phone)
              const ageText = getReservationAgeText(reservation)
              const birthDateText = getReservationBirthDate(reservation)

              return (
                <div
                  key={reservation.id}
                  className="bg-white rounded-[2.5rem] p-6 shadow-sm border border-blue-100 hover:shadow-lg transition"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span
                          className={`px-4 py-2 rounded-full text-xs font-black border ${getStatusStyle(
                            reservation.status
                          )}`}
                        >
                          {reservation.status}
                        </span>

                        <span className="px-4 py-2 rounded-full text-xs font-black bg-[#EAF6FF] text-[#1238A8] border border-blue-100">
                          {buildingLabel}
                        </span>
                      </div>

                      <h2 className="text-2xl font-black text-gray-900">
                        {reservation.childName}
                      </h2>

                      <p className="text-gray-500 font-semibold">
                        Responsável: {reservation.guardianName}
                      </p>
                    </div>

                    <div className="text-4xl">
                      {buildingLabel === 'Prédio dos menores' ? '👶' : '🧒'}
                    </div>
                  </div>

                  <div className="mt-6 grid sm:grid-cols-2 gap-4">
                    <InfoItem label="Telefone" value={reservation.phone} />
                    <InfoItem label="Nascimento" value={birthDateText} />
                    <InfoItem label="Idade" value={ageText} />
                    <InfoItem label="Data da reserva" value={formatDate(reservation.date)} />
                    <InfoItem label="Serviço" value={reservation.serviceType} />
                    <InfoItem label="Chegada" value={reservation.entryTime} />
                    <InfoItem label="Saída" value={reservation.exitTime} />
                    <InfoItem
                      label="Reforço escolar"
                      value={reservation.needsSchoolSupport || 'Não informado'}
                    />
                    <InfoItem
                      label="Balé"
                      value={reservation.balletInterest || 'Não informado'}
                    />
                  </div>

                  <div className="mt-5 grid md:grid-cols-2 gap-4">
                    <TextBox
                      title="Alergias"
                      text={reservation.allergies || 'Nenhuma alergia informada.'}
                    />

                    <TextBox
                      title="Restrições alimentares"
                      text={
                        reservation.foodRestrictions ||
                        'Nenhuma restrição alimentar informada.'
                      }
                    />
                  </div>

                  <div className="mt-4">
                    <TextBox
                      title="Observações gerais"
                      text={
                        reservation.observations ||
                        'Nenhuma observação informada.'
                      }
                    />
                  </div>

                  <p className="mt-4 text-sm text-gray-400">
                    Criado em: {reservation.createdAt}
                  </p>

                  <div className="mt-6 flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={() =>
                        updateStatus(reservation.id, 'Confirmada')
                      }
                      className="bg-green-50 text-green-700 border border-green-200 px-4 py-2 rounded-full font-black hover:bg-green-100 transition"
                    >
                      Confirmar
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        updateStatus(reservation.id, 'Cancelada')
                      }
                      className="bg-red-50 text-red-700 border border-red-200 px-4 py-2 rounded-full font-black hover:bg-red-100 transition"
                    >
                      Cancelar
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        updateStatus(reservation.id, 'Finalizada')
                      }
                      className="bg-blue-50 text-blue-700 border border-blue-200 px-4 py-2 rounded-full font-black hover:bg-blue-100 transition"
                    >
                      Finalizar
                    </button>

                    <a
                      href={`https://wa.me/55${whatsAppNumber}`}
                      target="_blank"
                      rel="noreferrer"
                      className="bg-[#1238A8] text-white px-4 py-2 rounded-full font-black hover:bg-blue-900 transition"
                    >
                      WhatsApp
                    </a>

                    <button
                      type="button"
                      onClick={() => deleteReservation(reservation.id)}
                      className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full font-black hover:bg-gray-200 transition"
                    >
                      Excluir
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}

function SummaryCard({ title, value, icon, color }) {
  return (
    <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-blue-100 hover:shadow-md transition">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-gray-500 font-black">
            {title}
          </p>

          <h2 className={`text-4xl font-black mt-2 ${color}`}>
            {value}
          </h2>
        </div>

        <div className="w-14 h-14 rounded-2xl bg-[#EAF6FF] flex items-center justify-center text-3xl border border-blue-100">
          {icon}
        </div>
      </div>
    </div>
  )
}

function InfoItem({ label, value }) {
  return (
    <div className="bg-[#F8FBFF] rounded-2xl p-4 border border-blue-100">
      <p className="text-xs font-black text-gray-500 uppercase">
        {label}
      </p>

      <p className="mt-1 text-gray-900 font-bold">
        {value || 'Não informado'}
      </p>
    </div>
  )
}

function TextBox({ title, text }) {
  return (
    <div className="bg-[#F8FBFF] rounded-3xl p-5 border border-blue-100 h-full">
      <p className="text-sm font-black text-gray-500 mb-1">
        {title}
      </p>

      <p className="text-gray-700 font-medium">
        {text}
      </p>
    </div>
  )
}

function EmptyState({ icon, title, text }) {
  return (
    <div className="bg-white rounded-[2.5rem] p-10 shadow-sm text-center border border-blue-100">
      <div className="text-6xl mb-4">{icon}</div>

      <h2 className="text-2xl font-black text-gray-900">
        {title}
      </h2>

      <p className="mt-2 text-gray-600">
        {text}
      </p>
    </div>
  )
}

export default AdminDashboard