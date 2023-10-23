import type { Actions } from './$types';

export const actions: Actions = {
	setTheme: async ({ url, cookies }) => {
		const themeMode = url.searchParams.get('thememode');
		const colorTheme = url.searchParams.get('colortheme');

		if (themeMode) {
			cookies.set('thememode', themeMode, {
				path: '/',
				maxAge: 60 * 60 * 24 * 365
			});
		}

		if (colorTheme) {
			cookies.set('colortheme', colorTheme, {
				path: '/',
				maxAge: 60 * 60 * 24 * 365
			});
		}
	}
};
