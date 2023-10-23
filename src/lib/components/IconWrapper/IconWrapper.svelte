<script lang="ts">
	import Icon from '@iconify/svelte';

	export let icon: string;
	export let width = 28;
	export let height = 28;
</script>

<div class="flex justify-center">
	<Icon {icon} {width} {height} />
</div>
