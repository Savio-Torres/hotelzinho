import { useMemo, useState } from 'react'
import {
  CheckCircle,
  PauseCircle,
  Plus,
  ReceiptText,
  Trash2,
  UserRound,
  Wallet,
  XCircle,
} from 'lucide-react'

function getSavedRequests() {
  return JSON.parse(localStorage.getItem('hotelzinho_reservations')) || []
}

function getSavedSubscriptions() {
  return JSON.parse(localStorage.getItem('hotelzinho_subscriptions')) || []
}

function getSavedPayments() {
  return JSON.parse(localStorage.getItem('hotelzinho_payments')) || []
}

function onlyNumbers(value) {
  return String(value || '').replace(/\D/g, '')
}

function formatDate(date) {
  if (!date) return 'Não informado'

  const [year, month, day] = date.split('-')

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

function createDueDate(monthReference, dueDay) {
  const [year, month] = monthReference.split('-').map(Number)
  const lastDayOfMonth = new Date(year, month, 0).getDate()
  const safeDay = Math.min(Number(dueDay), lastDayOfMonth)

  return `${year}-${String(month).padStart(2, '0')}-${String(safeDay).padStart(
    2,
    '0'
  )}`
}

function AdminSubscriptions() {
  const [subscriptions, setSubscriptions] = useState(getSavedSubscriptions)

  const [subscriptionData, setSubscriptionData] = useState({
    responsibleKey: '',
    childName: '',
    planName: '',
    monthlyAmount: '',
    dueDay: '10',
    startDate: '',
    status: 'Ativa',
    notes: '',
  })

  const requests = getSavedRequests()

  const responsibles = useMemo(() => {
    const mappedResponsibles = requests
      .filter((request) => {
        return request.guardianName && request.phone && request.guardianCpf
      })
      .map((request) => {
        const key = `${onlyNumbers(request.phone)}-${onlyNumbers(
          request.guardianCpf
        )}`

        const children = requests
          .filter((item) => {
            return (
              onlyNumbers(item.phone) === onlyNumbers(request.phone) &&
              onlyNumbers(item.guardianCpf) ===
                onlyNumbers(request.guardianCpf) &&
              item.childName
            )
          })
          .map((item) => item.childName)

        return {
          key,
          guardianName: request.guardianName,
          guardianCpf: request.guardianCpf,
          phone: request.phone,
          email: request.email || '',
          children,
        }
      })

    return mappedResponsibles.filter((responsible, index, array) => {
      return array.findIndex((item) => item.key === responsible.key) === index
    })
  }, [requests])

  const selectedResponsible = responsibles.find((responsible) => {
    return responsible.key === subscriptionData.responsibleKey
  })

  const childrenOptions = selectedResponsible
    ? [...new Set(selectedResponsible.children)]
    : []

  const activeSubscriptions = subscriptions.filter(
    (subscription) => subscription.status === 'Ativa'
  ).length

  const pausedSubscriptions = subscriptions.filter(
    (subscription) => subscription.status === 'Pausada'
  ).length

  const closedSubscriptions = subscriptions.filter(
    (subscription) => subscription.status === 'Encerrada'
  ).length

  const monthlyForecast = subscriptions
    .filter((subscription) => subscription.status === 'Ativa')
    .reduce((sum, subscription) => {
      return sum + Number(subscription.monthlyAmount || 0)
    }, 0)

  function saveSubscriptions(updatedSubscriptions) {
    setSubscriptions(updatedSubscriptions)

    localStorage.setItem(
      'hotelzinho_subscriptions',
      JSON.stringify(updatedSubscriptions)
    )
  }

  function handleChange(event) {
    const { name, value } = event.target

    if (name === 'responsibleKey') {
      setSubscriptionData({
        ...subscriptionData,
        responsibleKey: value,
        childName: '',
      })

      return
    }

    setSubscriptionData({
      ...subscriptionData,
      [name]: value,
    })
  }

  function createSubscription(event) {
    event.preventDefault()

    if (
      !subscriptionData.responsibleKey ||
      !subscriptionData.childName ||
      !subscriptionData.planName ||
      !subscriptionData.monthlyAmount ||
      !subscriptionData.dueDay ||
      !subscriptionData.startDate
    ) {
      alert(
        'Preencha responsável, criança, plano, valor mensal, dia de vencimento e data de início.'
      )
      return
    }

    if (!selectedResponsible) {
      alert('Responsável não encontrado.')
      return
    }

    const newSubscription = {
      id: crypto.randomUUID(),
      guardianName: selectedResponsible.guardianName,
      guardianCpf: selectedResponsible.guardianCpf,
      phone: selectedResponsible.phone,
      email: selectedResponsible.email,
      childName: subscriptionData.childName,
      planName: subscriptionData.planName,
      monthlyAmount: subscriptionData.monthlyAmount,
      dueDay: subscriptionData.dueDay,
      startDate: subscriptionData.startDate,
      status: subscriptionData.status,
      notes: subscriptionData.notes,
      createdAt: new Date().toLocaleString('pt-BR'),
    }

    saveSubscriptions([newSubscription, ...subscriptions])

    setSubscriptionData({
      responsibleKey: '',
      childName: '',
      planName: '',
      monthlyAmount: '',
      dueDay: '10',
      startDate: '',
      status: 'Ativa',
      notes: '',
    })
  }

  function updateSubscriptionStatus(id, status) {
    const updatedSubscriptions = subscriptions.map((subscription) => {
      if (subscription.id === id) {
        return {
          ...subscription,
          status,
          updatedAt: new Date().toLocaleString('pt-BR'),
        }
      }

      return subscription
    })

    saveSubscriptions(updatedSubscriptions)
  }

  function deleteSubscription(id) {
    const confirmDelete = window.confirm(
      'Tem certeza que deseja excluir esta assinatura?'
    )

    if (!confirmDelete) return

    const updatedSubscriptions = subscriptions.filter((subscription) => {
      return subscription.id !== id
    })

    saveSubscriptions(updatedSubscriptions)
  }

  function generatePayment(subscription) {
    if (subscription.status !== 'Ativa') {
      alert('Só é possível gerar cobrança para assinatura ativa.')
      return
    }

    const monthReference = getCurrentMonthReference()
    const payments = getSavedPayments()

    const alreadyExists = payments.some((payment) => {
      return (
        payment.subscriptionId === subscription.id &&
        payment.monthReference === monthReference
      )
    })

    if (alreadyExists) {
      alert('Já existe uma cobrança gerada para esta assinatura neste mês.')
      return
    }

    const dueDate = createDueDate(monthReference, subscription.dueDay)
    const monthLabel = getMonthLabel(monthReference)

    const newPayment = {
      id: crypto.randomUUID(),
      subscriptionId: subscription.id,
      monthReference,
      guardianName: subscription.guardianName,
      guardianCpf: subscription.guardianCpf,
      phone: subscription.phone,
      email: subscription.email,
      childName: subscription.childName,
      type: 'Mensalidade',
      title: `${subscription.planName} - ${monthLabel}`,
      amount: subscription.monthlyAmount,
      dueDate,
      status: 'Pendente',
      paymentMethod: '',
      notes: `Cobrança gerada a partir da assinatura ${subscription.planName}.`,
      createdAt: new Date().toLocaleString('pt-BR'),
    }

    localStorage.setItem(
      'hotelzinho_payments',
      JSON.stringify([newPayment, ...payments])
    )

    alert('Cobrança mensal gerada com sucesso.')
  }

  function getStatusStyle(status) {
    if (status === 'Ativa') {
      return 'bg-green-50 text-green-700 border-green-200'
    }

    if (status === 'Pausada') {
      return 'bg-yellow-50 text-yellow-700 border-yellow-200'
    }

    return 'bg-red-50 text-red-700 border-red-200'
  }

  return (
    <div className="bg-white rounded-[2.5rem] p-6 shadow-sm border border-[#D8C8AA] mb-8">
      <div className="mb-6">
        <span className="inline-flex bg-[#E6D7B8] text-[#6B722E] px-5 py-2 rounded-full font-black">
          Assinaturas
        </span>

        <h2 className="mt-4 text-3xl font-black text-[#2F2A22]">
          Mensalidades e planos ativos
        </h2>

        <p className="mt-2 text-[#5B4A39]">
          Cadastre planos mensais, acompanhe assinaturas ativas e gere cobranças
          para o financeiro.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <SubscriptionSummaryCard
          icon={CheckCircle}
          title="Ativas"
          value={activeSubscriptions}
        />

        <SubscriptionSummaryCard
          icon={PauseCircle}
          title="Pausadas"
          value={pausedSubscriptions}
        />

        <SubscriptionSummaryCard
          icon={XCircle}
          title="Encerradas"
          value={closedSubscriptions}
        />

        <SubscriptionSummaryCard
          icon={Wallet}
          title="Previsão mensal"
          value={formatCurrency(monthlyForecast)}
        />
      </div>

      <form
        onSubmit={createSubscription}
        className="bg-[#F8F1E4] border border-[#D8C8AA] rounded-[2rem] p-5 mb-8"
      >
        <h3 className="text-2xl font-black text-[#2F2A22] mb-5">
          Nova assinatura
        </h3>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-black text-[#5B4A39] mb-2">
              Responsável *
            </label>

            <select
              name="responsibleKey"
              value={subscriptionData.responsibleKey}
              onChange={handleChange}
              className="w-full border-2 border-[#D8C8AA] rounded-2xl px-5 py-4 outline-none focus:border-[#6B722E]"
            >
              <option value="">Selecione o responsável</option>

              {responsibles.map((responsible) => (
                <option key={responsible.key} value={responsible.key}>
                  {responsible.guardianName} — {responsible.phone}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-black text-[#5B4A39] mb-2">
              Criança *
            </label>

            <select
              name="childName"
              value={subscriptionData.childName}
              onChange={handleChange}
              disabled={!selectedResponsible}
              className="w-full border-2 border-[#D8C8AA] rounded-2xl px-5 py-4 outline-none focus:border-[#6B722E] disabled:bg-gray-100"
            >
              <option value="">Selecione a criança</option>

              {childrenOptions.map((childName) => (
                <option key={childName} value={childName}>
                  {childName}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-black text-[#5B4A39] mb-2">
              Plano *
            </label>

            <select
              name="planName"
              value={subscriptionData.planName}
              onChange={handleChange}
              className="w-full border-2 border-[#D8C8AA] rounded-2xl px-5 py-4 outline-none focus:border-[#6B722E]"
            >
              <option value="">Selecione o plano</option>
              <option value="Mensalidade - Manhã">Mensalidade - Manhã</option>
              <option value="Mensalidade - Tarde">Mensalidade - Tarde</option>
              <option value="Mensalidade - Integral">
                Mensalidade - Integral
              </option>
              <option value="Balé">Balé</option>
              <option value="Plano personalizado">Plano personalizado</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-black text-[#5B4A39] mb-2">
              Valor mensal *
            </label>

            <input
              type="number"
              name="monthlyAmount"
              placeholder="Ex: 450"
              min="0"
              step="0.01"
              value={subscriptionData.monthlyAmount}
              onChange={handleChange}
              className="w-full border-2 border-[#D8C8AA] rounded-2xl px-5 py-4 outline-none focus:border-[#6B722E]"
            />
          </div>

          <div>
            <label className="block text-sm font-black text-[#5B4A39] mb-2">
              Dia de vencimento *
            </label>

            <input
              type="number"
              name="dueDay"
              min="1"
              max="31"
              value={subscriptionData.dueDay}
              onChange={handleChange}
              className="w-full border-2 border-[#D8C8AA] rounded-2xl px-5 py-4 outline-none focus:border-[#6B722E]"
            />
          </div>

          <div>
            <label className="block text-sm font-black text-[#5B4A39] mb-2">
              Data de início *
            </label>

            <input
              type="date"
              name="startDate"
              value={subscriptionData.startDate}
              onChange={handleChange}
              className="w-full border-2 border-[#D8C8AA] rounded-2xl px-5 py-4 outline-none focus:border-[#6B722E]"
            />
          </div>

          <div>
            <label className="block text-sm font-black text-[#5B4A39] mb-2">
              Status
            </label>

            <select
              name="status"
              value={subscriptionData.status}
              onChange={handleChange}
              className="w-full border-2 border-[#D8C8AA] rounded-2xl px-5 py-4 outline-none focus:border-[#6B722E]"
            >
              <option value="Ativa">Ativa</option>
              <option value="Pausada">Pausada</option>
              <option value="Encerrada">Encerrada</option>
            </select>
          </div>

          <div className="md:col-span-2 lg:col-span-3">
            <label className="block text-sm font-black text-[#5B4A39] mb-2">
              Observações da assinatura
            </label>

            <textarea
              name="notes"
              placeholder="Ex: mensalidade combinada com vencimento todo dia 10"
              value={subscriptionData.notes}
              onChange={handleChange}
              className="w-full border-2 border-[#D8C8AA] rounded-2xl px-5 py-4 outline-none focus:border-[#6B722E] min-h-28"
            ></textarea>
          </div>
        </div>

        <button
          type="submit"
          className="mt-5 bg-[#6B722E] text-white px-6 py-4 rounded-full font-black hover:bg-[#596025] transition flex items-center justify-center gap-2"
        >
          <Plus size={20} />
          Criar assinatura
        </button>
      </form>

      {responsibles.length === 0 && (
        <div className="bg-[#FFF7E0] border border-[#C99A3D] rounded-3xl p-5 mb-6">
          <p className="font-bold text-[#9A4F2E]">
            Nenhum responsável com telefone e CPF encontrado ainda. Para criar
            assinatura, primeiro é preciso ter uma solicitação com telefone e CPF
            preenchidos.
          </p>
        </div>
      )}

      {subscriptions.length === 0 ? (
        <div className="bg-[#F8F1E4] border border-[#D8C8AA] rounded-3xl p-6 text-center">
          <div className="w-14 h-14 rounded-2xl bg-white border border-[#D8C8AA] flex items-center justify-center text-[#6B722E] mx-auto mb-4">
            <ReceiptText size={28} />
          </div>

          <p className="font-bold text-[#5B4A39]">
            Nenhuma assinatura cadastrada ainda.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {subscriptions.map((subscription) => (
            <div
              key={subscription.id}
              className="bg-[#F8F1E4] border border-[#D8C8AA] rounded-[2rem] p-5"
            >
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-5">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-white border border-[#D8C8AA] flex items-center justify-center text-[#6B722E]">
                    <UserRound size={28} />
                  </div>

                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span
                        className={`px-4 py-2 rounded-full text-xs font-black border ${getStatusStyle(
                          subscription.status
                        )}`}
                      >
                        {subscription.status}
                      </span>

                      <span className="px-4 py-2 rounded-full text-xs font-black border bg-white text-[#6B722E] border-[#D8C8AA]">
                        {subscription.planName}
                      </span>
                    </div>

                    <h3 className="text-2xl font-black text-[#2F2A22]">
                      {subscription.childName}
                    </h3>

                    <p className="mt-1 text-[#5B4A39] font-semibold">
                      Responsável: {subscription.guardianName}
                    </p>

                    <p className="text-[#5B4A39]">
                      Início: {formatDate(subscription.startDate)}
                    </p>
                  </div>
                </div>

                <div className="grid sm:grid-cols-3 gap-3 lg:min-w-[520px]">
                  <SmallSubscriptionInfo
                    label="Valor mensal"
                    value={formatCurrency(subscription.monthlyAmount)}
                  />

                  <SmallSubscriptionInfo
                    label="Vencimento"
                    value={`Todo dia ${subscription.dueDay}`}
                  />

                  <SmallSubscriptionInfo
                    label="Contato"
                    value={subscription.phone}
                  />
                </div>
              </div>

              {subscription.notes && (
                <div className="mt-4 bg-white rounded-2xl p-4 border border-[#D8C8AA]">
                  <p className="text-xs font-black text-[#9F8F75] uppercase">
                    Observações
                  </p>

                  <p className="mt-1 text-[#5B4A39]">
                    {subscription.notes}
                  </p>
                </div>
              )}

              <div className="mt-5 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => generatePayment(subscription)}
                  className="bg-[#6B722E] text-white px-4 py-2 rounded-full font-black hover:bg-[#596025] transition flex items-center gap-2"
                >
                  <ReceiptText size={18} />
                  Gerar cobrança do mês
                </button>

                <button
                  type="button"
                  onClick={() =>
                    updateSubscriptionStatus(subscription.id, 'Ativa')
                  }
                  className="bg-green-50 text-green-700 border border-green-200 px-4 py-2 rounded-full font-black hover:bg-green-100 transition"
                >
                  Ativar
                </button>

                <button
                  type="button"
                  onClick={() =>
                    updateSubscriptionStatus(subscription.id, 'Pausada')
                  }
                  className="bg-yellow-50 text-yellow-700 border border-yellow-200 px-4 py-2 rounded-full font-black hover:bg-yellow-100 transition"
                >
                  Pausar
                </button>

                <button
                  type="button"
                  onClick={() =>
                    updateSubscriptionStatus(subscription.id, 'Encerrada')
                  }
                  className="bg-red-50 text-red-700 border border-red-200 px-4 py-2 rounded-full font-black hover:bg-red-100 transition"
                >
                  Encerrar
                </button>

                <button
                  type="button"
                  onClick={() => deleteSubscription(subscription.id)}
                  className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full font-black hover:bg-gray-200 transition flex items-center gap-2"
                >
                  <Trash2 size={18} />
                  Excluir
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function SubscriptionSummaryCard({ icon: Icon, title, value }) {
  return (
    <div className="bg-[#F8F1E4] rounded-[2rem] p-5 border border-[#D8C8AA]">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-[#5B4A39] font-black">
            {title}
          </p>

          <h3 className="mt-2 text-2xl font-black text-[#2F2A22]">
            {value}
          </h3>
        </div>

        <div className="w-12 h-12 rounded-2xl bg-white border border-[#D8C8AA] flex items-center justify-center text-[#6B722E]">
          <Icon size={24} />
        </div>
      </div>
    </div>
  )
}

function SmallSubscriptionInfo({ label, value }) {
  return (
    <div className="bg-white rounded-2xl p-4 border border-[#D8C8AA]">
      <p className="text-xs font-black text-[#9F8F75] uppercase">
        {label}
      </p>

      <p className="mt-1 text-[#2F2A22] font-black">
        {value || 'Não informado'}
      </p>
    </div>
  )
}

export default AdminSubscriptions