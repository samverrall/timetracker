<script>
  import AlertBox from '../components/AlertBox.svelte'
  import MyAccountFrom from '../components/auth/MyAccountForm.svelte'
  import { stores } from '@sapper/app'
  const { session } = stores()
</script>

{#if !$session || !$session.user}
  <AlertBox
    isSuccess={false}
    isError={true}
    heading="You need to login."
    message="To access your account please login."
  />
{:else}
  <h1>Manage your account 👀</h1>

  <div class="grid">
    <MyAccountFrom user={$session.user} />
  </div>
{/if}
