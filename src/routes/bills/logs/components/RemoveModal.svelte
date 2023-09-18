<script lang="ts">
	import { enhance } from '$app/forms';
	import { Modal } from '$lib/components';
	import type { Log } from '$lib/types/api/bills';

	export let isOpen: boolean;
	export let onClose: () => void;
	export let log: Log | undefined;
	let isSubmitting = false;
</script>

{#if isOpen && log}
	<Modal {onClose} {isSubmitting} submitLabel="Remove" title="Remove Log" formName="remove-log">
		<div class="py-4">
			<form
				action={`?/remove&logId=${log.id}`}
				id="remove-log"
				method="POST"
				use:enhance={() => {
					isSubmitting = true;
					return async ({ result, update }) => {
						update();
						if (result.type === 'success') {
							isSubmitting = false;
							onClose();
						}
					};
				}}
			>
				<p>Are you sure you want to remove the log "{log.title}"?</p>
			</form>
		</div>
	</Modal>
{/if}
