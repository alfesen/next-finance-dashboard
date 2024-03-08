import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { ZodRawShape, z } from 'zod'

export const usePostData = (
  schema: z.ZodObject<ZodRawShape>,
  defaultValues: Record<string, unknown>,
  collection: string
) => {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues,
  })

  const onSubmit = async (values: z.infer<typeof schema>) => {
    await axios.post(`/api/${collection}`, JSON.stringify(values), {
      method: 'Post',
      headers: { 'Content-Type': 'application/json' },
    })
    form.reset()
  }

  return {form, onSubmit}
}


