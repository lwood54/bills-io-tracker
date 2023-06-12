<script lang="ts">
	import { page } from '$app/stores';
	import NavItem from '$lib/components/nav/NavItem.svelte';
	$: pageRoute = $page.route.id;
</script>

<div class="flex bg-slate-600 px-4 py-2 gap-4">
	<NavItem isActive={pageRoute === '/bills/logs'}>
		<a href="/bills/logs">Logs</a>
	</NavItem>
	<NavItem isActive={pageRoute === '/bills/categories'}>
		<a href="/bills/categories">Categories</a>
	</NavItem>
	<NavItem isActive={pageRoute === '/bills/list'}>
		<a href="/bills/list">List</a>
	</NavItem>
</div>
<slot />
