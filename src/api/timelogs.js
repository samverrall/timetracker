import axios from 'axios'
import { format } from 'date-fns'

export async function getTimelogsByDate(auth, date) {
  try {
    const todayFormatted = format(date, 'yyyy-MM-dd')

    const res = await axios.get(`http://localhost:5000/api/timelogs?date=${todayFormatted}`, {
      headers: {
        Authorization: `Bearer ${auth.token}`,
      },
    })

    return res.data
  } catch (err) {
    console.error(err)

    return []
  }
}
