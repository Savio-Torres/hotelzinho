import { useMemo, useState } from 'react'
import {
  CalendarDays,
  CheckCircle,
  CreditCard,
  Edit3,
  Plus,
  ReceiptText,
  Save,
  Trash2,
  Wallet,
  X,
} from 'lucide-react'

function getSavedRequests() {
  return JSON.parse(localStorage.getItem('hotelzinho_reservations')) || []
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

function formatCurrency(value) {
  const numberValue = Number(value || 0)

  return numberValue.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })
}

function onlyNumbers(value) {
  return String(value || '').replace(/\D/g, '')
}

function getDefaultAmountByType(type) {
  if (type === 'Mensalidade') return '400'
  if (type === 'Diária') return '70'
  if (type === 'Balé') return '100'

  return ''
}

function AdminFinance() {
  const [payments, setPayments] = useState(getSavedPayments)

  const [editingPaymentId, setEditingPaymentId] = useState(null)

  const [editData, setEditData] = useState({
    title: '',
    amount: '',
    dueDate: '',
    status: 'Pendente',
    paymentMethod: '',
    notes: '',
    type: '',
    childName: '',
  })

  const [paymentData, setPaymentData] = useState({
    responsibleKey: '',
    childName: '',
    type: '',
    title: '',
    amount: '',
    dueDate: '',
    status: 'Pendente',
    paymentMethod: '',
    notes: '',
  })

  const requests = getSavedRequests()

  const responsibles = useMemo(() => {
    const mappedResponsibles = requests
      .filter((request) => request.guardianName && request.phone && request.guardianCpf)
      .map((request) => ({
        key: `${onlyNumbers(request.phone)}-${onlyNumbers(request.guardianCpf)}`,
        guardianName: request.guardianName,
        guardianCpf: request.guardianCpf,
        phone: request.phone,
        email: request.email || '',
        children: requests
          .filter((item) => {
            return (
              onlyNumbers(item.phone) === onlyNumbers(request.phone) &&
              onlyNumbers(item.guardianCpf) === onlyNumbers(request.guardianCpf) &&
              item.childName
            )
          })
          .map((item) => item.childName),
      }))

    return mappedResponsibles.filter((responsible, index, array) => {
      return array.findIndex((item) => item.key === responsible.key) === index
    })
  }, [requests])

  const selectedResponsible = responsibles.find(
    (responsible) => responsible.key === paymentData.responsibleKey
  )

  const childrenOptions = selectedResponsible
    ? [...new Set(selectedResponsible.children)]
    : []

  const totalPending = payments.filter((payment) => payment.status === 'Pendente').length
  const totalPaid = payments.filter((payment) => payment.status === 'Pago').length
  const totalLate = payments.filter((payment) => payment.status === 'Atrasado').length

  const totalAmount = payments.reduce((sum, payment) => {
    return sum + Number(payment.amount || 0)
  }, 0)

  function savePayments(updatedPayments) {
    setPayments(updatedPayments)
    localStorage.setItem('hotelzinho_payments', JSON.stringify(updatedPayments))
  }

  function handleChange(event) {
    const { name, value } = event.target

    if (name === 'responsibleKey') {
      setPaymentData({
        ...paymentData,
        responsibleKey: value,
        childName: '',
      })

      return
    }

    if (name === 'type') {
      setPaymentData({
        ...paymentData,
        type: value,
        amount: paymentData.amount || getDefaultAmountByType(value),
      })

      return
    }

    setPaymentData({
      ...paymentData,
      [name]: value,
    })
  }

  function createPayment(event) {
    event.preventDefault()

    if (
      !paymentData.responsibleKey ||
      !paymentData.type ||
      !paymentData.title ||
      !paymentData.amount ||
      !paymentData.dueDate
    ) {
      alert('Preencha responsável, tipo, título, valor e vencimento.')
      return
    }

    if (!selectedResponsible) {
      alert('Responsável não encontrado.')
      return
    }

    const newPayment = {
      id: crypto.randomUUID(),
      guardianName: selectedResponsible.guardianName,
      guardianCpf: selectedResponsible.guardianCpf,
      phone: selectedResponsible.phone,
      email: selectedResponsible.email,
      childName: paymentData.childName,
      type: paymentData.type,
      title: paymentData.title,
      amount: paymentData.amount,
      dueDate: paymentData.dueDate,
      status: paymentData.status,
      paymentMethod: paymentData.paymentMethod || 'A definir',
      notes: paymentData.notes,
      createdAt: new Date().toLocaleString('pt-BR'),
    }

    savePayments([newPayment, ...payments])

    setPaymentData({
      responsibleKey: '',
      childName: '',
      type: '',
      title: '',
      amount: '',
      dueDate: '',
      status: 'Pendente',
      paymentMethod: '',
      notes: '',
    })
  }

  function startEdit(payment) {
    setEditingPaymentId(payment.id)

    setEditData({
      title: payment.title || '',
      amount: payment.amount || '',
      dueDate: payment.dueDate || '',
      status: payment.status || 'Pendente',
      paymentMethod: payment.paymentMethod || '',
      notes: payment.notes || '',
      type: payment.type || '',
      childName: payment.childName || '',
    })
  }

  function cancelEdit() {
    setEditingPaymentId(null)

    setEditData({
      title: '',
      amount: '',
      dueDate: '',
      status: 'Pendente',
      paymentMethod: '',
      notes: '',
      type: '',
      childName: '',
    })
  }

  function handleEditChange(event) {
    const { name, value } = event.target

    setEditData({
      ...editData,
      [name]: value,
    })
  }

  function saveEdit(paymentId) {
    if (!editData.title || !editData.amount || !editData.dueDate) {
      alert('Preencha título, valor e vencimento.')
      return
    }

    const updatedPayments = payments.map((payment) => {
      if (payment.id === paymentId) {
        return {
          ...payment,
          ...editData,
          paidAt:
            editData.status === 'Pago'
              ? payment.paidAt || new Date().toLocaleString('pt-BR')
              : '',
          updatedAt: new Date().toLocaleString('pt-BR'),
        }
      }

      return payment
    })

    savePayments(updatedPayments)
    cancelEdit()
  }

  function updatePaymentStatus(id, status) {
    const updatedPayments = payments.map((payment) => {
      if (payment.id === id) {
        return {
          ...payment,
          status,
          paidAt: status === 'Pago' ? new Date().toLocaleString('pt-BR') : '',
          updatedAt: new Date().toLocaleString('pt-BR'),
        }
      }

      return payment
    })

    savePayments(updatedPayments)
  }

  function deletePayment(id) {
    const confirmDelete = window.confirm('Tem certeza que deseja excluir esta cobrança?')

    if (!confirmDelete) return

    const updatedPayments = payments.filter((payment) => payment.id !== id)

    savePayments(updatedPayments)
  }

  function getStatusStyle(status) {
    if (status === 'Pago') {
      return 'bg-green-50 text-green-700 border-green-200'
    }

    if (status === 'Atrasado') {
      return 'bg-red-50 text-red-700 border-red-200'
    }

    return 'bg-yellow-50 text-yellow-700 border-yellow-200'
  }

  return (
    <div className="bg-white rounded-[2.5rem] p-6 shadow-sm border border-[#D8C8AA] mb-8">
      <div className="mb-6">
        <span className="inline-flex bg-[#E6D7B8] text-[#6B722E] px-5 py-2 rounded-full font-black">
          Financeiro
        </span>

        <h2 className="mt-4 text-3xl font-black text-[#2F2A22]">
          Cobranças e pagamentos
        </h2>

        <p className="mt-2 text-[#5B4A39]">
          Cadastre, edite e acompanhe mensalidades, diárias, balé e outras cobranças.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <FinanceSummaryCard
          icon={Wallet}
          title="Total cadastrado"
          value={formatCurrency(totalAmount)}
        />

        <FinanceSummaryCard
          icon={ReceiptText}
          title="Pendentes"
          value={totalPending}
        />

        <FinanceSummaryCard
          icon={CheckCircle}
          title="Pagos"
          value={totalPaid}
        />

        <FinanceSummaryCard
          icon={CalendarDays}
          title="Atrasados"
          value={totalLate}
        />
      </div>

      <form
        onSubmit={createPayment}
        className="bg-[#F8F1E4] border border-[#D8C8AA] rounded-[2rem] p-5 mb-8"
      >
        <h3 className="text-2xl font-black text-[#2F2A22] mb-5">
          Nova cobrança
        </h3>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-black text-[#5B4A39] mb-2">
              Responsável *
            </label>

            <select
              name="responsibleKey"
              value={paymentData.responsibleKey}
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
              Criança
            </label>

            <select
              name="childName"
              value={paymentData.childName}
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
              Tipo *
            </label>

            <select
              name="type"
              value={paymentData.type}
              onChange={handleChange}
              className="w-full border-2 border-[#D8C8AA] rounded-2xl px-5 py-4 outline-none focus:border-[#6B722E]"
            >
              <option value="">Selecione o tipo</option>
              <option value="Mensalidade">Mensalidade</option>
              <option value="Diária">Diária</option>
              <option value="Balé">Balé</option>
              <option value="Matrícula">Matrícula</option>
              <option value="Outro">Outro</option>
            </select>
          </div>

          <InputField
            label="Título *"
            name="title"
            placeholder="Ex: Mensalidade de Maio"
            value={paymentData.title}
            onChange={handleChange}
          />

          <InputField
            label="Valor *"
            name="amount"
            type="number"
            placeholder="Ex: 400"
            value={paymentData.amount}
            onChange={handleChange}
          />

          <InputField
            label="Vencimento *"
            name="dueDate"
            type="date"
            value={paymentData.dueDate}
            onChange={handleChange}
          />

          <div>
            <label className="block text-sm font-black text-[#5B4A39] mb-2">
              Status
            </label>

            <select
              name="status"
              value={paymentData.status}
              onChange={handleChange}
              className="w-full border-2 border-[#D8C8AA] rounded-2xl px-5 py-4 outline-none focus:border-[#6B722E]"
            >
              <option value="Pendente">Pendente</option>
              <option value="Pago">Pago</option>
              <option value="Atrasado">Atrasado</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-black text-[#5B4A39] mb-2">
              Forma de pagamento
            </label>

            <select
              name="paymentMethod"
              value={paymentData.paymentMethod}
              onChange={handleChange}
              className="w-full border-2 border-[#D8C8AA] rounded-2xl px-5 py-4 outline-none focus:border-[#6B722E]"
            >
              <option value="">A definir</option>
              <option value="Pix">Pix</option>
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão">Cartão</option>
              <option value="Transferência">Transferência</option>
            </select>
          </div>

          <div className="md:col-span-2 lg:col-span-3">
            <label className="block text-sm font-black text-[#5B4A39] mb-2">
              Observações financeiras
            </label>

            <textarea
              name="notes"
              placeholder="Ex: pagamento combinado via Pix até o dia 10"
              value={paymentData.notes}
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
          Criar cobrança
        </button>
      </form>

      {responsibles.length === 0 && (
        <div className="bg-[#FFF7E0] border border-[#C99A3D] rounded-3xl p-5 mb-6">
          <p className="font-bold text-[#9A4F2E]">
            Nenhum responsável com telefone e CPF encontrado ainda. Para criar cobranças, primeiro é preciso ter uma solicitação com telefone e CPF preenchidos.
          </p>
        </div>
      )}

      {payments.length === 0 ? (
        <div className="bg-[#F8F1E4] border border-[#D8C8AA] rounded-3xl p-6 text-center">
          <div className="w-14 h-14 rounded-2xl bg-white border border-[#D8C8AA] flex items-center justify-center text-[#6B722E] mx-auto mb-4">
            <CreditCard size={28} />
          </div>

          <p className="font-bold text-[#5B4A39]">
            Nenhuma cobrança cadastrada ainda.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {payments.map((payment) => {
            const isEditing = editingPaymentId === payment.id

            return (
              <div
                key={payment.id}
                className="bg-[#F8F1E4] border border-[#D8C8AA] rounded-[2rem] p-5"
              >
                {!isEditing ? (
                  <>
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-5">
                      <div className="flex items-start gap-4">
                        <div className="w-14 h-14 rounded-2xl bg-white border border-[#D8C8AA] flex items-center justify-center text-[#6B722E]">
                          <ReceiptText size={28} />
                        </div>

                        <div>
                          <div className="flex flex-wrap items-center gap-2 mb-2">
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

                          <h3 className="text-2xl font-black text-[#2F2A22]">
                            {payment.title}
                          </h3>

                          <p className="mt-1 text-[#5B4A39] font-semibold">
                            Responsável: {payment.guardianName}
                          </p>

                          <p className="text-[#5B4A39]">
                            Criança: {payment.childName || 'Não vinculada'}
                          </p>
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-3 gap-3 lg:min-w-[520px]">
                        <SmallFinanceInfo
                          label="Valor"
                          value={formatCurrency(payment.amount)}
                        />

                        <SmallFinanceInfo
                          label="Vencimento"
                          value={formatDate(payment.dueDate)}
                        />

                        <SmallFinanceInfo
                          label="Forma"
                          value={payment.paymentMethod || 'A definir'}
                        />
                      </div>
                    </div>

                    {payment.notes && (
                      <div className="mt-4 bg-white rounded-2xl p-4 border border-[#D8C8AA]">
                        <p className="text-xs font-black text-[#9F8F75] uppercase">
                          Observações
                        </p>

                        <p className="mt-1 text-[#5B4A39]">
                          {payment.notes}
                        </p>
                      </div>
                    )}

                    <div className="mt-5 flex flex-wrap gap-3">
                      <button
                        type="button"
                        onClick={() => updatePaymentStatus(payment.id, 'Pago')}
                        className="bg-green-50 text-green-700 border border-green-200 px-4 py-2 rounded-full font-black hover:bg-green-100 transition"
                      >
                        Marcar pago
                      </button>

                      <button
                        type="button"
                        onClick={() => updatePaymentStatus(payment.id, 'Pendente')}
                        className="bg-yellow-50 text-yellow-700 border border-yellow-200 px-4 py-2 rounded-full font-black hover:bg-yellow-100 transition"
                      >
                        Pendente
                      </button>

                      <button
                        type="button"
                        onClick={() => updatePaymentStatus(payment.id, 'Atrasado')}
                        className="bg-red-50 text-red-700 border border-red-200 px-4 py-2 rounded-full font-black hover:bg-red-100 transition"
                      >
                        Atrasado
                      </button>

                      <button
                        type="button"
                        onClick={() => startEdit(payment)}
                        className="bg-white text-[#6B722E] border border-[#D8C8AA] px-4 py-2 rounded-full font-black hover:bg-[#EFE4CC] transition flex items-center gap-2"
                      >
                        <Edit3 size={18} />
                        Editar
                      </button>

                      <button
                        type="button"
                        onClick={() => deletePayment(payment.id)}
                        className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full font-black hover:bg-gray-200 transition flex items-center gap-2"
                      >
                        <Trash2 size={18} />
                        Excluir
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="bg-white rounded-[2rem] p-5 border border-[#D8C8AA]">
                    <h3 className="text-2xl font-black text-[#2F2A22] mb-5">
                      Editar cobrança
                    </h3>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                      <InputField
                        label="Título *"
                        name="title"
                        value={editData.title}
                        onChange={handleEditChange}
                      />

                      <InputField
                        label="Valor *"
                        name="amount"
                        type="number"
                        value={editData.amount}
                        onChange={handleEditChange}
                      />

                      <InputField
                        label="Vencimento *"
                        name="dueDate"
                        type="date"
                        value={editData.dueDate}
                        onChange={handleEditChange}
                      />

                      <div>
                        <label className="block text-sm font-black text-[#5B4A39] mb-2">
                          Tipo
                        </label>

                        <select
                          name="type"
                          value={editData.type}
                          onChange={handleEditChange}
                          className="w-full border-2 border-[#D8C8AA] rounded-2xl px-5 py-4 outline-none focus:border-[#6B722E]"
                        >
                          <option value="Mensalidade">Mensalidade</option>
                          <option value="Diária">Diária</option>
                          <option value="Balé">Balé</option>
                          <option value="Matrícula">Matrícula</option>
                          <option value="Outro">Outro</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-black text-[#5B4A39] mb-2">
                          Status
                        </label>

                        <select
                          name="status"
                          value={editData.status}
                          onChange={handleEditChange}
                          className="w-full border-2 border-[#D8C8AA] rounded-2xl px-5 py-4 outline-none focus:border-[#6B722E]"
                        >
                          <option value="Pendente">Pendente</option>
                          <option value="Pago">Pago</option>
                          <option value="Atrasado">Atrasado</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-black text-[#5B4A39] mb-2">
                          Forma de pagamento
                        </label>

                        <select
                          name="paymentMethod"
                          value={editData.paymentMethod}
                          onChange={handleEditChange}
                          className="w-full border-2 border-[#D8C8AA] rounded-2xl px-5 py-4 outline-none focus:border-[#6B722E]"
                        >
                          <option value="">A definir</option>
                          <option value="Pix">Pix</option>
                          <option value="Dinheiro">Dinheiro</option>
                          <option value="Cartão">Cartão</option>
                          <option value="Transferência">Transferência</option>
                        </select>
                      </div>

                      <InputField
                        label="Criança"
                        name="childName"
                        value={editData.childName}
                        onChange={handleEditChange}
                      />

                      <div className="md:col-span-2 lg:col-span-3">
                        <label className="block text-sm font-black text-[#5B4A39] mb-2">
                          Observações
                        </label>

                        <textarea
                          name="notes"
                          value={editData.notes}
                          onChange={handleEditChange}
                          className="w-full border-2 border-[#D8C8AA] rounded-2xl px-5 py-4 outline-none focus:border-[#6B722E] min-h-28"
                        ></textarea>
                      </div>
                    </div>

                    <div className="mt-5 flex flex-wrap gap-3">
                      <button
                        type="button"
                        onClick={() => saveEdit(payment.id)}
                        className="bg-[#6B722E] text-white px-5 py-3 rounded-full font-black hover:bg-[#596025] transition flex items-center gap-2"
                      >
                        <Save size={18} />
                        Salvar edição
                      </button>

                      <button
                        type="button"
                        onClick={cancelEdit}
                        className="bg-gray-100 text-gray-700 px-5 py-3 rounded-full font-black hover:bg-gray-200 transition flex items-center gap-2"
                      >
                        <X size={18} />
                        Cancelar
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
  )
}

function FinanceSummaryCard({ icon: Icon, title, value }) {
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

function SmallFinanceInfo({ label, value }) {
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

function InputField({
  label,
  name,
  value,
  onChange,
  type = 'text',
  placeholder = '',
}) {
  return (
    <div>
      <label className="block text-sm font-black text-[#5B4A39] mb-2">
        {label}
      </label>

      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        min={type === 'number' ? '0' : undefined}
        step={type === 'number' ? '0.01' : undefined}
        className="w-full border-2 border-[#D8C8AA] rounded-2xl px-5 py-4 outline-none focus:border-[#6B722E]"
      />
    </div>
  )
}

export default AdminFinance