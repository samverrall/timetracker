<script>
  import { getContext } from 'svelte'
  import axios from 'axios'
  import { goto } from '@sapper/app'

  const platform = getContext('platform')
  const { store } = platform

  $store.showMenu = false

  let user = {
    email: '',
    name: '',
    password: '',
  }
  let error = false

  async function submitForm(e) {
    e.preventDefault()

    error = false

    if (!user.email || !user.name || !user.password) {
      error = true
    }

    if (error) {
      return
    }

    try {
      const createdUser = await axios.post('http://localhost:5000/api/users', user)

      if (createdUser) {
        goto('/login?sign-up=success')
      }
    } catch (err) {
      error = true

      console.error(err)
    }
  }
</script>

<div class="fullscreen-wrapper">
  <form on:submit={submitForm} class="input-form">
    <h3>✏️ Register</h3>
    <p>Please make an account to get access 🚀</p>

    <div class="group">
      <label for="email-field">Email</label>
      <input bind:value={user.email} id="email-field" type="text" placeholder="example@email.co.uk" />
    </div>

    <div class="group">
      <label for="name-field">Name</label>
      <input bind:value={user.name} id="name-field" type="text" placeholder="John Doe" />
    </div>

    <div class="group">
      <label for="password-field">Password</label>
      <input
        autocomplete="new-password"
        bind:value={user.password}
        id="password-field"
        type="password"
        placeholder="password..."
      />
    </div>

    <p>Already have an account? <a href="/login">Login</a>.</p>

    {#if error}
      <p class="error">Something went wrong ❌</p>
    {/if}

    <button>Register</button>
  </form>
</div>

<style>
  button {
    margin-left: 0;
  }
</style>
