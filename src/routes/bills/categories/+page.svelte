<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
	const categories = data.categories ?? [];
</script>

<h1>Categories</h1>

<div class="flex flex-col gap-2">
	{#each categories as category}
		<div class="border-solid border-2 border-slate-500">
			<p>{category.title}</p>
		</div>
	{/each}
</div>
