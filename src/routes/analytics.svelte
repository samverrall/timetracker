<script context="module">
  export async function preload(params, session) {
    if (!session) {
      return
    }

    let data = []

    if (session.auth && session.auth.user) {
      try {
        const res = await this.fetch(`http://localhost:5000/api/timelogs`, {
          headers: {
            authorization: `Bearer ${session.auth.token}`,
          },
        })

        data = await res.json()
      } catch (error) {
        data = []

        console.error(error)
      }
    }

    return {
      auth: session.auth,
      data: data || [],
    }
  }
</script>

<script>
  import Chart from '../components/Chart.svelte'

  export let auth
  export let data = []
</script>

<svelte:head>
  <title>Analytics | TimeTracker.io</title>
</svelte:head>

<h1>Analytics</h1>
<p>Check on your performance among other data 🥳</p>

<Chart {data} />
