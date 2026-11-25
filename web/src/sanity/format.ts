const TIME_ZONE = 'America/Toronto'

export function formatDate(value: string, style: 'medium' | 'long' | 'full' = 'medium') {
  return new Date(value).toLocaleDateString('en-CA', { dateStyle: style, timeZone: TIME_ZONE })
}

export function formatTime(value: string) {
  return new Date(value).toLocaleTimeString('en-CA', { timeStyle: 'short', timeZone: TIME_ZONE })
}

export function dateParts(value: string) {
  const date = new Date(value)
  return {
    month: date.toLocaleDateString('en-CA', { month: 'short', timeZone: TIME_ZONE }),
    day: date.toLocaleDateString('en-CA', { day: 'numeric', timeZone: TIME_ZONE }),
  }
}

// YYYY-MM-DD in Toronto time, so calendar days don't shift with the viewer's time zone
export function dayKey(value: string | number) {
  return new Date(value).toLocaleDateString('en-CA', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    timeZone: TIME_ZONE,
  })
}

export function formatEventTime(startDate: string, endDate?: string | null) {
  if (!endDate) return formatTime(startDate)
  if (dayKey(startDate) === dayKey(endDate)) return `${formatTime(startDate)} – ${formatTime(endDate)}`
  return `${formatDate(startDate)}, ${formatTime(startDate)} – ${formatDate(endDate)}, ${formatTime(endDate)}`
}
