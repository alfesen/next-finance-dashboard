import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import CustomSelect from '@/components/customui/custom-select.component'
import { Form, FormField } from '../ui/form'
import { z } from 'zod'
import { usePostData } from '@/hooks/use-post-data.hook'
import CustomFormFieldInput from '../customui/custom-form-field-input.component'

const categories: string[] = ['Bank Transaction', 'Cash', 'Gift']

const incomeSchema = z.object({
  invoice: z.string(),
  amount: z.string().transform(Number),
  method: z.string(),
})

const AddIncome = () => {
  const { form, onSubmit } = usePostData(
    incomeSchema,
    {
      invoice: '',
      amount: '',
      method: '',
    },
    'income'
  )

  return (
    <Card className='width=[350]'>
      <CardHeader>
        <CardTitle className='uppercase'>Add income</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
            <div className='flex gap-2'>
              <CustomFormFieldInput
                control={form.control}
                name='invoice'
                label='Invoice'
                placeholder='Enter invoice description'
              />
              <CustomFormFieldInput
                control={form.control}
                name='amount'
                label='Amount'
                placeholder='Enter amount'
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
    </Card>
  )
}

export default AddIncome
