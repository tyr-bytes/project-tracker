export type Todo = {
	id: number;
	todo: string;
	completed: boolean;
	userId: string;
};

// export type Projects = typeof projects;

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
