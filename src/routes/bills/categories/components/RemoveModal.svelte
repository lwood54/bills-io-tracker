<script lang="ts">
	import { enhance } from '$app/forms';
	import { Modal } from '$lib/components';
	import type { Category } from '$lib/types/api/bills';

	export let isOpen: boolean;
	export let onClose: () => void;
	export let category: Category | undefined;
	let isSubmitting = false;
</script>

{#if isOpen && category}
	<Modal
		{onClose}
		{isSubmitting}
		submitLabel="Remove"
		title="Remove Category"
		formName="remove-category"
	>
		<div class="py-4">
			<form
				action={`?/remove&categoryId=${category.id}`}
				id="remove-category"
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
				<p>Are you sure you want to remove the category "{category.title}"?</p>
			</form>
		</div>
	</Modal>
{/if}
