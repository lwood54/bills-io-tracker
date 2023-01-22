<script lang="ts">
	import { rootStore } from '$lib/stores/root';
	import type { PageData } from './$types';
	import { page } from '$app/stores';
	import './styles.css';
	import '../app.css';

	export let data: PageData;

	$: path = $page.route.id === '/login' ? '?src=login' : '';

	$: {
		$rootStore = { email: data.userInfo?.email, username: data.userInfo?.username };
	}

	const clearStore = () => {
		$rootStore = {};
	};
</script>

<div class="nav-container">
	<div class="nav-group-1">
		<a href="/">Home</a>
		<a href="/bills">Bills</a>
	</div>
	<div class="nav-group-2">
		{#if $rootStore.username}
			<a href={`/logout${path}`} on:click={clearStore}>logout</a>
		{:else}
			<a href="/login">Login</a>
		{/if}
	</div>
</div>

<slot />

<style>
	.nav-container {
		display: flex;
		background-color: var(--color-bg-0);
		justify-content: space-between;
	}
	.nav-group-1,
	.nav-group-2 {
		padding: var(--spacing-m);
	}
	.nav-group-1:hover a,
	.nav-group-2:hover a {
		background-color: white;
	}
	a {
		margin: 0;
	}
</style>
