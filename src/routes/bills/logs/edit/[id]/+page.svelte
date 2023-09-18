<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { FormContainer } from '$lib/components/Common';
	import FormBody from '$lib/components/Common/FormBody.svelte';
	import { Input } from '$lib/components/Elements';
	import { format } from 'date-fns';
	// import Toast from '$lib/components/Elements/Toast.svelte';
	import type { ActionData, PageData } from './$types';

	export let data: PageData;
	export let form: ActionData;
	$: showToast = form?.isSuccess;
	// $: if (showToast) {
	// 	setTimeout(() => {
	// 		showToast = false;
	// 	}, 3_000);
	// }
	$: log = data.log;
	$: title = log?.title ?? '';
	$: amount = Number(log?.amount);
	$: categoryId = log?.categoryId;
	$: createdAt = log?.createdAt ? format(new Date(log.createdAt), 'yyyy-MM-dd') : undefined;
	$: scale = log?.scale ?? '';
	let isSubmitting = false;
	$: if (form?.isSuccess && browser) {
		goto('/bills/logs');
	}
</script>

<svelte:head>
	<title>Edit Log</title>
</svelte:head>

<FormContainer
	action="?/update"
	formName="update-log-form"
	method="POST"
	submittingCallback={(isFormSubmitting) => {
		isSubmitting = isFormSubmitting;
	}}
>
	<FormBody
		formName="update-log-form"
		onClose={() => goto('/bills/logs')}
		title="Edit Log"
		{isSubmitting}
	>
		<Input name="title" val={title}>Log Name</Input>
		<Input name="amount" val={amount} variant="currency" step=".01">Amount</Input>
		<!-- TODO: make real select component and bring in actual categories as options -->
		<label for="categoryId">Category</label>
		<select class="text-gray-500" name="categoryId" id="categoryId" bind:value={categoryId}>
			<option value="83826113-d6f8-46fd-9475-0a821b0680d3">Restaurants</option>
			<option value="2d9030a6-7288-4a9c-8780-3c8de7312430">Groceries</option>
		</select>
		<!-- <Input name="categoryId" val={categoryId}>Category</Input> -->
		<!-- <Input name="scale" val={scale}>Scale</Input> -->
		<label for="scale">Scale</label>
		<select class="text-gray-500" name="scale" id="scale" bind:value={scale}>
			<option value="ESSENTIAL">Essential</option>
			<option value="NEUTRAL">Neutral</option>
			<option value="NON_ESSENTIAL">Non-Essential</option>
		</select>
		<!-- <Input name="createdAt" val={createdAt}>Purchase Date</Input> -->
		<!-- TODO: customize Input component to take date type, then display a date display -->
		<label for="categoryId">Purchase Date</label>
		<input class="text-gray-500" id="createdAt" name="createdAt" type="date" value={createdAt} />
	</FormBody>
</FormContainer>
<!-- <Toast show={showToast} message="Bill updated." variant="success" /> -->
