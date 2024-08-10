export const siteConfig = {
	name: 'project-tracker',
	title: 'Project Tracker',
	url: 'localhost',
	description: 'Track your projects using timers. Export them to a CSV.',
	links: {
		redmine: 'https://c-az-0091:3001',
		sonarqube: 'https://sonarqube.dp.wartsila.com',
		svn: 'https://svn.dp.wartsila.com'
	}
};

export type SiteConfig = typeof siteConfig;
