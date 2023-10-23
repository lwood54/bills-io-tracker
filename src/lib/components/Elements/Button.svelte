<script lang="ts">
	import Icon from '@iconify/svelte';

	export let isDisabled: boolean | undefined = false;
	export let type: undefined | 'button' | 'submit' = 'submit';
	export let variant: undefined | 'negative' | 'secondary' | 'primary' | 'success' = 'primary';
	export let formName = '';
	export let icon: string = '';
	const getButtonClass = () => {
		switch (variant) {
			case 'negative':
				return 'btn variant-ghost-error';
			case 'secondary':
				return 'btn variant-ghost-secondary';
			default:
				return 'btn variant-ghost-primary';
		}
	};
</script>

<!-- NOTE: directly passing on:click, etc allows direct usage with props -->
<button
	disabled={isDisabled}
	form={formName}
	type={type === 'submit' ? 'submit' : 'button'}
	class={getButtonClass()}
	on:click
	on:mouseover
	on:mouseenter
	on:mouseleave
	on:focus
>
	{#if icon}
		<Icon {icon} width="28" height="28" />
	{/if}
	<span><slot /></span>
</button>
