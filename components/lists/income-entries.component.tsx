import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Card } from '../ui/card'
import { nanoid } from 'nanoid'

interface IncomeEntry {
  invoice: string
  amount: number
  method: string
}

interface IncomeEntriesProps {
  entries: IncomeEntry[]
}

const IncomeEntries = ({ entries }: IncomeEntriesProps) => {
  const generateRows = () => {
    return entries.map(({ invoice, method, amount }) => {
      return (
        <TableRow key={nanoid()}>
          <TableCell className='font-medium capitalize'>{invoice}</TableCell>
          <TableCell>{method}</TableCell>
          <TableCell className='text-right'>{amount} PLN</TableCell>
        </TableRow>
      )
    })
  }

  return (
    <Card className='flex-grow p-4'>
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className='w-[200px]'>Invoice</TableHead>
            <TableHead>Method</TableHead>
            <TableHead className='text-right'>Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>{generateRows()}</TableBody>
      </Table>
    </Card>
  )
}

export default IncomeEntries
