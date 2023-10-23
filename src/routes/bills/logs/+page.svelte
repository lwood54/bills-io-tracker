<script lang="ts">
	import type { PageData } from './$types';
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';
	import RemoveModal from './components/RemoveModal.svelte';
	import type { Log } from '$lib/types/api/bills';
	import { IconButton } from '$lib/components/Elements';
	import Icon from '@iconify/svelte';
	import { format } from 'date-fns';

	let isOpen = false;
	let selectedLog: Log | undefined = undefined;

	export let data: PageData;
	$: logs = data.logs ?? [];
	$: categories = data.categories ?? [];
	$: if (data.error && browser) {
		goto(`/error-page?msg=${data.error}`);
	}

	let date = new Date();
</script>

<svelte:head>
	<title>Spending Logs</title>
</svelte:head>

<div class="flex flex-col p-2 sm:p-4 items-center relative">
	<RemoveModal log={selectedLog} {isOpen} onClose={() => (isOpen = false)} />
	<h1 class="text-2xl mb-4">Spending Logs</h1>
	<div class="flex flex-col w-full sm:flex-row sm:justify-center sm:flex-wrap gap-2 items-center">
		{#each logs as log}
			<div class="flex w-full sm:w-fit relative">
				<div
					on:click={() => goto(`/bills/logs/edit/${log.id}`)}
					on:keydown={(key) => {
						if (key.key === 'Enter') {
							goto(`/bills/logs/edit/${log.id}`);
						}
					}}
					role="button"
					tabindex="0"
					class="w-full p-2 sm:w-[600px] border-solid border-2 border-slate-500 hover:bg-slate-600 hover:cursor-pointer"
				>
					<div>
						<h1 class="w-full text-lg">{log.title}</h1>
					</div>
					<div class="flex flex-wrap sm:flex-row flex-col mt-4">
						<p class="sm:w-1/2 w-full">Payment: {log.amount}</p>
						<p class="sm:w-1/2 w-full">
							Category: {categories.find((category) => category.id === log.categoryId)?.title}
						</p>
						<p class="sm:w-1/2 w-full">{log.scale}</p>
						<p class="sm:w-1/2 w-full">
							Purchase Date: {format(new Date(log.createdAt), 'MM/dd/yy')}
						</p>
					</div>
					<div class="absolute top-0 right-0 p-2">
						<IconButton
							onClick={() => {
								isOpen = true;
								selectedLog = log;
							}}
						>
							<Icon icon="mdi:delete" width="25" height="25" />
						</IconButton>
					</div>
				</div>
			</div>
		{/each}
	</div>
</div>

<!-- <h1>Spending Logs</h1>
<Card bg="bg-sky-400">
	{#each logs as log}
		<Card>
			<p>{log.title}</p>
			<p>{log.amount}</p>
			<p>{log.categoryId}</p>
			<p>{log.scale}</p>
			<p>{new Date(log.createdAt)}</p>
		</Card>
	{/each}
</Card>

<p>{date}</p>
<DateInput closeOnSelection format="MM/dd/yyyy HH:mm" bind:value={date} /> -->
