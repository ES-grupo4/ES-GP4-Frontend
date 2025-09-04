export default function ChartCard({
  title,
  children,
}: Readonly<{
  title: string
  children: React.ReactNode
}>) {
  return (
    <div className='bg-white rounded-lg shadow p-6'>
      <h3 className='text-lg font-semibold mb-4'>{title}</h3>
      {children}
    </div>
  )
}
