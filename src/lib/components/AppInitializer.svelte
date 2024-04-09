<script>
    import appInitializer from "../database/database";
    import * as Alert from "./ui/alert";
    import TriangleAlert from 'lucide-svelte/icons/triangle-alert';

    let isError = false;

    let errorMessage = "";

    appInitializer.initialize().then(() => {}).catch((e) => {
        isError = true;
        errorMessage = e;
        console.error(e);
    });

    
</script>

{#if isError}
<Alert.Root variant="destructive" class="mx-auto my-4 w-1/2">
	<TriangleAlert class="h-4 w-4" />
	<Alert.Title>Error</Alert.Title>
	<Alert.Description
	  >{errorMessage}</Alert.Description
	>
</Alert.Root>

{/if}


