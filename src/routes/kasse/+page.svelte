<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { type Item } from "./Item";
	import warenkorb from "./stores";

	const entryFees: Item[] = [
		{
			name: "Einzelkarte",
			price: 3.0,
		},
		{
			name: "Superlangertext und bin unkreativ",
			description: "ermäßigt",
			price: 2,
		},
		{
			name: "Gruppenkarte",
			price: 3.0,
		},
	];

	const merchendise: Item[] = [
		{
			name: "Flaschenöffner",
			price: 3.0,
		},
		{
			name: "Superlangertext und bin unkreativ",
			description: "ermäßigt",
			price: 2,
		},
		{
			name: "Schneekugel",
			price: 3.0,
		},
		{
			name: "Superlangertext und bin unkreativ",
			price: 3.0,
		},
	];
	
</script>

<div class="w-full">
	<h5 class="mb-2 text-xl font-bold">Eintrittskarten</h5>
	<div class="flex flex-wrap flex-col w-full md:flex-row mx-auto gap-4">
		{#each entryFees as fee}
		<Card.Root class="w-full lg:w-fit relative cursor-pointer hover:bg-red-100" on:click={() => warenkorb.addItem(fee)}>
			<Card.Header>
				<Card.Title>
					<div class="flex w-32 justify-between">
						<p class="">{fee.name}</p>
					</div>
				</Card.Title>
				<Card.Description>
					<p class="">{fee.description ?? ""}</p>
				</Card.Description>
			</Card.Header>
			<Card.Content class="flex">
				<p class="font-normal absolute bottom-4">{fee.price}€</p>
			</Card.Content>
		</Card.Root>
		{/each}
	</div>
</div>

<div class="w-full">
	<h5 class="mb-2 text-xl font-bold">Merchendise</h5>
	<div class="flex flex-wrap flex-col w-full md:flex-row mx-auto gap-4">
		{#each merchendise as fee}
		<Card.Root class="w-full lg:w-fit relative cursor-pointer hover:bg-red-100" on:click={() => warenkorb.addItem(fee)}>
			<Card.Header>
				<Card.Title>
					<div class="flex w-32 justify-between">
						<p class="">{fee.name}</p>
					</div>
				</Card.Title>
				<Card.Description>
					<p class="">{fee.description ?? ""}</p>
				</Card.Description>
			</Card.Header>
			<Card.Content class="flex">
				<p class="font-normal absolute bottom-4">{fee.price}€</p>
			</Card.Content>
		</Card.Root>
		{/each}
	</div>
</div>

<style>
</style>
