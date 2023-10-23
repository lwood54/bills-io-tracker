<script lang="ts">
	import { rootStore } from '$lib/stores/root';
	import type { PageData, SubmitFunction } from './$types';
	import { page } from '$app/stores';
	import './styles.css';
	import '../app.css';
	import { AppRail, AppRailAnchor, AppShell, LightSwitch } from '@skeletonlabs/skeleton';
	import { invalidateAll } from '$app/navigation';
	import IconWrapper from '$lib/components/IconWrapper/IconWrapper.svelte';

	export let data: PageData;

	$: logoutQueryParam = $page.route.id === '/login' ? '?src=login' : '';
	$: {
		$rootStore = { email: data.userInfo?.email, username: data.userInfo?.username };
	}

	const clearStore = () => {
		invalidateAll();
	};
</script>

<AppShell>
	<svelte:fragment slot="sidebarLeft">
		{#if data.isLoggedIn}
			<AppRail>
				<AppRailAnchor
					on:click={clearStore}
					href={`/logout${logoutQueryParam}`}
					data-sveltekit-preload-data="tap"
				>
					<IconWrapper icon="mdi:logout" />
					<span>Logout</span>
				</AppRailAnchor>
				<AppRailAnchor selected={$page.route.id === '/'} href="/">
					<IconWrapper icon="mdi-light:home" />
					<span>Home</span>
				</AppRailAnchor>
				<AppRailAnchor selected={$page.route.id?.includes('/bills')} href="/bills/list">
					<IconWrapper icon="mdi:trending-down" />
					<span>Bills</span>
				</AppRailAnchor>
				<AppRailAnchor selected={$page.route.id === '/user'} href="/user">
					<IconWrapper icon="mdi:account-circle-outline" />
					<span>User</span>
				</AppRailAnchor>
				<div class="flex justify-center items-center w-20 h-20">
					<LightSwitch />
				</div>
			</AppRail>
		{:else}
			<AppRail>
				<AppRailAnchor selected={$page.route.id === '/login'} href="/login">
					<IconWrapper icon="mdi:login" />
					<span>Login</span>
				</AppRailAnchor>
				<AppRailAnchor selected={$page.route.id === '/signup'} href="/signup">
					<IconWrapper icon="mdi:account-plus-outline" />
					<span>Sign Up</span>
				</AppRailAnchor>
			</AppRail>
		{/if}
	</svelte:fragment>
	<slot />
	<svelte:fragment slot="pageFooter">Page Footer</svelte:fragment>
</AppShell>
