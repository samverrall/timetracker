<script>
  export let href = ''
  export let name = ''
  export let icon = ''
  export let active
</script>

<div class="menu-item">
  <a {href} class:active class="timer-link"> <span class="material-icons">{icon}</span>{name}</a>
</div>

<style>
  .menu-item {
    display: flex;
    align-items: center;
    padding: 0 1rem;
    margin-bottom: 0.75rem;
    transition: 0.3s ease-in-out;
  }

  .menu-item a:hover {
    background: var(--background);
    border-radius: 2rem;
  }

  a {
    display: flex;
    align-items: center;
  }

  a span {
    margin-right: 1.2rem;
  }

  .active {
    color: var(--accent);
  }
</style>
