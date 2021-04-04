<script context="module">
  export function preload(params, session) {
    if (!session.auth) {
      return {
        auth: null,
      }
    }

    return {
      auth: session.auth,
    }
  }
</script>

<script>
  import AlertBox from '../components/AlertBox.svelte'
  import MyAccountFrom from '../components/auth/MyAccountForm.svelte'
  import { stores } from '@sapper/app'
  const { session } = stores()

  export let auth
</script>

{#if !auth}
  <AlertBox
    isSuccess={false}
    isError={true}
    heading="You need to login."
    message="To access your account please login."
  />
{:else}
  <h1>Manage your account 👀</h1>

  <div class="grid">
    <MyAccountFrom user={auth.user} />
  </div>
{/if}
