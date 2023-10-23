<script lang="ts">
	import type { Option } from '$lib/types/form';

	export let options: Option[];
	export let selectedValueId = '';
	export let label: string;
	export let id: string;
</script>

<label for={id}>{label}</label>
<select class="select" name={id} {id} value={selectedValueId}>
	{#each options as option}
		<option value={option.id}>{option.label || option.name || option.title}</option>
	{/each}
</select>
