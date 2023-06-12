<script lang="ts">
	import { DateInput, DatePicker } from 'date-picker-svelte';
	import Card from '$lib/components/Elements/Card.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	const logs = data.logs ?? [];

	let date = new Date();
</script>

<h1>Logs</h1>
<Card bg="bg-sky-400">
	{#each logs as log}
		<Card>
			<p>{log.title}</p>
			<p>{log.amount}</p>
			<p>{log.categoryId}</p>
			<p>{log.scale}</p>
			<p>{new Date(log.createdAt)}</p>
		</Card>
	{/each}
</Card>

<p>{date}</p>
<DateInput closeOnSelection format="MM/dd/yyyy HH:mm" bind:value={date} />
