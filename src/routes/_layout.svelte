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
  import Nav from '../components/Nav.svelte'
  import { setContext } from 'svelte'
  import { create as createStore } from '../store/store'
  import { stores } from '@sapper/app'
  const { session, page } = stores()

  export let auth

  const IS_BROWSER = typeof window !== 'undefined'

  const storeData = {
    showMenu: true,
    auth: null,
  }

  let store = createStore(storeData)

  const platform = {
    store,
    showLoading: false,
  }

  setContext('platform', platform)

  export let segment
</script>

<div class="site-wrapper">
  <Nav {segment} {auth} />

  <main>
    <slot />
  </main>
</div>

<style>
  main {
    padding: 1% 2%;
    height: 100vh;
  }

  .site-wrapper {
    display: grid;
    grid-template-columns: 9fr 3fr;
  }
</style>
