<script lang="ts">
	import * as Card from '$lib/components/ui/ui/card/index.js';
	import * as Table from '$lib/components/ui/ui/table/index.js';
	import { Badge } from '$lib/components/ui/ui/badge/index.js';
	import { Button } from '$lib/components/ui/ui/button/index.js';
	import type { Project } from '$lib/types';
	import { formatSeconds } from '$lib/site/dateutils';
	import { CirclePlus, Pause, Play } from 'lucide-svelte';
	import { tick } from 'svelte';
	type Props = {
		stuff: Project[];
	};
	let { stuff }: Props = $props();

	let isClicked = $state(false);
	let selectedRow = $state(0);
	let selected = stuff.map(() => false);

	async function annoyMike(x: number) {
		await tick();
		console.log(x);
		isClicked = !isClicked;
		selectedRow = x;
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
					<Table.Head class="">Actions</Table.Head>
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
						<Table.Cell class="hidden sm:table-cell">{formatSeconds(row.timeSpent)}</Table.Cell>
						<Table.Cell class="accent-foreground">
							<div class="flex items-center space-x-2">
								<Button
									variant="outline"
									size="icon"
									onclick={() => annoyMike(i)}
									class={selectedRow == i ? 'ring' : ''}><Play /></Button
								>
								<Button variant="ghost" size="icon"><Pause /></Button>
							</div>
						</Table.Cell>
					</Table.Row>
				{/each}
			</Table.Body>
		</Table.Root>
	</Card.Content>
</Card.Root>
