import type React from 'react'

const MonthYearDropdown = ({
  selectedYear,
  selectedMonth,
  onChange,
  startYear = 2000,
}: {
  selectedYear: number
  selectedMonth: number
  onChange: (year: number, month: number) => void
  startYear?: number //Ano mínimo disponível
}) => {
  const months = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ]

  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: currentYear - startYear + 1 }, (_, i) => startYear + i)

  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(selectedYear, parseInt(e.target.value, 10))
  }

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(parseInt(e.target.value, 10), selectedMonth)
  }

  return (
    <div className='flex space-x-4'>
      <div className='inline-block relative w-48'>
        <select
          value={selectedMonth}
          onChange={handleMonthChange}
          className='block w-full px-4 py-2 pr-8 text-gray-700 bg-white border border-gray-300 rounded shadow-md appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
        >
          {months.map((monthName, index) => (
            <option key={monthName} value={index + 1}>
              {monthName}
            </option>
          ))}
        </select>
        <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700'>
          ▼
        </div>
      </div>
      <div className='inline-block relative w-32'>
        <select
          value={selectedYear}
          onChange={handleYearChange}
          className='block w-full px-4 py-2 pr-8 text-gray-700 bg-white border border-gray-300 rounded shadow-md appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
        >
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
        <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700'>
          ▼
        </div>
      </div>
    </div>
  )
}

export default MonthYearDropdown
