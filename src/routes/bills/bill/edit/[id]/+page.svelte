<script lang="ts">
	import { goto } from '$app/navigation';
	import { FormContainer } from '$lib/components/Common';
	import FormBody from '$lib/components/Common/FormBody.svelte';
	import { Input } from '$lib/components/Elements';
	import type { ActionData, PageData } from './$types';

	export let data: PageData;

	$: bill = data.bill;
	$: amount = bill?.amount ?? 0;
	$: balance = bill?.balance ?? 0;
	$: dayDue = bill?.dayDue ?? 1;
	$: limit = bill?.limit ?? 0;
	$: rate = bill?.rate ?? 0;
	$: title = bill?.title ?? '';
	let isSubmitting = false;
</script>

<svelte:head>
	<title>Edit Bill</title>
</svelte:head>

<FormContainer
	action="?/update"
	formName="update-bill-form"
	method="POST"
	submittingCallback={(isFormSubmitting) => {
		isSubmitting = isFormSubmitting;
	}}
>
	<FormBody
		formName="update-bill-form"
		onClose={() => goto('/bills/list')}
		title="Edit Bill"
		{isSubmitting}
	>
		<Input name="title" val={title}>Account Nickname</Input>
		<Input name="balance" val={balance} variant="number">Current Balance</Input>
		<Input name="amount" val={amount} variant="number">Payment Amount</Input>
		<Input name="daydue" val={dayDue} variant="number">Day of Month Due</Input>
		<Input name="limit" val={limit} variant="number">Credit Limit</Input>
		<Input name="rate" val={rate} variant="number" step="0.01">Interest Rate</Input>
	</FormBody>
</FormContainer>
