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

const outcomeCategories: Record<string, string[]>[] = [
  { children: ['Kids', 'Pets'] },
  { food: ['Coffee', 'Eating Out', 'Eating In', 'Eating at Work'] },
  { home: ['Furnishing', 'Repairs'] },
  { health: ['Doctors', 'Medicines', 'Health Tests'] },
  { labor: ['Learning', 'Work'] },
  { transportation: ['Public Transport'] },
  { other: ['Charity', 'Gifts', 'Pocket money', 'Other'] },
]

const AddOutcome = ({ className }: { className: string }) => {
  const outcomeDescriptionId = useId()
  const outcomeAmountId = useId()

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className='uppercase'>Add Outcome</CardTitle>
      </CardHeader>
      <CardContent>
        <form className='add-form'>
          <div className='flex gap-2'>
            <div className='input-box'>
              <Label htmlFor={outcomeDescriptionId} className='input-label'>
                Outcome Description
              </Label>
              <Input
                id={outcomeDescriptionId}
                placeholder='Enter Descriptions'
              />
            </div>
            <div className='input-box'>
              <Label htmlFor={outcomeAmountId} className='input-label'>
                Amount
              </Label>
              <Input
                id={outcomeAmountId}
                type='number'
                placeholder='Enter Amount'
                className='number-input'
              />
            </div>
          </div>
          <CustomSelect
            items={outcomeCategories}
            label='Category'
            placeholder='Select category'
            onChange={(value: string) => console.log(value)}
          />
        </form>
      </CardContent>
      <CardFooter className='flex justify-end'>
        <Button variant='outline'>Submit</Button>
      </CardFooter>
    </Card>
  )
}

export default AddOutcome
