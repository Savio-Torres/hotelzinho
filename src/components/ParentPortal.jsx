import { useMemo, useState } from 'react'
import {
  ArrowLeft,
  Baby,
  CalendarDays,
  CheckCircle,
  ClipboardList,
  CreditCard,
  FileText,
  LayoutDashboard,
  LogOut,
  ReceiptText,
  ShieldCheck,
  UserRound,
  Wallet,
} from 'lucide-react'

function onlyNumbers(value) {
  return String(value || '').replace(/\D/g, '')
}

function getSavedRequests() {
  return JSON.parse(localStorage.getItem('hotelzinho_reservations')) || []
}

function getSavedPayments() {
  return JSON.parse(localStorage.getItem('hotelzinho_payments')) || []
}

function getSavedSubscriptions() {
  return JSON.parse(localStorage.getItem('hotelzinho_subscriptions')) || []
}

function formatDate(date) {
  if (!date) return 'Não informado'

  const [year, month, day] = String(date).split('-')

  if (!year || !month || !day) {
    return date
  }

  return `${day}/${month}/${year}`
}

function formatCurrency(value) {
  const numberValue = Number(value || 0)

  return numberValue.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })
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

function getStatusStyle(status) {
  if (status === 'Confirmada' || status === 'Pago' || status === 'Ativa') {
    return 'bg-green-50 text-green-700 border-green-200'
  }

  if (status === 'Cancelada' || status === 'Atrasado' || status === 'Encerrada') {
    return 'bg-red-50 text-red-700 border-red-200'
  }

  if (status === 'Finalizada') {
    return 'bg-blue-50 text-blue-700 border-blue-200'
  }

  if (status === 'Pausada') {
    return 'bg-orange-50 text-orange-700 border-orange-200'
  }

  return 'bg-yellow-50 text-yellow-700 border-yellow-200'
}

function ParentPortal() {
  const [activeTab, setActiveTab] = useState('inicio')

  const parentPhone = sessionStorage.getItem('parent_phone')
  const parentCpf = sessionStorage.getItem('parent_cpf')

  const requests = useMemo(() => {
    const savedRequests = getSavedRequests()

    return savedRequests.filter((request) => {
      const requestPhone = onlyNumbers(request.phone)
      const requestCpf = onlyNumbers(request.guardianCpf)

      return requestPhone === parentPhone && requestCpf === parentCpf
    })
  }, [parentPhone, parentCpf])

  const payments = useMemo(() => {
    const savedPayments = getSavedPayments()

    return savedPayments.filter((payment) => {
      const paymentPhone = onlyNumbers(payment.phone)
      const paymentCpf = onlyNumbers(payment.guardianCpf)

      return paymentPhone === parentPhone && paymentCpf === parentCpf
    })
  }, [parentPhone, parentCpf])

  const subscriptions = useMemo(() => {
    const savedSubscriptions = getSavedSubscriptions()

    return savedSubscriptions.filter((subscription) => {
      const subscriptionPhone = onlyNumbers(subscription.phone)
      const subscriptionCpf = onlyNumbers(subscription.guardianCpf)

      return subscriptionPhone === parentPhone && subscriptionCpf === parentCpf
    })
  }, [parentPhone, parentCpf])

  const responsible = requests[0] || subscriptions[0] || payments[0]

  const children = useMemo(() => {
    const childrenFromRequests = requests
      .filter((request) => request.childName)
      .map((request) => ({
        childName: request.childName || '',
        birthDateFormatted: request.birthDateFormatted || formatDate(request.birthDate),
        childAgeText: request.childAgeText || 'Não informado',
        ageGroup: request.ageGroup || 'Não informado',
        childSchool: request.childSchool || 'Não informado',
        childPeriod: request.childPeriod || 'Não informado',
        allergies: request.allergies || 'Não informado',
        foodRestrictions: request.foodRestrictions || 'Não informado',
        medications: request.medications || 'Não informado',
        authorizedPickup: request.authorizedPickup || 'Não informado',
      }))

    const childrenFromSubscriptions = subscriptions
      .filter((subscription) => subscription.childName)
      .map((subscription) => ({
        childName: subscription.childName || '',
        birthDateFormatted: 'Não informado',
        childAgeText: 'Não informado',
        ageGroup: 'Não informado',
        childSchool: 'Não informado',
        childPeriod: 'Não informado',
        allergies: 'Não informado',
        foodRestrictions: 'Não informado',
        medications: 'Não informado',
        authorizedPickup: 'Não informado',
      }))

    const allChildren = [...childrenFromRequests, ...childrenFromSubscriptions]

    return allChildren.filter((child, index, array) => {
      return (
        array.findIndex(
          (item) =>
            item.childName.toLowerCase() === child.childName.toLowerCase()
        ) === index
      )
    })
  }, [requests, subscriptions])

  const pendingPayments = payments.filter(
    (payment) => payment.status === 'Pendente' || payment.status === 'Atrasado'
  )

  const activeSubscriptions = subscriptions.filter(
    (subscription) => subscription.status === 'Ativa'
  )

  const totalPendingAmount = pendingPayments.reduce((sum, payment) => {
    return sum + Number(payment.amount || 0)
  }, 0)

  function logout() {
    sessionStorage.removeItem('parent_logged')
    sessionStorage.removeItem('parent_phone')
    sessionStorage.removeItem('parent_cpf')

    window.location.href = '/entrar'
  }

  if (!responsible) {
    return (
      <section className="min-h-screen bg-[#F4EAD6] flex items-center justify-center px-6">
        <div className="bg-white rounded-[2.5rem] p-8 border border-[#D8C8AA] shadow-xl text-center max-w-md">
          <h1 className="text-3xl font-black text-[#2F2A22]">
            Nenhum dado encontrado
          </h1>

          <p className="mt-3 text-[#5B4A39]">
            Faça login novamente ou envie uma solicitação primeiro.
          </p>

          <a
            href="/entrar"
            className="inline-block mt-6 bg-[#6B722E] text-white px-6 py-3 rounded-full font-black hover:bg-[#596025] transition"
          >
            Voltar ao login
          </a>
        </div>
      </section>
    )
  }

  return (
    <section className="min-h-screen bg-[#F4EAD6] py-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <a
            href="/"
            className="inline-flex items-center gap-2 text-[#6B722E] font-black hover:underline"
          >
            <ArrowLeft size={20} />
            Voltar para o site
          </a>

          <button
            type="button"
            onClick={logout}
            className="inline-flex items-center justify-center gap-2 bg-white text-[#6B722E] border-2 border-[#6B722E] px-5 py-3 rounded-full font-black hover:bg-[#F8F1E4] transition"
          >
            <LogOut size={20} />
            Sair
          </button>
        </div>

        <div className="bg-white rounded-[2.5rem] p-6 md:p-8 shadow-sm border border-[#D8C8AA] mb-8">
          <div className="grid lg:grid-cols-[1fr_auto] gap-6 items-center">
            <div>
              <span className="inline-flex bg-[#E6D7B8] text-[#6B722E] px-5 py-2 rounded-full font-black">
                Portal dos responsáveis
              </span>

              <h1 className="mt-5 text-4xl md:text-5xl font-black text-[#2F2A22]">
                Olá, {responsible.guardianName}
              </h1>

              <p className="mt-3 text-[#5B4A39] max-w-2xl">
                Acompanhe solicitações, dados das crianças, assinaturas e
                pagamentos vinculados ao seu cadastro.
              </p>
            </div>

            <div className="bg-[#F8F1E4] border border-[#D8C8AA] rounded-[2rem] p-5">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-white border border-[#D8C8AA] flex items-center justify-center text-[#6B722E]">
                  <UserRound size={28} />
                </div>

                <div>
                  <p className="text-sm font-black text-[#9F8F75]">
                    Responsável
                  </p>

                  <p className="font-black text-[#2F2A22]">
                    {responsible.phone || 'Telefone não informado'}
                  </p>

                  <p className="text-sm text-[#5B4A39]">
                    {responsible.email || 'E-mail não informado'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-[2rem] p-3 shadow-sm border border-[#D8C8AA] mb-8 overflow-x-auto">
          <div className="flex gap-3 min-w-max">
            <TabButton
              icon={LayoutDashboard}
              label="Início"
              value="inicio"
              activeTab={activeTab}
              onClick={setActiveTab}
            />

            <TabButton
              icon={ClipboardList}
              label="Solicitações"
              value="solicitacoes"
              activeTab={activeTab}
              onClick={setActiveTab}
            />

            <TabButton
              icon={Baby}
              label="Crianças"
              value="criancas"
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
          </div>
        </div>

        {activeTab === 'inicio' && (
          <div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
              <SummaryCard
                icon={ClipboardList}
                title="Solicitações"
                value={requests.length}
              />

              <SummaryCard
                icon={Baby}
                title="Crianças"
                value={children.length}
              />

              <SummaryCard
                icon={ReceiptText}
                title="Assinaturas"
                value={activeSubscriptions.length}
              />

              <SummaryCard
                icon={Wallet}
                title="Pendências"
                value={pendingPayments.length}
              />
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              <PortalSection
                title="Resumo financeiro"
                description="Veja rapidamente suas pendências atuais."
              >
                <div className="bg-[#F8F1E4] border border-[#D8C8AA] rounded-[2rem] p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-white border border-[#D8C8AA] flex items-center justify-center text-[#6B722E]">
                      <CreditCard size={28} />
                    </div>

                    <div>
                      <p className="text-sm font-black text-[#9F8F75]">
                        Valor pendente
                      </p>

                      <h2 className="mt-1 text-4xl font-black text-[#2F2A22]">
                        {formatCurrency(totalPendingAmount)}
                      </h2>

                      <p className="mt-2 text-[#5B4A39]">
                        {pendingPayments.length > 0
                          ? 'Existem pagamentos pendentes ou atrasados.'
                          : 'Nenhuma pendência financeira no momento.'}
                      </p>
                    </div>
                  </div>
                </div>
              </PortalSection>

              <PortalSection
                title="Últimas solicitações"
                description="Acompanhe os pedidos enviados recentemente."
              >
                {requests.length === 0 ? (
                  <EmptyBox text="Nenhuma solicitação encontrada." />
                ) : (
                  <div className="space-y-4">
                    {requests.slice(0, 3).map((request) => (
                      <RequestCard key={request.id} request={request} compact />
                    ))}
                  </div>
                )}
              </PortalSection>
            </div>
          </div>
        )}

        {activeTab === 'solicitacoes' && (
          <PortalSection
            title="Minhas solicitações"
            description="Acompanhe o status das solicitações enviadas."
          >
            {requests.length === 0 ? (
              <EmptyBox text="Nenhuma solicitação encontrada." />
            ) : (
              <div className="space-y-4">
                {requests.map((request) => (
                  <RequestCard key={request.id} request={request} />
                ))}
              </div>
            )}
          </PortalSection>
        )}

        {activeTab === 'criancas' && (
          <PortalSection
            title="Minhas crianças"
            description="Crianças vinculadas às suas solicitações e assinaturas."
          >
            {children.length === 0 ? (
              <EmptyBox text="Nenhuma criança vinculada ainda." />
            ) : (
              <div className="grid lg:grid-cols-2 gap-5">
                {children.map((child) => (
                  <ChildCard key={child.childName} child={child} />
                ))}
              </div>
            )}
          </PortalSection>
        )}

        {activeTab === 'assinaturas' && (
          <PortalSection
            title="Minhas assinaturas"
            description="Planos mensais ativos, pausados ou encerrados."
          >
            {subscriptions.length === 0 ? (
              <EmptyBox text="Nenhuma assinatura cadastrada ainda." />
            ) : (
              <div className="space-y-4">
                {subscriptions.map((subscription) => (
                  <SubscriptionCard
                    key={subscription.id}
                    subscription={subscription}
                  />
                ))}
              </div>
            )}
          </PortalSection>
        )}

        {activeTab === 'financeiro' && (
          <PortalSection
            title="Financeiro"
            description="Pagamentos, vencimentos, status e formas de pagamento."
          >
            {payments.length === 0 ? (
              <EmptyBox text="Nenhum pagamento cadastrado ainda." />
            ) : (
              <div className="space-y-4">
                {payments.map((payment) => (
                  <PaymentCard key={payment.id} payment={payment} />
                ))}
              </div>
            )}

            {payments.length > 0 && (
              <div className="mt-8 bg-[#F8F1E4] border border-[#D8C8AA] rounded-[2rem] p-6">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-white border border-[#D8C8AA] flex items-center justify-center text-[#6B722E]">
                    <ShieldCheck size={28} />
                  </div>

                  <div>
                    <h3 className="text-xl font-black text-[#2F2A22]">
                      Informação sobre pagamento
                    </h3>

                    <p className="mt-2 text-[#5B4A39]">
                      Os pagamentos ainda são acompanhados pela administração.
                      Caso a forma esteja como “A definir”, aguarde o contato da
                      equipe ou confirme as instruções diretamente com a Pousada
                      Aconchego.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </PortalSection>
        )}
      </div>
    </section>
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

function SummaryCard({ icon: Icon, title, value }) {
  return (
    <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-[#D8C8AA]">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-[#5B4A39] font-black">
            {title}
          </p>

          <h2 className="text-4xl font-black mt-2 text-[#2F2A22]">
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

function PortalSection({ title, description, children }) {
  return (
    <div className="bg-white rounded-[2.5rem] p-6 shadow-sm border border-[#D8C8AA]">
      <div className="mb-6">
        <span className="inline-flex bg-[#E6D7B8] text-[#6B722E] px-5 py-2 rounded-full font-black">
          {title}
        </span>

        <p className="mt-3 text-[#5B4A39]">
          {description}
        </p>
      </div>

      {children}
    </div>
  )
}

function RequestCard({ request, compact = false }) {
  return (
    <div className="bg-[#F8F1E4] border border-[#D8C8AA] rounded-[2rem] p-5">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div>
          <h3 className="text-xl font-black text-[#2F2A22]">
            {getRequestTypeLabel(request)}
          </h3>

          <p className="mt-1 text-[#5B4A39] font-semibold">
            {request.childName || 'Visita'}
          </p>

          <div className="mt-3 flex items-center gap-2 text-[#5B4A39]">
            <CalendarDays size={18} />
            {getMainDate(request)}
          </div>

          {!compact && request.visitTime && (
            <p className="mt-1 text-sm text-[#5B4A39]">
              Horário: {request.visitTime}
            </p>
          )}

          {!compact && request.shift && (
            <p className="mt-1 text-sm text-[#5B4A39]">
              Turno: {request.shift}
            </p>
          )}
        </div>

        <span
          className={`px-4 py-2 rounded-full text-xs font-black border ${getStatusStyle(
            request.status
          )}`}
        >
          {request.status}
        </span>
      </div>

      {!compact && request.observations && (
        <div className="mt-4 bg-white border border-[#D8C8AA] rounded-2xl p-4">
          <p className="text-xs font-black text-[#9F8F75] uppercase">
            Observações
          </p>

          <p className="mt-1 text-[#5B4A39]">
            {request.observations}
          </p>
        </div>
      )}
    </div>
  )
}

function ChildCard({ child }) {
  return (
    <div className="bg-[#F8F1E4] border border-[#D8C8AA] rounded-[2rem] p-5">
      <div className="flex items-start gap-4">
        <div className="w-14 h-14 rounded-2xl bg-white border border-[#D8C8AA] flex items-center justify-center text-[#6B722E]">
          <Baby size={28} />
        </div>

        <div>
          <h3 className="text-2xl font-black text-[#2F2A22]">
            {child.childName}
          </h3>

          <p className="mt-1 text-[#5B4A39] font-semibold">
            {child.childAgeText} • {child.ageGroup}
          </p>

          <p className="mt-1 text-sm text-[#5B4A39]">
            Nascimento: {child.birthDateFormatted}
          </p>
        </div>
      </div>

      <div className="mt-5 grid sm:grid-cols-2 gap-3">
        <InfoItem label="Escola" value={child.childSchool} />
        <InfoItem label="Período" value={child.childPeriod} />
        <InfoItem label="Alergias" value={child.allergies} />
        <InfoItem label="Restrições" value={child.foodRestrictions} />
        <InfoItem label="Medicamentos" value={child.medications} />
        <InfoItem label="Autorizados" value={child.authorizedPickup} />
      </div>
    </div>
  )
}

function SubscriptionCard({ subscription }) {
  return (
    <div className="bg-[#F8F1E4] border border-[#D8C8AA] rounded-[2rem] p-5">
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-5">
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-2xl bg-white border border-[#D8C8AA] flex items-center justify-center text-[#6B722E]">
            <ReceiptText size={28} />
          </div>

          <div>
            <span
              className={`inline-flex px-4 py-2 rounded-full text-xs font-black border ${getStatusStyle(
                subscription.status
              )}`}
            >
              {subscription.status}
            </span>

            <h3 className="mt-3 text-2xl font-black text-[#2F2A22]">
              {subscription.planName}
            </h3>

            <p className="mt-1 text-[#5B4A39] font-semibold">
              Criança: {subscription.childName || 'Não vinculada'}
            </p>

            <p className="text-[#5B4A39]">
              Início: {formatDate(subscription.startDate)}
            </p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-3 lg:min-w-[360px]">
          <InfoItem
            label="Valor mensal"
            value={formatCurrency(subscription.monthlyAmount)}
          />

          <InfoItem
            label="Vencimento"
            value={`Todo dia ${subscription.dueDay}`}
          />
        </div>
      </div>

      {subscription.notes && (
        <div className="mt-4 bg-white border border-[#D8C8AA] rounded-2xl p-4">
          <p className="text-xs font-black text-[#9F8F75] uppercase">
            Observações
          </p>

          <p className="mt-1 text-[#5B4A39]">
            {subscription.notes}
          </p>
        </div>
      )}
    </div>
  )
}

function PaymentCard({ payment }) {
  return (
    <div className="bg-[#F8F1E4] border border-[#D8C8AA] rounded-[2rem] p-5">
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-5">
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-2xl bg-white border border-[#D8C8AA] flex items-center justify-center text-[#6B722E]">
            <Wallet size={28} />
          </div>

          <div>
            <div className="flex flex-wrap gap-2">
              <span
                className={`px-4 py-2 rounded-full text-xs font-black border ${getStatusStyle(
                  payment.status
                )}`}
              >
                {payment.status}
              </span>

              <span className="px-4 py-2 rounded-full text-xs font-black border bg-white text-[#6B722E] border-[#D8C8AA]">
                {payment.type}
              </span>
            </div>

            <h3 className="mt-3 text-2xl font-black text-[#2F2A22]">
              {payment.title}
            </h3>

            <p className="mt-1 text-[#5B4A39] font-semibold">
              Criança: {payment.childName || 'Não vinculada'}
            </p>
          </div>
        </div>

        <div className="grid sm:grid-cols-3 gap-3 lg:min-w-[520px]">
          <InfoItem label="Valor" value={formatCurrency(payment.amount)} />
          <InfoItem label="Vencimento" value={formatDate(payment.dueDate)} />
          <InfoItem
            label="Forma"
            value={payment.paymentMethod || 'A definir'}
          />
        </div>
      </div>

      {payment.notes && (
        <div className="mt-4 bg-white border border-[#D8C8AA] rounded-2xl p-4">
          <p className="text-xs font-black text-[#9F8F75] uppercase">
            Observações
          </p>

          <p className="mt-1 text-[#5B4A39]">
            {payment.notes}
          </p>
        </div>
      )}

      {payment.status !== 'Pago' && (
        <div className="mt-5 bg-white border border-[#D8C8AA] rounded-2xl p-4">
          <div className="flex items-start gap-3">
            <FileText className="text-[#6B722E] mt-1" size={22} />

            <div>
              <h4 className="font-black text-[#2F2A22]">
                Instruções
              </h4>

              <p className="mt-1 text-[#5B4A39]">
                Entre em contato com a administração para confirmar a forma de
                pagamento ou aguarde as instruções oficiais.
              </p>
            </div>
          </div>
        </div>
      )}
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

function EmptyBox({ text }) {
  return (
    <div className="bg-[#F8F1E4] border border-[#D8C8AA] rounded-[2rem] p-6 text-center">
      <div className="w-14 h-14 rounded-2xl bg-white border border-[#D8C8AA] flex items-center justify-center text-[#6B722E] mx-auto mb-4">
        <CheckCircle size={28} />
      </div>

      <p className="font-bold text-[#5B4A39]">
        {text}
      </p>
    </div>
  )
}

export default ParentPortal