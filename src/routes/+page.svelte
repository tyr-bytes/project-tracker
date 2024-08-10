<script lang="ts">
	import { siteConfig } from '$lib/site/config';
	let { data } = $props();
</script>

<svelte:head>
	<title>{siteConfig.title}</title>
	<meta content={siteConfig.description} name="description" />
</svelte:head>
<div class="grid grid-cols-1 gap-6 p-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
	{#each data.stuff as thing}
		<div>{thing.title}</div>
	{/each}
</div>
