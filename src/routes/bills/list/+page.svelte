<script lang="ts">
	import CreateBill from './components/CreateBill.svelte';
	import type { PageData } from './$types';
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';

	export let data: PageData;
	let isAddOpen = false;

	$: bills = data.bills ?? [];
	$: if (data.error && browser) {
		goto(`/error-page?msg=${data.error}`);
	}
	const toggleAddBill = () => {
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
		<CreateBill onClose={toggleAddBill} />
	{/if}
	<div class="flex flex-col gap-2">
		{#each bills as bill}
			<div class="border-solid border-2 border-slate-500">
				<p>{bill.title}</p>
				<p>payment: {bill.amount}</p>
				<p>balance: {bill.balance}</p>
			</div>
		{/each}
	</div>
</div>

<style>
</style>
