<script lang="ts">
	import { goto } from '$app/navigation';
	import { FormContainer } from '$lib/components/Common';
	import FormBody from '$lib/components/Common/FormBody.svelte';
	import { Input, Select } from '$lib/components/Elements';

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
		<Select options={categories} selectedValueId={categoryId} label="category" id="categoryId" />
		<Select
			options={[
				{ id: 'ESSENTIAL', label: 'Essential' },
				{ id: 'NEUTRAL', label: 'Neutral' },
				{ id: 'NON_ESSENTIAL', label: 'Non-Essential' }
			]}
			selectedValueId={scale}
			label="scale"
			id="scale"
		/>
		<Input name="createdAt" variant="date" val={createdAt}>Purchase Date</Input>
	</FormBody>
</FormContainer>
