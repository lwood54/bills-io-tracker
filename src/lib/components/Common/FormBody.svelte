<script lang="ts">
	import { Button } from '../Elements';
	import Spinner from '../Elements/Spinner.svelte';

	export let title: string | undefined = undefined;
	export let onClose: (() => void) | undefined = undefined;
	export let isSubmitting: boolean;
	export let formName: string;
	export let primaryButtonType: 'button' | 'submit' = 'submit';
	export let primaryButtonLabel: string | undefined = 'Submit';
</script>

<div class="flex flex-col p-4 gap-4 items-center">
	{#if title}
		<h1 class="text-xl">{title}</h1>
	{/if}
	<div class="w-full lg:w-[500px]">
		<div class="flex flex-col gap-2">
			<slot />
		</div>
		<div class="flex justify-end w-full gap-4 mt-4">
			<Button
				on:click={(e) => {
					e.preventDefault();
					onClose && onClose();
				}}
				variant="negative">Cancel</Button
			>
			<Button isDisabled={isSubmitting} {formName} type={primaryButtonType}>
				{#if isSubmitting}
					<Spinner variant="button" scale="xs" />
				{:else}
					{primaryButtonLabel}
				{/if}
			</Button>
		</div>
	</div>
</div>
