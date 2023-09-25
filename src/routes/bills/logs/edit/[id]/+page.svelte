<script lang="ts">
	import { goto } from '$app/navigation';
	import { FormContainer } from '$lib/components/Common';
	import FormBody from '$lib/components/Common/FormBody.svelte';
	import { Input } from '$lib/components/Elements';

	import { format } from 'date-fns';
	import type { PageData } from './$types';

	export let data: PageData;

	let isSubmitting = false;

	$: log = data.log;

	$: categoryId = log?.categoryId;
	$: scale = log?.scale;
	$: title = log?.title ?? '';
	$: amount = Number(log?.amount);
	$: createdAt = log?.createdAt
		? format(new Date(log.createdAt), 'yyyy-MM-dd')
		: new Date(Date.now());
	$: categories = data.categories ?? [];
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
		<select class="text-gray-500" name="categoryId" id="categoryId" value={categoryId}>
			{#each categories as category}
				<option value={category.id}>{category.title}</option>
			{/each}
		</select>
		<label for="scale">Scale</label>
		<select class="text-gray-500" name="scale" id="scale" value={scale}>
			<option value="ESSENTIAL">Essential</option>
			<option value="NEUTRAL">Neutral</option>
			<option value="NON_ESSENTIAL">Non-Essential</option>
		</select>
		<!-- TODO: customize Input component to take date type, then display a date display -->
		<label for="categoryId">Purchase Date</label>
		<input class="text-gray-500" id="createdAt" name="createdAt" type="date" value={createdAt} />
	</FormBody>
</FormContainer>
<!-- <Toast show={showToast} message="Bill updated." variant="success" /> -->
