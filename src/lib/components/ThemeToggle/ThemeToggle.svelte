<script lang="ts">
	import { browser } from '$app/environment';
	import { enhance } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { onMount, tick } from 'svelte';
	import Button from '../Elements/Button.svelte';
	let colorTheme: string;
	let colorThemeForm: HTMLFormElement;

	const themes = [
		'crimson',
		'gold-nouveau',
		'hamlindigo',
		'modern',
		'rocket',
		'sahara',
		'seafoam',
		'skeleton',
		'vintage',
		'wintry'
	];

	onMount(() => {
		if (browser) {
			colorTheme = document.body.getAttribute('data-theme') ?? '';
		}
	});

	// const submitThemeMode: SubmitFunction = ({ action }) => {
	// 	const themeMode = action.searchParams.get('thememode');
	// 	if (themeMode) {
	// 		const isDarkMode = themeMode === 'dark';
	// 		if (isDarkMode) {
	// 			document.documentElement.classList.remove('light');
	// 			document.documentElement.classList.add('dark');
	// 		} else {
	// 			document.documentElement.classList.remove('dark');
	// 			document.documentElement.classList.add('light');
	// 		}
	// 	}
	// 	return async ({ update }) => {
	// 		update({ reset: false });
	// 	};
	// };

	const submitColorTheme: SubmitFunction = ({ action }) => {
		const colorTheme = action.searchParams.get('colortheme');
		if (colorTheme) {
			document.body.setAttribute('data-theme', colorTheme);
		}
		return async ({ update }) => {
			update({ reset: false });
		};
	};
</script>

<!-- <form
		bind:this={themeModeForm}
		method="POST"
		action={`/?/setTheme&thememode=${isDark ? 'dark' : 'light'}`}
		use:enhance={submitThemeMode}
	>
		<div class="flex flex-col items-center gap-2 justify-evenly w-40">
			{#if isDark}
				<Icon icon="mdi:moon-waxing-crescent" width="28" height="28" />
			{:else}
				<Icon icon="mdi:weather-sunny" width="28" height="28" />
			{/if}
			<SlideToggle
				on:change={() => {
					themeModeForm.requestSubmit();
				}}
				name="slide"
				bind:checked={isDark}
				size="sm"
			/>
		</div>
	</form> -->

<div class="flex flex-col p-4 gap-4 items-center">
	<div class="w-full lg:w-[500px]">
		<form
			action={`/?/setTheme&colortheme=${colorTheme}`}
			bind:this={colorThemeForm}
			method="POST"
			use:enhance={submitColorTheme}
			id="color-theme"
		>
			<div class="flex flex-col gap-2">
				<select class="select" bind:value={colorTheme}>
					{#each themes as theme}
						<option value={theme}>{theme}</option>
					{/each}
				</select>
				<Button
					on:click={() => {
						colorThemeForm.requestSubmit();
					}}>Save</Button
				>
			</div>
		</form>
	</div>
</div>
