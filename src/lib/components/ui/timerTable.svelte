<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.js';
	import * as Table from '$lib/components/ui/table/index.js';
	import { Badge } from '$lib/components/ui/badge/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import type { Project } from '$lib/types';
	import { formatSeconds } from '$lib/site/dateutils';
	import { Trash2, Play, Pause, XCircle } from 'lucide-svelte';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import Ellipsis from 'lucide-svelte/icons/ellipsis';

	type Props = {
		stuff: Project[];
	};

	let { stuff }: Props = $props();

	let activeProject = $state<number | null>(null);

	function toggleProject(index: number) {
		if (activeProject === index) {
			activeProject = null;
		} else {
			activeProject = index;
		}
	}
</script>

<!-- Content -->
<Card.Root>
	<Card.Header class="px-7">
		<Card.Title class="text-sm font-medium leading-none">Projects</Card.Title>
		<Card.Description>Your projects for the day.</Card.Description>
	</Card.Header>
	<Card.Content>
		<Table.Root>
			<Table.Header>
				<Table.Row>
					<Table.Head>Project</Table.Head>
					<Table.Head class="hidden sm:table-cell">Description</Table.Head>
					<Table.Head class="hidden sm:table-cell">Time Elapsed</Table.Head>
					<Table.Head class="">Start/Stop</Table.Head>
					<Table.Head>
						<span class="sr-only">Actions</span>
					</Table.Head>
				</Table.Row>
			</Table.Header>
			<Table.Body>
				{#each stuff as row, i}
					<Table.Row>
						<Table.Cell>
							<div class="font-medium">{row.name}</div>
							<div class="hidden text-sm text-muted-foreground md:inline">
								Code: {row.project_code}
							</div>
						</Table.Cell>
						<Table.Cell class="hidden sm:table-cell">
							<Badge class="text-xs" variant="secondary">{row.description}</Badge>
						</Table.Cell>
						<Table.Cell class="text-s hidden sm:table-cell">
							{formatSeconds(row.timeSpent)}
						</Table.Cell>
						<Table.Cell>
							<div class="flex items-center space-x-2">
								<Button
									variant="ghost"
									size="icon"
									on:click={() => toggleProject(i)}
									class={activeProject === i
										? 'animate-pulse bg-primary text-primary-foreground hover:bg-secondary hover:text-secondary-foreground'
										: 'hover:bg-secondary hover:text-secondary-foreground'}
								>
									{#if activeProject === i}
										<Pause class="h-4 w-4" />
									{:else}
										<Play class="h-4 w-4" />
									{/if}
								</Button>
							</div>
						</Table.Cell>
						<Table.Cell>
							<DropdownMenu.Root>
								<DropdownMenu.Trigger asChild let:builder>
									<Button aria-haspopup="true" size="icon" variant="ghost" builders={[builder]}>
										<Ellipsis class="h-4 w-4" />
										<span class="sr-only">Toggle menu</span>
									</Button>
								</DropdownMenu.Trigger>
								<DropdownMenu.Content align="end">
									<DropdownMenu.Label>Actions</DropdownMenu.Label>
									<DropdownMenu.Item>Edit</DropdownMenu.Item>
									<DropdownMenu.Item>Delete</DropdownMenu.Item>
								</DropdownMenu.Content>
							</DropdownMenu.Root>
						</Table.Cell>
					</Table.Row>
				{/each}
			</Table.Body>
		</Table.Root>
	</Card.Content>
</Card.Root>
