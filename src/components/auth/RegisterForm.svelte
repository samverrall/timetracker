<div class="fullscreen-wrapper">
  <form on:submit={submitForm} class="input-form">
    <h3>✏️ Register</h3>
    <p>Please make an account to get access 🚀</p>

    <div class="group">
      <label for="email-field">Email</label>
      <input bind:this={user.email} id="email-field" type="text" placeholder="example@email.co.uk" />
    </div>

    <div class="group">
      <label for="name-field">Name</label>
      <input bind:this={user.name} id="name-field" type="text" placeholder="John Doe" />
    </div>

    <div class="group">
      <label for="password-field">Password</label>
      <input bind:this={user.password}  id="password-field" type="password" placeholder="password..." />
    </div>

    <p>Already have an account? <a href="/login">Login</a>.</p>

    <button>Register</button>
  </form>
</div>


<script>
  import { getContext } from 'svelte'

  const store = getContext('store')
  $store.showMenu = false

  let user = {
    email: '',
    name: '',
    password: '',
  }
  let error = false

  function submitForm (e) {
    e.preventDefault()

    error = false

    if (!user.email || !user.name || !user.password) {
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

  .fullscreen-wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>