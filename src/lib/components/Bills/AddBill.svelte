<script lang="ts">
	import Input from '../Base/Input.svelte';
	import { slide } from 'svelte/transition';
	import Button from '../Base/Button.svelte';
	export let onClose: () => void;
	let amount: number;
	let balance: number;
	let dayDue: number;
	let limit: number;
	let rate: number;
	let title: string;
</script>

<div class="fixed top-0 left-0 w-full h-full bg-slate-600/75">
	<div transition:slide class="flex flex-col justify-center items-center h-full">
		<div class="flex flex-col justify-center w-96">
			<div class="flex justify-end w-full">
				<button on:click|stopPropagation={onClose}>X</button>
			</div>
			<form method="POST">
				<Input name="title" val={title}>Account Nickname</Input>
				<Input name="balance" val={balance} variant="number">Current Balance</Input>
				<Input name="amount" val={amount} variant="number">Payment Amount</Input>
				<Input name="daydue" val={dayDue} variant="number">Day of Month Due</Input>
				<Input name="limit" val={limit} variant="number">Credit Limit</Input>
				<Input name="rate" val={rate} variant="number" step="0.01">Interest Rate</Input>
				<div class="flex justify-end w-full gap-4">
					<Button
						on:click={(e) => {
							e.preventDefault();
							onClose();
						}}
						variant="negative">Cancel</Button
					>
					<Button type="submit">Submit</Button>
				</div>
			</form>
		</div>
	</div>
</div>
