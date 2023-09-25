<script lang="ts">
	import type { ActionData } from './$types';
	import { Input } from '$lib/components/Elements';
	import { FormContainer } from '$lib/components/Common';
	import FormBody from '$lib/components/Common/FormBody.svelte';

	let username: string;
	let password: string;
	let isSubmitting = false;
	export let form: ActionData;
</script>

<svelte:head>
	<title>Login</title>
	<meta name="description" content="Login page" />
</svelte:head>

<FormContainer
	action="?/login"
	method="POST"
	formName="login"
	submittingCallback={(isFormSubmitting) => {
		isSubmitting = isFormSubmitting;
	}}
>
	<FormBody formName="login" {isSubmitting} title="Login">
		<Input name="username" val={username}>Username</Input>
		<Input name="password" variant="password" val={password}>Password</Input>
	</FormBody>
</FormContainer>

{#if form?.error}
	<p>{form.error}</p>
	<a href="/signup">Want to Sign Up?</a>
	<a href="/reset">Want to Reset Password?</a>
{/if}
