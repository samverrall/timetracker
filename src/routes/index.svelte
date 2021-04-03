<script context="module">
  export function preload(params, session) {
    if (!session) {
      return
    }

    if (session.user) {
      return { user: session.user }
    }
  }
</script>

<script>
  import Timer from '../components/Timer.svelte'
  import { stores } from '@sapper/app'
  const { session, page } = stores()

  export let user

  function isAfternoon() {
    const curHr = new Date().getHours()

    if (curHr > 12) {
      return true
    }

    return false
  }
</script>

<div class="container">
  <h1>Dashboard</h1>
  <!-- <p>Good {isAfternoon() ? 'afternoon' : 'morning'}, {user ? user.name : 'human'}! 🌥</p> -->

  <div class="cols">
    <div class="col-1">
      <Timer />
    </div>
    <div class="col-2" />
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
    display: grid;
    grid-template-columns: 4fr 4fr;
  }
</style>
