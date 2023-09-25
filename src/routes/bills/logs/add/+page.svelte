<script lang="ts">
	import { goto } from '$app/navigation';
	import { FormContainer } from '$lib/components/Common';
	import FormBody from '$lib/components/Common/FormBody.svelte';
	import { Input } from '$lib/components/Elements';
	import type { Scale } from '$lib/types/api/bills';
	import type { PageData } from './$types';

	export let data: PageData;

	let amount: number;
	let categoryId: string;
	let createdAt: string;
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
		<!-- TODO: make real select component and bring in actual categories as options -->
		<label for="categoryId">Category</label>
		<select class="text-gray-500" name="categoryId" id="categoryId" bind:value={categoryId}>
			{#each categories as category}
				<option value={category.id}>{category.title}</option>
			{/each}
		</select>
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
