<script lang="ts">
	import { tick } from 'svelte';
	import { Button } from '$lib/components/ui/button/index.js';
	import { cn } from '$lib/utils.js';
	import TimerTable from '$lib/components/ui/timerTable.svelte';
	import { formatDate } from '$lib/site/dateutils.js';
	import ProjectSelector from '$lib/components/ProjectSelector.svelte';
	import type { Project } from '$lib/types.js';
	import { HardDriveDownload, Save } from 'lucide-svelte';

	function handleSelectionChange(selected: Project[]) {
		selectedProjects = selected;
		// Do something with the selected projects
		console.log('Selected projects:', selectedProjects);
	}

	const currentDate = formatDate(new Date(Date.now()).toUTCString());
	// TODO: Better TIme Library
	const weekEnding = formatDate(new Date(Date.now()).toUTCString());

	// We want to refocus the trigger button when the user selects
	// an item from the list so users can continue navigating the
	// rest of the form with the keyboard.

	let { data } = $props();
	let selectedProjects: Project[] = $state([]);
</script>

<div class="mb-2 flex flex-col items-center justify-center">
	<div class="text-4x1 font-bold">
		{currentDate}
	</div>
	<div class="text-sm">Week Ending: {weekEnding}</div>
</div>

<div class="mx-auto flex flex-col items-center justify-center">
	<div class="w-full max-w-3xl rounded-lg bg-secondary p-6 shadow-md">
		<ProjectSelector projects={data.projects} onSelectionChange={handleSelectionChange} />

		<TimerTable stuff={selectedProjects}></TimerTable>
	</div>

	<div class="flex items-center justify-around gap-2 p-6">
		<Button variant="outline" size="sm" class="gap-3">
			<Save class="h-3.5 w-3.5" />
			<span> Save Changes </span>
		</Button>
		<Button variant="outline" size="sm" class="gap-3">
			<HardDriveDownload class="h-3.5 w-3.5" />
			<span>Roll Prior</span></Button
		>
	</div>
</div>
