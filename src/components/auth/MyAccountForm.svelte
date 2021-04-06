<script>
  import { getContext } from 'svelte'
  import { stores } from '@sapper/app'
  import ConfirmModal from '../ConfirmModal.svelte'

  export let user = {}

  const { session } = stores()
  const platform = getContext('platform')

  let showConfirmModal = false

  let editedUser = JSON.parse(JSON.stringify(user))

  async function updateAccount() {
    try {
      const res = await platform.fetch('http://localhost:5000/api/users', {
        method: 'POST',
        body: JSON.stringify(editedUser),
      })

      const updatedUser = await res.json()

      $session.auth.user = updatedUser
    } catch (error) {
      console.error('Updating account', error)
    }
  }

  function deleteAccountAlert() {
    showConfirmModal = !showConfirmModal
  }
</script>

<ConfirmModal
  heading="Are you sure you want to delete your account?"
  message="You can not undo this, and you will lose all of your data."
  show={showConfirmModal}
  on:cancel={deleteAccountAlert}
/>

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
  <button on:click={deleteAccountAlert} class="red-btn">Delete account</button>
</div>

<style>
  .form-wrapper {
    max-width: 450px;
  }
</style>
