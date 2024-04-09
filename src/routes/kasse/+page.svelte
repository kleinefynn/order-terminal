<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import warenkorb from './warenkorb.store';
	import products from '../products.store';

	$: entries: $products.entries();
</script>

<div class="w-full">
	{#each $products.entries() as [category, list]}
	<div class="mb-4">
	
		<h5 class="mb-2 text-xl font-bold">{category}</h5>
		<div class="mx-auto flex w-full flex-col flex-wrap gap-4 md:flex-row">
			{#each list as fee}
				<Card.Root
					class="relative w-full cursor-pointer hover:bg-red-100 lg:w-fit"
					on:click={() => warenkorb.addItem(fee)}
				>
					<Card.Header>
						<Card.Title>
							<div class="flex w-32 justify-between select-none">
								<p class="">{fee.name}</p>
							</div>
						</Card.Title>
						<Card.Description>
							<p class="select-none">{fee.description ?? ''}</p>
						</Card.Description>
					</Card.Header>
					<Card.Content class="flex">
						<p class="absolute bottom-4 text-sm select-none">{fee.price.toFixed(2)}€</p>
					</Card.Content>
				</Card.Root>
			{/each}
		</div>
	</div>
	{/each}
</div>