<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';

	let companyName = 'TechCorp';
	let tagline = 'Innovating for Tomorrow';
	let ctaText = 'Get Started';

	function handleCTA() {
		alert("Thanks for your interest! This is where you'd handle the CTA.");
	}
</script>

<main class="flex min-h-screen flex-col font-sans">
	<div class="flex-grow">
		<section class="container mx-auto py-20 text-center">
			<h2 class="mb-4 text-4xl font-bold">{tagline}</h2>
			<p class="mb-8 text-xl">Welcome to my dumb app</p>
			<Button onclick={handleCTA} class="rounded px-4 py-2 font-bold">
				{ctaText}
			</Button>
		</section>
	</div>
</main>

<style>
	:global(body) {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}
</style>
