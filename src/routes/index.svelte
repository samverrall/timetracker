<script context="module">
  export function preload(params, session) {
    if (!session) {
      return
    }

    if (session.auth) {
      return { auth: session.auth }
    }
  }
</script>

<script>
  import Timer from '../components/Timer.svelte'
  import { stores } from '@sapper/app'
  const { session, page } = stores()

  export let auth
</script>

<div class="container">
  <h1>Dashboard</h1>

  <div class="cols">
    <Timer auth={$session.auth || auth} />
  </div>
</div>

<svelte:head>
  <title>TimeTracker.io 🕦</title>
</svelte:head>

<style>
  .container {
    width: 100%;
    height: 100vh;
  }

  .cols {
    width: 100%;
  }
</style>
