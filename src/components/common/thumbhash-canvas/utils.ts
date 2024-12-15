import { thumbHashToRGBA } from 'thumbhash'

function base64ToUint8Array(base64: string) {
  const bytes = atob(base64)
  const result = new Uint8Array(bytes.length)
  for (let i = 0; i < bytes.length; i++) {
    result[i] = bytes.charCodeAt(i)
  }
  return result
}

export function getThumbHashImage(base64: string) {
  const hash = base64ToUint8Array(base64)
  const { w, h, rgba } = thumbHashToRGBA(hash)

  return {
    width: w,
    height: h,
    ratio: w / h,
    rgba,
  }
}
