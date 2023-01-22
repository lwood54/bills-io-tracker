<script lang="ts">
	export let val: string | number;
	export let name: string;
	export let variant: 'text' | 'number' | 'password' = 'text';
	export let step: string | undefined = undefined;
</script>

<label>
	<slot />
	<div class="flex-initial w-64">
		{#if variant === 'password'}
			<input {name} type="password" bind:value={val} />
		{:else if variant === 'number'}
			<input {name} type="number" {step} bind:value={val} />
		{:else}
			<input {name} type="text" bind:value={val} />
		{/if}
	</div>
</label>
