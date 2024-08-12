import type { Project } from '$lib/types';
import type { PageServerLoad } from './$types';
import { pb } from '$lib/backend';

export const load: PageServerLoad = async () => {
	const projects = await pb.collection('projects').getFullList<Project>();

	return {
		projects: projects as Project[],
	};
};
