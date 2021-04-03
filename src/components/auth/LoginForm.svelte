<script>
  import { getContext } from 'svelte'
  import { onMount, onDestroy } from 'svelte'
  import AlertBox from '../AlertBox.svelte'
  import axios from 'axios'
  import { stores, goto } from '@sapper/app'
  const { session, page } = stores()

  const platform = getContext('platform')
  const { store } = platform

  $store.showMenu = false

  let user = {
    email: '',
    password: '',
  }
  let error = false
  let showSignUpMessage = false

  onMount(() => {
    const urlParams = new URLSearchParams(window.location.search)

    if (urlParams.get('sign-up')) {
      showSignUpMessage = true
    }
  })

  onDestroy(() => {
    const urlParams = new URLSearchParams()

    urlParams.delete('sign-up')
  })

  async function submitForm() {
    if (!$session) {
      $session = {}
    }

    error = false

    if (!user.email || !user.password) {
      error = true
    }

    if (error) {
      return
    }

    try {
      const authorisedUser = await axios.post('http://localhost:5000/api/auth/login', user)

      if (authorisedUser.data) {
        if (localStorage.getItem('token')) {
          localStorage.removeItem('token')
        }

        localStorage.setItem('token', authorisedUser.data.secret.token)

        delete authorisedUser.data.secret

        $session.claims = authorisedUser.data.public.claims

        const user = await axios.get(`http://localhost:5000/api/users/${$session.claims.user}`)

        $session.user = user.data

        $store.showMenu = true

        goto('/')
      }
    } catch (err) {
      console.error(err)
    }
  }
</script>

<div class="fullscreen-wrapper">
  {#if showSignUpMessage}
    <AlertBox isSuccess={true} heading="Successfully registered 🥳" message="You can now login!" />
  {/if}

  <form on:submit|preventDefault={submitForm} class="input-form">
    <h3>✏️ Login</h3>
    <p>Login to access your data. 🚀</p>

    <div class="group">
      <label for="email-field">Email</label>
      <input bind:value={user.email} id="email-field" type="text" placeholder="example@email.co.uk" />
    </div>

    <div class="group">
      <label for="password-field">Password</label>
      <input bind:value={user.password} id="password-field" type="password" placeholder="password..." />
    </div>

    <p>Don't have an account? <a href="/register">Register</a>.</p>

    <button>Login</button>
  </form>
</div>

<style>
  button {
    margin-left: 0;
  }
</style>
