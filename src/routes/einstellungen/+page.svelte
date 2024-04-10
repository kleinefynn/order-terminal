<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Separator } from '$lib/components/ui/separator';

	import purchasesStore from '../purchases.store';
	import productsStore from '../products.store';
	import { toast } from 'svelte-sonner';

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

	async function exportSettings() {}
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
			<Button class="my-2 w-fit" variant="outline">Importieren...</Button>
		</div>
		<div>
			<h3 class="mt-2 scroll-m-20 text-lg font-semibold tracking-tight">Importiere Daten</h3>
			<Button class="my-2 w-fit" variant="outline">Importieren...</Button>
		</div>
	</div>
</div>
