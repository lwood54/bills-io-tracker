import { PRIVATE_SECRET } from '$env/static/private';
import { UrlPaths } from '$lib/constants/root';
import { getUser } from '$lib/helpers/utils';
import type { Actions } from './$types';

export const actions: Actions = {
	default: async ({ fetch, request, cookies }) => {
		const publicToken = cookies.get('token');
		const data = await request.formData();
		const amount = Number(data.get('amount'));
		const categoryId = data.get('categoryId');
		const createdAt = data.get('createdAt')?.toString();
		const scale = data.get('scale');
		const title = data.get('title');
		let createdAtDate: Date | undefined = undefined;
		if (createdAt) {
			createdAtDate = new Date(createdAt);
		}
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
		try {
			const res = await fetch(UrlPaths.logs.create(userId), {
				method: 'POST',
				body: JSON.stringify({ amount, categoryId, createdAt: createdAtDate, scale, title }),
				headers: {
					Authorization: `Bearer ${token}`,
					'Content-type': 'application/json; charset=UTF-8'
				}
			});
			if (res.ok) {
				return { isSuccess: true };
			} else {
				return await res.json();
			}
		} catch (err) {
			console.error(err);
			return { error: err };
		}
	}
};
