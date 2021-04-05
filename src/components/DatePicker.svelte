<script>
  import flatpickr from 'flatpickr'
  import { onMount, createEventDispatcher } from 'svelte'
  import 'flatpickr/dist/themes/dark.css'

  export let value

  const dispatch = createEventDispatcher()

  let input
  let active = false

  onMount(() => {
    flatpickr(input, {
      dateFormat: 'l J F',
      onChange: handleDateChange,
    })
  })

  function handleDateChange(date) {
    dispatch('change', date[0])
  }
</script>

<button
  on:focus={() => {
    active = !active
  }}
  bind:this={input}
  class="material-icons"
  class:active>date_range</button
>

<!-- <input type="text" bind:value bind:this={input} /> -->
<style>
  button {
    background: none;
    font-size: 1.2rem;
  }

  .active,
  button:hover {
    background: var(--background-60);
  }
</style>
