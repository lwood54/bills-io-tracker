<script lang="ts">
	import { goto } from '$app/navigation';
	import { FormContainer } from '$lib/components/Common';
	import FormBody from '$lib/components/Common/FormBody.svelte';
	import { Input } from '$lib/components/Elements';
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
	$: category = data.category;
	$: title = category?.title ?? '';
	let isSubmitting = false;
</script>

<svelte:head>
	<title>Edit Category</title>
</svelte:head>

<FormContainer
	action="?/update"
	formName="update-category-form"
	method="POST"
	submittingCallback={(isFormSubmitting) => {
		isSubmitting = isFormSubmitting;
	}}
>
	<FormBody
		formName="update-category-form"
		onClose={() => goto('/bills/categories')}
		title="Edit Category"
		{isSubmitting}
	>
		<Input name="title" val={title}>Account Nickname</Input>
	</FormBody>
</FormContainer>
<!-- <Toast show={showToast} message="Bill updated." variant="success" /> -->
