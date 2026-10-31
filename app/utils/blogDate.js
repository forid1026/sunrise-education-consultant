// Formats an ISO date in Dhaka time, so server and browser always agree
export function blogDate(iso, short = false) {
  if (!iso) return ''
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return ''
  return d.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: short ? 'short' : 'long',
    year: 'numeric',
    timeZone: 'Asia/Dhaka',
  })
}