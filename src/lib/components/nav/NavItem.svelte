<script lang="ts">
	export let isActive = false;
	$: twClass = `h-full border-b-2 hover:border-sky-600 ${
		isActive ? 'border-green-400' : 'border-transparent'
	}`;
</script>

<div class={twClass}>
	<slot />
</div>
