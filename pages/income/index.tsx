import AddIncome from '@/components/forms/add-income.component'
import IncomeEntries from '@/components/lists/income-entries.component'

const Income = ({ entries }: { entries: any }) => {
  return (
    <main className='container py-4 flex justify-between gap-10'>
      <AddIncome />
      <IncomeEntries entries={entries} />
    </main>
  )
}

export const getServerSideProps = async () => {
  const response = await fetch('http://localhost:3000/api/income', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  })
  const { data: entries } = await response.json()
  return {
    props: {
      entries: entries,
    },
  }
}

export default Income
