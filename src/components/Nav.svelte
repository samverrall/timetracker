<script>
  import { getContext } from 'svelte'
  import { stores, goto } from '@sapper/app'
  import MenuItem from './ui/MenuItem.svelte'
  import Cookies from 'js-cookie'

  export let segment
  export let auth

  const { session, page } = stores()

  const platform = getContext('platform')
  const { store } = platform

  function logout() {
    Cookies.remove('token')

    $session.auth = null
    $session.token = false

    window.location = '/login'
  }
</script>

{#if $store.showMenu}
  <nav>
    <div class="top-menu">
      {#if auth || $session.auth}
        <button on:click|preventDefault={logout} class="login-btn logout-btn material-icons">logout</button>
      {:else}
        <a href="/login" class="btn material-icons">login</a>
      {/if}
      <button data-tooltip="Toggle darkmode" class="top-menu-btn material-icons">dark_mode</button>
      <button data-tooltip="Notifications" class="top-menu-btn material-icons">notifications</button>
    </div>

    <div class="menu">
      <MenuItem href="/" name="Dashboard" icon="dashboard" active={segment === undefined} />
      <MenuItem href="/analytics" name="Analytics" icon="analytics" active={segment === 'analytics'} />
      <MenuItem href="/config" name="Config" icon="settings" {segment} />
      {#if auth || $session.auth}
        <MenuItem href="/my-account" name="My Account" icon="manage_accounts" active={segment === 'my-account'} />
      {/if}

      {#if $session.auth && platform.user.hasRole($session.auth.user, 'admin')}
        <MenuItem href="/admin" name="Admin" icon="admin_panel_settings" acitve={segment === 'admin'} />
      {/if}
    </div>
  </nav>
{/if}

<style>
  nav {
    min-width: 300px;
    height: 100vh;
    font-weight: 300;
    padding: 0 0 0 0;
    display: flex;
    flex-direction: column;
    background-color: var(--background-60);
    border-left: 1px solid var(--border-dark);
    position: fixed;
    right: 0;
    top: 0;
    transition: all 0.3s ease-in-out;
    box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.1);
    z-index: 500;
  }

  .minimized {
    right: -270px;
  }

  /* .minimize-icon {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: -10px;
    background: var(--accent);
    cursor: pointer;
    border-radius: 100%;
    color: #fff;
  } */

  .top-menu {
    border-bottom: 1px solid var(--border-gray);
    padding: 0.75rem 1.2rem;
    display: flex;
    align-items: flex-end;
    flex-direction: row-reverse;
  }

  .top-menu button {
    margin: 0 10px 0 0;
  }

  .menu {
    display: flex;
    flex-direction: column;
    padding: 2rem 0;
  }

  nav .menu :global(a) {
    color: var(--text);
    font-weight: 600;
    font-size: 1.2rem;
    font-family: Poppins;
    padding: 0.3em 1em;
    transition: all 0.3s ease-in-out;
    background: transparent;
  }

  .login-btn {
    background: none;
    color: var(--text);
  }

  .logout-btn {
    background: rgb(189, 49, 49);
    color: var(--text);
  }

  .logout-btn:hover {
    background: rgb(157, 40, 40);
  }

  .top-menu-btn {
    background: var(--button-gray);
    color: var(--background-60);
  }
</style>
