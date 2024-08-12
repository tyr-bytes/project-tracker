<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import { linksConfig } from '$lib/site/config';
	import { cn } from '$lib/utils';
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
			<a href="/daily">
				<Button class={cn('transition-colors hover:text-background/80')}>Start Tracking</Button>
			</a>
		</section>
	</div>
</main>
