'use client'

import { ComponentProps, ComponentRef, useEffect, useRef } from 'react'
import { getThumbHashImage } from './utils'

export function ThumbHashCanvas({
  hash,
  ref,
  style,
  ...props
}: { hash: string } & ComponentProps<'div'>) {
  const canvasRef = useRef<ComponentRef<'canvas'>>(null)

  useEffect(() => {
    const image = getThumbHashImage(hash)

    const context = canvasRef.current!.getContext('2d')
    if (!context) {
      throw new Error('Failed to get canvas context.')
    }

    const pixels = context.createImageData(image.width, image.height)
    pixels.data.set(image.rgba)

    canvasRef.current!.width = image.width
    canvasRef.current!.height = image.height
    context.putImageData(pixels, 0, 0)
  }, [hash])

  return (
    <div
      ref={ref}
      style={{
        overflow: 'hidden',
        ...style,
      }}
      aria-hidden
      {...props}
    >
      <canvas
        ref={canvasRef}
        style={{ display: 'block', height: '100%', width: '100%' }}
      />
    </div>
  )
}
