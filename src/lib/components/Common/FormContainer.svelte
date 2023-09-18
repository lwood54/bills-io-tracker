<script lang="ts">
	import { enhance } from '$app/forms';
	export let action: string | undefined = undefined;
	export let formName: string;
	export let method: 'POST';
	export let submittingCallback: ((isAction: boolean) => void) | undefined = undefined;
</script>

<form
	{action}
	id={formName}
	{method}
	use:enhance={() => {
		submittingCallback && submittingCallback(true);
		return async ({ result, update }) => {
			update();
			if (result.type === 'success') {
				submittingCallback && submittingCallback(false);
			}
		};
	}}
>
	<slot />
</form>
