<script lang="ts">
	import { createCombobox, melt, type ComboboxOption } from '@melt-ui/svelte';
	import { Check, ChevronDown, ChevronUp } from 'lucide-svelte';

	import { fly } from 'svelte/transition';
	import type { PageData } from '../$types';
	import { writable } from 'svelte/store';
	import type { Project } from '$lib/types';

	export let data: PageData;

	type Manga = {
		author: string;
		title: string;
		disabled: boolean;
	};

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

	customSelected.subscribe((value) => {
		console.log(value);
	});

	const new_projects = data.projects.map((p) => ({
		author: p.name,
		title: p.project_code
	}));

	$: filteredMangas = $touchedInput
		? new_projects.filter(({ title, author }) => {
				const normalizedInput = $inputValue.toLowerCase();
				return (
					title.toLowerCase().includes(normalizedInput) ||
					author.toLowerCase().includes(normalizedInput)
				);
			})
		: new_projects;
</script>

<div class="flex items-center justify-center">
	<div class="flex flex-col gap-1">
		<!-- svelte-ignore a11y-label-has-associated-control - $label contains the 'for' attribute -->
		<label use:melt={$label}>
			<span class="text-sm font-medium">Select your project</span>
		</label>

		<div class="relative">
			<input
				use:melt={$input}
				class="flex h-10 items-center justify-between rounded-lg bg-white
            px-3 pr-12 text-black"
				placeholder="Best book ever"
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
			class=" z-10 flex max-h-[300px] flex-col overflow-hidden rounded-lg"
			use:melt={$menu}
			transition:fly={{ duration: 150, y: -5 }}
		>
			<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
			<div
				class="flex max-h-full flex-col gap-0 overflow-y-auto bg-white px-2 py-2 text-black"
				tabindex="0"
			>
				{#each filteredMangas as book, index (index)}
					<li
						use:melt={$option({
							value: book,
							label: book.title
						})}
						class="data-[highlighted]:bg-magnum-200 data-[highlighted]:text-magnum-900 relative cursor-pointer scroll-my-2 rounded-md py-2
          pl-4 pr-4
            data-[disabled]:opacity-50"
					>
						{#if $isSelected(book)}
							<div class="check text-magnum-900 absolute left-2 top-1/2 z-10">
								<Check class="size-4" />
							</div>
						{/if}
						<div class="pl-4">
							<span class="font-medium">{book.title}</span>
							<span class="block text-sm opacity-75">{book.author}</span>
						</div>
					</li>
				{:else}
					<li
						class="relative cursor-pointer rounded-md py-1 pl-8 pr-4
          data-[highlighted]:bg-magnum-100 data-[highlighted]:text-magnum-700"
					>
						No results found
					</li>
				{/each}
			</div>
		</ul>
	{/if}
</div>
