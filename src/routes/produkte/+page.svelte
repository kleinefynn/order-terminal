<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import products from '../products.store';
	import Trash2 from 'lucide-svelte/icons/trash-2';
	import AddCard from './AddCard.svelte';

	$: entries: $products.entries();
</script>

<div class="w-full">
	{#each $products.entries() as [category, list]}
		<div class="mb-4">
			<h5 class="mb-2 text-xl font-bold">{category}</h5>
			<div class="mx-auto flex w-full flex-col flex-wrap gap-4 md:flex-row">
				{#each list as fee}
					<Card.Root class="relative w-full cursor-pointer lg:w-fit">
						<Card.Header>
							<Card.Title class="flex flex-row gap-2">
								<div class="flex w-fit select-none">
									<p class="">{fee.name}</p>
								</div>
								<div>
									<Trash2
										class="my-1 h-3 w-3 cursor-pointer text-secondary hover:text-destructive"
									/>
								</div>
							</Card.Title>
							<Card.Description>
								<p class="select-none">{fee.description ?? ''}</p>
							</Card.Description>
						</Card.Header>
						<Card.Content class="flex">
							<p class="absolute bottom-4 select-none text-sm">{fee.price.toFixed(2)}€</p>
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
