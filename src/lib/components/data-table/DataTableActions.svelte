<script lang="ts">
	import Ellipsis from 'lucide-svelte/icons/ellipsis';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { Button } from '$lib/components/ui/button';
	import records from '../../../routes/purchases.store';
	import * as AlertDialog from '$lib/components/ui/alert-dialog';
	import { Description } from 'formsnap';

	export let id: number;
	let open = false;

	async function delete_record(id: number): Promise<void> {
		await records.deleteRecord(id);
	}
</script>

<AlertDialog.Root bind:open>
	<AlertDialog.Content>
		<AlertDialog.Header>
			<AlertDialog.Title>Eintrag löschen?</AlertDialog.Title>
			<AlertDialog.Description
				>Möchten Sie diesen Eintrag wirklich löschen? Diese Aktion kann nicht mehr rückgängig
				gemacht werden!</AlertDialog.Description
			>
		</AlertDialog.Header>
		<AlertDialog.Footer>
			<AlertDialog.Cancel>Zurück</AlertDialog.Cancel>
			<AlertDialog.Action on:click={() => delete_record(id)}>Löschen</AlertDialog.Action>
		</AlertDialog.Footer>
	</AlertDialog.Content>
</AlertDialog.Root>

<DropdownMenu.Root>
	<DropdownMenu.Trigger asChild let:builder>
		<Button variant="ghost" builders={[builder]} size="icon" class="relative h-8 w-8 p-0">
			<span class="sr-only">Aktionsmenü</span>
			<Ellipsis class="h-4 w-4" />
		</Button>
	</DropdownMenu.Trigger>
	<DropdownMenu.Content>
		<DropdownMenu.Group>
			<DropdownMenu.Label>Aktionen</DropdownMenu.Label>
			<DropdownMenu.Separator />
			<DropdownMenu.Item on:click={() => (open = !open)}>Löschen</DropdownMenu.Item>
		</DropdownMenu.Group>
	</DropdownMenu.Content>
</DropdownMenu.Root>
