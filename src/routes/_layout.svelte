<script>
	import Nav from '../components/Nav.svelte';

	export let segment;
</script>

<style>
	main {
		padding: 1% 2%;
		background: aliceblue;
	}
</style>

<Nav {segment}/>

<main>
	<slot></slot>
</main>