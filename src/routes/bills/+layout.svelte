<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { TabAnchor, TabGroup } from '@skeletonlabs/skeleton';
	import IconWrapper from '$lib/components/IconWrapper/IconWrapper.svelte';
	$: pageRoute = $page.route.id;

	const addItem = () => {
		const root = pageRoute?.split('/')[2];
		if (root) {
			const pathChunk = root === 'list' ? 'bill' : root;
			goto(`/bills/${pathChunk}/add`);
		}
	};
</script>

<TabGroup
	justify="justify-center"
	active="variant-filled-primary"
	hover="hover:variant-soft-primary"
	flex="flex-1 lg:flex-none"
	rounded=""
	border=""
	class="bg-surface-100-800-token w-full"
>
	<TabAnchor class="w-36" href="/bills/list" selected={$page.url.pathname === '/bills/list'}>
		<svelte:fragment slot="lead">
			<IconWrapper icon="mdi:view-list-outline" />
		</svelte:fragment>
		<span>Bills</span>
	</TabAnchor>
	<TabAnchor
		class="w-36"
		href="/bills/categories"
		selected={$page.url.pathname === '/bills/categories'}
	>
		<svelte:fragment slot="lead">
			<IconWrapper icon="mdi:arrow-decision" />
		</svelte:fragment>
		<span>Categories</span>
	</TabAnchor>
	<TabAnchor class="w-36" href="/bills/logs" selected={$page.url.pathname === '/bills/logs'}>
		<svelte:fragment slot="lead">
			<IconWrapper icon="mdi:clipboard-text" />
		</svelte:fragment>
		<span>Logs</span>
	</TabAnchor>
	<TabAnchor class="w-36" on:click={addItem}>
		<svelte:fragment slot="lead">
			<IconWrapper icon="mdi:plus-circle-outline" />
		</svelte:fragment>
		<span>New</span>
	</TabAnchor>
</TabGroup>
<slot />
