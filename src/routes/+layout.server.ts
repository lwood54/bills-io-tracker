import type { ServerLoadEvent } from '@sveltejs/kit';
import { PRIVATE_SECRET } from '$env/static/private';
import type { User } from '$lib/types/api/user';
import { URL } from '$lib/constants/root';
import CryptoJS from 'crypto-js';

export const load = async ({
	cookies
}: ServerLoadEvent): Promise<{ isLoggedIn: boolean; userInfo?: User }> => {
	const token = cookies.get('token');
	const isLoggedIn = Boolean(token);
	if (token) {
		const decryptedBytes = CryptoJS.AES.decrypt(token, PRIVATE_SECRET);
		const decryptedToken = decryptedBytes.toString(CryptoJS.enc.Utf8).split(',');
		const [userId, tokenString] = decryptedToken;
		const url = `${URL.BASE}/user/${userId}`;
		const res = await fetch(url, {
			headers: {
				Authorization: `Bearer ${tokenString}`,
				'Content-Type': 'application/json'
			}
		});
		return { isLoggedIn, userInfo: await res.json() };
	}
	return { isLoggedIn: false };
};
