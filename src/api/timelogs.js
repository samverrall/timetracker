import { fetch } from './fetchClient'
import { format } from 'date-fns'

export async function getTimelogsByDate(date) {
  try {
    const todayFormatted = format(date, 'yyyy-MM-dd')

    const res = await fetch(`http://localhost:5000/api/timelogs?date=${todayFormatted}`)

    const data = await res.json()

    return data
  } catch (err) {
    console.error(err)

    return []
  }
}
