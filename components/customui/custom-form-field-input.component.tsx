import React, { useId } from 'react'
import { FormField, FormItem } from '../ui/form'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Control } from 'react-hook-form'

interface CustomFormFieldInputProps {
  name: string
  control: Control
  label: string
  placeholder: string
  type?: string
}

const CustomFormFieldInput = ({
  name,
  control,
  label,
  placeholder,
  type,
}: CustomFormFieldInputProps) => {
  const inputId = useId()

  return (
    <FormField
      name={name}
      control={control}
      render={({ field }) => {
        return (
          <FormItem className='input-box'>
            <Label htmlFor={inputId} className='input-label'>
              {label}
            </Label>
            <Input
              type={type ? type : 'text'}
              required
              {...field}
              id={inputId}
              placeholder={placeholder}
              className={type && type === 'number' ? 'number-input' : ''}
            />
          </FormItem>
        )
      }}
    />
  )
}

export default CustomFormFieldInput
