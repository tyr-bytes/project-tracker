<script lang="ts">
	import '../app.css';
	import { ModeWatcher } from 'mode-watcher';

	let { children } = $props();
</script>

<ModeWatcher />

<div class="relative flex min-h-screen flex-col bg-background">
	{@render children?.()}
</div>
