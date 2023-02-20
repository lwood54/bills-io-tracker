<script lang="ts">
	import { rootStore } from '$lib/stores/root';

	let username: string;
	let password: string;

	const clearStore = () => {
		$rootStore = {};
	};
</script>

<svelte:head>
	<title>Login</title>
	<meta name="description" content="Login page" />
</svelte:head>

{#if $rootStore.username}
	<h1>Welcome back {$rootStore.username}!</h1>
{:else}
	<form method="POST" action="?/login">
		<label
			>Username
			<div>
				<input class="text-field" name="username" type="text" bind:value={username} />
			</div>
		</label>
		<label
			>Password
			<div>
				<input name="password" type="password" bind:value={password} />
			</div>
		</label>
		<button type="submit">Submit</button>
	</form>
{/if}

<style>
	.text-field {
		color: black;
	}
</style>
