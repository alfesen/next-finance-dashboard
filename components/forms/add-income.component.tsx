import { useId } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import CustomSelect from '@/components/customui/CustomSelect'
import { Form, FormControl, FormField, FormItem } from '../ui/form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import axios from 'axios'

const categories: string[] = ['Bank Transaction', 'Cash', 'Gift']

const incomeSchema = z.object({
  invoice: z.string(),
  amount: z.string().transform(Number),
  method: z.string(),
})

const AddIncome = ({ className }: { className: string }) => {
  const form = useForm<z.infer<typeof incomeSchema>>({
    resolver: zodResolver(incomeSchema),
    defaultValues: {
      invoice: '',
      amount: 0,
      method: '',
    },
  })

  const incomeInvoiceId = useId()
  const incomeAmountId = useId()

  const onSubmit = async (values: z.infer<typeof incomeSchema>) => {
    await axios.post('/api/income', JSON.stringify(values), {
      method: 'Post',
      headers: { 'Content-Type': 'application/json' },
    })
    form.reset()
    form.setValue('method', '')
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className='uppercase'>Add income</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
            <div className='flex gap-2'>
              <FormField
                control={form.control}
                name='invoice'
                render={({ field }) => {
                  return (
                    <FormItem className='input-box'>
                      <Label htmlFor={incomeInvoiceId} className='input-label'>
                        Invoice
                      </Label>
                      <FormControl>
                        <Input
                          required
                          id={incomeInvoiceId}
                          {...field}
                          placeholder='Enter Invoices'
                        />
                      </FormControl>
                    </FormItem>
                  )
                }}
              />
              <FormField
                control={form.control}
                name='amount'
                render={({ field }) => {
                  return (
                    <FormItem className='input-box'>
                      <Label htmlFor={incomeAmountId} className='input-label'>
                        Amount
                      </Label>
                      <FormControl>
                        <Input
                          required
                          id={incomeAmountId}
                          type='number'
                          placeholder='Enter Amount'
                          className='number-input'
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )
                }}
              />
            </div>
            <FormField
              control={form.control}
              name='method'
              render={({ field }) => {
                return (
                  <CustomSelect
                    {...field}
                    items={categories}
                    label='Method'
                    placeholder='Select method'
                  />
                )
              }}
            />
            <Button type='submit' variant='outline'>
              Submit
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className='flex justify-end'></CardFooter>
    </Card>
  )
}

export default AddIncome
