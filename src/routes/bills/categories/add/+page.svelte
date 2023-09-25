<script lang="ts">
	import { goto } from '$app/navigation';
	import { FormContainer } from '$lib/components/Common';
	import FormBody from '$lib/components/Common/FormBody.svelte';
	import { Input } from '$lib/components/Elements';
	import type { ActionData } from './$types';
	let title: string;
	let isSubmitting = false;
</script>

<svelte:head>
	<title>Add Category</title>
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
		onClose={() => goto('/bills/categories')}
		title="Add Category"
		{isSubmitting}
	>
		<Input name="title" val={title}>Category Name</Input>
	</FormBody>
</FormContainer>
