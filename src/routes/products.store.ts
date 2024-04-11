import { productService } from '$lib/database/ProductService';
import type { Product } from '$lib/database/models/Product';
import { Directory, Encoding, Filesystem } from '@capacitor/filesystem';
import { Share } from '@capacitor/share';
import { FilePicker } from '@capawesome/capacitor-file-picker';
import { writable } from 'svelte/store';

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

const exportProducts = async () => {
	const products: Product[] = await productService.getProducts();

	let csv = products.map((product) => {
		let { id, ...productWithoutId } = product;
		return Object.values(productWithoutId).join(",");
	}).join("\n");

	const fileResult = await Filesystem.writeFile({
		path: "export_settings.csv",
		data: csv,
		directory: Directory.Cache,
		encoding: Encoding.UTF8
	});

	await Share.share({
		title: "Exportiere Einstellungen",
		url: "file://" + fileResult.uri,
	})
}

const importProducts = async () => {
	const CHUNK_SIZE = 4;
	const fromBinary = (str: string) => {
		return decodeURIComponent(Array.prototype.map.call(atob(str), function (c) {
			return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
		}).join(''))
	}

	const result = (await FilePicker.pickFiles({
		types: ['text/csv'],
		multiple: false,
		readData: true,
	})).files[0];

	const csv_base64 = result.data;

	if (csv_base64 === undefined) {
		throw Error("file empty!");
	}

	const csv = fromBinary(csv_base64);

	const products = csv
		.trim()
		// split record rows
		.split("\n")
		// parse line
		.map((line) => {
			let values: string[] = line.trim().split(",");

			return {
				name: values[0],
				description: values[1],
				price: Number(values[2]),
				category: values[3]
			} as Omit<Product, 'id'>
		});

	await productService.flushTable();

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