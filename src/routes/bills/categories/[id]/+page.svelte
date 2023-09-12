<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<svelte:head>
	<title>View Category</title>
</svelte:head>

<h1>Single Category Details</h1>
<p>Title: {data.category?.title}</p>
