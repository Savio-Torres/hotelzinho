import { useMemo, useState } from 'react'
import {
  Baby,
  CalendarCheck,
  CalendarDays,
  CheckCircle,
  ClipboardList,
  Clock,
  Eye,
  EyeOff,
  Flag,
  LayoutDashboard,
  ListChecks,
  MessageCircle,
  Plus,
  ReceiptText,
  Trash2,
  UsersRound,
  Wallet,
  XCircle,
} from 'lucide-react'
import AdminSubscriptions from './AdminSubscriptions'
import AdminFinance from './AdminFinance'

function getSavedRequests() {
  return JSON.parse(localStorage.getItem('hotelzinho_reservations')) || []
}

function getSavedVisitSlots() {
  return JSON.parse(localStorage.getItem('hotelzinho_visit_slots')) || []
}

function getSavedSubscriptions() {
  return JSON.parse(localStorage.getItem('hotelzinho_subscriptions')) || []
}

function getSavedPayments() {
  return JSON.parse(localStorage.getItem('hotelzinho_payments')) || []
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
  return phone?.replace(/\D/g, '') || ''
}

function getRequestTypeLabel(request) {
  if (request.requestTypeLabel) {
    return request.requestTypeLabel
  }

  if (request.requestType === 'visita') return 'Agendamento de visita'
  if (request.requestType === 'diaria') return 'Reserva de diária'
  if (request.requestType === 'mensalidade') return 'Solicitação de mensalidade'
  if (request.requestType === 'bale') return 'Matrícula no balé'

  return 'Solicitação'
}

function getReservationAgeText(request) {
  if (request.childAgeText) {
    return request.childAgeText
  }

  if (request.childAge) {
    return `${request.childAge} anos`
  }

  return 'Não informado'
}

function getReservationBirthDate(request) {
  if (request.birthDateFormatted) {
    return request.birthDateFormatted
  }

  if (request.birthDate) {
    return formatDate(request.birthDate)
  }

  return 'Não informado'
}

function getBuildingLabel(request) {
  if (request.ageGroup && request.ageGroup !== 'Não informado') {
    return request.ageGroup
  }

  if (request.childAgeInYears !== undefined && request.childAgeInYears !== null) {
    return request.childAgeInYears < 5
      ? 'Prédio dos menores'
      : 'Prédio dos maiores'
  }

  const age = Number(request.childAge)

  if (!age) {
    return 'Não informado'
  }

  if (age <= 4) {
    return 'Prédio dos menores'
  }

  return 'Prédio dos maiores'
}

function getMainDate(request) {
  if (request.requestType === 'visita') {
    return request.visitDateFormatted || formatDate(request.visitDate)
  }

  if (request.requestType === 'diaria') {
    return request.reservationDateFormatted || formatDate(request.reservationDate)
  }

  if (request.requestType === 'mensalidade' || request.requestType === 'bale') {
    return request.startDateFormatted || formatDate(request.startDate)
  }

  return formatDate(request.date)
}

function getCurrentMonthReference() {
  const today = new Date()
  const year = today.getFullYear()
  const month = String(today.getMonth() + 1).padStart(2, '0')

  return `${year}-${month}`
}

function getMonthLabel(monthReference) {
  const [year, month] = monthReference.split('-').map(Number)
  const date = new Date(year, month - 1, 1)

  return date.toLocaleDateString('pt-BR', {
    month: 'long',
    year: 'numeric',
  })
}

function createDueDate(monthReference, dueDay = 10) {
  const [year, month] = monthReference.split('-').map(Number)
  const lastDayOfMonth = new Date(year, month, 0).getDate()
  const safeDay = Math.min(Number(dueDay), lastDayOfMonth)

  return `${year}-${String(month).padStart(2, '0')}-${String(safeDay).padStart(
    2,
    '0'
  )}`
}

function getAutomaticAmountByRequest(request) {
  if (request.requestType === 'mensalidade') {
    if (request.shift === 'Manhã') return '400'
    if (request.shift === 'Tarde') return '400'
    if (request.shift === 'Integral') return '800'

    return '400'
  }

  if (request.requestType === 'bale') {
    return '100'
  }

  if (request.requestType === 'diaria') {
    return '70'
  }

  return '0'
}

function getAutomaticPlanName(request) {
  if (request.requestType === 'mensalidade') {
    if (request.shift) {
      return `Mensalidade - ${request.shift}`
    }

    return 'Mensalidade'
  }

  if (request.requestType === 'bale') {
    return 'Balé'
  }

  if (request.requestType === 'diaria') {
    return 'Diária'
  }

  return 'Cobrança'
}

function AdminDashboard() {
  const [requests, setRequests] = useState(getSavedRequests)
  const [expandedId, setExpandedId] = useState(null)
  const [refreshKey, setRefreshKey] = useState(0)

  const [activeTab, setActiveTab] = useState('resumo')

  const [statusFilter, setStatusFilter] = useState('Todas')
  const [buildingFilter, setBuildingFilter] = useState('Todos')
  const [requestTypeFilter, setRequestTypeFilter] = useState('Todos')
  const [dateFilter, setDateFilter] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  const totalRequests = requests.length

  const pendingRequests = requests.filter(
    (request) => request.status === 'Pendente'
  ).length

  const confirmedRequests = requests.filter(
    (request) => request.status === 'Confirmada'
  ).length

  const canceledRequests = requests.filter(
    (request) => request.status === 'Cancelada'
  ).length

  const finishedRequests = requests.filter(
    (request) => request.status === 'Finalizada'
  ).length

  const visitRequests = requests.filter(
    (request) => request.requestType === 'visita'
  ).length

  const monthlyRequests = requests.filter(
    (request) => request.requestType === 'mensalidade'
  ).length

  const dailyRequests = requests.filter(
    (request) => request.requestType === 'diaria'
  ).length

  const balletRequests = requests.filter(
    (request) => request.requestType === 'bale'
  ).length

  const filteredRequests = useMemo(() => {
    return requests.filter((request) => {
      const buildingLabel = getBuildingLabel(request)
      const requestLabel = getRequestTypeLabel(request)

      const matchesStatus =
        statusFilter === 'Todas' || request.status === statusFilter

      const matchesBuilding =
        buildingFilter === 'Todos' || buildingLabel === buildingFilter

      const matchesRequestType =
        requestTypeFilter === 'Todos' || requestLabel === requestTypeFilter

      const matchesDate =
        !dateFilter ||
        request.date === dateFilter ||
        request.visitDate === dateFilter ||
        request.reservationDate === dateFilter ||
        request.startDate === dateFilter

      const searchContent = `
        ${requestLabel || ''}
        ${request.guardianName || ''}
        ${request.guardianCpf || ''}
        ${request.phone || ''}
        ${request.secondaryPhone || ''}
        ${request.email || ''}
        ${request.childName || ''}
        ${request.childSchool || ''}
        ${request.childPeriod || ''}
        ${getReservationAgeText(request)}
        ${getReservationBirthDate(request)}
        ${buildingLabel}
        ${request.shift || ''}
        ${request.entryTime || ''}
        ${request.exitTime || ''}
        ${request.visitTime || ''}
        ${request.allergies || ''}
        ${request.foodRestrictions || ''}
        ${request.medications || ''}
        ${request.authorizedPickup || ''}
        ${request.observations || ''}
      `.toLowerCase()

      const matchesSearch = searchContent.includes(searchTerm.toLowerCase())

      return (
        matchesStatus &&
        matchesBuilding &&
        matchesRequestType &&
        matchesDate &&
        matchesSearch
      )
    })
  }, [
    requests,
    statusFilter,
    buildingFilter,
    requestTypeFilter,
    dateFilter,
    searchTerm,
  ])

  function saveRequests(updatedRequests) {
    setRequests(updatedRequests)

    localStorage.setItem(
      'hotelzinho_reservations',
      JSON.stringify(updatedRequests)
    )
  }

  function createAutomaticBillingForRequest(request) {
    const savedSubscriptions = getSavedSubscriptions()
    const savedPayments = getSavedPayments()

    const amount = getAutomaticAmountByRequest(request)
    const planName = getAutomaticPlanName(request)

    if (request.requestType === 'mensalidade' || request.requestType === 'bale') {
      const alreadyHasSubscription = savedSubscriptions.some((subscription) => {
        return subscription.requestId === request.id
      })

      if (alreadyHasSubscription) {
        return ''
      }

      const dueDay = 10
      const monthReference = getCurrentMonthReference()
      const monthLabel = getMonthLabel(monthReference)

      const newSubscription = {
        id: crypto.randomUUID(),
        requestId: request.id,
        guardianName: request.guardianName,
        guardianCpf: request.guardianCpf,
        phone: request.phone,
        email: request.email || '',
        childName: request.childName,
        planName,
        monthlyAmount: amount,
        dueDay,
        startDate: request.startDate || new Date().toISOString().slice(0, 10),
        status: 'Ativa',
        notes: `Assinatura criada automaticamente ao confirmar solicitação de ${planName}.`,
        createdAt: new Date().toLocaleString('pt-BR'),
      }

      const newPayment = {
        id: crypto.randomUUID(),
        subscriptionId: newSubscription.id,
        requestId: request.id,
        monthReference,
        guardianName: request.guardianName,
        guardianCpf: request.guardianCpf,
        phone: request.phone,
        email: request.email || '',
        childName: request.childName,
        type: request.requestType === 'bale' ? 'Balé' : 'Mensalidade',
        title: `${planName} - ${monthLabel}`,
        amount,
        dueDate: createDueDate(monthReference, dueDay),
        status: 'Pendente',
        paymentMethod: 'A definir',
        notes: `Cobrança gerada automaticamente com valor de R$ ${amount}.`,
        createdAt: new Date().toLocaleString('pt-BR'),
      }

      localStorage.setItem(
        'hotelzinho_subscriptions',
        JSON.stringify([newSubscription, ...savedSubscriptions])
      )

      localStorage.setItem(
        'hotelzinho_payments',
        JSON.stringify([newPayment, ...savedPayments])
      )

      return `${planName} confirmada! Uma assinatura e uma cobrança de R$ ${amount} foram criadas automaticamente.`
    }

    if (request.requestType === 'diaria') {
      const alreadyHasPayment = savedPayments.some((payment) => {
        return payment.requestId === request.id && payment.type === 'Diária'
      })

      if (alreadyHasPayment) {
        return ''
      }

      const dueDate =
        request.reservationDate || new Date().toISOString().slice(0, 10)

      const newPayment = {
        id: crypto.randomUUID(),
        requestId: request.id,
        guardianName: request.guardianName,
        guardianCpf: request.guardianCpf,
        phone: request.phone,
        email: request.email || '',
        childName: request.childName,
        type: 'Diária',
        title: `Diária - ${request.childName || request.guardianName}`,
        amount,
        dueDate,
        status: 'Pendente',
        paymentMethod: 'A definir',
        notes: `Cobrança de diária gerada automaticamente com valor de R$ ${amount}.`,
        createdAt: new Date().toLocaleString('pt-BR'),
      }

      localStorage.setItem(
        'hotelzinho_payments',
        JSON.stringify([newPayment, ...savedPayments])
      )

      return `Diária confirmada! Uma cobrança de R$ ${amount} foi criada automaticamente.`
    }

    return ''
  }

  function updateStatus(id, newStatus) {
    const requestToUpdate = requests.find((request) => request.id === id)

    const updatedRequests = requests.map((request) => {
      if (request.id === id) {
        return {
          ...request,
          status: newStatus,
        }
      }

      return request
    })

    saveRequests(updatedRequests)

    if (
      newStatus === 'Confirmada' &&
      ['mensalidade', 'bale', 'diaria'].includes(requestToUpdate?.requestType)
    ) {
      const message = createAutomaticBillingForRequest({
        ...requestToUpdate,
        status: newStatus,
      })

      if (message) {
        setRefreshKey((currentKey) => currentKey + 1)
        alert(message)
      }
    }
  }

  function deleteRequest(id) {
    const confirmDelete = window.confirm(
      'Tem certeza que deseja excluir esta solicitação?'
    )

    if (!confirmDelete) return

    const updatedRequests = requests.filter((request) => request.id !== id)

    saveRequests(updatedRequests)
  }

  function clearFilters() {
    setStatusFilter('Todas')
    setBuildingFilter('Todos')
    setRequestTypeFilter('Todos')
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

  function getRequestStyle(typeLabel) {
    const label = typeLabel.toLowerCase()

    if (label.includes('visita')) {
      return 'bg-purple-50 text-purple-700 border-purple-200'
    }

    if (label.includes('mensalidade')) {
      return 'bg-blue-50 text-blue-700 border-blue-200'
    }

    if (label.includes('diária')) {
      return 'bg-orange-50 text-orange-700 border-orange-200'
    }

    if (label.includes('balé')) {
      return 'bg-pink-50 text-pink-700 border-pink-200'
    }

    return 'bg-gray-50 text-gray-700 border-gray-200'
  }

  return (
    <section className="min-h-screen bg-[#F4EAD6] py-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="bg-white rounded-[2.5rem] p-6 md:p-8 shadow-sm border border-[#D8C8AA] mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <span className="inline-flex bg-[#E6D7B8] text-[#6B722E] px-5 py-2 rounded-full font-black">
                Painel administrativo
              </span>

              <h1 className="mt-4 text-4xl md:text-5xl font-black text-[#2F2A22]">
                Gestão da Pousada Aconchego
              </h1>

              <p className="mt-3 text-[#5B4A39] max-w-2xl">
                Organize solicitações, visitas, assinaturas e cobranças em um
                painel mais limpo e profissional.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="/"
                className="bg-white text-[#6B722E] border-2 border-[#6B722E] px-6 py-3 rounded-full font-black text-center hover:bg-[#F8F1E4] transition"
              >
                Ver site
              </a>

              <button
                type="button"
                onClick={logout}
                className="bg-[#6B722E] text-white px-6 py-3 rounded-full font-black hover:bg-[#596025] transition shadow"
              >
                Sair
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-[2rem] p-3 shadow-sm border border-[#D8C8AA] mb-8 overflow-x-auto">
          <div className="flex gap-3 min-w-max">
            <TabButton
              icon={LayoutDashboard}
              label="Resumo"
              value="resumo"
              activeTab={activeTab}
              onClick={setActiveTab}
            />

            <TabButton
              icon={CalendarCheck}
              label="Visitas"
              value="visitas"
              activeTab={activeTab}
              onClick={setActiveTab}
            />

            <TabButton
              icon={ReceiptText}
              label="Assinaturas"
              value="assinaturas"
              activeTab={activeTab}
              onClick={setActiveTab}
            />

            <TabButton
              icon={Wallet}
              label="Financeiro"
              value="financeiro"
              activeTab={activeTab}
              onClick={setActiveTab}
            />

            <TabButton
              icon={ListChecks}
              label="Solicitações"
              value="solicitacoes"
              activeTab={activeTab}
              onClick={setActiveTab}
            />
          </div>
        </div>

        {activeTab === 'resumo' && (
          <div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5 mb-8">
              <SummaryCard
                title="Total"
                value={totalRequests}
                icon={ClipboardList}
                color="text-[#2F2A22]"
              />

              <SummaryCard
                title="Pendentes"
                value={pendingRequests}
                icon={Clock}
                color="text-[#C99A3D]"
              />

              <SummaryCard
                title="Confirmadas"
                value={confirmedRequests}
                icon={CheckCircle}
                color="text-green-700"
              />

              <SummaryCard
                title="Canceladas"
                value={canceledRequests}
                icon={XCircle}
                color="text-red-700"
              />

              <SummaryCard
                title="Finalizadas"
                value={finishedRequests}
                icon={Flag}
                color="text-[#6B722E]"
              />
            </div>

            <div className="grid lg:grid-cols-4 gap-5">
              <OverviewCard
                icon={CalendarCheck}
                title="Visitas"
                value={visitRequests}
                text="Solicitações para conhecer o espaço."
                onClick={() => setActiveTab('solicitacoes')}
              />

              <OverviewCard
                icon={ReceiptText}
                title="Mensalidades"
                value={monthlyRequests}
                text="Pedidos de planos mensais."
                onClick={() => setActiveTab('solicitacoes')}
              />

              <OverviewCard
                icon={CalendarDays}
                title="Diárias"
                value={dailyRequests}
                text="Reservas pontuais de diária."
                onClick={() => setActiveTab('solicitacoes')}
              />

              <OverviewCard
                icon={Baby}
                title="Balé"
                value={balletRequests}
                text="Solicitações de matrícula no balé."
                onClick={() => setActiveTab('solicitacoes')}
              />
            </div>
          </div>
        )}

        {activeTab === 'visitas' && <AdminVisitSlots />}

        {activeTab === 'assinaturas' && (
          <AdminSubscriptions key={`subscriptions-${refreshKey}`} />
        )}

        {activeTab === 'financeiro' && (
          <AdminFinance key={`finance-${refreshKey}`} />
        )}

        {activeTab === 'solicitacoes' && (
          <div>
            <div className="bg-white rounded-[2.5rem] p-6 shadow-sm border border-[#D8C8AA] mb-8">
              <div className="mb-6">
                <span className="inline-flex bg-[#E6D7B8] text-[#6B722E] px-5 py-2 rounded-full font-black">
                  Solicitações
                </span>

                <h2 className="mt-4 text-3xl font-black text-[#2F2A22]">
                  Fichas recebidas
                </h2>

                <p className="mt-2 text-[#5B4A39]">
                  Busque, filtre e acompanhe as solicitações enviadas pelos
                  responsáveis.
                </p>
              </div>

              <div className="grid lg:grid-cols-6 gap-4">
                <div className="lg:col-span-2">
                  <label className="block text-sm font-black text-[#5B4A39] mb-2">
                    Buscar
                  </label>

                  <input
                    type="text"
                    placeholder="Buscar por responsável, criança, telefone..."
                    value={searchTerm}
                    onChange={(event) => setSearchTerm(event.target.value)}
                    className="w-full border-2 border-[#D8C8AA] rounded-2xl px-5 py-4 outline-none focus:border-[#6B722E]"
                  />
                </div>

                <FilterSelect
                  label="Tipo"
                  value={requestTypeFilter}
                  onChange={(event) => setRequestTypeFilter(event.target.value)}
                  options={[
                    'Todos',
                    'Agendamento de visita',
                    'Reserva de diária',
                    'Solicitação de mensalidade',
                    'Matrícula no balé',
                  ]}
                />

                <FilterSelect
                  label="Status"
                  value={statusFilter}
                  onChange={(event) => setStatusFilter(event.target.value)}
                  options={[
                    'Todas',
                    'Pendente',
                    'Confirmada',
                    'Cancelada',
                    'Finalizada',
                  ]}
                />

                <FilterSelect
                  label="Prédio"
                  value={buildingFilter}
                  onChange={(event) => setBuildingFilter(event.target.value)}
                  options={['Todos', 'Prédio dos menores', 'Prédio dos maiores']}
                />

                <div>
                  <label className="block text-sm font-black text-[#5B4A39] mb-2">
                    Data
                  </label>

                  <input
                    type="date"
                    value={dateFilter}
                    onChange={(event) => setDateFilter(event.target.value)}
                    className="w-full border-2 border-[#D8C8AA] rounded-2xl px-5 py-4 outline-none focus:border-[#6B722E]"
                  />
                </div>
              </div>

              <div className="mt-5 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                <p className="text-[#5B4A39] font-semibold">
                  Mostrando{' '}
                  <span className="text-[#6B722E] font-black">
                    {filteredRequests.length}
                  </span>{' '}
                  de{' '}
                  <span className="text-[#6B722E] font-black">
                    {totalRequests}
                  </span>{' '}
                  solicitações.
                </p>

                <button
                  type="button"
                  onClick={clearFilters}
                  className="bg-[#F8F1E4] text-[#6B722E] px-6 py-3 rounded-full font-black hover:bg-[#EFE4CC] transition"
                >
                  Limpar filtros
                </button>
              </div>
            </div>

            {requests.length === 0 ? (
              <EmptyState
                title="Nenhuma solicitação cadastrada"
                text="Quando alguém enviar uma solicitação pelo formulário, ela aparecerá aqui."
              />
            ) : filteredRequests.length === 0 ? (
              <EmptyState
                title="Nenhuma solicitação encontrada"
                text="Tente mudar o filtro ou pesquisar por outro termo."
              />
            ) : (
              <div className="space-y-5">
                {filteredRequests.map((request) => {
                  const requestLabel = getRequestTypeLabel(request)
                  const buildingLabel = getBuildingLabel(request)
                  const whatsAppNumber = formatWhatsAppNumber(request.phone)
                  const ageText = getReservationAgeText(request)
                  const birthDateText = getReservationBirthDate(request)
                  const isExpanded = expandedId === request.id

                  return (
                    <div
                      key={request.id}
                      className="bg-white rounded-[2rem] shadow-sm border border-[#D8C8AA] overflow-hidden"
                    >
                      <button
                        type="button"
                        onClick={() =>
                          setExpandedId(isExpanded ? null : request.id)
                        }
                        className="w-full text-left p-6 hover:bg-[#F8F1E4] transition"
                      >
                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
                          <div className="flex items-start gap-4">
                            <div className="w-14 h-14 rounded-2xl bg-[#F4EAD6] flex items-center justify-center text-[#6B722E] border border-[#D8C8AA]">
                              {buildingLabel === 'Prédio dos menores' ? (
                                <Baby size={28} />
                              ) : (
                                <UsersRound size={28} />
                              )}
                            </div>

                            <div>
                              <div className="flex flex-wrap items-center gap-2 mb-2">
                                <span
                                  className={`px-4 py-2 rounded-full text-xs font-black border ${getRequestStyle(
                                    requestLabel
                                  )}`}
                                >
                                  {requestLabel}
                                </span>

                                <span
                                  className={`px-4 py-2 rounded-full text-xs font-black border ${getStatusStyle(
                                    request.status
                                  )}`}
                                >
                                  {request.status}
                                </span>
                              </div>

                              <h2 className="text-2xl font-black text-[#2F2A22]">
                                {request.childName ||
                                  'Visita sem criança informada'}
                              </h2>

                              <p className="text-[#5B4A39] font-semibold">
                                Responsável: {request.guardianName}
                              </p>
                            </div>
                          </div>

                          <div className="grid sm:grid-cols-3 gap-3 lg:min-w-[420px]">
                            <SmallInfo label="Idade" value={ageText} />
                            <SmallInfo label="Prédio" value={buildingLabel} />
                            <SmallInfo label="Data" value={getMainDate(request)} />
                          </div>

                          <div className="text-[#6B722E] font-black flex items-center gap-2">
                            {isExpanded ? (
                              <>
                                <EyeOff size={20} />
                                Fechar ficha
                              </>
                            ) : (
                              <>
                                <Eye size={20} />
                                Ver ficha
                              </>
                            )}
                          </div>
                        </div>
                      </button>

                      {isExpanded && (
                        <div className="border-t border-[#D8C8AA] p-6 bg-white">
                          <div className="grid lg:grid-cols-2 gap-6">
                            <FichaSection title="Dados do responsável">
                              <InfoItem
                                label="Nome"
                                value={request.guardianName}
                              />
                              <InfoItem
                                label="Telefone principal"
                                value={request.phone}
                              />
                              <InfoItem
                                label="Telefone secundário"
                                value={request.secondaryPhone}
                              />
                              <InfoItem label="CPF" value={request.guardianCpf} />
                              <InfoItem label="E-mail" value={request.email} />
                            </FichaSection>

                            <FichaSection title="Dados da criança">
                              <InfoItem
                                label="Nome"
                                value={request.childName || 'Não informado'}
                              />
                              <InfoItem label="Nascimento" value={birthDateText} />
                              <InfoItem label="Idade" value={ageText} />
                              <InfoItem label="Prédio" value={buildingLabel} />
                              <InfoItem label="Escola" value={request.childSchool} />
                              <InfoItem
                                label="Período escolar"
                                value={request.childPeriod}
                              />
                            </FichaSection>

                            <FichaSection title="Dados da solicitação">
                              <InfoItem label="Tipo" value={requestLabel} />
                              <InfoItem
                                label="Data principal"
                                value={getMainDate(request)}
                              />

                              {request.requestType === 'visita' && (
                                <InfoItem
                                  label="Horário da visita"
                                  value={request.visitTime}
                                />
                              )}

                              {request.requestType === 'diaria' && (
                                <>
                                  <InfoItem
                                    label="Chegada"
                                    value={request.entryTime}
                                  />
                                  <InfoItem
                                    label="Saída"
                                    value={request.exitTime}
                                  />
                                </>
                              )}

                              {['mensalidade', 'bale'].includes(
                                request.requestType
                              ) && (
                                <InfoItem label="Turno" value={request.shift} />
                              )}

                              <InfoItem
                                label="Balé"
                                value={request.balletInterest || 'Não informado'}
                              />
                            </FichaSection>

                            <FichaSection title="Cuidados importantes">
                              <TextBox
                                title="Alergias"
                                text={
                                  request.allergies ||
                                  'Nenhuma alergia informada.'
                                }
                              />

                              <TextBox
                                title="Restrições alimentares"
                                text={
                                  request.foodRestrictions ||
                                  'Nenhuma restrição alimentar informada.'
                                }
                              />

                              <TextBox
                                title="Medicamentos/cuidados"
                                text={
                                  request.medications ||
                                  'Nenhum medicamento ou cuidado específico informado.'
                                }
                              />

                              <TextBox
                                title="Autorizados a buscar"
                                text={
                                  request.authorizedPickup ||
                                  'Nenhuma pessoa autorizada informada.'
                                }
                              />

                              <TextBox
                                title="Observações gerais"
                                text={
                                  request.observations ||
                                  'Nenhuma observação informada.'
                                }
                              />
                            </FichaSection>
                          </div>

                          <p className="mt-5 text-sm text-[#9F8F75]">
                            Criado em: {request.createdAt}
                          </p>

                          <div className="mt-6 flex flex-wrap gap-3">
                            <button
                              type="button"
                              onClick={() =>
                                updateStatus(request.id, 'Confirmada')
                              }
                              className="bg-green-50 text-green-700 border border-green-200 px-4 py-2 rounded-full font-black hover:bg-green-100 transition"
                            >
                              Confirmar
                            </button>

                            <button
                              type="button"
                              onClick={() =>
                                updateStatus(request.id, 'Cancelada')
                              }
                              className="bg-red-50 text-red-700 border border-red-200 px-4 py-2 rounded-full font-black hover:bg-red-100 transition"
                            >
                              Cancelar
                            </button>

                            <button
                              type="button"
                              onClick={() =>
                                updateStatus(request.id, 'Finalizada')
                              }
                              className="bg-blue-50 text-blue-700 border border-blue-200 px-4 py-2 rounded-full font-black hover:bg-blue-100 transition"
                            >
                              Finalizar
                            </button>

                            {whatsAppNumber && (
                              <a
                                href={`https://wa.me/55${whatsAppNumber}`}
                                target="_blank"
                                rel="noreferrer"
                                className="bg-[#6B722E] text-white px-4 py-2 rounded-full font-black hover:bg-[#596025] transition flex items-center gap-2"
                              >
                                <MessageCircle size={18} />
                                WhatsApp
                              </a>
                            )}

                            <button
                              type="button"
                              onClick={() => deleteRequest(request.id)}
                              className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full font-black hover:bg-gray-200 transition"
                            >
                              Excluir
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  )
}

function AdminVisitSlots() {
  const [slots, setSlots] = useState(getSavedVisitSlots)
  const [slotData, setSlotData] = useState({
    date: '',
    time: '',
  })

  function saveSlots(updatedSlots) {
    setSlots(updatedSlots)
    localStorage.setItem('hotelzinho_visit_slots', JSON.stringify(updatedSlots))
  }

  function handleChange(event) {
    const { name, value } = event.target

    setSlotData({
      ...slotData,
      [name]: value,
    })
  }

  function addSlot(event) {
    event.preventDefault()

    if (!slotData.date || !slotData.time) {
      alert('Informe a data e o horário da visita.')
      return
    }

    if (slotData.time < '06:00' || slotData.time > '20:00') {
      alert('O horário da visita precisa ser entre 06:00 e 20:00.')
      return
    }

    const alreadyExists = slots.some((slot) => {
      return slot.date === slotData.date && slot.time === slotData.time
    })

    if (alreadyExists) {
      alert('Esse horário já foi cadastrado.')
      return
    }

    const newSlot = {
      id: crypto.randomUUID(),
      date: slotData.date,
      time: slotData.time,
      status: 'Disponível',
      createdAt: new Date().toLocaleString('pt-BR'),
    }

    saveSlots([newSlot, ...slots])

    setSlotData({
      date: '',
      time: '',
    })
  }

  function deleteSlot(id) {
    const confirmDelete = window.confirm(
      'Tem certeza que deseja excluir este horário?'
    )

    if (!confirmDelete) return

    const updatedSlots = slots.filter((slot) => slot.id !== id)

    saveSlots(updatedSlots)
  }

  return (
    <div className="bg-white rounded-[2.5rem] p-6 shadow-sm border border-[#D8C8AA] mb-8">
      <div className="mb-6">
        <span className="inline-flex bg-[#E6D7B8] text-[#6B722E] px-5 py-2 rounded-full font-black">
          Horários de visita
        </span>

        <h2 className="mt-4 text-3xl font-black text-[#2F2A22]">
          Disponibilidade para visitas
        </h2>

        <p className="mt-2 text-[#5B4A39]">
          Cadastre os horários que os responsáveis poderão escolher na página de solicitação.
        </p>
      </div>

      <form
        onSubmit={addSlot}
        className="grid md:grid-cols-[1fr_1fr_auto] gap-4 mb-6"
      >
        <div>
          <label className="block text-sm font-black text-[#5B4A39] mb-2">
            Data disponível
          </label>

          <input
            type="date"
            name="date"
            value={slotData.date}
            onChange={handleChange}
            className="w-full border-2 border-[#D8C8AA] rounded-2xl px-5 py-4 outline-none focus:border-[#6B722E]"
          />
        </div>

        <div>
          <label className="block text-sm font-black text-[#5B4A39] mb-2">
            Horário disponível
          </label>

          <input
            type="time"
            name="time"
            min="06:00"
            max="20:00"
            value={slotData.time}
            onChange={handleChange}
            className="w-full border-2 border-[#D8C8AA] rounded-2xl px-5 py-4 outline-none focus:border-[#6B722E]"
          />
        </div>

        <button
          type="submit"
          className="self-end bg-[#6B722E] text-white px-6 py-4 rounded-2xl font-black hover:bg-[#596025] transition flex items-center justify-center gap-2"
        >
          <Plus size={20} />
          Adicionar
        </button>
      </form>

      {slots.length === 0 ? (
        <div className="bg-[#F8F1E4] border border-[#D8C8AA] rounded-3xl p-6 text-center">
          <p className="font-bold text-[#5B4A39]">
            Nenhum horário de visita cadastrado ainda.
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {slots.map((slot) => (
            <div
              key={slot.id}
              className="bg-[#F8F1E4] border border-[#D8C8AA] rounded-3xl p-5"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 text-[#6B722E] font-black">
                    <CalendarDays size={18} />
                    {formatDate(slot.date)}
                  </div>

                  <div className="mt-2 flex items-center gap-2 text-[#2F2A22] font-black">
                    <Clock size={18} />
                    {slot.time}
                  </div>

                  <span
                    className={`inline-flex mt-4 px-4 py-2 rounded-full text-xs font-black border ${
                      slot.status === 'Reservado'
                        ? 'bg-red-50 text-red-700 border-red-200'
                        : 'bg-green-50 text-green-700 border-green-200'
                    }`}
                  >
                    {slot.status}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => deleteSlot(slot.id)}
                  className="w-10 h-10 rounded-full bg-white border border-[#D8C8AA] flex items-center justify-center text-[#9A4F2E] hover:bg-red-50 transition"
                >
                  <Trash2 size={18} />
                </button>
              </div>

              {slot.reservedBy && (
                <p className="mt-3 text-sm text-[#5B4A39]">
                  Reservado por: <strong>{slot.reservedBy}</strong>
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function TabButton({ icon: Icon, label, value, activeTab, onClick }) {
  const isActive = activeTab === value

  return (
    <button
      type="button"
      onClick={() => onClick(value)}
      className={`flex items-center gap-2 px-5 py-3 rounded-full font-black transition ${
        isActive
          ? 'bg-[#6B722E] text-white shadow'
          : 'bg-[#F8F1E4] text-[#6B722E] hover:bg-[#EFE4CC]'
      }`}
    >
      <Icon size={20} />
      {label}
    </button>
  )
}

function OverviewCard({ icon: Icon, title, value, text, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="bg-white rounded-[2rem] p-6 shadow-sm border border-[#D8C8AA] hover:shadow-md hover:-translate-y-1 transition text-left"
    >
      <div className="w-14 h-14 rounded-2xl bg-[#F4EAD6] flex items-center justify-center text-[#6B722E] border border-[#D8C8AA]">
        <Icon size={28} />
      </div>

      <h3 className="mt-5 text-2xl font-black text-[#2F2A22]">
        {title}
      </h3>

      <p className="mt-2 text-4xl font-black text-[#6B722E]">
        {value}
      </p>

      <p className="mt-3 text-[#5B4A39]">
        {text}
      </p>
    </button>
  )
}

function SummaryCard({ title, value, icon: Icon, color }) {
  return (
    <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-[#D8C8AA] hover:shadow-md transition">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-[#5B4A39] font-black">
            {title}
          </p>

          <h2 className={`text-4xl font-black mt-2 ${color}`}>
            {value}
          </h2>
        </div>

        <div className="w-14 h-14 rounded-2xl bg-[#F4EAD6] flex items-center justify-center text-[#6B722E] border border-[#D8C8AA]">
          <Icon size={28} />
        </div>
      </div>
    </div>
  )
}

function FilterSelect({ label, value, onChange, options }) {
  return (
    <div>
      <label className="block text-sm font-black text-[#5B4A39] mb-2">
        {label}
      </label>

      <select
        value={value}
        onChange={onChange}
        className="w-full border-2 border-[#D8C8AA] rounded-2xl px-5 py-4 outline-none focus:border-[#6B722E]"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  )
}

function SmallInfo({ label, value }) {
  return (
    <div className="bg-white border border-[#D8C8AA] rounded-2xl p-3">
      <p className="text-xs font-black text-[#9F8F75] uppercase">
        {label}
      </p>

      <p className="mt-1 text-sm font-black text-[#2F2A22]">
        {value || 'Não informado'}
      </p>
    </div>
  )
}

function FichaSection({ title, children }) {
  return (
    <div className="bg-[#F8F1E4] rounded-[2rem] p-5 border border-[#D8C8AA]">
      <h3 className="text-xl font-black text-[#2F2A22] mb-4">
        {title}
      </h3>

      <div className="grid sm:grid-cols-2 gap-4">
        {children}
      </div>
    </div>
  )
}

function InfoItem({ label, value }) {
  return (
    <div className="bg-white rounded-2xl p-4 border border-[#D8C8AA]">
      <p className="text-xs font-black text-[#9F8F75] uppercase">
        {label}
      </p>

      <p className="mt-1 text-[#2F2A22] font-bold">
        {value || 'Não informado'}
      </p>
    </div>
  )
}

function TextBox({ title, text }) {
  return (
    <div className="sm:col-span-2 bg-white rounded-2xl p-4 border border-[#D8C8AA]">
      <p className="text-xs font-black text-[#9F8F75] uppercase mb-1">
        {title}
      </p>

      <p className="text-[#5B4A39] font-medium">
        {text}
      </p>
    </div>
  )
}

function EmptyState({ title, text }) {
  return (
    <div className="bg-white rounded-[2.5rem] p-10 shadow-sm text-center border border-[#D8C8AA]">
      <div className="w-16 h-16 rounded-[2rem] bg-[#F4EAD6] border border-[#D8C8AA] flex items-center justify-center text-[#6B722E] mx-auto mb-4">
        <ClipboardList size={32} />
      </div>

      <h2 className="text-2xl font-black text-[#2F2A22]">
        {title}
      </h2>

      <p className="mt-2 text-[#5B4A39]">
        {text}
      </p>
    </div>
  )
}

export default AdminDashboard