<script>
  import Nav from '../components/Nav.svelte'
  import { setContext } from 'svelte'
  import { create as createStore } from '../store/store'
  import { stores } from '@sapper/app'
  const { session, page } = stores()
  import axios from 'axios'

  if (!$session) {
    $session = {}
  }

  let showComponents = false

  const IS_BROWSER = typeof window !== 'undefined'

  const storeData = {
    showMenu: true,
    auth: null,
  }

  let store = createStore(storeData)

  const platform = {
    store,
    showLoading: false,
  }

  checkIfLoggedIn()

  async function checkIfLoggedIn() {
    if (!IS_BROWSER) return

    const clientHasToken = window.localStorage.getItem('token')

    if (clientHasToken) {
      await getUserClaimsFromToken(clientHasToken)
    } else {
      showComponents = true
    }
  }

  async function getUserClaimsFromToken(token) {
    try {
      const req = await fetch(`http://localhost:5000/api/auth/token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refresh: true, token }),
      })

      const resp = await req.json()

      if (window.localStorage.getItem('token')) {
        window.localStorage.removeItem('token')
      }

      window.localStorage.setItem('token', resp.secret.token)

      const claims = resp.public
      $session.claims = claims.claims

      const res = await axios.get(`http://localhost:5000/api/users/${claims.claims.user}`)
      $session.user = res.data
    } catch (err) {
      window.localStorage.removeItem('token')

      $session.claims = null
      $session.user = null

      // window.location = '/login'

      console.error(err)
    }

    showComponents = true
  }

  setContext('platform', platform)

  export let segment
</script>

{#if showComponents}
  <Nav {segment} user={$session.user} />

  <main>
    <slot />
  </main>
{/if}

<style>
  main {
    padding: 1% 2%;
    height: 100vh;
  }
</style>
