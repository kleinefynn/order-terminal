<script>
	import appInitializer from '../database/database';
	import { toast } from 'svelte-sonner';

	appInitializer
		.initialize()
		.then(() => {})
		.catch((e) => {
			toast.error('Schwerwiegender Fehler beim laden der App!', {
				description: e.toString(),
				duration: 99999,
				action: {
					label: 'Okay',
					onClick: () => {}
				}
			});
			console.error(e);
		});
</script>
