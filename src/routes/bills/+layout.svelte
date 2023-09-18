<script lang="ts">
	import { page } from '$app/stores';
	import NavItem from '$lib/components/nav/NavItem.svelte';
	import Icon from '@iconify/svelte';
	import { goto } from '$app/navigation';
	$: pageRoute = $page.route.id;

	const addItem = () => {
		const root = pageRoute?.split('/')[2];
		if (root) {
			const pathChunk = root === 'list' ? 'bill' : root;
			goto(`/bills/${pathChunk}/add`);
		}
	};
</script>

<div class="flex items-center h-16 justify-between bg-slate-600 px-4 py-2 gap-4">
	<div class="flex">
		<NavItem href="/bills/logs" isActive={pageRoute === '/bills/logs'}>Spending Logs</NavItem>
		<NavItem href="/bills/categories" isActive={pageRoute === '/bills/categories'}
			>Speding Categories</NavItem
		>
		<NavItem href="/bills/list" isActive={pageRoute === '/bills/list'}>Bills List</NavItem>
	</div>
	{#if pageRoute !== '/bills'}
		<button class="p-2 add-icon" on:click={addItem}>
			<Icon
				class="text-green-400 hover:text-green-600 active:text-green-200 w-full h-full"
				icon="mdi:plus-circle-outline"
			/>
		</button>
	{/if}
</div>

<slot />

<style>
	.add-icon {
		height: 45px;
		width: 45px;
		/* border: 1px solid blue; */
	}

	@media (min-width: 500px) {
		.add-icon {
			height: 65px;
			width: 65px;
			/* border: 2px solid green; */
		}
	}
</style>
