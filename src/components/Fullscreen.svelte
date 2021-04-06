<script>
  export let active = false

  function toggleFullscreen() {
    active = !active
  }
</script>

<div class="full-screen" class:active>
  {#if active}
    <div class="full-screen-toggles">
      <button data-tooltip="Exit full-screen" class="red-btn material-icons" on:click={toggleFullscreen}>close</button>
    </div>
  {/if}

  <div class="full-screen-inner">
    {#if !active}
      <button data-tooltip="Toggle full-screen" class="material-icons expand-btn" on:click={toggleFullscreen}
        >aspect_ratio</button
      >
    {/if}
    <slot />
  </div>
</div>

{#if active}
  <div class="full-screen-bg" />
{/if}

<style>
  .full-screen {
    position: relative;
  }

  .full-screen-bg {
    width: 100%;
    height: 100vh;
    left: 0;
    top: 0;
    background: rgba(0, 0, 0, 0.4);
    backdrop-filter: blur(2px);
    position: fixed;
    z-index: 450;
  }

  :global(.full-screen.active) {
    width: 100%;
    max-width: 75vw;
    height: 100vh;
    position: fixed !important;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 500;
    display: flex;
    align-items: center;
  }

  .full-screen-inner {
    width: 100%;
    height: 100%;
  }

  .full-screen.active .full-screen-inner {
    height: 75vh;
  }

  :global(.full-screen.active .full-screen-inner > *) {
    width: 100%;
    height: 75vh;
  }

  .full-screen-toggles {
    height: 75vh;
    width: 100%;
    position: absolute;
    padding: 1rem;
  }

  .full-screen-toggles button {
    position: absolute;
    right: 0px;
    top: 0px;
  }

  .expand-btn {
    position: absolute;
    right: 3rem;
    top: 0.7rem;
    z-index: 2;
    font-size: 1.25rem;
    padding: 0.2rem;
    background: none;
    border-radius: 100%;
    color: var(--text);
    transition: 0.3s ease-in-out;
  }

  .red-btn:hover,
  .expand-btn:hover {
    background: var(--background-60);
  }

  .red-btn {
    background: none;
    color: var(--red);
    padding: 0.2rem;
  }
</style>
