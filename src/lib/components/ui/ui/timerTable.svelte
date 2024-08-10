<script lang="ts">
	import * as Card from '$lib/components/ui/ui/card/index.js';
	import * as Table from '$lib/components/ui/ui/table/index.js';
	import { Badge } from '$lib/components/ui/ui/badge/index.js';
	import { Rows } from 'lucide-svelte';
	import type { Project } from '$lib/types';
	type Props = {
		stuff: Project[];
	};
	let { stuff }: Props = $props();
</script>

<Card.Root>
	<Card.Header class="px-7">
		<Card.Title>Projects</Card.Title>
		<Card.Description>Recent orders from your store.</Card.Description>
	</Card.Header>
	<Card.Content>
		<Table.Root>
			<Table.Header>
				<Table.Row>
					<Table.Head>Project</Table.Head>
					<Table.Head class="hidden sm:table-cell">Description</Table.Head>
					<Table.Head class="hidden sm:table-cell">Time Elapsed</Table.Head>
					<Table.Head class="hidden sm:table-cell">Actions</Table.Head>
				</Table.Row>
			</Table.Header>
			<Table.Body>
				{#each stuff as row}
					<Table.Row class="bg-accent">
						<Table.Cell>
							<div class="font-medium">{row.name}</div>
							<div class="hidden text-sm text-muted-foreground md:inline">
								Code: {row.project_code}
							</div>
						</Table.Cell>
						<Table.Cell class="hidden sm:table-cell">
							<Badge class="text-xs" variant="secondary">{row.description}</Badge>
						</Table.Cell>
						<Table.Cell class="hidden sm:table-cell">{row.timeSpent}</Table.Cell>
						<Table.Cell class="hidden sm:table-cell">...</Table.Cell>
					</Table.Row>
				{/each}
			</Table.Body>
		</Table.Root>
	</Card.Content>
</Card.Root>
