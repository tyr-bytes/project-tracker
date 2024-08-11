import type { icons } from 'lucide-svelte';

export type Todo = {
	id: number;
	todo: string;
	completed: boolean;
	userId: string;
};

export type Project = {
	id: string;
	project_code: string;
	name: string;
	description: string;
	timeSpent: number;
	intervals: Array<{
		start: string;
		end: string;
	}>;
};

export type NavItem = {
	title: string;
	href?: string;
	disabled?: boolean;
	external?: boolean;
	icon?: keyof typeof icons;
	label?: string;
};

export type DateStyle = Intl.DateTimeFormatOptions['dateStyle'];
