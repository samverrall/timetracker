<script>
  import axios from 'axios'

  export let user = {}

  let editedUser = JSON.parse(JSON.stringify(user))

  async function updateAccount() {
    try {
      const res = await axios.post('http://localhost:5000', {})
    } catch (error) {
      console.error('Updating account', error)
    }
  }
</script>

<h2>Account details</h2>
<p>Update your account details.</p>

<div class="form-wrapper">
  <div class="group">
    <label for="email-field">Email</label>
    <input bind:value={editedUser.email} id="email-field" type="text" placeholder="example@email.co.uk" />
  </div>

  <div class="group">
    <label for="name-field">Name</label>
    <input bind:value={editedUser.name} id="name-field" type="text" placeholder="John Doe" />
  </div>

  <button on:click={updateAccount}>Update acccount</button>
  <button class="red-btn">Delete account</button>
</div>

<style>
  .form-wrapper {
    max-width: 450px;
  }
</style>
