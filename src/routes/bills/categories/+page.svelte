<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { IconButton } from '$lib/components/Elements';
	import Icon from '@iconify/svelte';
	import type { ActionData, PageData } from './$types';
	import type { Category } from '$lib/types/api/bills';
	import RemoveModal from './components/RemoveModal.svelte';
	export let data: PageData;
	export let form: ActionData;

	let isOpen = false;
	let selectedCategory: Category | undefined;

	$: categories = data.categories ?? [];
	$: if (data.error && browser) {
		goto(`/error-page?msg=${data.error}`);
	}
</script>

<svelte:head>
	<title>Categories List</title>
</svelte:head>

<div class="flex flex-col p-2 sm:p-4 items-center relative">
	<RemoveModal
		isSubmitting={Boolean(form && !form?.isRemoved)}
		category={selectedCategory}
		{isOpen}
		onClose={() => (isOpen = false)}
	/>
	<h1 class="text-2xl mb-4">Categories</h1>
	{#if form?.error}
		<p class="text-red-500">{form.error}</p>
	{/if}
	<div class="flex flex-col w-full sm:flex-row sm:justify-center sm:flex-wrap gap-2 items-center">
		{#each categories as category}
			<div class="flex w-full sm:w-fit relative">
				<div
					on:click={() => goto(`/bills/categories/edit/${category.id}`)}
					on:keydown={(key) => {
						if (key.key === 'Enter') {
							goto(`/bills/categories/edit/${category.id}`);
						}
					}}
					role="button"
					tabIndex="0"
					class="w-full p-2 sm:w-[600px] border-solid border-2 border-slate-500 hover:bg-slate-600 hover:cursor-pointer"
				>
					<div>
						<h1 class="w-full text-lg">{category.title}</h1>
					</div>
					<div class="absolute top-0 right-0 p-2">
						<IconButton
							onClick={() => {
								isOpen = true;
								selectedCategory = category;
							}}
						>
							<Icon icon="mdi:delete" width="25" height="25" />
						</IconButton>
					</div>
				</div>
			</div>
		{/each}
	</div>
</div>

<!-- <div class="flex flex-col gap-2">
	{#each categories as category}
		<div class="border-solid border-2 border-slate-500">
			<p>{category.title}</p>
		</div>
	{/each}
</div> -->
