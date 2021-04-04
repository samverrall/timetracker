<script context="module">
  export function preload(params, session) {
    if (session.auth) {
      return this.redirect(200, '/')
    }
  }
</script>

<script>
  import RegisterForm from '../components/auth/RegisterForm.svelte'
</script>

<RegisterForm />
