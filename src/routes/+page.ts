import type { Todo } from '$lib/types';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
	const todos = await fetch('https://dummyjson.com/todos').then((res) => res.json());
	return {
		todos: todos.todos as Todo[]
	};
};
