import { PRIVATE_SECRET } from '$env/static/private';
import { UrlPaths } from '$lib/constants/root';
import { getUser } from '$lib/helpers/utils';
import { error, redirect, type ServerLoadEvent } from '@sveltejs/kit';
import type { Actions } from './$types';
import type { Category } from '$lib/types/api/bills';
import { convertDashToSlash } from '$lib/helpers';

export const load = async ({
	cookies
}: ServerLoadEvent): Promise<{ categories?: Category[] } | { error?: string }> => {
	const publicToken = cookies.get('token');
	if (publicToken) {
		const { token, userId } = getUser(publicToken, PRIVATE_SECRET);
		try {
			const res = await fetch(UrlPaths.categories.get.list(userId), {
				headers: {
					Authorization: `Bearer ${token}`,
					'Content-Type': 'application/json'
				}
			});
			if (res.ok) {
				return { categories: await res.json() };
			} else {
				return await res.json();
			}
		} catch (err) {
			throw error(500, 'error fetching category details');
		}
	} else {
		throw redirect(307, '/login');
	}
};

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
			const dateString = convertDashToSlash(createdAt);
			createdAtDate = new Date(dateString);
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
		const res = await fetch(UrlPaths.logs.create(userId), {
			method: 'POST',
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
