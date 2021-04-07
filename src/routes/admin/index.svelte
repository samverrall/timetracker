<script context="module">
  export async function preload(params, session) {
    if (!session) {
      return this.redirect(200, '/')
    }

    return {
      auth: session.auth,
    }
  }
</script>

<script>
  import UserTable from '../../components/admin/UserTable.svelte'

  export let auth

  let activeFilter = 'users'

  function setActiveFilter(filer) {
    activeFilter = filter
  }
</script>

<h1>Admin</h1>

<div class="filters">
  <button class:active={activeFilter === 'users'} class="filter-card">Users</button>
  <button class="filter-card">Roles</button>
  <button class="filter-card">Payments</button>
</div>

<div class="admin-wrapper">
  <UserTable />
</div>

<style>
  .admin-wrapper {
    height: 85vh;
    width: 100%;
  }

  .filter-card {
    background: rgba(128, 128, 128, 0.25);
    border-radius: 1.25rem;
    padding: 0.6rem 1rem;
    border: 1px solid rgba(128, 128, 128, 0.25);
  }

  .filter-card.active {
    border: 1px solid var(--accent);
    background: rgba(128, 128, 128, 0.35);
  }

  .filter-card:hover {
    background: rgba(128, 128, 128, 0.35);
    border: 1px solid var(--border-gray);
  }
</style>
