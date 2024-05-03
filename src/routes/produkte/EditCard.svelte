<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog/';
	import { Label } from '$lib/components/ui/label';
	import { Input } from '$lib/components/ui/input';
	import { Button } from '$lib/components/ui/button';
	import productsStore from '../products.store';
	import type { Product } from '$lib/database/models/Product';
	import Checkbox from '$lib/components/ui/checkbox/checkbox.svelte';

	export let open = false;
	export let product: Product;

	let name: string = product.name;
	let description: string = product.description ?? '';
	let category: string = product.category;
	let price: number = product.price;
	let is_entry_card = product.is_entry_card;

	const submit = async () => {
		const data = {
			id: product.id,
			name,
			description,
			category,
			price,
			is_entry_card
		} as Product;

		console.log(data);

		await productsStore.edit(data);
		open = false;
	};
</script>

<Dialog.Root bind:open>
	<Dialog.Trigger><slot /></Dialog.Trigger>
	<Dialog.Content class="sm:max-w-[425px]">
		<form on:submit={submit}>
			<Dialog.Header>
				<Dialog.Title>Produkt aktualisieren?</Dialog.Title>
			</Dialog.Header>
			<div class="grid gap-4 py-4">
				<div class="grid grid-cols-4 items-center gap-4">
					<Label for="name" class="text-right">Name</Label>
					<Input
						id="name"
						required
						placeholder="Einzelkarte"
						class="col-span-3"
						bind:value={name}
					/>

					<Label for="description" class="text-right">Beschreibung</Label>
					<Input
						id="description"
						placeholder="ermäßigt"
						class="col-span-3"
						bind:value={description}
					/>

					<Label for="category" class="text-right">Kategorie</Label>
					<Input id="category" class="col-span-3" bind:value={category} />
					<Label for="price" class="text-right">Preis</Label>
					<Input
						id="price"
						required
						type="number"
						step=".01"
						class="col-span-3"
						bind:value={price}
					/>
					<Label for="is_entry_card" class="text-right">Eintrittskarte</Label>
					<Checkbox id="is_entry_card" bind:checked={is_entry_card} />
				</div>
			</div>
			<Dialog.Footer>
				<Button type="submit">Speichern</Button>
			</Dialog.Footer>
		</form>
	</Dialog.Content>
</Dialog.Root>
