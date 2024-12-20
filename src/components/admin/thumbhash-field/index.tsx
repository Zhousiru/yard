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
      <div className="max-w-[350px] overflow-hidden rounded shadow">
        <ThumbHashCanvas hash={value} />
        <div className="p-4">
          <div className="font-mono">{value}</div>
          <div className="opacity-75">{value.length} Bytes</div>
        </div>
      </div>
    </div>
  )
}
