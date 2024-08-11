<script lang="ts">
	import Nav from '$lib/components/ui/nav/nav.svelte';
	import { ModeWatcher } from 'mode-watcher';
	import '../app.css';
	import { siteConfig } from '$lib/site/config';

	let { children } = $props();
</script>

<ModeWatcher />
<div class="flex min-h-screen flex-col">
	<Nav />
	<main class="overflowx-x-clip mx-auto w-full max-w-5xl flex-grow px-2 py-5">
		{@render children?.()}
	</main>
	<footer class="p-4 text-center">
		<div>&copy; 2024 {siteConfig.title}</div>
		<div class="text-muted-foreground">{siteConfig.description}</div>
	</footer>
</div>
