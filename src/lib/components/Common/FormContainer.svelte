<script lang="ts">
	import { enhance } from '$app/forms';
	import { Button } from '../Elements';
	import Spinner from '../Elements/Spinner.svelte';
	export let showButton: boolean | undefined = true;
	export let action: string | undefined = undefined;
	export let buttonLabel: string;
	export let buttonType: 'submit' | 'button' = 'button';
	export let formName: string;
	export let isSubmitting = false;
	export let method: 'POST';
	export let onClose: (() => void) | undefined;
	export let submittingCallback: ((isAction: boolean) => void) | undefined = undefined;
</script>

<form
	{action}
	id={formName}
	{method}
	use:enhance={() => {
		submittingCallback && submittingCallback(true);
		return async ({ result, update }) => {
			console.info({ result___: result });
			update();
			if (result.type === 'success') {
				submittingCallback && submittingCallback(false);
			}
		};
	}}
>
	<slot />
	{#if showButton}
		<div class="flex justify-end w-full gap-4 mt-4">
			<Button
				on:click={(e) => {
					e.preventDefault();
					onClose && onClose();
				}}
				variant="negative">Cancel</Button
			>
			<Button isDisabled={isSubmitting} {formName} type={buttonType}>
				{#if isSubmitting}
					<Spinner variant="button" scale="xs" />
				{:else}
					{buttonLabel}
				{/if}
			</Button>
		</div>
	{/if}
</form>
