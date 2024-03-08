import { nanoid } from 'nanoid'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { capitalize } from 'string-ts'
import { forwardRef, useId } from 'react'

type SelectItems = { placeholder: string; label: string; items: string[] }
type SelectGroup = {
  placeholder: string
  label: string
  items: Record<string, string[]>[]
}

type CustomSelectProps = (SelectItems | SelectGroup) & {
  onChange: (value: string) => void
}

const CustomSelect = forwardRef(
  ({ label, placeholder, items, onChange }: CustomSelectProps, ref: any) => {
    const selectId = useId()

    const renderItems = () => {
      return items.map((c) => {
        if (typeof c === 'string') {
          return (
            <SelectItem key={nanoid()} value={c as string}>
              {c as string}
            </SelectItem>
          )
        }
        const key = Object.keys(c)[0]
        return (
          <SelectGroup key={nanoid()}>
            <SelectLabel className='input-label'>{capitalize(key)}</SelectLabel>
            {(c as Record<string, string[]>)[key].map((i) => {
              return (
                <SelectItem key={nanoid()} value={i}>
                  {i}
                </SelectItem>
              )
            })}
          </SelectGroup>
        )
      })
    }
    return (
      <div className='input-box gap-3'>
        <Label htmlFor={selectId} className='input-label'>
          {label}
        </Label>
        <Select required onValueChange={onChange}>
          <SelectTrigger>
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent>{renderItems()}</SelectContent>
        </Select>
      </div>
    )
  }
)

export default CustomSelect
