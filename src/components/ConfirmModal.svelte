<script>
  import { createEventDispatcher } from 'svelte'

  export let heading = ''
  export let message = ''
  export let show = false

  const dispatch = createEventDispatcher()
</script>

<div class="confirm-modal" class:show>
  <div class="confirm-modal-wrapper">
    <h3>{heading}</h3>
    <p>{message}</p>
  </div>
  <div class="confirm-modal-footer">
    <button class="cancel-btn" on:click={() => dispatch('cancel')}>Cancel</button>
    <button class="red-btn" on:click={() => dispatch('confirm')}>Confirm</button>
  </div>
</div>

<div class="confirm-modal-bg" class:show />

<style>
  .confirm-modal {
    background: var(--background);
    border-radius: 1rem;
    width: 400px;
    box-shadow: 0px 0px 4px var(--text);
    position: fixed;
    top: 40%;
    left: 50%;
    transform: translate(-60%, -50%);
    transition: 0.3s ease-in-out;
    opacity: 0;
    pointer-events: none;
    z-index: 10;
  }

  .confirm-modal-bg {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.2);
    backdrop-filter: blur(2px);
    opacity: 0;
    pointer-events: none;
    z-index: 9;
  }

  .confirm-modal-bg.show,
  .confirm-modal.show {
    opacity: 1;
    pointer-events: all;
  }

  .confirm-modal-wrapper {
    padding: 1rem;
  }

  .confirm-modal-footer {
    background: var(--background-60);
    display: flex;
    justify-content: flex-end;
    padding: 0.6rem 1rem;
    border-radius: 0px 0px 1rem 1rem;
  }

  .cancel-btn {
    background: var(--button-gray);
  }
</style>
