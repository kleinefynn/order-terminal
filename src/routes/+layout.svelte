<script lang="ts">
    import "../app.scss";
	import Home from 'lucide-svelte/icons/home';
	import LineChart from 'lucide-svelte/icons/line-chart';
	import Package from 'lucide-svelte/icons/package';
	import PanelLeft from 'lucide-svelte/icons/panel-left';
	import Search from 'lucide-svelte/icons/search';
	import Settings from 'lucide-svelte/icons/settings';
	import ShoppingCart from 'lucide-svelte/icons/shopping-cart';

	import * as Breadcrumb from '$lib/components/ui/breadcrumb/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import * as Sheet from '$lib/components/ui/sheet/index.js';
	import * as Tooltip from '$lib/components/ui/tooltip/index.js';
	import { page } from "$app/stores";

	// SETUP SQLITE;
	import { afterUpdate } from 'svelte';
	import { Capacitor } from '@capacitor/core';
	import {
        defineCustomElements as jeepSqlite,
        applyPolyfills,
    } from 'jeep-sqlite/loader';
	import AppInitializer from "$lib/components/AppInitializer.svelte";

	let toRender = false;
    const platform = Capacitor.getPlatform();

    // Check if we're in the browser environment
    if (typeof window !== 'undefined') {
        applyPolyfills().then(() => {
            jeepSqlite(window);
        });
        if (platform === "web") {
            const jeepEl = document.createElement("jeep-sqlite");
            document.body.appendChild(jeepEl);
            customElements.whenDefined('jeep-sqlite').then(() => {
                toRender = true;
            })
            .catch ((err) => {
                console.error(`Error: ${err}`);
                throw new Error(`Error: ${err}`)
            });
        } else {
            toRender = true;
        }
    } else {
        toRender = true;
    }
    // Wait until after the component updates to check if `jeep-sqlite` is defined
    afterUpdate(() => {
        if (!toRender) {
            return;
        }
    });

</script>

<div class="flex min-h-screen w-full flex-col bg-muted/40">
	<aside class="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
		<nav class="flex flex-col items-center gap-4 px-2 py-4">
			<Tooltip.Root>
				<Tooltip.Trigger asChild let:builder>
					<a
						href="/"
						class="flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:text-foreground md:h-8 md:w-8"
						class:text-accent-foreground={$page.url.pathname === "/"}
						class:bg-accent={$page.url.pathname === "/"}
						class:text-muted-foreground={$page.url.pathname !== "/"}
						use:builder.action
						{...builder}
					>
						<Home class="h-5 w-5" />
						<span class="sr-only">Dashboard</span>
					</a>
				</Tooltip.Trigger>
				<Tooltip.Content side="right">Dashboard</Tooltip.Content>
			</Tooltip.Root>
			<Tooltip.Root>
				<Tooltip.Trigger asChild let:builder>
					<a
						href="/kasse"
						class="flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:text-foreground md:h-8 md:w-8"
						class:text-accent-foreground={$page.url.pathname === "/kasse"}
						class:bg-accent={$page.url.pathname === "/kasse"}
						class:text-muted-foreground={$page.url.pathname !== "/kasse"}
						use:builder.action
						{...builder}
					>
						<ShoppingCart class="h-5 w-5" />
						<span class="sr-only">Bestellung</span>
					</a>
				</Tooltip.Trigger>
				<Tooltip.Content side="right">Bestellung</Tooltip.Content>
			</Tooltip.Root>
			<Tooltip.Root>
				<Tooltip.Trigger asChild let:builder>
					<a
						href="/produkte"
						class="flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:text-foreground md:h-8 md:w-8"
						class:text-accent-foreground={$page.url.pathname === "/produkte"}
						class:bg-accent={$page.url.pathname === "/produkte"}
						class:text-muted-foreground={$page.url.pathname !== "/produkte"}
						use:builder.action
						{...builder}
					>
						<Package class="h-5 w-5" />
						<span class="sr-only">Produkte</span>
					</a>
				</Tooltip.Trigger>
				<Tooltip.Content side="right">Produkte</Tooltip.Content>
			</Tooltip.Root>
			<Tooltip.Root>
				<Tooltip.Trigger asChild let:builder>
					<a
						href="/auswertung"
						class="flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:text-foreground md:h-8 md:w-8"
						class:text-accent-foreground={$page.url.pathname === "/auswertung"}
						class:bg-accent={$page.url.pathname === "/auswertung"}
						class:text-muted-foreground={$page.url.pathname !== "/auswertung"}
						use:builder.action
						{...builder}
					>
						<LineChart class="h-5 w-5" />
						<span class="sr-only">Auswertung</span>
					</a>
				</Tooltip.Trigger>
				<Tooltip.Content side="right">Auswertung</Tooltip.Content>
			</Tooltip.Root>
		</nav>
		<nav class="mt-auto flex flex-col items-center gap-4 px-2 py-4">
			<Tooltip.Root>
				<Tooltip.Trigger asChild let:builder>
					<a
						href="/einstellungen"
						class="flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:text-foreground md:h-8 md:w-8"
						class:text-accent-foreground={$page.url.pathname === "/einstellungen"}
						class:bg-accent={$page.url.pathname === "/einstellungen"}
						class:text-muted-foreground={$page.url.pathname !== "/einstellungen"}
						use:builder.action
						{...builder}
					>
						<Settings class="h-5 w-5" />
						<span class="sr-only">Settings</span>
					</a>
				</Tooltip.Trigger>
				<Tooltip.Content side="right">Settings</Tooltip.Content>
			</Tooltip.Root>
		</nav>
	</aside>
	<div class="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
		<header
			class="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6"
		>
			<Sheet.Root>
				<Sheet.Trigger asChild let:builder>
					<Button builders={[builder]} size="icon" variant="outline" class="sm:hidden">
						<PanelLeft class="h-5 w-5" />
						<span class="sr-only">Menu</span>
					</Button>
				</Sheet.Trigger>
				<Sheet.Content side="left" class="sm:max-w-xs">
					<nav class="grid gap-6 text-lg font-medium">
						<a
							href="/"
							class="flex items-center gap-4 px-2.5 hover:text-foreground"
							class:text-accent-foreground={$page.url.pathname === "/"}
							class:text-muted-foreground={$page.url.pathname !== "/"}
						>
							<Home class="h-5 w-5" />
							Dashboard
						</a>
						<a href="/kasse" 
							class="flex items-center gap-4 px-2.5 hover:text-foreground"
							class:text-accent-foreground={$page.url.pathname === "/kasse"}
							class:text-muted-foreground={$page.url.pathname !== "/kasse"}>
							<ShoppingCart class="h-5 w-5" />
							Erfassen
						</a>
						<a
							href="produkte"
							class="flex items-center gap-4 px-2.5 hover:text-foreground"
							class:text-accent-foreground={$page.url.pathname === "/produkte"}
							class:text-muted-foreground={$page.url.pathname !== "/produkte"}
						>
							<Package class="h-5 w-5" />
							Produkte
						</a>
						<a
							href="auswertung"
							class="flex items-center gap-4 px-2.5 hover:text-foreground"
							class:text-accent-foreground={$page.url.pathname === "/auswertung"}
							class:text-muted-foreground={$page.url.pathname !== "/auswertung"}
						>
							<LineChart class="h-5 w-5" />
							Auswertung
						</a>
					</nav>
				</Sheet.Content>
			</Sheet.Root>
			<Breadcrumb.Root class="hidden md:flex">
				<Breadcrumb.List>
					<Breadcrumb.Item>
						<Breadcrumb.Link href="kasse">Kasse</Breadcrumb.Link>
					</Breadcrumb.Item>
					<!--<Breadcrumb.Separator />
					<Breadcrumb.Item>
						<Breadcrumb.Link href="##">Orders</Breadcrumb.Link>
					</Breadcrumb.Item>
					<Breadcrumb.Separator />
					<Breadcrumb.Item>
						<Breadcrumb.Page>Recent Orders</Breadcrumb.Page>
					</Breadcrumb.Item>-->
				</Breadcrumb.List>
			</Breadcrumb.Root>
		</header>
		<main>
			<AppInitializer />
			<slot />
		</main>
	</div>
</div>
