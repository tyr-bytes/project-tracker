<script lang="ts">
	import Nav from '$lib/components/ui/ui/nav/nav.svelte';
	import { ModeWatcher } from 'mode-watcher';
	import '../app.css';

	let { children } = $props();
</script>

<ModeWatcher />
<div class="flex min-h-screen flex-col">
	<Nav />
	<main class="overflowx-x-clip mx-auto w-full max-w-5xl flex-grow px-2 py-5">
		{@render children?.()}
	</main>
</div>
