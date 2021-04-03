<script context="module">
  export function preload(params, session) {
    if (!session) {
      return
    }

    if (session.claims && session.claims.user) {
      return this.redirect(200, '/')
    }
  }
</script>

<script>
  import LoginFrom from '../components/auth/LoginForm.svelte'
</script>

<LoginFrom />
