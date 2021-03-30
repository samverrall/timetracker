<div class="fullscreen-wrapper">
  <form on:submit={submitForm} class="input-form">
    <h3>✏️ Login</h3>
    <p>Login to access your data. 🚀</p>

    <div class="group">
      <label for="email-field">Email</label>
      <input bind:this={user.email} id="email-field" type="text" placeholder="example@email.co.uk" />
    </div>

    <div class="group">
      <label for="password-field">Password</label>
      <input bind:this={user.password}  id="password-field" type="password" placeholder="password..." />
    </div>

    <p>Don't have an account? <a href="/register">Register</a>.</p>

    <button>Login</button>
  </form>
</div>

<script>
  import { getContext } from 'svelte'

  const store = getContext('store')
  $store.showMenu = false

  let user = {
    email: '',
    password: '',
  }
  let error = false

  function submitForm (e) {
    e.preventDefault()

    error = false

    if (!user.email || !user.password) {
      error = true
    }

    if (error) {
      return
    }

    try {
    } catch (err) {
      console.error(err)
    }
  }
</script>

<style>
  button {
    margin-left: 0;
  }
</style>