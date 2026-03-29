import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDateTime(millis: number): string {
  const min = ((millis / 60000) | 0) % 60
  const h = ((millis / 3600000) | 0) % 24
  const day = (millis / 86400000) | 0

  let z = day + 719468
  const era = ((z >= 0 ? z : z - 146096) / 146097) | 0
  const doe = z - era * 146097
  const yoe = ((doe - doe / 1460 + doe / 36524 - doe / 146096) / 365) | 0
  const y = yoe + era * 400
  const doy = doe - ((365 * yoe + yoe / 4 - yoe / 100) | 0)
  const mp = ((5 * doy + 2) / 153) | 0
  const d = (doy - (153 * mp + 2) / 5 + 1) | 0
  const mo = mp + (mp < 10 ? 3 : -9)
  const yr = y + (mo <= 2 ? 1 : 0)

  return (
    `${yr}-` +
    `${mo > 9 ? mo : '0' + mo}-` +
    `${d > 9 ? d : '0' + d} ` +
    `${h > 9 ? h : '0' + h}:` +
    `${min > 9 ? min : '0' + min} UTC`
  )
}
