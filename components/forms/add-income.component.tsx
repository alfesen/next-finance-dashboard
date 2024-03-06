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

const categories: string[] = ['Bank Transaction', 'Cash', 'Gift']

const AddIncome = ({ className }: { className: string }) => {
  const incomeDescriptionId = useId()
  const incomeAmountId = useId()

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className='uppercase'>Add income</CardTitle>
      </CardHeader>
      <CardContent>
        <form className='add-form'>
          <div className='flex gap-2'>
            <div className='input-box'>
              <Label htmlFor={incomeDescriptionId} className='input-label'>
                Income Description
              </Label>
              <Input
                id={incomeDescriptionId}
                placeholder='Enter Descriptions'
              />
            </div>
            <div className='input-box'>
              <Label htmlFor={incomeAmountId} className='input-label'>
                Amount
              </Label>
              <Input
                id={incomeAmountId}
                type='number'
                placeholder='Enter Amount'
                className='number-input'
              />
            </div>
          </div>
          <CustomSelect
            items={categories}
            label='Category'
            placeholder='Select category'
            onChange={(value) => console.log(value)}
          />
        </form>
      </CardContent>
      <CardFooter className='flex justify-end'>
        <Button variant='outline'>Submit</Button>
      </CardFooter>
    </Card>
  )
}

export default AddIncome
