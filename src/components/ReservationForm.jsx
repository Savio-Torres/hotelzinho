import { useRef, useState } from 'react'

function ReservationForm() {
  const exitTimeRef = useRef(null)

  const [formData, setFormData] = useState({
    guardianName: '',
    phone: '',
    childName: '',
    birthDate: '',
    date: '',
    serviceType: '',
    entryTime: '',
    exitTime: '',
    needsSchoolSupport: 'Não',
    balletInterest: 'Não',
    allergies: '',
    foodRestrictions: '',
    observations: '',
  })

  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  function formatPhone(value) {
    const numbers = value.replace(/\D/g, '').slice(0, 11)

    if (numbers.length <= 2) {
      return numbers
    }

    if (numbers.length <= 7) {
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`
    }

    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7)}`
  }

  function handleChange(event) {
    const { name, value } = event.target

    if (name === 'phone') {
      setFormData({
        ...formData,
        phone: formatPhone(value),
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

  function isValidPhone(phone) {
    return phone.replace(/\D/g, '').length === 11
  }

  function calculateAgeData(birthDateValue) {
    const birthDate = new Date(`${birthDateValue}T00:00:00`)
    const today = new Date()

    if (Number.isNaN(birthDate.getTime())) {
      return {
        isValid: false,
        ageText: '',
        ageInMonths: 0,
        ageInYears: 0,
        ageGroup: '',
        message: 'Digite uma data de nascimento válida.',
      }
    }

    if (birthDate > today) {
      return {
        isValid: false,
        ageText: '',
        ageInMonths: 0,
        ageInYears: 0,
        ageGroup: '',
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
        ageText: '',
        ageInMonths,
        ageInYears,
        ageGroup: '',
        message: 'A idade mínima aceita é de 4 meses.',
      }
    }

    if (ageInYears > 12 || ageInMonths > 155) {
      return {
        isValid: false,
        ageText: '',
        ageInMonths,
        ageInYears,
        ageGroup: '',
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
      message: '',
    }
  }

  function formatDateToBR(date) {
    if (!date) return ''

    const [year, month, day] = date.split('-')

    return `${day}/${month}/${year}`
  }

  function validateServiceTime(entryTime, exitTime) {
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

  function handleSubmit(event) {
    event.preventDefault()

    if (
      !formData.guardianName ||
      !formData.phone ||
      !formData.childName ||
      !formData.birthDate ||
      !formData.date ||
      !formData.serviceType ||
      !formData.entryTime ||
      !formData.exitTime
    ) {
      setErrorMessage('Por favor, preencha todos os campos obrigatórios.')
      setSuccessMessage('')
      return
    }

    if (!isValidPhone(formData.phone)) {
      setErrorMessage(
        'Digite um telefone válido com DDD. Exemplo: (81) 99999-9999.'
      )
      setSuccessMessage('')
      return
    }

    const ageData = calculateAgeData(formData.birthDate)

    if (!ageData.isValid) {
      setErrorMessage(ageData.message)
      setSuccessMessage('')
      return
    }

    const timeError = validateServiceTime(formData.entryTime, formData.exitTime)

    if (timeError) {
      setErrorMessage(timeError)
      setSuccessMessage('')
      return
    }

    const newReservation = {
      id: crypto.randomUUID(),
      ...formData,
      birthDateFormatted: formatDateToBR(formData.birthDate),
      childAgeText: ageData.ageText,
      childAgeInMonths: ageData.ageInMonths,
      childAgeInYears: ageData.ageInYears,
      ageGroup: ageData.ageGroup,
      status: 'Pendente',
      createdAt: new Date().toLocaleString('pt-BR'),
    }

    const savedReservations =
      JSON.parse(localStorage.getItem('hotelzinho_reservations')) || []

    const updatedReservations = [newReservation, ...savedReservations]

    localStorage.setItem(
      'hotelzinho_reservations',
      JSON.stringify(updatedReservations)
    )

    setSuccessMessage(
      'Solicitação enviada com sucesso! Entraremos em contato para confirmar a reserva.'
    )

    setErrorMessage('')

    setFormData({
      guardianName: '',
      phone: '',
      childName: '',
      birthDate: '',
      date: '',
      serviceType: '',
      entryTime: '',
      exitTime: '',
      needsSchoolSupport: 'Não',
      balletInterest: 'Não',
      allergies: '',
      foodRestrictions: '',
      observations: '',
    })
  }

  const previewAgeData = formData.birthDate
    ? calculateAgeData(formData.birthDate)
    : null

  return (
    <section id="reserva" className="py-24 bg-[#EAF6FF]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto">
          <span className="inline-flex bg-[#FFD84D] text-[#1238A8] px-5 py-2 rounded-full font-black">
            Solicitação de reserva
          </span>

          <h2 className="mt-5 text-4xl md:text-5xl font-black text-gray-900">
            Vamos cuidar desse momento com carinho?
          </h2>

          <p className="mt-4 text-gray-600 text-lg">
            Preencha os dados abaixo e entraremos em contato para confirmar a
            disponibilidade. O funcionamento é das 06:00 às 20:00.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-12 bg-white rounded-[2.5rem] p-6 md:p-10 shadow-xl border border-blue-100"
        >
          <div className="grid md:grid-cols-2 gap-5">
            <div className="md:col-span-2">
              <h3 className="text-2xl font-black text-gray-900">
                Dados do responsável
              </h3>

              <p className="mt-1 text-gray-500">
                Informações para contato e confirmação da reserva.
              </p>
            </div>

            <input
              type="text"
              name="guardianName"
              placeholder="Nome do responsável *"
              value={formData.guardianName}
              onChange={handleChange}
              className="border-2 border-blue-100 rounded-2xl px-5 py-4 outline-none focus:border-[#1238A8]"
            />

            <input
              type="tel"
              name="phone"
              placeholder="Telefone com DDD *"
              value={formData.phone}
              onChange={handleChange}
              maxLength="15"
              className="border-2 border-blue-100 rounded-2xl px-5 py-4 outline-none focus:border-[#1238A8]"
            />

            <div className="md:col-span-2 mt-6 border-t border-blue-100 pt-8">
              <h3 className="text-2xl font-black text-gray-900">
                Dados da criança
              </h3>

              <p className="mt-1 text-gray-500">
                A idade e o prédio serão calculados automaticamente pela data de
                nascimento.
              </p>
            </div>

            <input
              type="text"
              name="childName"
              placeholder="Nome da criança *"
              value={formData.childName}
              onChange={handleChange}
              className="border-2 border-blue-100 rounded-2xl px-5 py-4 outline-none focus:border-[#1238A8]"
            />

            <div>
              <label className="block text-sm font-black text-gray-600 mb-2">
                Data de nascimento *
              </label>

              <input
                type="date"
                name="birthDate"
                value={formData.birthDate}
                onChange={handleChange}
                className="w-full border-2 border-blue-100 rounded-2xl px-5 py-4 outline-none focus:border-[#1238A8]"
              />
            </div>

            {previewAgeData?.isValid && (
              <div className="md:col-span-2 bg-[#F8FBFF] border border-blue-100 rounded-3xl p-5">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-black text-gray-500">
                      Idade calculada
                    </p>

                    <p className="mt-1 text-xl font-black text-[#1238A8]">
                      {previewAgeData.ageText}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm font-black text-gray-500">
                      Prédio indicado
                    </p>

                    <p className="mt-1 text-xl font-black text-[#1238A8]">
                      {previewAgeData.ageGroup}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {previewAgeData && !previewAgeData.isValid && (
              <div className="md:col-span-2 bg-yellow-50 border border-yellow-200 rounded-3xl p-5">
                <p className="font-bold text-yellow-700">
                  {previewAgeData.message}
                </p>
              </div>
            )}

            <div className="md:col-span-2 mt-6 border-t border-blue-100 pt-8">
              <h3 className="text-2xl font-black text-gray-900">
                Reserva
              </h3>

              <p className="mt-1 text-gray-500">
                Informe o serviço desejado e os horários dentro do funcionamento.
              </p>
            </div>

            <div>
              <label className="block text-sm font-black text-gray-600 mb-2">
                Data da reserva *
              </label>

              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full border-2 border-blue-100 rounded-2xl px-5 py-4 outline-none focus:border-[#1238A8]"
              />
            </div>

            <div>
              <label className="block text-sm font-black text-gray-600 mb-2">
                Tipo de serviço *
              </label>

              <select
                name="serviceType"
                value={formData.serviceType}
                onChange={handleChange}
                className="w-full border-2 border-blue-100 rounded-2xl px-5 py-4 outline-none focus:border-[#1238A8]"
              >
                <option value="">Selecione o serviço</option>
                <option value="Período integral">Período integral</option>
                <option value="Turno da manhã">Turno da manhã</option>
                <option value="Turno da tarde">Turno da tarde</option>
                <option value="Diária infantil">Diária infantil</option>
                <option value="Reforço escolar">Reforço escolar</option>
                <option value="Balé">Balé</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-black text-gray-600 mb-2">
                Horário de chegada *
              </label>

              <input
                type="time"
                name="entryTime"
                min="06:00"
                max="20:00"
                value={formData.entryTime}
                onChange={handleChange}
                className="w-full border-2 border-blue-100 rounded-2xl px-5 py-4 outline-none focus:border-[#1238A8]"
              />
            </div>

            <div>
              <label className="block text-sm font-black text-gray-600 mb-2">
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
                className="w-full border-2 border-blue-100 rounded-2xl px-5 py-4 outline-none focus:border-[#1238A8]"
              />
            </div>

            <div>
              <label className="block text-sm font-black text-gray-600 mb-2">
                Precisa de reforço escolar?
              </label>

              <select
                name="needsSchoolSupport"
                value={formData.needsSchoolSupport}
                onChange={handleChange}
                className="w-full border-2 border-blue-100 rounded-2xl px-5 py-4 outline-none focus:border-[#1238A8]"
              >
                <option value="Não">Não</option>
                <option value="Sim">Sim</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-black text-gray-600 mb-2">
                Interesse no balé?
              </label>

              <select
                name="balletInterest"
                value={formData.balletInterest}
                onChange={handleChange}
                className="w-full border-2 border-blue-100 rounded-2xl px-5 py-4 outline-none focus:border-[#1238A8]"
              >
                <option value="Não">Não</option>
                <option value="Sim">Sim</option>
              </select>
            </div>

            <div className="md:col-span-2 mt-6 border-t border-blue-100 pt-8">
              <h3 className="text-2xl font-black text-gray-900">
                Cuidados importantes
              </h3>

              <p className="mt-1 text-gray-500">
                Essas informações ajudam a equipe a cuidar melhor da criança.
              </p>
            </div>

            <textarea
              name="allergies"
              placeholder="Alergias"
              value={formData.allergies}
              onChange={handleChange}
              className="border-2 border-blue-100 rounded-2xl px-5 py-4 outline-none focus:border-[#1238A8] min-h-28"
            ></textarea>

            <textarea
              name="foodRestrictions"
              placeholder="Restrições alimentares"
              value={formData.foodRestrictions}
              onChange={handleChange}
              className="border-2 border-blue-100 rounded-2xl px-5 py-4 outline-none focus:border-[#1238A8] min-h-28"
            ></textarea>

            <textarea
              name="observations"
              placeholder="Observações gerais"
              value={formData.observations}
              onChange={handleChange}
              className="md:col-span-2 border-2 border-blue-100 rounded-2xl px-5 py-4 outline-none focus:border-[#1238A8] min-h-32"
            ></textarea>

            {errorMessage && (
              <div className="md:col-span-2 bg-red-50 border-2 border-red-200 text-red-700 px-5 py-4 rounded-2xl font-bold">
                {errorMessage}
              </div>
            )}

            {successMessage && (
              <div className="md:col-span-2 bg-green-50 border-2 border-green-200 text-green-700 px-5 py-4 rounded-2xl font-bold">
                {successMessage}
              </div>
            )}

            <button
              type="submit"
              className="md:col-span-2 bg-[#1238A8] text-white py-4 rounded-full font-black hover:bg-blue-900 transition shadow-lg"
            >
              Enviar solicitação
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}

export default ReservationForm