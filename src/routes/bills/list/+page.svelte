<script lang="ts">
	import CreateBill from './components/CreateBill.svelte';
	import type { PageData } from './$types';
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';
	import Icon from '@iconify/svelte';

	export let data: PageData;
	let isAddOpen = false;

	$: bills = data.bills ?? [];
	$: if (data.error && browser) {
		goto(`/error-page?msg=${data.error}`);
	}
	const toggleAddBill = () => {
		isAddOpen = !isAddOpen;
	};
	const handleDelete = () => {
		console.info('deleting...');
	};
	const formatDate = (date: Date) => {
		return `${date.toLocaleDateString()} at ${date.toLocaleTimeString([], {
			hour: 'numeric',
			minute: 'numeric'
		})}`;
	};
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
		<div class="flex">
			<div
				on:click={() => goto(`/bills/${bill.id}`)}
				on:keydown={() => goto(`/bills/${bill.id}`)}
				class="w-full p-2 sm:w-[600px] border-solid border-2 border-slate-500 hover:bg-slate-600 hover:cursor-pointer"
			>
				<div class="relative">
					<div class="absolute flex w-full group">
						<h1 class="w-full text-lg">{bill.title}</h1>
						<button
							class="invisible group-hover:visible p-1 rounded-full bg-gray-500 text-red-800 hover:text-red-900 active:text-red-600"
							on:click|stopPropagation={handleDelete}
						>
							<Icon icon="mdi:delete" width="25" height="25" />
						</button>
					</div>
				</div>
				<div class="flex flex-wrap sm:flex-row flex-col mt-8">
					<p class="sm:w-1/2 w-full">Payment: {bill.amount}</p>
					<p class="sm:w-1/2 w-full">Current Balance: {bill.balance}</p>
					<p class="sm:w-1/2 w-full">Day of Month due: {bill.dayDue}</p>
					<p class="sm:w-1/2 w-full">Credit Limit: {bill.limit}</p>
					<p class="sm:w-1/2 w-full">Interest Rate: {bill.rate}</p>
					<p class="sm:w-1/2 w-full">Last updated: {formatDate(new Date(bill.updatedAt))}</p>
				</div>
			</div>
			<!-- <div class="flex justify-end">
				<button class="p-2" on:click={toggleAddBill}>
					<Icon
						class="text-red-800 hover:text-red-900 active:text-red-600"
						icon="mdi:delete"
						width="45"
						height="45"
					/>
				</button>
			</div> -->
		</div>
	{/each}
</div>
