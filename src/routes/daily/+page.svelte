<script lang="ts">
	import Check from 'lucide-svelte/icons/check';
	import ChevronsUpDown from 'lucide-svelte/icons/chevrons-up-down';
	import { tick } from 'svelte';
	import * as Command from '$lib/components/ui/command/index.js';
	import * as Popover from '$lib/components/ui/popover/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { cn } from '$lib/utils.js';
	import TimerTable from '$lib/components/ui/timerTable.svelte';
	import { formatDate } from '$lib/site/dateutils.js';
	import { CirclePlus, Play } from 'lucide-svelte';

	const currentDate = formatDate(new Date(Date.now()).toUTCString());
	// TODO: Better TIme Library
	const weekEnding = formatDate(new Date(Date.now()).toUTCString());

	// We want to refocus the trigger button when the user selects
	// an item from the list so users can continue navigating the
	// rest of the form with the keyboard.

	let { data } = $props();

	const new_options = $state(
		data.projects.map((p) => ({
			value: p.id,
			label: `${p.name} (${p.project_code})`
		}))
	);

	$effect(() => console.log(new_options.length));

	console.log(new_options);
</script>

<div class="mb-2 flex flex-col items-center justify-center">
	<div class="text-4x1 font-bold">
		{currentDate}
	</div>
	<div class="text-sm">Week Ending: {weekEnding}</div>
	<Button variant="outline" size="sm">Import from yesterday?</Button>
</div>

<div class="mx-auto flex flex-col items-center justify-center">
	<div class="w-full max-w-3xl rounded-lg bg-secondary p-6 shadow-md">
		<span class="font-semibold">Project Search</span>
		<div class="flex items-center justify-center">
			<!-- <Popover.Root bind:open let:ids>
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
						{#key new_options}
							<Command.Group>
								{#each new_options as _, i}
									<Command.Item
										value={new_options[i].value}
										onSelect={(currentValue) => {
											value = currentValue;
											closeAndFocusTrigger(ids.trigger);
										}}
									>
										<Check
											class={cn(
												'mr-2 h-4 w-4',
												value !== new_options[i].value && 'text-transparent'
											)}
										/>
										{new_options[i].label}
									</Command.Item>
								{/each}
							</Command.Group>
						{/key}
					</Command.Root>
				</Popover.Content>
			</Popover.Root> -->
			<Button variant="outline" class="gap-2">
				<CirclePlus class="h-3.5 w-3.5" />
				Add Project
			</Button>
		</div>

		<TimerTable stuff={data.projects}></TimerTable>
	</div>
</div>
