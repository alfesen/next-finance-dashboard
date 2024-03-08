import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import CustomSelect from '@/components/customui/custom-select.component'
import { Form, FormField } from '../ui/form'
import { usePostData } from '@/hooks/use-post-data.hook'
import { z } from 'zod'
import CustomFormFieldInput from '../customui/custom-form-field-input.component'

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

const AddOutcome = () => {
  const { form, onSubmit } = usePostData(
    expenseSchema,
    {
      expense: '',
      amount: '',
      category: '',
    },
    'outcome'
  )

  return (
    <Card className='width=[350]'>
      <CardHeader>
        <CardTitle className='uppercase'>Add Outcome</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
            <div className='flex gap-2'>
              <CustomFormFieldInput
                name='expense'
                control={form.control}
                placeholder='Enter expense description'
                label='Expense'
              />
              <CustomFormFieldInput
                type='number'
                name='amount'
                control={form.control}
                placeholder='Enter amount'
                label='Amount'
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
