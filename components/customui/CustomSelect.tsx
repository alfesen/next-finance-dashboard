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

type SelectItems = { placeholder: string; label: string; categories: string[] }
type SelectGroup = {
  placeholder: string
  label: string
  categories: Record<string, string[]>[]
}
type CustomSelectProps = (SelectItems | SelectGroup) & {
  onChange: (value: string) => void
}

const CustomSelect = ({
  label,
  placeholder,
  categories,
  onChange,
}: CustomSelectProps) => {
  const renderCategories = () => {
    return categories.map((c) => {
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
        <SelectContent>{renderCategories()}</SelectContent>
      </Select>
    </Fragment>
  )
}

export default CustomSelect
