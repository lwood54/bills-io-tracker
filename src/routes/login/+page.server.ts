import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import CryptoJS from 'crypto-js';
import { PRIVATE_SECRET } from '$env/static/private';
import { URL } from '$lib/constants/root';

export const actions: Actions = {
	login: async ({ fetch, request, cookies }) => {
		const data = await request.formData();
		const username = data.get('username') as string;
		const password = data.get('password') as string;
		const url = `${URL.BASE}/login`;

		if (username && password) {
			try {
				const res = await fetch(url, {
					method: 'POST',
					body: JSON.stringify({ username, password }),
					headers: { 'Content-type': 'application/json; charset=UTF-8' } // NOTE: won't work without charset
				});
				const user = await res.json();
				if (PRIVATE_SECRET) {
					const encrypted = CryptoJS.AES.encrypt(`${user.userId},${user.token}`, PRIVATE_SECRET);
					const stringForCookie = encrypted.toString();
					cookies.set('token', stringForCookie);
					throw redirect(307, '/');
				}
			} catch (error) {
				console.error(error);
			}
		}
		throw redirect(307, '/');
	},
	logout: async ({ cookies }) => {
		cookies.delete('email');
		cookies.delete('token');
	}
};
