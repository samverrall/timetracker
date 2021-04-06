import Cookies from 'js-cookie'

export const fetch = async function (url, options = {}) {
  const token = Cookies.get('token')

  options.headers = {
    connection: 'keep-alive',
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  }

  if (!options.headers.cookie) {
    delete options.headers.cookie
  }

  if (token) {
    options.headers.authorization = `Bearer ${token}`
  }

  return window.fetch(url, {
    ...options,
  })
}
