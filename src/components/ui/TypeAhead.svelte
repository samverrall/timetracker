<script>
  import { createEventDispatcher } from 'svelte'

  const dispatch = createEventDispatcher()

  export let data = []
  export let key = ''
  export let placeholder = ''
  export let classNames = []

  let searchTerm = ''
  let dropDownVals = []

  $: if (searchTerm.length > 0) {
    searchData(searchTerm)
  } else {
    dropDownVals = []
  }

  function searchData(searchTerm) {
    if (!searchTerm) {
      return
    }

    searchTerm = searchTerm.toLowerCase()

    const filtered = data.filter(d => d[key])

    if (filtered) {
      const searchFiltered = filtered.map(d => d[key].toLowerCase()).filter(d => d.includes(searchTerm))

      if (searchFiltered) {
        dropDownVals = [...new Set(searchFiltered)]
      }
    }
  }
</script>

<div class="typeahead {classNames.join(' ')}">
  <input {placeholder} type="text" on:input={e => dispatch('val', searchTerm)} bind:value={searchTerm} />

  {#if dropDownVals.length}
    <div class="results">
      {#each dropDownVals as val, index}
        <div class="result">{val}</div>
      {/each}
    </div>
  {/if}
</div>

<style>
  .typeahead {
    width: 100%;
    position: relative;
  }

  .typeahead input {
    width: 100%;
  }

  .typeahead .results {
    width: 100%;
    color: var(--text);
    position: absolute;
    z-index: 3;
  }

  .result {
    padding: 0.3rem 0.6rem;
    cursor: pointer;
    background: var(--background-60);
    transition: 0.3s ease-in-out background;
  }

  .result:hover {
    background: var(--accent);
  }
</style>
