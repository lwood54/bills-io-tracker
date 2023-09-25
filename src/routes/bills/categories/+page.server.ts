import { getUser } from '$lib/helpers/utils';
import { error, redirect, type Actions, type ServerLoadEvent } from '@sveltejs/kit';
import { PRIVATE_SECRET } from '$env/static/private';
import { UrlPaths } from '$lib/constants/root';
import type { Category } from '$lib/types/api/bills';

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
	remove: async ({ fetch, cookies, url }) => {
		const publicToken = cookies.get('token');
		const params = new URLSearchParams(url.searchParams);
		const categoryId = params.get('categoryId');
		if (!publicToken) {
			return {
				error: 'not logged in'
			};
		}
		const { token } = getUser(publicToken, PRIVATE_SECRET);
		if (!token) {
			return {
				error: 'not authorized'
			};
		}
		if (!categoryId) {
			return {
				error: 'category not identified'
			};
		}
		const res = await fetch(UrlPaths.categories.delete(categoryId), {
			method: 'DELETE',
			headers: {
				Authorization: `Bearer ${token}`,
				'Content-type': 'application/json; charset=UTF-8'
			}
		});
		if (res.ok) {
			return { isRemoved: true };
		} else {
			return await res.json();
		}
	}
};
