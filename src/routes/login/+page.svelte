<script lang="ts">
	import { goto } from '$app/navigation';
	import type { ActionData, PageData } from './$types';
	import { browser } from '$app/environment';
	import { rootStore } from '$lib/stores/root';
	import { Input } from '$lib/components/Elements';
	import { FormContainer } from '$lib/components/Common';
	import FormBody from '$lib/components/Common/FormBody.svelte';

	let username: string;
	let password: string;
	let isSubmitting = false;
	export let data: PageData;
	export let form: ActionData;

	$: if (data.isLoggedIn && browser && $rootStore.username) {
		// NOTE: page is on sever before mounting, so need to check for browser to ensure
		// this is now client-side. https://github.com/sveltejs/kit/discussions/3245
		goto('/');
	}
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
