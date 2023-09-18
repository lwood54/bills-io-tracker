<script lang="ts">
	import { slide } from 'svelte/transition';
	import { Button } from './Elements';
	import Spinner from './Elements/Spinner.svelte';
	export let onClose: () => void;
	export let title = '';
	export let formName = '';
	export let isSubmitting: boolean | undefined = false;
	export let submitLabel: string | undefined = 'Submit';
	export let cancelLabel: string | undefined = 'Cancel';
</script>

<div
	on:click={onClose}
	on:keydown={onClose}
	class="fixed top-0 left-0 w-full h-full bg-slate-600/75 z-50"
	id="background"
>
	<div transition:slide class="flex flex-col justify-center items-center h-full">
		<div
			on:click={(e) => e.stopPropagation()}
			on:keydown={(e) => e.stopPropagation()}
			class="flex relative flex-col justify-center w-96 bg-slate-800 p-4"
		>
			<h1 class="w-full text-center text-lg">{title}</h1>
			<div class="flex absolute top-0 right-0 justify-end w-full">
				<button
					on:click={(e) => {
						e.preventDefault();
						onClose();
					}}
					class="p-4">X</button
				>
			</div>
			<slot />
			<div class="flex justify-end w-full gap-4">
				<Button
					on:click={(e) => {
						e.preventDefault();
						onClose();
					}}
					variant="negative">{cancelLabel}</Button
				>
				<Button isDisabled={isSubmitting} {formName} type="submit">
					{#if isSubmitting}
						<Spinner variant="button" scale="xs" />
					{:else}
						{submitLabel}
					{/if}
				</Button>
			</div>
		</div>
	</div>
</div>
