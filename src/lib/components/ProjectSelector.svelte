<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import { createCombobox, melt, type ComboboxOption } from '@melt-ui/svelte';
	import { Check, ChevronDown, ChevronUp } from 'lucide-svelte';
	import { fly } from 'svelte/transition';
	import { writable } from 'svelte/store';
	import type { Project } from '$lib/types';

	export let projects: Project[];
	export let onSelectionChange: (selected: Project[]) => void;

	const customSelected = writable<ComboboxOption<Project>[]>([]);
	const {
		elements: { menu, input, option, label },
		states: { open, inputValue, touchedInput },
		helpers: { isSelected }
	} = createCombobox({
		forceVisible: true,
		multiple: true,
		selected: customSelected
	});

	$: filteredProjects = $touchedInput
		? projects.filter(({ name, project_code }) => {
				const normalizedInput = $inputValue.toLowerCase();
				return (
					name.toLowerCase().includes(normalizedInput) ||
					project_code.toLowerCase().includes(normalizedInput)
				);
			})
		: projects;

	$: {
		onSelectionChange($customSelected.map((sel) => sel.value));
	}
</script>

<div class="card flex items-center justify-center">
	<div class="borber-b flex w-72 flex-col px-2">
		<!-- svelte-ignore a11y_label_has_associated_control -->
		<label use:melt={$label}>
			<span class="text-sm font-medium">Select your project</span>
		</label>
		<div class="relative">
			<input
				use:melt={$input}
				class="flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
				placeholder="Search + select projects"
			/>
			<div class="absolute right-2 top-1/2 z-10 -translate-y-1/2">
				{#if $open}
					<ChevronUp class="size-4" />
				{:else}
					<ChevronDown class="size-4" />
				{/if}
			</div>
		</div>
	</div>
	{#if $open}
		<ul
			class="overflow-y-auto overflow-x-hidden rounded-md bg-popover"
			use:melt={$menu}
			transition:fly={{ duration: 150, y: -5 }}
		>
			<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
			<div class="flex max-h-full flex-col gap-0 overflow-y-auto px-2 py-2" tabindex="0">
				{#each filteredProjects as project, index (index)}
					<li
						use:melt={$option({
							value: project,
							label: project.name
						})}
						class="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none aria-selected:bg-accent aria-selected:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
					>
						{#if $isSelected(project)}
							<div>
								<Check class="size-3" />
							</div>
						{/if}
						<div class="pl-4">
							<span class="font-medium text-muted-foreground">{project.project_code}</span>
							<span class="block text-sm text-foreground">{project.name}</span>
						</div>
					</li>
				{:else}
					<li
						class="relative cursor-pointer rounded-md py-1 pl-8 pr-4 data-[highlighted]:bg-magnum-100 data-[highlighted]:text-magnum-700"
					>
						No results found
					</li>
				{/each}
			</div>
		</ul>
	{/if}
</div>
