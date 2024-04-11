import { productService } from '$lib/database/ProductService';
import type { Product } from '$lib/database/models/Product';
import { writable } from 'svelte/store';

type Store = Map<string, Product[]>;

let products_map = new Map<string, Product[]>();

const { subscribe, set, update } = writable(products_map);

const remove = async (category: string, id: number) => {
	try {
		await productService.deleteProductById(id);

		update((store: Store) => {
			let products = store.get(category);
			delete products?.filter((v) => v.id === id)[0];
			return store;
		});
	} catch (e) {
		console.error(e);

	}
}

const add = async (product: Omit<Product, 'id'>) => {
	try {
		let id = await productService.addProduct(product);
		let p = { id: id, ...product };

		update((store: Store) => {
			let products = store.get(p.category);

			products?.push(p);

			return store;
		});
	} catch (e) {
		console.error(e);
	}
}

let sample_products: Omit<Product, 'id'>[] = [
	{
		name: 'Einzelkarte',
		price: 3.0,
		category: 'Eintrittskarte',
	},
	{
		name: 'Einzelkarte',
		description: 'ermäßigt',
		price: 2,
		category: 'Eintrittskarte',
	},
	{
		name: 'Gruppenkarte',
		price: 3.0,
		category: 'Eintrittskarte',
	},
	{
		name: 'Flaschenöffner',
		price: 2.99,
		category: 'Merchendise',
	},
	{
		name: 'Superlangertext und bin unkreativ',
		description: 'ermäßigt',
		price: 2.50,
		category: 'Merchendise',
	},
	{
		name: 'Schneekugel',
		price: 3.0,
		category: 'Merchendise',
	},
	{
		name: 'Superlangertext und bin unkreativ',
		price: 3.0,
		category: 'Merchendise',
	}
];

productService.isInitCompleted.subscribe({
	complete: async () => {
		await init_store();
	}
});

async function init_store() {
	let products = await productService.getProducts();

	if (products.length == 0) {
		for (const p of sample_products) {
			await productService.addProduct(p);
		}

		products = await productService.getProducts();
	}

	const map = products_map;

	for (const product of products) {
		let list = map.get(product.category);

		if (list === undefined) {
			list = [];
			map.set(product.category, list);
		}

		list.push(product);
	}

	set(products_map);
}

const get = () => Array.from(products_map.values())


const exportProducts = async () => {
	throw Error("not implemented!");
}

const importProducts = async () => {
	throw Error("not implemented!");
}

export default {
	subscribe,
	add,
	remove,
	get,
	exportProducts,
	importProducts
};