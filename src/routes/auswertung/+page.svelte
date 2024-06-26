<script lang="ts">
	import { Render, Subscribe, createRender, createTable } from 'svelte-headless-table';
	import {
		addFlatten,
		addHiddenColumns,
		addPagination,
		addSelectedRows,
		addSortBy,
		addTableFilter
	} from 'svelte-headless-table/plugins';
	import Actions from '$lib/components/data-table/DataTableActions.svelte';
	import * as Table from '$lib/components/ui/table/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { cn } from '$lib/utils.js';
	import type { Record } from '$lib/database/models/PurchaseRecord';
	import data from '../purchases.store';

	const table = createTable(data, {
		sort: addSortBy({ disableMultiSort: true }),
		page: addPagination(),
		filter: addTableFilter({
			fn: ({ filterValue, value }) => value.includes(filterValue)
		}),
		select: addSelectedRows(),
		flatten: addFlatten(),
		hide: addHiddenColumns()
	});

	const columns = table.createColumns([
		table.column({
			header: 'Erfassungspunkt',
			accessor: 'time',
			cell: ({ value }) => {
				const date = new Date(value);
				return date.toLocaleString(window.navigator.language, {
					weekday: 'short',
					year: 'numeric',
					month: 'numeric',
					day: 'numeric',
					hour: 'numeric',
					minute: 'numeric',
					second: 'numeric'
				});
			}
		}),
		table.column({
			header: 'Einnahmen',
			id: 'revenue',
			accessor: 'purchases',
			cell: ({ value }) => {
				let sum = value
					.map((purchase) => purchase.price * purchase.amount)
					.reduce((partialSum, a) => partialSum + a, 0)
					.toFixed(2);

				return `${sum}€`;
			}
		}),
		table.column({
			header: 'Anzahl Personen',
			id: 'count_people',
			accessor: 'purchases',
			cell: ({ value }) => {
				return value
					.filter((purchase) => purchase.is_entry_card)
					.map((purchases) => purchases.amount)
					.reduce((partialSum, a) => partialSum + a, 0);
			}
		}),
		table.column({
			accessor: ({ id }) => id,
			header: '',
			cell: ({ value }) => {
				return createRender(Actions, { id: value });
			}
		})
	]);

	const { headerRows, pageRows, tableAttrs, tableBodyAttrs, flatColumns, pluginStates, rows } =
		table.createViewModel(columns);

	const { sortKeys } = pluginStates.sort;

	const { hiddenColumnIds } = pluginStates.hide;
	const ids = flatColumns.map((c) => c.id);
	let hideForId = Object.fromEntries(ids.map((id) => [id, true]));

	$: $hiddenColumnIds = Object.entries(hideForId)
		.filter(([, hide]) => !hide)
		.map(([id]) => id);

	const { hasNextPage, hasPreviousPage, pageIndex } = pluginStates.page;
	const { filterValue } = pluginStates.filter;

	const { selectedDataIds } = pluginStates.select;

	import { echarts, getVirtualData } from './echarts';

	let heatmapData: [string, number][] = [];
	data.subscribe((value: Record[]) => {
		heatmapData = value.map((record) => {
			let time = record.time;
			let countPeople = record.purchases
				.filter((purchase) => purchase.is_entry_card)
				.map((purchases) => purchases.amount)
				.reduce((partialSum, a) => partialSum + a, 0);

			return [time, countPeople];
		});
	});
	let option = {
		title: {
			top: 0,
			left: 'center',
			text: 'Tägliche Eintritte'
		},
		tooltip: {},
		visualMap: {
			min: 0,
			max: 100,
			type: 'piecewise',
			orient: 'horizontal',
			left: 'center',
			top: 35
		},
		calendar: {
			top: 90,
			left: 0,
			right: 0,
			cellSize: ['auto'],
			range: '2024',
			itemStyle: {
				borderWidth: 0.5
			},
			yearLabel: { show: false }
		},
		series: {
			type: 'heatmap',
			coordinateSystem: 'calendar',
			data: heatmapData
		}
	};
</script>

<div class="w-full">
	<!-- Charts -->
	<div class="container mb-6 mt-[-3rem] min-h-60" use:echarts={option} />
	<!-- Table -->

	<div class="rounded-md border">
		<Table.Root {...$tableAttrs}>
			<Table.Header>
				{#each $headerRows as headerRow}
					<Subscribe rowAttrs={headerRow.attrs()}>
						<Table.Row>
							{#each headerRow.cells as cell (cell.id)}
								<Subscribe attrs={cell.attrs()} let:attrs props={cell.props()} let:props>
									<Table.Head {...attrs} class={cn('[&:has([role=checkbox])]:pl-3')}>
										<Render of={cell.render()} />
									</Table.Head>
								</Subscribe>
							{/each}
						</Table.Row>
					</Subscribe>
				{/each}
			</Table.Header>
			<Table.Body {...$tableBodyAttrs}>
				{#each $pageRows as row (row.id)}
					<Subscribe rowAttrs={row.attrs()} let:rowAttrs>
						<Table.Row {...rowAttrs} data-state={$selectedDataIds[row.id] && 'selected'}>
							{#each row.cells as cell (cell.id)}
								<Subscribe attrs={cell.attrs()} let:attrs>
									<Table.Cell class="[&:has([role=checkbox])]:pl-3" {...attrs}>
										<Render of={cell.render()} />
									</Table.Cell>
								</Subscribe>
							{/each}
						</Table.Row>
					</Subscribe>
				{/each}
			</Table.Body>
		</Table.Root>
	</div>
	<div class="flex items-center justify-end space-x-2 py-4">
		<div class="flex-1 text-sm text-muted-foreground">
			{Object.keys($selectedDataIds).length} von {$rows.length} Zeile(n) ausgewählt.
		</div>
		<Button
			variant="outline"
			size="sm"
			on:click={() => ($pageIndex = $pageIndex - 1)}
			disabled={!$hasPreviousPage}>Zurück</Button
		>
		<Button
			variant="outline"
			size="sm"
			disabled={!$hasNextPage}
			on:click={() => ($pageIndex = $pageIndex + 1)}>Vor</Button
		>
	</div>
</div>

<style>
</style>
