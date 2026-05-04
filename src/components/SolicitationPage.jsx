import { useRef, useState } from 'react'
import {
  ArrowLeft,
  Baby,
  CalendarDays,
  CheckCircle,
  Home,
  IdCard,
  Mail,
  Music,
  Phone,
  Pill,
  ReceiptText,
  School,
  Search,
  Send,
  ShieldCheck,
  UserRound,
  UsersRound,
  Utensils,
} from 'lucide-react'

function SolicitationPage() {
  const exitTimeRef = useRef(null)

  const [formData, setFormData] = useState({
    requestType: '',

    guardianName: '',
    guardianCpf: '',
    phone: '',
    secondaryPhone: '',
    email: '',

    childName: '',
    birthDate: '',
    childSchool: '',
    childPeriod: '',

    visitSlotId: '',
    visitDate: '',
    visitTime: '',

    reservationDate: '',
    entryTime: '',
    exitTime: '',

    shift: '',
    startDate: '',

    balletInterest: 'Não',

    allergies: '',
    foodRestrictions: '',
    medications: '',
    authorizedPickup: '',
    observations: '',
  })

  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [existingChildren, setExistingChildren] = useState([])

  const inputClass =
    'w-full border-2 border-[#D8C8AA] rounded-2xl px-5 py-4 outline-none focus:border-[#6B722E] bg-white text-[#2F2A22] placeholder:text-[#9F8F75] transition'

  const textareaClass =
    'w-full border-2 border-[#D8C8AA] rounded-2xl px-5 py-4 outline-none focus:border-[#6B722E] bg-white text-[#2F2A22] placeholder:text-[#9F8F75] transition min-h-28'

  function getSavedRequests() {
    return JSON.parse(localStorage.getItem('hotelzinho_reservations')) || []
  }

  function getAvailableVisitSlots() {
    const slots =
      JSON.parse(localStorage.getItem('hotelzinho_visit_slots')) || []

    return slots
      .filter((slot) => slot.status === 'Disponível')
      .sort((a, b) => {
        return `${a.date} ${a.time}`.localeCompare(`${b.date} ${b.time}`)
      })
  }

  function getVisitSlotById(id) {
    const slots =
      JSON.parse(localStorage.getItem('hotelzinho_visit_slots')) || []

    return slots.find((slot) => slot.id === id)
  }

  function reserveVisitSlot(id, guardianName) {
    const slots =
      JSON.parse(localStorage.getItem('hotelzinho_visit_slots')) || []

    const updatedSlots = slots.map((slot) => {
      if (slot.id === id) {
        return {
          ...slot,
          status: 'Reservado',
          reservedBy: guardianName,
          reservedAt: new Date().toLocaleString('pt-BR'),
        }
      }

      return slot
    })

    localStorage.setItem('hotelzinho_visit_slots', JSON.stringify(updatedSlots))
  }

  function onlyNumbers(value) {
    return String(value || '').replace(/\D/g, '')
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

  function findExistingRegistration(phone, cpf) {
    const phoneNumbers = onlyNumbers(phone)
    const cpfNumbers = onlyNumbers(cpf)

    if (phoneNumbers.length !== 11 && cpfNumbers.length !== 11) {
      return null
    }

    const savedRequests = getSavedRequests()

    const matchedRequests = savedRequests.filter((request) => {
      const savedPhone = onlyNumbers(request.phone)
      const savedCpf = onlyNumbers(request.guardianCpf)

      const matchesPhone =
        phoneNumbers.length === 11 && savedPhone === phoneNumbers

      const matchesCpf = cpfNumbers.length === 11 && savedCpf === cpfNumbers

      return matchesPhone || matchesCpf
    })

    if (matchedRequests.length === 0) {
      return null
    }

    const latestRequest = matchedRequests[0]

    const children = matchedRequests
      .filter((request) => request.childName)
      .map((request) => ({
        childName: request.childName || '',
        birthDate: request.birthDate || '',
        childSchool: request.childSchool || '',
        childPeriod: request.childPeriod || '',
        allergies: request.allergies || '',
        foodRestrictions: request.foodRestrictions || '',
        medications: request.medications || '',
        authorizedPickup: request.authorizedPickup || '',
        guardianName: request.guardianName || '',
        guardianCpf: request.guardianCpf || '',
        phone: request.phone || '',
        secondaryPhone: request.secondaryPhone || '',
        email: request.email || '',
      }))

    const uniqueChildren = children.filter((child, index, array) => {
      return (
        array.findIndex(
          (item) =>
            item.childName.toLowerCase() === child.childName.toLowerCase() &&
            item.birthDate === child.birthDate
        ) === index
      )
    })

    return {
      latestRequest,
      children: uniqueChildren,
    }
  }

  function fillKnownData(baseData, existingRegistration) {
    if (!existingRegistration) {
      return baseData
    }

    const latestRequest = existingRegistration.latestRequest
    const children = existingRegistration.children

    let updatedData = {
      ...baseData,
      guardianName: baseData.guardianName || latestRequest.guardianName || '',
      guardianCpf: baseData.guardianCpf || latestRequest.guardianCpf || '',
      phone: baseData.phone || latestRequest.phone || '',
      secondaryPhone:
        baseData.secondaryPhone || latestRequest.secondaryPhone || '',
      email: baseData.email || latestRequest.email || '',
    }

    if (children.length === 1 && !baseData.childName) {
      const child = children[0]

      updatedData = {
        ...updatedData,
        childName: child.childName,
        birthDate: child.birthDate,
        childSchool: child.childSchool,
        childPeriod: child.childPeriod,
        allergies: child.allergies,
        foodRestrictions: child.foodRestrictions,
        medications: child.medications,
        authorizedPickup: child.authorizedPickup,
      }
    }

    return updatedData
  }

  function handleChange(event) {
    const { name, value } = event.target

    if (name === 'phone') {
      const formattedPhone = formatPhone(value)

      const baseData = {
        ...formData,
        phone: formattedPhone,
      }

      const existingRegistration = findExistingRegistration(
        formattedPhone,
        baseData.guardianCpf
      )

      if (!existingRegistration) {
        setExistingChildren([])
        setFormData(baseData)
        return
      }

      setExistingChildren(existingRegistration.children)
      setFormData(fillKnownData(baseData, existingRegistration))
      return
    }

    if (name === 'guardianCpf') {
      const formattedCpf = formatCpf(value)

      const baseData = {
        ...formData,
        guardianCpf: formattedCpf,
      }

      const existingRegistration = findExistingRegistration(
        baseData.phone,
        formattedCpf
      )

      if (!existingRegistration) {
        setExistingChildren([])
        setFormData(baseData)
        return
      }

      setExistingChildren(existingRegistration.children)
      setFormData(fillKnownData(baseData, existingRegistration))
      return
    }

    if (name === 'secondaryPhone') {
      setFormData({
        ...formData,
        secondaryPhone: formatPhone(value),
      })

      return
    }

    if (name === 'entryTime') {
      setFormData({
        ...formData,
        entryTime: value,
      })

      if (value.length === 5) {
        setTimeout(() => {
          exitTimeRef.current?.focus()
        }, 100)
      }

      return
    }

    setFormData({
      ...formData,
      [name]: value,
    })
  }

  function fillWithExistingChild(child) {
    setFormData({
      ...formData,
      childName: child.childName,
      birthDate: child.birthDate,
      childSchool: child.childSchool,
      childPeriod: child.childPeriod,
      allergies: child.allergies,
      foodRestrictions: child.foodRestrictions,
      medications: child.medications,
      authorizedPickup: child.authorizedPickup,
      guardianName: formData.guardianName || child.guardianName,
      guardianCpf: formData.guardianCpf || child.guardianCpf,
      phone: formData.phone || child.phone,
      secondaryPhone: formData.secondaryPhone || child.secondaryPhone,
      email: formData.email || child.email,
    })
  }

  function isValidPhone(phone) {
    return onlyNumbers(phone).length === 11
  }

  function isValidCpf(cpf) {
    return onlyNumbers(cpf).length === 11
  }

  function formatDateToBR(date) {
    if (!date) return 'Não informado'

    const [year, month, day] = date.split('-')

    if (!year || !month || !day) {
      return date
    }

    return `${day}/${month}/${year}`
  }

  function calculateAgeData(birthDateValue) {
    if (!birthDateValue) {
      return {
        isValid: true,
        ageText: 'Não informado',
        ageGroup: 'Não informado',
      }
    }

    const birthDate = new Date(`${birthDateValue}T00:00:00`)
    const today = new Date()

    if (Number.isNaN(birthDate.getTime())) {
      return {
        isValid: false,
        message: 'Digite uma data de nascimento válida.',
      }
    }

    if (birthDate > today) {
      return {
        isValid: false,
        message: 'A data de nascimento não pode ser no futuro.',
      }
    }

    let ageInMonths =
      (today.getFullYear() - birthDate.getFullYear()) * 12 +
      (today.getMonth() - birthDate.getMonth())

    if (today.getDate() < birthDate.getDate()) {
      ageInMonths--
    }

    const ageInYears = Math.floor(ageInMonths / 12)

    if (ageInMonths < 4) {
      return {
        isValid: false,
        message: 'A idade mínima aceita é de 4 meses.',
      }
    }

    if (ageInYears > 12 || ageInMonths > 155) {
      return {
        isValid: false,
        message: 'A idade máxima aceita é de 12 anos.',
      }
    }

    let ageText

    if (ageInMonths < 12) {
      ageText = ageInMonths === 1 ? '1 mês' : `${ageInMonths} meses`
    } else {
      const years = Math.floor(ageInMonths / 12)
      const months = ageInMonths % 12

      if (months === 0) {
        ageText = years === 1 ? '1 ano' : `${years} anos`
      } else {
        const yearText = years === 1 ? '1 ano' : `${years} anos`
        const monthText = months === 1 ? '1 mês' : `${months} meses`

        ageText = `${yearText} e ${monthText}`
      }
    }

    const ageGroup =
      ageInYears < 5 ? 'Prédio dos menores' : 'Prédio dos maiores'

    return {
      isValid: true,
      ageText,
      ageInMonths,
      ageInYears,
      ageGroup,
    }
  }

  function validateTimeRange(entryTime, exitTime) {
    if (entryTime < '06:00' || entryTime > '20:00') {
      return 'O horário de chegada precisa ser entre 06:00 e 20:00.'
    }

    if (exitTime < '06:00' || exitTime > '20:00') {
      return 'O horário de saída precisa ser entre 06:00 e 20:00.'
    }

    if (exitTime <= entryTime) {
      return 'O horário de saída precisa ser depois do horário de chegada.'
    }

    return ''
  }

  function getRequestTypeLabel(type) {
    const labels = {
      visita: 'Agendamento de visita',
      diaria: 'Reserva de diária',
      mensalidade: 'Solicitação de mensalidade',
      bale: 'Matrícula no balé',
    }

    return labels[type] || 'Solicitação'
  }

  function validateForm() {
    if (!formData.requestType) {
      return 'Escolha o tipo de solicitação.'
    }

    if (!formData.guardianName || !formData.phone || !formData.guardianCpf) {
      return 'Preencha o nome, telefone e CPF do responsável.'
    }

    if (!isValidPhone(formData.phone)) {
      return 'Digite um telefone válido com DDD. Exemplo: (81) 99999-9999.'
    }

    if (!isValidCpf(formData.guardianCpf)) {
      return 'Digite um CPF válido. Exemplo: 000.000.000-00.'
    }

    if (!formData.observations.trim()) {
      return 'Preencha as observações gerais. Caso não tenha observação, escreva "Nenhuma".'
    }

    if (formData.requestType !== 'visita') {
      if (!formData.childName || !formData.birthDate) {
        return 'Preencha o nome da criança e a data de nascimento.'
      }

      const ageData = calculateAgeData(formData.birthDate)

      if (!ageData.isValid) {
        return ageData.message
      }
    }

    if (formData.requestType === 'visita') {
      if (!formData.visitSlotId) {
        return 'Escolha um horário disponível para a visita.'
      }

      const selectedSlot = getVisitSlotById(formData.visitSlotId)

      if (!selectedSlot || selectedSlot.status !== 'Disponível') {
        return 'Esse horário de visita não está mais disponível.'
      }
    }

    if (formData.requestType === 'diaria') {
      if (!formData.reservationDate || !formData.entryTime || !formData.exitTime) {
        return 'Informe a data, horário de chegada e horário de saída.'
      }

      const timeError = validateTimeRange(formData.entryTime, formData.exitTime)

      if (timeError) {
        return timeError
      }
    }

    if (['mensalidade', 'bale'].includes(formData.requestType)) {
      if (!formData.shift || !formData.startDate) {
        return 'Informe o turno desejado e a data prevista de início.'
      }
    }

    return ''
  }

  function handleSubmit(event) {
    event.preventDefault()

    const validationError = validateForm()

    if (validationError) {
      setErrorMessage(validationError)
      setSuccessMessage('')
      return
    }

    const ageData = calculateAgeData(formData.birthDate)

    const selectedVisitSlot =
      formData.requestType === 'visita'
        ? getVisitSlotById(formData.visitSlotId)
        : null

    const newRequest = {
      id: crypto.randomUUID(),
      ...formData,

      visitDate:
        formData.requestType === 'visita'
          ? selectedVisitSlot?.date || ''
          : formData.visitDate,

      visitTime:
        formData.requestType === 'visita'
          ? selectedVisitSlot?.time || ''
          : formData.visitTime,

      requestTypeLabel: getRequestTypeLabel(formData.requestType),

      birthDateFormatted: formData.birthDate
        ? formatDateToBR(formData.birthDate)
        : 'Não informado',

      childAgeText: ageData.ageText || 'Não informado',
      childAgeInMonths: ageData.ageInMonths || null,
      childAgeInYears: ageData.ageInYears || null,
      ageGroup: ageData.ageGroup || 'Não informado',

      visitDateFormatted:
        formData.requestType === 'visita'
          ? formatDateToBR(selectedVisitSlot?.date)
          : formatDateToBR(formData.visitDate),

      reservationDateFormatted: formatDateToBR(formData.reservationDate),
      startDateFormatted: formatDateToBR(formData.startDate),

      status: 'Pendente',
      createdAt: new Date().toLocaleString('pt-BR'),
    }

    const savedRequests = getSavedRequests()
    const updatedRequests = [newRequest, ...savedRequests]

    localStorage.setItem(
      'hotelzinho_reservations',
      JSON.stringify(updatedRequests)
    )

    if (formData.requestType === 'visita') {
      reserveVisitSlot(formData.visitSlotId, formData.guardianName)
    }

    setSuccessMessage('Solicitação enviada com sucesso! Entraremos em contato.')
    setErrorMessage('')
    setExistingChildren([])

    setFormData({
      requestType: '',

      guardianName: '',
      guardianCpf: '',
      phone: '',
      secondaryPhone: '',
      email: '',

      childName: '',
      birthDate: '',
      childSchool: '',
      childPeriod: '',

      visitSlotId: '',
      visitDate: '',
      visitTime: '',

      reservationDate: '',
      entryTime: '',
      exitTime: '',

      shift: '',
      startDate: '',

      balletInterest: 'Não',

      allergies: '',
      foodRestrictions: '',
      medications: '',
      authorizedPickup: '',
      observations: '',
    })
  }

  const previewAgeData = formData.birthDate
    ? calculateAgeData(formData.birthDate)
    : null

  const availableVisitSlots = getAvailableVisitSlots()

  return (
    <section className="min-h-screen bg-[#F4EAD6] py-10">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-8">
          <a
            href="/"
            className="inline-flex items-center gap-2 text-[#6B722E] font-black hover:underline mb-6"
          >
            <ArrowLeft size={20} />
            Voltar para o site
          </a>

          <div className="bg-white rounded-[2.5rem] p-6 md:p-8 shadow-sm border border-[#D8C8AA]">
            <span className="inline-flex bg-[#E6D7B8] text-[#6B722E] px-5 py-2 rounded-full font-black">
              Solicitação
            </span>

            <h1 className="mt-5 text-4xl md:text-5xl font-black text-[#2F2A22]">
              Como podemos ajudar?
            </h1>

            <p className="mt-3 text-[#5B4A39] max-w-2xl">
              Escolha o tipo de solicitação e preencha os dados necessários.
              O atendimento funciona das 06h às 20h.
            </p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-[2.5rem] p-6 md:p-10 shadow-xl border border-[#D8C8AA]"
        >
          <div className="grid md:grid-cols-2 gap-5">
            <SectionTitle
              title="Tipo de solicitação"
              description="Selecione o que você deseja solicitar."
              noBorder
            />

            <div className="md:col-span-2 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <RequestTypeCard
                title="Agendar visita"
                description="Conhecer o hotelzinho"
                icon={Home}
                value="visita"
                selected={formData.requestType}
                onChange={handleChange}
              />

              <RequestTypeCard
                title="Reservar diária"
                description="Um dia ou período específico"
                icon={CalendarDays}
                value="diaria"
                selected={formData.requestType}
                onChange={handleChange}
              />

              <RequestTypeCard
                title="Mensalidade"
                description="Plano mensal"
                icon={ReceiptText}
                value="mensalidade"
                selected={formData.requestType}
                onChange={handleChange}
              />

              <RequestTypeCard
                title="Balé"
                description="Matrícula no balé"
                icon={Music}
                value="bale"
                selected={formData.requestType}
                onChange={handleChange}
              />
            </div>

            <SectionTitle
              title="Dados do responsável"
              description="Se já houver cadastro anterior, alguns dados serão preenchidos automaticamente."
            />

            <InputWithIcon
              icon={UserRound}
              name="guardianName"
              placeholder="Nome do responsável *"
              value={formData.guardianName}
              onChange={handleChange}
              inputClass={inputClass}
            />

            <InputWithIcon
              icon={Phone}
              type="tel"
              name="phone"
              placeholder="Telefone principal com DDD *"
              value={formData.phone}
              onChange={handleChange}
              maxLength="15"
              inputClass={inputClass}
            />

            <InputWithIcon
              icon={Phone}
              type="tel"
              name="secondaryPhone"
              placeholder="Telefone secundário"
              value={formData.secondaryPhone}
              onChange={handleChange}
              maxLength="15"
              inputClass={inputClass}
            />

            <InputWithIcon
              icon={IdCard}
              name="guardianCpf"
              placeholder="CPF do responsável *"
              value={formData.guardianCpf}
              onChange={handleChange}
              maxLength="14"
              inputClass={inputClass}
            />

            <div className="md:col-span-2">
              <InputWithIcon
                icon={Mail}
                type="email"
                name="email"
                placeholder="E-mail do responsável"
                value={formData.email}
                onChange={handleChange}
                inputClass={inputClass}
              />
            </div>

            {existingChildren.length > 0 && (
              <div className="md:col-span-2 bg-[#F8F1E4] border border-[#D8C8AA] rounded-3xl p-5">
                <div className="flex items-start gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-white border border-[#D8C8AA] flex items-center justify-center text-[#6B722E]">
                    <Search size={22} />
                  </div>

                  <div>
                    <p className="font-black text-[#6B722E]">
                      Encontramos criança(s) vinculada(s) a esse telefone ou CPF.
                    </p>

                    <p className="mt-1 text-[#5B4A39] text-sm">
                      Você pode usar os dados salvos para preencher mais rápido.
                    </p>
                  </div>
                </div>

                <div className="mt-4 grid md:grid-cols-2 gap-3">
                  {existingChildren.map((child) => (
                    <button
                      key={`${child.childName}-${child.birthDate}`}
                      type="button"
                      onClick={() => fillWithExistingChild(child)}
                      className="text-left bg-white border border-[#D8C8AA] rounded-2xl p-4 hover:bg-[#EFE4CC] transition"
                    >
                      <p className="font-black text-[#2F2A22]">
                        {child.childName}
                      </p>

                      <p className="text-sm text-[#5B4A39]">
                        Nascimento: {formatDateToBR(child.birthDate)}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {formData.requestType && formData.requestType !== 'visita' && (
              <>
                <SectionTitle
                  title="Dados da criança"
                  description="A idade e o prédio serão calculados automaticamente."
                />

                <InputWithIcon
                  icon={Baby}
                  name="childName"
                  placeholder="Nome da criança *"
                  value={formData.childName}
                  onChange={handleChange}
                  inputClass={inputClass}
                />

                <div>
                  <label className="block text-sm font-black text-[#5B4A39] mb-2">
                    Data de nascimento *
                  </label>

                  <input
                    type="date"
                    name="birthDate"
                    value={formData.birthDate}
                    onChange={handleChange}
                    className={inputClass}
                  />
                </div>

                <InputWithIcon
                  icon={School}
                  name="childSchool"
                  placeholder="Escola da criança"
                  value={formData.childSchool}
                  onChange={handleChange}
                  inputClass={inputClass}
                />

                <select
                  name="childPeriod"
                  value={formData.childPeriod}
                  onChange={handleChange}
                  className={inputClass}
                >
                  <option value="">Período escolar</option>
                  <option value="Manhã">Manhã</option>
                  <option value="Tarde">Tarde</option>
                  <option value="Integral">Integral</option>
                  <option value="Não estuda ainda">Não estuda ainda</option>
                </select>

                {previewAgeData?.isValid && (
                  <div className="md:col-span-2 bg-[#F8F1E4] border border-[#D8C8AA] rounded-3xl p-5">
                    <div className="grid md:grid-cols-2 gap-4">
                      <PreviewBox
                        icon={Baby}
                        label="Idade calculada"
                        value={previewAgeData.ageText}
                      />

                      <PreviewBox
                        icon={ShieldCheck}
                        label="Prédio indicado"
                        value={previewAgeData.ageGroup}
                      />
                    </div>
                  </div>
                )}

                {previewAgeData && !previewAgeData.isValid && (
                  <div className="md:col-span-2 bg-[#FFF7E0] border border-[#C99A3D] rounded-3xl p-5">
                    <p className="font-bold text-[#9A4F2E]">
                      {previewAgeData.message}
                    </p>
                  </div>
                )}
              </>
            )}

            {formData.requestType === 'visita' && (
              <>
                <SectionTitle
                  title="Dados da visita"
                  description="Escolha um dos horários disponíveis cadastrados pela administração."
                />

                <div className="md:col-span-2">
                  <label className="block text-sm font-black text-[#5B4A39] mb-2">
                    Horário disponível para visita *
                  </label>

                  <select
                    name="visitSlotId"
                    value={formData.visitSlotId}
                    onChange={handleChange}
                    className={inputClass}
                  >
                    <option value="">Selecione um horário disponível</option>

                    {availableVisitSlots.map((slot) => (
                      <option key={slot.id} value={slot.id}>
                        {formatDateToBR(slot.date)} às {slot.time}
                      </option>
                    ))}
                  </select>

                  {availableVisitSlots.length === 0 && (
                    <p className="mt-3 text-sm font-bold text-[#9A4F2E]">
                      Nenhum horário de visita disponível no momento. Entre em
                      contato com a equipe.
                    </p>
                  )}
                </div>
              </>
            )}

            {formData.requestType === 'diaria' && (
              <>
                <SectionTitle
                  title="Dados da diária"
                  description="Informe a data e os horários da diária."
                />

                <div>
                  <label className="block text-sm font-black text-[#5B4A39] mb-2">
                    Data da diária *
                  </label>

                  <input
                    type="date"
                    name="reservationDate"
                    value={formData.reservationDate}
                    onChange={handleChange}
                    className={inputClass}
                  />
                </div>

                <div></div>

                <div>
                  <label className="block text-sm font-black text-[#5B4A39] mb-2">
                    Horário de chegada *
                  </label>

                  <input
                    type="time"
                    name="entryTime"
                    min="06:00"
                    max="20:00"
                    value={formData.entryTime}
                    onChange={handleChange}
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className="block text-sm font-black text-[#5B4A39] mb-2">
                    Horário de saída *
                  </label>

                  <input
                    ref={exitTimeRef}
                    type="time"
                    name="exitTime"
                    min="06:00"
                    max="20:00"
                    value={formData.exitTime}
                    onChange={handleChange}
                    className={inputClass}
                  />
                </div>
              </>
            )}

            {['mensalidade', 'bale'].includes(formData.requestType) && (
              <>
                <SectionTitle
                  title="Dados do plano"
                  description="Informe o turno e a data prevista de início."
                />

                <div>
                  <label className="block text-sm font-black text-[#5B4A39] mb-2">
                    Turno desejado *
                  </label>

                  <select
                    name="shift"
                    value={formData.shift}
                    onChange={handleChange}
                    className={inputClass}
                  >
                    <option value="">Selecione o turno</option>
                    <option value="Manhã">Manhã</option>
                    <option value="Tarde">Tarde</option>
                    <option value="Integral">Integral</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-black text-[#5B4A39] mb-2">
                    Data prevista de início *
                  </label>

                  <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                    className={inputClass}
                  />
                </div>
              </>
            )}

            {formData.requestType && formData.requestType !== 'visita' && (
              <>
                <SectionTitle
                  title="Cuidados importantes"
                  description="Essas informações ajudam a equipe a cuidar melhor da criança."
                />

                <TextareaWithIcon
                  icon={ShieldCheck}
                  name="allergies"
                  placeholder='Alergias. Caso não tenha, escreva "Nenhuma".'
                  value={formData.allergies}
                  onChange={handleChange}
                  textareaClass={textareaClass}
                />

                <TextareaWithIcon
                  icon={Utensils}
                  name="foodRestrictions"
                  placeholder='Restrições alimentares. Caso não tenha, escreva "Nenhuma".'
                  value={formData.foodRestrictions}
                  onChange={handleChange}
                  textareaClass={textareaClass}
                />

                <TextareaWithIcon
                  icon={Pill}
                  name="medications"
                  placeholder="Medicamentos ou cuidados específicos"
                  value={formData.medications}
                  onChange={handleChange}
                  textareaClass={textareaClass}
                />

                <TextareaWithIcon
                  icon={UsersRound}
                  name="authorizedPickup"
                  placeholder="Quem está autorizado a buscar a criança?"
                  value={formData.authorizedPickup}
                  onChange={handleChange}
                  textareaClass={textareaClass}
                />
              </>
            )}

            {formData.requestType && (
              <div className="md:col-span-2">
                <TextareaWithIcon
                  icon={ShieldCheck}
                  name="observations"
                  placeholder='Observações gerais * Caso não tenha observação, escreva "Nenhuma".'
                  value={formData.observations}
                  onChange={handleChange}
                  textareaClass={`${textareaClass} min-h-32`}
                />
              </div>
            )}

            {errorMessage && (
              <div className="md:col-span-2 bg-red-50 border-2 border-red-200 text-red-700 px-5 py-4 rounded-2xl font-bold">
                {errorMessage}
              </div>
            )}

            {successMessage && (
              <div className="md:col-span-2 bg-green-50 border-2 border-green-200 text-green-700 px-5 py-4 rounded-2xl font-bold flex items-center gap-3">
                <CheckCircle size={22} />
                {successMessage}
              </div>
            )}

            {formData.requestType && (
              <button
                type="submit"
                className="md:col-span-2 bg-[#6B722E] text-white py-4 rounded-full font-black hover:bg-[#596025] transition shadow-lg flex items-center justify-center gap-2"
              >
                Enviar solicitação
                <Send size={20} />
              </button>
            )}
          </div>
        </form>
      </div>
    </section>
  )
}

function RequestTypeCard({ title, description, icon: Icon, value, selected, onChange }) {
  const isSelected = selected === value

  return (
    <label
      className={`cursor-pointer rounded-3xl p-5 border-2 transition ${
        isSelected
          ? 'border-[#6B722E] bg-[#F4EAD6]'
          : 'border-[#D8C8AA] bg-white hover:bg-[#F8F1E4]'
      }`}
    >
      <input
        type="radio"
        name="requestType"
        value={value}
        checked={isSelected}
        onChange={onChange}
        className="hidden"
      />

      <div
        className={`w-14 h-14 rounded-2xl flex items-center justify-center border ${
          isSelected
            ? 'bg-[#6B722E] text-white border-[#6B722E]'
            : 'bg-[#F4EAD6] text-[#6B722E] border-[#D8C8AA]'
        }`}
      >
        <Icon size={26} />
      </div>

      <h3 className="mt-4 font-black text-[#2F2A22]">
        {title}
      </h3>

      <p className="mt-1 text-sm text-[#5B4A39]">
        {description}
      </p>
    </label>
  )
}

function SectionTitle({ title, description, noBorder = false }) {
  return (
    <div
      className={`md:col-span-2 ${
        noBorder ? '' : 'mt-6 border-t border-[#D8C8AA] pt-8'
      }`}
    >
      <h2 className="text-2xl font-black text-[#2F2A22]">
        {title}
      </h2>

      <p className="mt-1 text-[#5B4A39]">
        {description}
      </p>
    </div>
  )
}

function InputWithIcon({
  icon: Icon,
  type = 'text',
  name,
  placeholder,
  value,
  onChange,
  maxLength,
  inputClass,
}) {
  return (
    <div className="relative">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6B722E]">
        <Icon size={20} />
      </div>

      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        maxLength={maxLength}
        className={`${inputClass} pl-12`}
      />
    </div>
  )
}

function TextareaWithIcon({
  icon: Icon,
  name,
  placeholder,
  value,
  onChange,
  textareaClass,
}) {
  return (
    <div className="relative">
      <div className="absolute left-4 top-5 text-[#6B722E]">
        <Icon size={20} />
      </div>

      <textarea
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`${textareaClass} pl-12`}
      ></textarea>
    </div>
  )
}

function PreviewBox({ icon: Icon, label, value }) {
  return (
    <div className="bg-white border border-[#D8C8AA] rounded-2xl p-4 flex items-center gap-4">
      <div className="w-12 h-12 rounded-2xl bg-[#F4EAD6] border border-[#D8C8AA] flex items-center justify-center text-[#6B722E]">
        <Icon size={24} />
      </div>

      <div>
        <p className="text-sm font-black text-[#9F8F75]">
          {label}
        </p>

        <p className="mt-1 text-xl font-black text-[#6B722E]">
          {value}
        </p>
      </div>
    </div>
  )
}

export default SolicitationPage