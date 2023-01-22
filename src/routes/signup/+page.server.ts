import { redirect, type Cookies } from '@sveltejs/kit';
import type { Actions } from './$types';
import CryptoJS from 'crypto-js';
import { PRIVATE_SECRET } from '$env/static/private';
import { URL } from '$lib/constants/root';
import type { User } from '$lib/types/api/user';

export const actions: Actions = {
	default: async ({ fetch, request, cookies }) => {
		const data = await request.formData();
		const username = data.get('username') as string;
		const email = data.get('email') as string;
		const password = data.get('password') as string;
		const lastName = data.get('lastname') as string;
		const firstName = data.get('firstname') as string;
		const url = `${URL.BASE}/signup`;
		console.log({ username, email, password, lastName, firstName, url });
		try {
			const res = await fetch(url, {
				method: 'POST',
				body: JSON.stringify({ username, password, lastName, firstName, email }),
				headers: {
					'Content-type': 'application/json; charset=UTF-8'
				} // NOTE: won't work without charset
			});
			const result = await res.json();
			if (result.error) {
				return { error: result.error };
			}
			if (PRIVATE_SECRET) {
				const encrypted = CryptoJS.AES.encrypt(`${result.userId},${result.token}`, PRIVATE_SECRET);
				const stringForCookie = encrypted.toString();
				cookies.set('token', stringForCookie);
				return { user: result };
			}
		} catch (error) {
			console.log('in error', error);
			if (error instanceof Error) {
				return { error: error.message };
			}
			console.log(error);
			// throw Error(error);
			// const textError = error.text();
			// return { error };
			// return { error: e.error };
			// return { error };
		}
	}
};
