<script lang="ts">
	import Nav from '$lib/components/ui/ui/nav/nav.svelte';
	import '../app.css';
	import { ModeWatcher } from 'mode-watcher';

	let { children } = $props();
</script>

<ModeWatcher />
<div class="flex min-h-screen flex-col">
	<Nav />
	<main class="overflowx-x-clip mx-auto w-full max-w-5xl flex-grow px-2 py-5">
		{@render children?.()}
	</main>
</div>

<style>
	html,
	body {
		height: 100%;
		margin: 0;
		padding: 0;
	}
</style>
