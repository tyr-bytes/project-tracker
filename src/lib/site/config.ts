import type { NavItem } from '$lib/types';

export const siteConfig = {
	name: 'project-tracker',
	title: 'Project Tracker',
	url: 'localhost',
	description: 'Track your projects using timers. Export them to a CSV.',
};

export type LinksConfig = {
	mainNav: NavItem[];
};
export const linksConfig: LinksConfig = {
	mainNav: [
		{
			title: 'Login',
			href: '/auth/login',
		},
		{
			title: 'Register',
			href: '/auth/register',
		},
		{
			title: 'Daily',
			href: '/daily',
		},
		{
			title: 'GitHub',
			href: 'https://github.com/tyr-bytes/project-tracker',
			external: true,
		},
	],
};
export type SiteConfig = typeof siteConfig;
