'use client'

import { FieldLabel, useField } from '@payloadcms/ui'
import { TextFieldClientProps } from 'payload'

export function LqipPreviewField({ path, field }: TextFieldClientProps) {
  const { value } = useField<string>({ path })

  if (!value) {
    return null
  }

  return (
    <div className="field-type">
      <FieldLabel label={field.label} />
      <div className="max-w-[350px] overflow-hidden rounded shadow">
        {value}
      </div>
    </div>
  )
}
