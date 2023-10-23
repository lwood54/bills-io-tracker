import type { Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';

export const first: Handle = async ({ event, resolve }) => {
	// NOTE: not really needed anymore because Skeleton UI
	// provids <LightSwitch /> component, which takes care of this.
	let themeMode = 'dark';
	const updatedThemeMode = event.url.searchParams.get('thememode');
	const cookieThemeMode = event.cookies.get('thememode');
	if (updatedThemeMode) {
		themeMode = updatedThemeMode;
	} else if (cookieThemeMode) {
		themeMode = cookieThemeMode;
	}
	const result = await resolve(event, {
		transformPageChunk: ({ html }) => {
			if (themeMode) {
				return html.replace('class=""', `class="${themeMode}"`);
			}
			return html;
		}
	});
	return result;
};

export const second: Handle = async ({ event, resolve }) => {
	let colorTheme = 'skeleton';
	const updatedColorTheme = event.url.searchParams.get('colortheme');
	const cookieColorTheme = event.cookies.get('colortheme');
	if (updatedColorTheme) {
		colorTheme = updatedColorTheme;
	} else if (cookieColorTheme) {
		colorTheme = cookieColorTheme;
	}
	const result = await resolve(event, {
		transformPageChunk: ({ html }) => {
			if (colorTheme) {
				return html.replace('data-theme=""', `data-theme="${colorTheme}"`);
			}
			return html;
		}
	});
	return result;
};

export const handle = sequence(first, second);
