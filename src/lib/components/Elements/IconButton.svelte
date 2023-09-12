<script lang="ts">
	export let onClick: () => void;
</script>

<button
	class="w-25 h-25 p-1 rounded-full bg-gray-500 text-red-800 hover:text-red-900 active:text-red-600"
	on:click|stopPropagation={onClick}
>
	<slot />
</button>
