import sirv from 'sirv'
import polka from 'polka'
import compression from 'compression'
import * as sapper from '@sapper/server'
import axios from 'axios'
import cookieParser from 'cookie-parser'

const { PORT, NODE_ENV } = process.env
const dev = NODE_ENV === 'development'

polka() // You can also use Express
  .use(cookieParser()) // add this to parse cookies
  .use(
    compression({ threshold: 0 }),
    sirv('static', { dev }),
    sapper.middleware({
      session: async (req, res) => {
        if (req.cookies && req.cookies.token) {
          const userInfo = await getUserClaimsFromToken(req.cookies.token)

          if (userInfo) {
            return {
              auth: userInfo,
            }
          }

          return {
            auth: null,
            token: req.cookies.token,
          }
        }

        return {
          auth: null,
          token: false,
        }
      },
    })
  )
  .listen(PORT, err => {
    if (err) console.error('error', err)
  })

async function getUserClaimsFromToken(token) {
  try {
    const resp = (
      await axios.post(`http://localhost:5000/api/auth/token`, {
        refresh: true,
        token,
      })
    ).data

    const claims = resp.public

    if (!claims) {
      return
    }

    const res = await axios.get(`http://localhost:5000/api/users/${claims.claims.user}`)

    return {
      claims,
      user: res.data,
      token,
    }
  } catch (err) {
    console.error(err)
  }
}
