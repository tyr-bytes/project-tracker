import type { Product } from '$lib/types';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
	const products = await fetch('https://dummyjson.com/products').then((res) => res.json());
	return {
		stuff: products.products as Product[]
	};
};
