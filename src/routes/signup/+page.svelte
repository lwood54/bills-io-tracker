<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { FormContainer } from '$lib/components/Common';
	import FormBody from '$lib/components/Common/FormBody.svelte';
	import { Input } from '$lib/components/Elements';
	import type { ActionData, PageData } from './$types';

	export let form: ActionData;

	let username: string;
	let password: string;
	let email: string;
	let firstName: string;
	let lastName: string;
	let isSubmitting = false;

	$: if (form?.response.userId && browser) {
		// 	// NOTE: page is on sever before mounting, so need to check for browser to ensure
		// 	// this is now client-side. https://github.com/sveltejs/kit/discussions/3245
		goto('/');
	}
</script>

<svelte:head>
	<title>Sign Up</title>
	<meta name="description" content="Sign Up page" />
</svelte:head>

<FormContainer
	method="POST"
	formName="sign-up"
	submittingCallback={(isFormSubmitting) => {
		isSubmitting = isFormSubmitting;
	}}
>
	<FormBody {isSubmitting} formName="sign-up" title="Sign Up">
		<Input name="username" val={username}>Username</Input>
		<Input name="email" val={email}>Email</Input>
		<Input name="firstname" val={firstName}>First Name</Input>
		<Input name="lastname" val={lastName}>Last Name</Input>
		<Input name="password" variant="password" val={password}>Password</Input>
	</FormBody>
</FormContainer>

{#if form?.error}
	{form.error}
{/if}
{#if form?.response?.message?.includes('taken')}
	<p class="text-red-600 text-center">That email is already in use.</p>
{/if}

<style>
</style>
