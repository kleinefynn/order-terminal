<script lang="ts">
	import purchases from '../purchases.store';
	import * as Table from '$lib/components/ui/table';
</script>

<div class="p-4 sm:px-6 sm:py-0">
	<Table.Root>
		<Table.Caption>Liste aller erfassten Käufe</Table.Caption>
		<Table.Header>
			<Table.Row>
				<Table.Head class="w-56">Datum</Table.Head>
				<Table.Head>Anzahl Personen</Table.Head>
				<Table.Head class="text-right">Einnahmen</Table.Head>
			</Table.Row>
		</Table.Header>
		<Table.Body>
			{#each $purchases as purchase}
				<Table.Row>
					<Table.Cell class="font-medium">{new Date(purchase.time).toLocaleString()}</Table.Cell>
					<Table.Cell
						>{purchase.purchases
							.map((purchase) => (purchase.category === 'Eintrittskarte' ? purchase.amount : 0))
							.reduce((sum, curr) => sum + curr, 0)
							.toFixed(0)}</Table.Cell
					>
					<Table.Cell class="text-right"
						>{purchase.purchases
							.map((product) => product.price * product.amount)
							.reduce((sum, curr) => sum + curr, 0)
							.toFixed(2)}€</Table.Cell
					>
				</Table.Row>
			{/each}
		</Table.Body>
	</Table.Root>
</div>
