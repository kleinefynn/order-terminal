<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import products from '../products.store';
	import Ellipsis from 'lucide-svelte/icons/ellipsis';
	import AddCard from './AddCard.svelte';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { Button } from '$lib/components/ui/button';

	$: entries: $products.entries();

	async function deleteProduct(id: number): Promise<void> {
		await products.remove(id);
	}
</script>

<div class="w-full">
	{#each $products.entries() as [category, list]}
		<div class="mb-4">
			<h5 class="mb-2 text-xl font-bold">{category}</h5>
			<div class="mx-auto flex w-full flex-col flex-wrap gap-4 md:flex-row">
				{#each list as product}
					<Card.Root class="relative w-full min-w-44 lg:w-fit">
						<Card.Header>
							<Card.Title class="flex flex-row gap-2">
								<div class="flex w-fit select-none">
									<p class="">{product.name}</p>
								</div>
								<div class="flex w-full justify-end">
									<DropdownMenu.Root>
										<DropdownMenu.Trigger
											><Button variant="ghost" class="-mt-1.5 h-8 w-8 p-0">
												<Ellipsis class="h-4 w-4" />
											</Button></DropdownMenu.Trigger
										>
										<DropdownMenu.Content>
											<DropdownMenu.Group>
												<DropdownMenu.Label>Aktionen</DropdownMenu.Label>
												<DropdownMenu.Separator />
												<DropdownMenu.Item class="cursor-pointer">Editieren</DropdownMenu.Item>
												<DropdownMenu.Item
													class="cursor-pointer"
													on:click={() => deleteProduct(product.id)}>Löschen</DropdownMenu.Item
												>
											</DropdownMenu.Group>
										</DropdownMenu.Content>
									</DropdownMenu.Root>
								</div>
							</Card.Title>
							<Card.Description>
								<p class="select-none">{product.description ?? ''}</p>
							</Card.Description>
						</Card.Header>
						<Card.Content class="flex">
							<p class="absolute bottom-4 select-none text-sm">{product.price.toFixed(2)}€</p>
						</Card.Content>
					</Card.Root>
				{/each}

				<AddCard {category} />
			</div>
		</div>
	{/each}

	<h5 class="mb-2 text-xl font-bold text-muted-foreground">Neue Kategorie</h5>
	<AddCard category="" />
</div>
