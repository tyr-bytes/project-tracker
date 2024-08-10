<script lang="ts">
	import Check from 'lucide-svelte/icons/check';
	import ChevronsUpDown from 'lucide-svelte/icons/chevrons-up-down';
	import { tick } from 'svelte';
	import * as Command from '$lib/components/ui/ui/command/index.js';
	import * as Popover from '$lib/components/ui/ui/popover/index.js';
	import { Button } from '$lib/components/ui/ui/button/index.js';
	import { cn } from '$lib/utils.js';
	import TimerTable from '$lib/components/ui/ui/timerTable.svelte';

	const frameworks = [
		{
			value: 'sveltekit',
			label: 'SvelteKit'
		},
		{
			value: 'next.js',
			label: 'Next.js'
		},
		{
			value: 'nuxt.js',
			label: 'Nuxt.js'
		},
		{
			value: 'remix',
			label: 'Remix'
		},
		{
			value: 'astro',
			label: 'Astro'
		}
	];

	let open = $state(false);
	let value = $state('');

	let selectedValue = $derived(
		frameworks.find((f) => f.value === value)?.label ?? 'Select a timecode...'
	);

	// We want to refocus the trigger button when the user selects
	// an item from the list so users can continue navigating the
	// rest of the form with the keyboard.
	function closeAndFocusTrigger(triggerId: string) {
		open = false;
		tick().then(() => {
			document.getElementById(triggerId)?.focus();
		});
	}

	let { data } = $props();

	console.log(data);
</script>

<div class="flex flex-col items-center justify-center">
	<div class="w-full max-w-3xl rounded-lg bg-secondary p-6 shadow-md">
		<div class="font-semibold">Project Search</div>
		<Popover.Root bind:open let:ids>
			<Popover.Trigger asChild let:builder>
				<Button
					builders={[builder]}
					variant="outline"
					role="combobox"
					aria-expanded={open}
					class="w-[200px] justify-between"
				>
					{selectedValue}
					<ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
				</Button>
			</Popover.Trigger>
			<Popover.Content class="w-[200px] p-0">
				<Command.Root>
					<Command.Input placeholder="Search time codes..." />
					<Command.Empty>No timecode found.</Command.Empty>
					<Command.Group>
						{#each frameworks as framework}
							<Command.Item
								value={framework.value}
								onSelect={(currentValue) => {
									value = currentValue;
									closeAndFocusTrigger(ids.trigger);
								}}
							>
								<Check
									class={cn('mr-2 h-4 w-4', value !== framework.value && 'text-transparent')}
								/>
								{framework.label}
							</Command.Item>
						{/each}
					</Command.Group>
				</Command.Root>
			</Popover.Content>
		</Popover.Root>
		<TimerTable stuff={data.projects}></TimerTable>
	</div>
</div>
