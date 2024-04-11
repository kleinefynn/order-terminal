<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Separator } from '$lib/components/ui/separator';

	import purchasesStore from '../purchases.store';
	import productsStore from '../products.store';
	import { toast } from 'svelte-sonner';
	import * as AlertDialog from '$lib/components/ui/alert-dialog';

	async function exportData() {
		try {
			await purchasesStore.exportPurchases();
			toast.success('Exportieren erfolgreich');
		} catch (error: any) {
			toast.error('Fehler beim exportieren', {
				description: error.toString()
			});
		}
	}

	async function importData() {
		try {
			await purchasesStore.importPurchases();
			toast.success('Importieren erfolgreich');
		} catch (error: any) {
			toast.error('Fehler beim importieren', {
				description: error.toString()
			});
		}
	}

	async function exportSettings() {
		try {
			await productsStore.exportProducts();
			toast.success('Exportieren erfolgreich');
		} catch (error: any) {
			toast.error('Fehler beim exportieren', {
				description: error.toString()
			});
		}
	}
	async function importSettings() {
		try {
			await productsStore.importProducts();
			toast.success('Importieren erfolgreich');
		} catch (error: any) {
			toast.error('Fehler beim importieren', {
				description: error.toString()
			});
		}
	}
</script>

<div class="flex flex-col gap-6 p-4 sm:py-4">
	<div>
		<div>
			<h3 class="scroll-m-20 text-lg font-semibold tracking-tight">Exportiere Einstellungen</h3>
			<Button class="my-2 w-fit" variant="outline" on:click={exportSettings}>Exportieren...</Button>
		</div>
		<div>
			<h3 class="mt-2 scroll-m-20 text-lg font-semibold tracking-tight">Exportiere Daten</h3>
			<Button class="my-2 w-fit" variant="outline" on:click={exportData}>Exportieren...</Button>
		</div>
	</div>
	<Separator />
	<div>
		<div>
			<h3 class="scroll-m-20 text-lg font-semibold tracking-tight">Importiere Einstellungen</h3>

			<AlertDialog.Root>
				<AlertDialog.Trigger
					><Button class="my-2 w-fit" variant="outline">Importieren...</Button></AlertDialog.Trigger
				>
				<AlertDialog.Content>
					<AlertDialog.Header>
						<AlertDialog.Title>Fortfahren?</AlertDialog.Title>
						<AlertDialog.Description
							>Dabei wird die aktuelle Einstellung verloren gegangen!</AlertDialog.Description
						>
					</AlertDialog.Header>
					<AlertDialog.Footer>
						<AlertDialog.Cancel>Zurück</AlertDialog.Cancel>
						<AlertDialog.Action on:click={importSettings}>Okay</AlertDialog.Action>
					</AlertDialog.Footer>
				</AlertDialog.Content>
			</AlertDialog.Root>
		</div>
		<div>
			<h3 class="mt-2 scroll-m-20 text-lg font-semibold tracking-tight">Importiere Daten</h3>

			<Button class="my-2 w-fit" variant="outline" on:click={importData}>Importieren...</Button>
		</div>
	</div>
</div>
