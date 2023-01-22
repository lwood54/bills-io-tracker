<script lang="ts">
	import type { ActionData } from './$types';

	export let form: ActionData;

	$: {
		console.log('user', form?.user);
	}
	let username: string;
	let password: string;
	let email: string;
	let firstName: string;
	let lastName: string;
</script>

<svelte:head>
	<title>Login</title>
	<meta name="description" content="Login page" />
</svelte:head>

<form method="POST">
	<label
		>Username
		<div>
			<input name="username" type="text" bind:value={username} />
		</div>
	</label>
	<label
		>Email
		<div>
			<input name="email" type="email" bind:value={email} />
		</div>
	</label>
	<label
		>First Name
		<div>
			<input name="firstname" type="text" bind:value={firstName} />
		</div>
	</label>
	<label
		>Last Name
		<div>
			<input name="lastname" type="text" bind:value={lastName} />
		</div>
	</label>
	<label
		>Password
		<div>
			<input name="password" type="password" bind:value={password} />
		</div>
	</label>
	<button type="submit">Sign Me Up!</button>
</form>
{#if form?.error}
	{form.error}
{/if}

<style>
</style>
