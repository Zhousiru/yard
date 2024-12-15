'use client'

import { ThumbHashCanvas } from '@/components/common/thumbhash-canvas'
import { FieldLabel, useField } from '@payloadcms/ui'
import { TextFieldClientProps } from 'payload'

export function ThumbHashField({ path, field }: TextFieldClientProps) {
  const { value } = useField<string>({ path })

  if (!value) {
    return null
  }

  return (
    <div className="field-type">
      <FieldLabel label={field.label} />
      <ThumbHashCanvas
        hash={value}
        style={{ width: 200, borderRadius: 'var(--style-radius-m)' }}
      />
    </div>
  )
}
