<script lang="ts">
	import CreateBill from './components/CreateBill.svelte';
	import type { PageData } from './$types';
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';
	import Icon from '@iconify/svelte';
	import { Button, Card } from '$lib/components/Elements';

	export let data: PageData;
	let isAddOpen = false;

	$: bills = data.bills ?? [];
	$: if (data.error && browser) {
		goto(`/error-page?msg=${data.error}`);
	}
	const toggleAddBill = () => {
		isAddOpen = !isAddOpen;
	};
	const handleCardClick = (id: string) => goto(`/bills/${id}`);
</script>

<h1 class="text-2xl">Bills</h1>
<div class="flex justify-end">
	<button class="p-2" on:click={toggleAddBill}>
		<Icon
			class="text-green-400 hover:text-green-600 active:text-green-200"
			icon="mdi:plus-circle-outline"
			width="45"
			height="45"
		/>
	</button>
</div>
{#if isAddOpen}
	<CreateBill onClose={toggleAddBill} />
{/if}
<div class="flex flex-col sm:flex-row sm:justify-center sm:flex-wrap gap-2 items-center">
	{#each bills as bill}
		<div
			on:click={() => goto(`/bills/${bill.id}`)}
			on:keydown={() => goto(`/bills/${bill.id}`)}
			class="w-full sm:w-[500px] border-solid border-2 border-slate-500 hover:bg-slate-600 hover:cursor-pointer"
		>
			<p>{bill.title}</p>
			<p>payment: {bill.amount}</p>
			<p>balance: {bill.balance}</p>
		</div>
	{/each}
</div>
