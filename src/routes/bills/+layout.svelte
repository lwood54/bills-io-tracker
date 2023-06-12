<script lang="ts">
	import { slide } from 'svelte/transition';
	import { page } from '$app/stores';
	import NavItem from '$lib/components/nav/NavItem.svelte';
	$: pageRoute = $page.route.id;
</script>

<div class="flex bg-slate-600 px-4 py-2 gap-4">
	<NavItem href="/bills/logs" isActive={pageRoute === '/bills/logs'}>Logs</NavItem>
	<NavItem href="/bills/categories" isActive={pageRoute === '/bills/categories'}>Categories</NavItem
	>
	<NavItem href="/bills/list" isActive={pageRoute === '/bills/list'}>List</NavItem>
</div>
<slot />
