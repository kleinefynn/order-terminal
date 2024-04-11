<script>
	import * as Dialog from '$lib/components/ui/dialog/';
	import { Label } from '$lib/components/ui/label';
	import { Input } from '$lib/components/ui/input';
	import * as Card from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
</script>

<Dialog.Root>
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
					<p class="select-none">Ein neues Produkt hinzufügen.</p>
				</Card.Description>
			</Card.Header>
		</Card.Root></Dialog.Trigger
	>
	<Dialog.Content class="sm:max-w-[425px]">
		<Dialog.Header>
			<Dialog.Title>Produkt hinzufügen</Dialog.Title>
			<Dialog.Description>Füge ein neues Produkt hinzu!</Dialog.Description>
		</Dialog.Header>
		<div class="grid gap-4 py-4">
			<div class="grid grid-cols-4 items-center gap-4">
				<Label for="name" class="text-right">Name</Label>
				<Input id="name" placeholder="Einzelkarte" class="col-span-3" />

				<Label for="description" class="text-right">Beschreibung</Label>
				<Input id="description" placeholder="ermäßigt" class="col-span-3" />

				<Label for="category" class="text-right">Kategory</Label>
				<Input id="category" placeholder="Eintrittskarten" class="col-span-3" />
			</div>
			<div class="grid grid-cols-4 items-center gap-4">
				<Label for="price" class="text-right">Preis</Label>
				<Input id="price" type="number" value={3.0} step=".01" class="col-span-3" />
			</div>
		</div>
		<Dialog.Footer>
			<Button type="submit">Save changes</Button>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
