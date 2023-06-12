<script lang="ts">
	import { rootStore } from '$lib/stores/root';
	import type { PageData } from './$types';
	import { page } from '$app/stores';
	import './styles.css';
	import '../app.css';
	import NavItem from '$lib/components/nav/NavItem.svelte';

	export let data: PageData;
	$: pageRoute = $page.route.id;
	$: logoutQueryParam = $page.route.id === '/login' ? '?src=login' : '';
	$: {
		$rootStore = { email: data.userInfo?.email, username: data.userInfo?.username };
	}

	const clearStore = () => {
		$rootStore = {};
	};
</script>

<div class="flex bg-slate-800 px-4 py-2 justify-between">
	<div class="flex gap-4">
		<NavItem isActive={pageRoute === '/'}>
			<a href="/">Home</a>
		</NavItem>
		{#if $rootStore.username}
			<NavItem isActive={Boolean(pageRoute?.includes('/bills'))}>
				<a href="/bills">Bills</a>
			</NavItem>
		{/if}
	</div>
	<div class="nav-group-2">
		{#if $rootStore.username}
			<NavItem>
				<a
					data-sveltekit-preload-data="tap"
					href={`/logout${logoutQueryParam}`}
					on:click={clearStore}>Logout</a
				>
			</NavItem>
		{:else if $page.route.id === '/login'}
			<NavItem>
				<a href="/signup">Sign Up</a>
			</NavItem>
		{:else}
			<NavItem>
				<a href="/login">Login</a>
			</NavItem>
		{/if}
	</div>
</div>
<slot />
