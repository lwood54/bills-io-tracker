<script lang="ts">
	export let type: undefined | 'button' | 'submit' = 'submit';
	export let variant: undefined | 'negative' | 'positive' = 'positive';
</script>

<button
	type={type === 'submit' ? 'submit' : 'button'}
	class="
  {variant === 'positive' ? 'bg-green-500' : 'bg-red-500'} rounded-full px-3 py-1
  {variant === 'positive' ? 'hover:bg-green-600' : 'hover:bg-red-600'}
  {variant === 'positive' ? 'focus:bg-green-800' : 'focus:bg-red-800'}
  "
	on:click
	on:mouseover
	on:mouseenter
	on:mouseleave
	on:focus><slot /></button
>
