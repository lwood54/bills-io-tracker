<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { FormContainer } from '$lib/components/Common';
	import FormBody from '$lib/components/Common/FormBody.svelte';
	import { Button, Input } from '$lib/components/Elements';
	import Spinner from '$lib/components/Elements/Spinner.svelte';
	import type { ActionData } from './$types';
	export let form: ActionData;
	let amount: number;
	let balance: number;
	let dayDue: number;
	let limit: number;
	let rate: number;
	let title: string;
	let isSubmitting = false;
	$: if (form?.isSuccess && browser) {
		goto('/bills/list');
	}
</script>

<svelte:head>
	<title>Add Bill</title>
</svelte:head>

<FormContainer
	formName="add-bill"
	method="POST"
	submittingCallback={(isFormSubmitting) => {
		isSubmitting = isFormSubmitting;
	}}
>
	<FormBody formName="add-bill" onClose={() => goto('/bills/list')} title="Add Bill" {isSubmitting}>
		<Input name="title" val={title}>Account Nickname</Input>
		<Input name="balance" val={balance} variant="number">Current Balance</Input>
		<Input name="amount" val={amount} variant="number">Payment Amount</Input>
		<Input name="daydue" val={dayDue} variant="number">Day of Month Due</Input>
		<Input name="limit" val={limit} variant="number">Credit Limit</Input>
		<Input name="rate" val={rate} variant="number" step="0.01">Interest Rate</Input>
	</FormBody>
</FormContainer>
