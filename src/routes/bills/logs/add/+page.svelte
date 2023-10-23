<script lang="ts">
	import { goto } from '$app/navigation';
	import { FormContainer } from '$lib/components/Common';
	import FormBody from '$lib/components/Common/FormBody.svelte';
	import { Input, Select } from '$lib/components/Elements';
	import type { Scale } from '$lib/types/api/bills';
	import { format } from 'date-fns';
	import type { PageData } from './$types';

	export let data: PageData;

	let amount: number;
	let categoryId: string;
	let createdAt: string = format(new Date(Date.now()), 'yyyy-MM-dd');
	let scale: Scale;
	let title: string;
	let isSubmitting = false;

	$: categories = data.categories ?? [];
</script>

<svelte:head>
	<title>Spending Log</title>
</svelte:head>

<FormContainer
	formName="add-category"
	method="POST"
	submittingCallback={(isFormSubmitting) => {
		isSubmitting = isFormSubmitting;
	}}
>
	<FormBody
		formName="add-category"
		onClose={() => goto('/bills/logs')}
		title="Spending Log"
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
