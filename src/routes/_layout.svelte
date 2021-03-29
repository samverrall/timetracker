<script>
	import Nav from '../components/Nav.svelte';
	import { setContext } from 'svelte'

	import { create as createStore } from '../store/store'

	const storeData = {
		showMenu: true,
	}

	const store = createStore(storeData)

	setContext('store', store)

	export let segment;
</script>

<style>
	main {
		padding: 1% 2%;
		background: aliceblue;
		height: 100vh;
	}
</style>

<Nav {segment}/>

<main>
	<slot></slot>
</main>