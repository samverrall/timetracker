<script context="module">
  export function preload(params, session) {
    if (session.auth) {
      return this.redirect(200, '/')
    }
  }
</script>

<script>
  import LoginFrom from '../components/auth/LoginForm.svelte'
</script>

<LoginFrom />
