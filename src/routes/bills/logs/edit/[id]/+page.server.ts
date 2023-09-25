import { PRIVATE_SECRET } from '$env/static/private';
import { UrlPaths } from '$lib/constants/root';
import { getUser } from '$lib/helpers/utils';
import type { Category, Log } from '$lib/types/api/bills';
import { error, redirect, type Actions, type ServerLoadEvent } from '@sveltejs/kit';

export const load = async ({
	cookies,
	params
}: ServerLoadEvent): Promise<{ categories?: Category[]; log?: Log } | { error?: string }> => {
	const publicToken = cookies.get('token');
	const logId = params.id;
	if (publicToken && logId) {
		const { token, userId } = getUser(publicToken, PRIVATE_SECRET);
		try {
			const res = await fetch(UrlPaths.logs.get.item(logId), {
				headers: {
					Authorization: `Bearer ${token}`,
					'Content-Type': 'application/json'
				}
			});
			const categoriesResponse = await fetch(UrlPaths.categories.get.list(userId), {
				headers: {
					Authorization: `Bearer ${token}`,
					'Content-Type': 'application/json'
				}
			});
			if (res.ok && categoriesResponse.ok) {
				return { log: await res.json(), categories: await categoriesResponse.json() };
			} else {
				return await res.json();
			}
		} catch (err) {
			throw error(500, 'error fetching log details');
		}
	} else {
		throw redirect(307, '/login');
	}
};

export const actions: Actions = {
	update: async ({ fetch, request, cookies, url }) => {
		const publicToken = cookies.get('token');
		const data = await request.formData();
		const amount = Number(data.get('amount'));
		const categoryId = data.get('categoryId');
		const createdAt = data.get('createdAt')?.toString();
		const scale = data.get('scale');
		const title = data.get('title');
		const logId = url.pathname.split('/edit/')[1];
		if (!publicToken) {
			return {
				error: 'not logged in'
			};
		}
		let createdAtDate: Date | undefined = undefined;
		if (createdAt) {
			const dateString = createdAt.split('-').join('/');
			createdAtDate = new Date(dateString);
		}
		const { token } = getUser(publicToken, PRIVATE_SECRET);
		if (!token) {
			return {
				error: 'not authorized'
			};
		}
		if (!logId) {
			return {
				error: 'log not identified'
			};
		}
		const res = await fetch(UrlPaths.logs.update(logId), {
			method: 'PUT',
			body: JSON.stringify({ amount, categoryId, createdAt: createdAtDate, scale, title }),
			headers: {
				Authorization: `Bearer ${token}`,
				'Content-type': 'application/json; charset=UTF-8'
			}
		});
		if (res.ok) {
			throw redirect(307, '/bills/logs');
		} else {
			return await res.json();
		}
	}
};
