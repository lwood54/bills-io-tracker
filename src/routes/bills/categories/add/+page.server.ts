import { PRIVATE_SECRET } from '$env/static/private';
import { UrlPaths } from '$lib/constants/root';
import { getUser } from '$lib/helpers/utils';
import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
	default: async ({ fetch, request, cookies }) => {
		const publicToken = cookies.get('token');
		const data = await request.formData();
		const title = data.get('title');
		if (!publicToken) {
			return {
				error: 'not logged in'
			};
		}
		const { userId, token } = getUser(publicToken, PRIVATE_SECRET);
		if (!userId || !token) {
			return {
				error: 'not authorized'
			};
		}
		const res = await fetch(UrlPaths.categories.create(userId), {
			method: 'POST',
			body: JSON.stringify({ title }),
			headers: {
				Authorization: `Bearer ${token}`,
				'Content-type': 'application/json; charset=UTF-8'
			}
		});
		if (res.ok) {
			throw redirect(307, '/bills/categories');
		} else {
			return await res.json();
		}
	}
};
