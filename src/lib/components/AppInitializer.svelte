<script>
    import appInitializer from "../database/database";
    import * as Alert from "./ui/alert";
    import TriangleAlert from 'lucide-svelte/icons/triangle-alert';

    let isError = false;


    appInitializer.initialize().then(() => {}).catch((e) => {
        isError = true;
        console.error(e);
    });

    
</script>

{#if isError}
<Alert.Root variant="destructive">
	<TriangleAlert class="h-4 w-4" />
	<Alert.Title>Error</Alert.Title>
	<Alert.Description
	  >Your session has expired. Please login again.</Alert.Description
	>
</Alert.Root>

{/if}


