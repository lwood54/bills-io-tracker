<script lang="ts">
	import AddBill from '$lib/components/Bills/AddBill.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	let isAddOpen = false;

	const toggleAddBill = () => {
		console.log('toggling');
		isAddOpen = !isAddOpen;
	};
</script>

<h1>Bills</h1>
<div>
	{#if isAddOpen}
		<button on:click={toggleAddBill}>-</button>
	{:else}
		<button on:click={toggleAddBill}>+</button>
	{/if}
	{#if isAddOpen}
		<AddBill onClose={toggleAddBill} />
	{/if}
	{#if data.bills}
		{#each data.bills as bill}
			<p>{bill.title}</p>
			<p>payment: {bill.amount}</p>
			<p>balance: {bill.balance}</p>
		{/each}
	{/if}
</div>

<style>
</style>
