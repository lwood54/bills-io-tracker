import { PRIVATE_SECRET } from '$env/static/private';
import { UrlPaths } from '$lib/constants/root';
import { getUser } from '$lib/helpers/utils';
import type { Category } from '$lib/types/api/bills';
import { error, redirect, type Actions, type ServerLoadEvent } from '@sveltejs/kit';

export const load = async ({
	cookies,
	params
}: ServerLoadEvent): Promise<{ category?: Category } | { error?: string }> => {
	const publicToken = cookies.get('token');
	const categoryId = params.id;
	if (publicToken && categoryId) {
		const { token } = getUser(publicToken, PRIVATE_SECRET);
		try {
			const res = await fetch(UrlPaths.categories.get.item(categoryId), {
				headers: {
					Authorization: `Bearer ${token}`,
					'Content-Type': 'application/json'
				}
			});
			if (res.ok) {
				return { category: await res.json() };
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
	update: async ({ fetch, request, cookies, url }) => {
		const publicToken = cookies.get('token');
		const data = await request.formData();
		const title = data.get('title');
		const categoryId = url.pathname.split('/edit/')[1];
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
				error: 'bill not identified'
			};
		}
		try {
			const res = await fetch(UrlPaths.categories.update(categoryId), {
				method: 'PUT',
				body: JSON.stringify({ title }),
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
