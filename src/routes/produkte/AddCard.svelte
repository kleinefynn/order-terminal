<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog/';
	import { Label } from '$lib/components/ui/label';
	import { Input } from '$lib/components/ui/input';
	import * as Card from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import productsStore from '../products.store';
	import type { Product } from '$lib/database/models/Product';
	import Checkbox from '$lib/components/ui/checkbox/checkbox.svelte';

	export let category: string = '';
	export let open = false;

	let name: string;
	let description: string;
	let categoryStr: string = category.toString();
	let price: number = 3.0;
	let isEntryCard = false;

	const submit = async () => {
		const data = {
			name,
			description,
			category: categoryStr,
			price,
			is_entry_card: isEntryCard
		} as Omit<Product, 'id'>;
		console.log(isEntryCard);

		await productsStore.add(data);
		open = false;
	};
</script>

<Dialog.Root bind:open>
	<Dialog.Trigger
		><Card.Root
			class="relative w-full cursor-pointer border-0 bg-background/50 hover:bg-primary/20 lg:w-fit"
		>
			<Card.Header>
				<Card.Title class="flex flex-row gap-2 text-muted-foreground">
					<div class="flex w-fit select-none">
						<p class="">Hinzufügen</p>
					</div>
				</Card.Title>
				<Card.Description>
					{#if category !== ''}
						<p class="select-none">
							Ein neues Produkt zu der Kategorie <i>"{category}"</i>hinzufügen.
						</p>
					{:else}
						<p class="select-none">Ein neues Produkt inklusiver neuer Kategorie erstellen.</p>
					{/if}
				</Card.Description>
			</Card.Header>
		</Card.Root></Dialog.Trigger
	>
	<Dialog.Content class="sm:max-w-[425px]">
		<form on:submit={submit}>
			<Dialog.Header>
				<Dialog.Title>Produkt hinzufügen</Dialog.Title>
				<Dialog.Description>Füge ein neues Produkt hinzu!</Dialog.Description>
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
					<Input
						id="category"
						disabled={category !== ''}
						class="col-span-3"
						bind:value={categoryStr}
					/>
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
					<Checkbox id="is_entry_card" bind:checked={isEntryCard} />
				</div>
			</div>
			<Dialog.Footer>
				<Button type="submit">Speichern</Button>
			</Dialog.Footer>
		</form>
	</Dialog.Content>
</Dialog.Root>
