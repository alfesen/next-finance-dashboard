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
import { Fragment } from 'react'

type SelectItems = { placeholder: string; label: string; items: string[] }
type SelectGroup = {
  placeholder: string
  label: string
  items: Record<string, string[]>[]
}
type CustomSelectProps = (SelectItems | SelectGroup) & {
  onChange: (value: string) => void
}

const CustomSelect = ({
  label,
  placeholder,
  items,
  onChange,
}: CustomSelectProps) => {
  const renderItems = () => {
    return items.map((c) => {
      if (typeof c === 'string') {
        return <SelectItem value={c as string}>{c as string}</SelectItem>
      }
      const key = Object.keys(c)[0]
      return (
        <SelectGroup key={nanoid()}>
          <SelectLabel>{key}</SelectLabel>
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
    <Fragment>
      <Label>{label}</Label>
      <Select onValueChange={onChange}>
        <SelectTrigger>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>{renderItems()}</SelectContent>
      </Select>
    </Fragment>
  )
}

export default CustomSelect
