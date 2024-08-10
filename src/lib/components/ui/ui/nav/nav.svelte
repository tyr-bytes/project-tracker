<script lang="ts">
	import { page } from '$app/stores';
	import { Button } from '$lib/components/ui/ui/button';
	import { siteConfig } from '$lib/site/config';
	import { cn } from '$lib/utils';

	let navHidden = false;
</script>

<nav class={`nav sticky top-0 -z-[-1] border-b bg-background p-2 ${navHidden ? 'opacity-0' : ''}`}>
	<div class="mx-auto flex w-full max-w-5xl items-center justify-between">
		<a href="/" class="nav-logo" aria-label="Home">
			<span class="hidden font-bold sm:inline-block">
				{siteConfig.title}
			</span>
		</a>

		<nav class="buttons flex items-center gap-2">
			<div class="flex items-center gap-2">
				<a href="/">
					<Button
						variant="ghost"
						class={cn(
							'transition-colors hover:text-foreground/80',
							$page.url.pathname === '/' ? 'text-foreground' : 'text-foreground/60'
						)}>login</Button
					>
				</a>
				<a href="/auth/register">
					<Button
						variant="ghost"
						class={cn(
							'transition-colors hover:text-foreground/80',
							$page.url.pathname === '/auth/register' ? 'text-foreground' : 'text-foreground/60'
						)}>register</Button
					>
				</a>
				<a href="/daily">
					<Button
						variant="ghost"
						class={cn(
							'transition-colors hover:text-foreground/80',
							$page.url.pathname === '/daily' ? 'text-foreground' : 'text-foreground/60'
						)}>daily</Button
					>
				</a>
			</div>
			<!-- {/if} -->
		</nav>
	</div>
</nav>
