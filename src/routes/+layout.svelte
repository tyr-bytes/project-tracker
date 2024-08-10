<script lang="ts">
	import Nav from '$lib/components/ui/ui/nav/nav.svelte';
	import '../app.css';
	import { ModeWatcher } from 'mode-watcher';

	let { children } = $props();
</script>

<ModeWatcher />
<Nav />
<div class="flex-1">
	{@render children?.()}
</div>
