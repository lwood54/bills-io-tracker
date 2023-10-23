<script lang="ts">
	export let val: string | number | Date;
	export let name: string;
	export let variant: 'currency' | 'date' | 'text' | 'number' | 'password' = 'text';
	export let step: string | undefined = undefined;
</script>

<label class="label">
	<slot />
	<div>
		{#if variant === 'password'}
			<input class="input" {name} type="password" bind:value={val} />
		{:else if variant === 'number'}
			<input class="input" {name} type="number" {step} bind:value={val} />
		{:else if variant === 'currency'}
			<input class="input" {name} min={0} type="number" {step} bind:value={val} />
		{:else if variant === 'date'}
			<input class="input" {name} type="date" {step} bind:value={val} />
		{:else}
			<input class="input" {name} type="text" bind:value={val} />
		{/if}
	</div>
</label>
