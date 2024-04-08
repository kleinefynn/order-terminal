<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import Separator from '$lib/components/ui/separator/separator.svelte';
	import * as Table from '$lib/components/ui/table';
	import Trash2 from 'lucide-svelte/icons/trash-2';
	import * as AlertDialog from '$lib/components/ui/alert-dialog';
	import warenkorb from './stores';

</script>

<div class="flex flex-col gap-6 p-4 sm:px-6 sm:py-0 md:grid md:grid-cols-2 md:gap-8">
	<div class="col-span-1 flex flex-col gap-8">
		<slot />
	</div>

	<Separator class="md:hidden" />

	<!-- Checkout side -->
	<aside
		class="2xl:checkout-xl md:checkout-lg flex w-full flex-col gap-4 rounded-xl border bg-background p-4"
	>
		<h5 class="mx-auto text-xl font-bold">Warenkorb</h5>

		<Table.Root>
			<Table.Caption>Inhalt des Warenkorbs</Table.Caption>
			<Table.Header>
				<Table.Row>
					<Table.Head>Löschen</Table.Head>
					<Table.Head class="w-[100px]">Name</Table.Head>
					<Table.Head>Menge</Table.Head>
					<Table.Head>Preis</Table.Head>
					<Table.Head class="text-right">Gesamtpreis</Table.Head>
				</Table.Row>
			</Table.Header>
			<Table.Body>
				{#each Object.values($warenkorb) as korb, i (i)}
					<Table.Row>
						<Table.Cell>
							<AlertDialog.Root>
								<AlertDialog.Trigger
									><Trash2
										class="h-5 w-5 cursor-pointer hover:text-destructive"
									/></AlertDialog.Trigger
								>
								<AlertDialog.Content>
									<AlertDialog.Header>
										<AlertDialog.Title>Löschen?</AlertDialog.Title>
									</AlertDialog.Header>
									<AlertDialog.Footer>
										<AlertDialog.Cancel>Zurück</AlertDialog.Cancel>
										<AlertDialog.Action on:click={() => warenkorb.remove(korb.name)}>Löschen</AlertDialog.Action>
									</AlertDialog.Footer>
								</AlertDialog.Content>
							</AlertDialog.Root>
						</Table.Cell>
						<Table.Cell class="font-medium">{korb.name}</Table.Cell>
						<Table.Cell><Input type="number" min="1" class="w-16" value={korb.amount} on:change={(v) => {warenkorb.change(korb, v.currentTarget?.value);}} /></Table.Cell>
						<Table.Cell>{korb.price}€</Table.Cell>
						<Table.Cell class="text-right">{korb.price * korb.amount}€</Table.Cell>
					</Table.Row>
				{/each}
			</Table.Body>
		</Table.Root>

		<div class="mx-auto my-2 flex w-64 flex-col gap-2">
			<Button class="w-full">Erfassen</Button>
      <AlertDialog.Root>
        <AlertDialog.Trigger
          ><Button variant="secondary" class="w-full">Löschen</Button></AlertDialog.Trigger
        >
        <AlertDialog.Content>
          <AlertDialog.Header>
            <AlertDialog.Title>Löschen?</AlertDialog.Title>
            <AlertDialog.Description>Aktion kann nicht rückgängig gemacht werden. Sind Sie sich sicher?</AlertDialog.Description>
          </AlertDialog.Header>
          <AlertDialog.Footer>
            <AlertDialog.Cancel>Zurück</AlertDialog.Cancel>
            <AlertDialog.Action on:click={() => warenkorb.reset()}>Löschen</AlertDialog.Action>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog.Root>
		</div>
	</aside>
</div>

<style>
</style>
