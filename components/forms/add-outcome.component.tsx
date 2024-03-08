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
import { Form, FormField, FormItem } from '../ui/form'
import { usePostData } from '@/hooks/usePostData'
import { z } from 'zod'

const outcomeCategories: Record<string, string[]>[] = [
  { children: ['Kids', 'Pets'] },
  { food: ['Coffee', 'Groceries', 'Eating Out', 'Eating at Work'] },
  { home: ['Furnishing', 'Repairs'] },
  { health: ['Doctors', 'Medicines', 'Health Tests'] },
  { labor: ['Learning', 'Work'] },
  { transportation: ['Public Transport'] },
  { other: ['Charity', 'Gifts', 'Pocket money', 'Other'] },
]

const expenseSchema = z.object({
  expense: z.string(),
  amount: z.string().transform(Number),
  category: z.string(),
})

const AddOutcome = ({ className }: { className: string }) => {
  const { form, onSubmit } = usePostData(
    expenseSchema,
    {
      expense: '',
      amount: '',
      category: '',
    },
    'outcome'
  )

  const outcomeDescriptionId = useId()
  const outcomeAmountId = useId()

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className='uppercase'>Add Outcome</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
            <div className='flex gap-2'>
              <FormField
                name='expense'
                control={form.control}
                render={({ field }) => {
                  return (
                    <FormItem className='input-box'>
                      <Label
                        htmlFor={outcomeDescriptionId}
                        className='input-label'
                      >
                        Outcome Description
                      </Label>
                      <Input
                        required
                        {...field}
                        id={outcomeDescriptionId}
                        placeholder='Enter Descriptions'
                      />
                    </FormItem>
                  )
                }}
              />
              <FormField
                name='amount'
                control={form.control}
                render={({ field }) => {
                  return (
                    <FormItem className='input-box'>
                      <Label htmlFor={outcomeAmountId} className='input-label'>
                        Amount
                      </Label>
                      <Input
                        required
                        id={outcomeAmountId}
                        type='number'
                        {...field}
                        placeholder='Enter Amount'
                        className='number-input'
                      />
                    </FormItem>
                  )
                }}
              />
            </div>
            <FormField
              control={form.control}
              name='category'
              render={({ field }) => {
                return (
                  <CustomSelect
                    {...field}
                    items={outcomeCategories}
                    label='Category'
                    placeholder='Select category'
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
    </Card>
  )
}

export default AddOutcome
