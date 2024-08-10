import { projects } from '$lib/backend/projects';
import type { Project } from '$lib/types';
import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
	// const todos = await fetch('https://dummyjson.com/todos').then((res) => res.json());

	const fakeProjects = await new Promise<Project[]>((resolve) => {
		setTimeout(() => resolve(projects), 100);
	});
	return {
		projects: fakeProjects as Project[]
	};
};
