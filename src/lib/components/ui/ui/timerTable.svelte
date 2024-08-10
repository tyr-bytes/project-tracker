<script lang="ts">
	import * as Card from '$lib/components/ui/ui/card/index.js';
	import * as Table from '$lib/components/ui/ui/table/index.js';
	import { Badge } from '$lib/components/ui/ui/badge/index.js';
	import { Button } from '$lib/components/ui/ui/button/index.js';
	import type { Project } from '$lib/types';
	import { formatSeconds } from '$lib/site/dateutils';
	import { Pause, Play } from 'lucide-svelte';
	import { tick } from 'svelte';
	type Props = {
		stuff: Project[];
	};
	let { stuff }: Props = $props();

	let isClicked = $state(false);

	async function annoyMike() {
		await tick();
		isClicked = !isClicked;
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
				{#each stuff as row}
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
						<Table.Cell class="text-xl accent-foreground">
							<Button
								variant="outline"
								size="icon"
								onclick={() => (isClicked = !isClicked)}
								class={isClicked ? 'bg-green-900' : ''}><Play /></Button
							>
							<Button variant="ghost" size="icon"><Pause /></Button>
						</Table.Cell>
					</Table.Row>
				{/each}
			</Table.Body>
		</Table.Root>
	</Card.Content>
</Card.Root>
