<div class="container">
	<p>Good {isAfternoon() ? 'afternoon' : 'morning'}, Sam! 🌥</p>

	<div class="cols">
		<div class="col-1">
			<Timer />
		</div>
		<div class="col-2">
		</div>
	</div>
</div>

<script>
	import Timer from '../components/Timer.svelte'

	function isAfternoon () {
		const curHr = new Date().getHours()

		if (curHr > 12) {
			return true
		}

		return false
	}
</script>

<svelte:head>
	<title>TimeTracker.io 🕦</title>
</svelte:head>

<style>
	.container {
		width: 100%;
		height: 100vh;
	}

	.cols {
		width: 100%;
		display: grid;
		grid-template-columns: 4fr 4fr;
	}
</style>