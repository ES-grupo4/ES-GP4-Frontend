import type { ReactNode } from 'react'

function FormBox({
  title,
  children,
}: Readonly<{
  title: string
  children: ReactNode
}>): ReactNode {
  return (
    <div className='flex items-center justify-center bg-gray-100'>
      <div className='w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-md'>
        <h2 className='text-2xl font-bold text-center text-gray-900'>{title}</h2>
        {children}
      </div>
    </div>
  )
}

export default FormBox
