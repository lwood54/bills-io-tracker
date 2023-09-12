<script lang="ts">
	import { enhance } from '$app/forms';
	import { Modal } from '$lib/components';
	import type { Bill } from '$lib/types/api/bills';

	export let isOpen: boolean;
	export let onClose: () => void;
	export let bill: Bill | undefined;
	let isSubmitting = false;
</script>

{#if isOpen && bill}
	<Modal {onClose} {isSubmitting} title="Remove Bill" formName="remove-bill">
		<div class="py-4">
			<form
				action={`?/remove&billId=${bill.id}`}
				id="remove-bill"
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
				<p>Are you sure you want to remove the bill "{bill.title}"?</p>
			</form>
		</div>
	</Modal>
{/if}
