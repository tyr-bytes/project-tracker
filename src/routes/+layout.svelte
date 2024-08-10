<script lang="ts">
	import Nav from '$lib/components/ui/ui/nav/nav.svelte';
	import '../app.css';
	import { ModeWatcher } from 'mode-watcher';

	let { children } = $props();
</script>

<ModeWatcher />

<Nav />
<div class="relative flex min-h-screen flex-col">
	{@render children?.()}
</div>
