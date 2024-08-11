<script lang="ts">
	import { page } from '$app/stores';
	import { Button } from '$lib/components/ui/button';
	import { linksConfig, siteConfig } from '$lib/site/config';
	import { cn } from '$lib/utils';
	import { Circle } from 'lucide-svelte';
	import Themetoggle from '../themetoggle.svelte';

	let navHidden = false;

	const mainNav = linksConfig.mainNav.filter((item) => !item.external);
</script>

<nav class={`nav top-0 -z-[-1] border-b bg-background p-2 ${navHidden ? 'opacity-0' : ''}`}>
	<div class="mx-auto flex w-full max-w-5xl items-center justify-between">
		<a href="/" class="nav-logo" aria-label="Home">
			<span class="hidden font-bold sm:inline-block">
				{siteConfig.title}
			</span>
		</a>

		<nav class="buttons flex items-center gap-2">
			<div class="flex items-center gap-2">
				{#each mainNav as trash}
					{#if trash.href}
						<a href={trash.href}>
							<Button
								variant="ghost"
								class={cn(
									'transition-colors hover:text-foreground/80',
									$page.url.pathname === trash.href ? 'text-foreground' : 'text-foreground/60'
								)}>{trash.title}</Button
							>
						</a>
					{/if}
				{/each}
				<Themetoggle />
			</div>
			<!-- {/if} -->
		</nav>
	</div>
</nav>
