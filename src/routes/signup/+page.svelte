<script lang="ts">
	import { FormContainer } from '$lib/components/Common';
	import { Input } from '$lib/components/Elements';
	import type { ActionData } from './$types';

	export let form: ActionData;

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

<FormContainer
	method="POST"
	formName="sign-up"
	title="Login"
	buttonLabel="Sign me up!"
	buttonType="submit"
>
	<Input name="username" val={username}>Username</Input>
	<Input name="email" val={email}>Email</Input>
	<Input name="firstname" val={firstName}>First Name</Input>
	<Input name="lastname" val={lastName}>Last Name</Input>
	<Input name="password" variant="password" val={password}>Password</Input>
</FormContainer>

{#if form?.error}
	{form.error}
{/if}

<style>
</style>
