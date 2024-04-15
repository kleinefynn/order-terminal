import { productService } from '$lib/database/ProductService';
import type { Product } from '$lib/database/models/Product';
import { writable } from 'svelte/store';
import { invoke } from "@tauri-apps/api";
import { open, save } from "@tauri-apps/api/dialog";

type Store = Map<string, Product[]>;

let products_map = new Map<string, Product[]>();

const { subscribe, set, update } = writable(products_map);

const refresh = async () => {
	let products = await productService.getProducts();

	// REFERENCE!
	const map = products_map;
	map.clear();

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

const remove = async (id: number) => {
	try {
		await productService.deleteProductById(id);

		await refresh();
	} catch (e) {
		console.error(e);

	}
}

const add = async (product: Omit<Product, 'id'>) => {
	try {
		await productService.addProduct(product);
		await refresh();
	} catch (e) {
		console.error(e);
	}
}

const fromBinary = (str: string) => {
	return decodeURIComponent(Array.prototype.map.call(atob(str), function (c) {
		return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
	}).join(''))
}

const exportProducts = async () => {
	const products: Product[] = await productService.getProducts();
	const suggestedFilename = "export_einstellungen.csv";


	const encoder = new TextEncoder();

	// Save into the default downloads directory, like in the browser
	const filePath = await save({
		defaultPath: suggestedFilename,
		filters: [{
			name: 'Text',
			extensions: ['csv']
		}]
	});

	if (filePath == null) {
		throw Error("Exportieren abgebrochen")
	}

	await invoke("export_products", {
		path: filePath,
		products
	})
}

const importProducts = async () => {
	let path = await open({
		multiple: false,
		filters: [{
			name: 'Text',
			extensions: ['csv']
		}]
	}) as string;

	const products: Product[] = await invoke("import_products", { path });

	for (const product of products) {
		await productService.addProduct(product);
	}

	refresh();

}

productService.isInitCompleted.subscribe({
	complete: async () => {
		await refresh();
	}
});


export default {
	subscribe,
	add,
	remove,
	exportProducts,
	importProducts
};