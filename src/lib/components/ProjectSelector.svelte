<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import { createCombobox, melt, type ComboboxOption } from '@melt-ui/svelte';
	import { Check, ChevronDown, ChevronUp } from 'lucide-svelte';
	import { fly } from 'svelte/transition';
	import { writable } from 'svelte/store';
	import type { Project } from '$lib/types';
	import { cn } from '$lib/utils';
	let className: $$Props['class'] = undefined;
	export { className as class };

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

<div class={cn('flex items-center justify-center', className)}>
	<div class={cn('borber-b flex w-72 flex-col px-2', className)}>
		<!-- svelte-ignore a11y_label_has_associated_control -->
		<label use:melt={$label}>
			<span class={cn('text-sm font-medium', className)}>Select your project</span>
		</label>
		<div class={cn('relative', className)}>
			<input
				use:melt={$input}
				class={cn(
					'flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50',
					className
				)}
				placeholder="Search + select projects"
			/>
			<div class={cn('absolute right-2 top-1/2 z-10 -translate-y-1/2', className)}>
				{#if $open}
					<ChevronUp class={cn('size-4', className)} />
				{:else}
					<ChevronDown class={cn('size-4', className)} />
				{/if}
			</div>
		</div>
	</div>
	{#if $open}
		<ul
			class={cn('overflow-y-auto overflow-x-hidden rounded-md bg-popover', className)}
			use:melt={$menu}
			transition:fly={{ duration: 150, y: -5 }}
		>
			<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
			<div
				class={cn('flex max-h-full flex-col gap-0 overflow-y-auto px-2 py-2', className)}
				tabindex="0"
			>
				{#each filteredProjects as project, index (index)}
					<li
						use:melt={$option({
							value: project,
							label: project.name
						})}
						class={cn(
							'relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none aria-selected:bg-accent aria-selected:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
							className
						)}
					>
						{#if $isSelected(project)}
							<div class={cn('', className)}>
								<Check class={cn('size-3', className)} />
							</div>
						{/if}
						<div class={cn('pl-4', className)}>
							<span class={cn('font-medium text-muted-foreground', className)}
								>{project.project_code}</span
							>
							<span class={cn('block text-sm text-foreground', className)}>{project.name}</span>
						</div>
					</li>
				{:else}
					<li
						class={cn(
							'relative cursor-pointer rounded-md py-1 pl-8 pr-4 data-[highlighted]:bg-magnum-100 data-[highlighted]:text-magnum-700',
							className
						)}
					>
						No results found
					</li>
				{/each}
			</div>
		</ul>
	{/if}
</div>
