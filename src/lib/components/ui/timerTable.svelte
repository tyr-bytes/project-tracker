<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.js';
	import * as Table from '$lib/components/ui/table/index.js';
	import { Badge } from '$lib/components/ui/badge/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import type { Project } from '$lib/types';
	import { formatSeconds } from '$lib/site/dateutils';
	import { Trash2, Play, XCircle } from 'lucide-svelte';
	type Props = {
		stuff: Project[];
	};
	let { stuff }: Props = $props();

	let isClicked = $state(false);
	let selectedRow = $state();

	async function annoyMike(x: number) {
		console.log(x);
		isClicked = !isClicked;
		if (isClicked) {
			selectedRow = x;
		} else {
			selectedRow = null;
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
						<Table.Cell class="text-s hidden sm:table-cell"
							>{formatSeconds(row.timeSpent)}</Table.Cell
						>
						<Table.Cell class="accent-foreground">
							<div class="flex items-center space-x-2">
								<Button
									variant="outline"
									size="icon"
									onclick={() => annoyMike(i)}
									class={selectedRow == i ? 'bg-primary text-primary-foreground' : ''}
									><Play /></Button
								>
								<Button variant="destructive" size="icon"><Trash2 /></Button>
							</div>
						</Table.Cell>
					</Table.Row>
				{/each}
			</Table.Body>
		</Table.Root>
	</Card.Content>
</Card.Root>
