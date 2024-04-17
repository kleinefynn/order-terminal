<script lang="ts">
	import '../app.scss';
	import LineChart from 'lucide-svelte/icons/line-chart';
	import Package from 'lucide-svelte/icons/package';
	import PanelLeft from 'lucide-svelte/icons/panel-left';
	import Settings from 'lucide-svelte/icons/settings';
	import ShoppingCart from 'lucide-svelte/icons/shopping-cart';

	import Sun from 'lucide-svelte/icons/sun';
	import Moon from 'lucide-svelte/icons/moon';
	import { ModeWatcher } from 'mode-watcher';
	import { toggleMode } from 'mode-watcher';

	import * as Breadcrumb from '$lib/components/ui/breadcrumb/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Sheet from '$lib/components/ui/sheet/index.js';
	import * as Tooltip from '$lib/components/ui/tooltip/index.js';
	import { page } from '$app/stores';
	import { Toaster } from '$lib/components/ui/sonner';
</script>

<Toaster />
<ModeWatcher />

<div class="flex min-h-screen w-full flex-col bg-muted/40">
	<aside class="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
		<nav class="flex flex-col items-center gap-4 px-2 py-4">
			<!--<Tooltip.Root>
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
			</Tooltip.Root>-->
			<Tooltip.Root>
				<Tooltip.Trigger asChild let:builder>
					<a
						href="/erfassung"
						class="flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:text-foreground md:h-8 md:w-8"
						class:text-accent-foreground={$page.url.pathname === '/erfassung'}
						class:bg-accent={$page.url.pathname === '/erfassung'}
						class:text-muted-foreground={$page.url.pathname !== '/erfassung'}
						use:builder.action
						{...builder}
					>
						<ShoppingCart class="h-5 w-5" />
						<span class="sr-only">Erfassung</span>
					</a>
				</Tooltip.Trigger>
				<Tooltip.Content side="right">Erfassung</Tooltip.Content>
			</Tooltip.Root>
			<Tooltip.Root>
				<Tooltip.Trigger asChild let:builder>
					<a
						href="/produkte"
						class="flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:text-foreground md:h-8 md:w-8"
						class:text-accent-foreground={$page.url.pathname === '/produkte'}
						class:bg-accent={$page.url.pathname === '/produkte'}
						class:text-muted-foreground={$page.url.pathname !== '/produkte'}
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
						class:text-accent-foreground={$page.url.pathname === '/auswertung'}
						class:bg-accent={$page.url.pathname === '/auswertung'}
						class:text-muted-foreground={$page.url.pathname !== '/auswertung'}
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
						class:text-accent-foreground={$page.url.pathname === '/einstellungen'}
						class:bg-accent={$page.url.pathname === '/einstellungen'}
						class:text-muted-foreground={$page.url.pathname !== '/einstellungen'}
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
						<!--<a
							href="/"
							class="flex items-center gap-4 px-2.5 hover:text-foreground"
							class:text-accent-foreground={$page.url.pathname === "/"}
							class:text-muted-foreground={$page.url.pathname !== "/"}
						>
							<Home class="h-5 w-5" />
							Dashboard
						</a>-->
						<a
							href="/erfassung"
							class="flex items-center gap-4 px-2.5 hover:text-foreground"
							class:text-accent-foreground={$page.url.pathname === '/erfassung'}
							class:text-muted-foreground={$page.url.pathname !== '/erfassung'}
						>
							<ShoppingCart class="h-5 w-5" />
							Erfassen
						</a>
						<a
							href="produkte"
							class="flex items-center gap-4 px-2.5 hover:text-foreground"
							class:text-accent-foreground={$page.url.pathname === '/produkte'}
							class:text-muted-foreground={$page.url.pathname !== '/produkte'}
						>
							<Package class="h-5 w-5" />
							Produkte
						</a>
						<a
							href="auswertung"
							class="flex items-center gap-4 px-2.5 hover:text-foreground"
							class:text-accent-foreground={$page.url.pathname === '/auswertung'}
							class:text-muted-foreground={$page.url.pathname !== '/auswertung'}
						>
							<LineChart class="h-5 w-5" />
							Auswertung
						</a>
						<a
							href="einstellungen"
							class="flex items-center gap-4 px-2.5 hover:text-foreground"
							class:text-accent-foreground={$page.url.pathname === '/einstellungen'}
							class:text-muted-foreground={$page.url.pathname !== '/einstellungen'}
						>
							<Settings class="h-5 w-5" />
							Einstellungen
						</a>
					</nav>
				</Sheet.Content>
			</Sheet.Root>
			<Breadcrumb.Root class="hidden md:flex">
				<Breadcrumb.List>
					<Breadcrumb.Item>
						<Breadcrumb.Link href={$page.url.pathname}
							>{$page.url.pathname.charAt(1).toUpperCase() +
								$page.url.pathname.substring(2)}</Breadcrumb.Link
						>
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

			<div class="relative ml-auto flex-1 grow-0">
				<Button class="" on:click={toggleMode} variant="outline" size="icon">
					<Sun class="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
					<Moon
						class="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
					/>
					<span class="sr-only">Hell/Dunkel</span>
				</Button>
			</div>
		</header>
		<main>
			<slot />
		</main>
	</div>
</div>
