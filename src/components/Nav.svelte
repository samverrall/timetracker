<nav class:minimized on:mouseover={() => { minimized = false }}>
	<span on:click={toggleMinimize} class="material-icons minimize-icon">
		{!minimized ? 'chevron_right' : 'chevron_left'}
	</span>

	<div class="top-menu">
		<a href="/" class:active={segment === undefined} class="material-icons">logout</a>
	</div>

	<div class="menu">
		<a href="/" class:active={segment === undefined} class="timer-link">Dashboard</a>
		<a href="/" class="timer-link">Data</a>
		<a href="/" class="timer-link">Config</a>
	</div>
	<div></div>
</nav>

<script>
	export let segment

	let minimized = false

	function toggleMinimize () {
		minimized = !minimized
	}
</script>

<style>
	nav {
		min-width: 300px;
		height: 100vh;
		font-weight: 300;
		padding: 1em 0;
		display: flex;
		flex-direction: column;
		background-color: #fcfcfc;
		position: fixed;
		right: 0;
		transition: all 0.3s ease-in-out;
		box-shadow: 0px 10px 10px rgba(0,0,0,0.2);
		z-index: 500;
	}

	.minimized {
		right: -270px;
	}

	.minimize-icon {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		left: -10px;
		background: var(--accent);
		cursor: pointer;
		border-radius: 100%;
		color: #fff;
	}

	.top-menu {
		border-bottom: 1px solid rgba(0,0,0,0.55);
	}

	.top-menu a {
		color: rgba(0,0,0,0.35);
	}

	.menu {
		display: flex;
		flex-direction: column;
	}

	a {
		color: rgba(0,0,0,0.65);
		font-weight: 400;
		padding: 1em;
		transition: all 0.3s ease-in-out;
		background: transparent;
	}

	.active {
		color: var(--accent);
	}
</style>