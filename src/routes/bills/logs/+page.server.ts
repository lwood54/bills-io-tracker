import { getUser } from '$lib/helpers/utils';
import { error, redirect, type Actions, type ServerLoadEvent } from '@sveltejs/kit';
import { PRIVATE_SECRET } from '$env/static/private';
import { UrlPaths } from '$lib/constants/root';
import type { Category, Log } from '$lib/types/api/bills';

export const load = async ({
	cookies
}: ServerLoadEvent): Promise<{ categories?: Category[]; logs?: Log[] } | { error?: string }> => {
	const publicToken = cookies.get('token');
	if (publicToken) {
		const { token, userId } = getUser(publicToken, PRIVATE_SECRET);
		try {
			const res = await fetch(UrlPaths.logs.get.list(userId), {
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
			if (res.ok) {
				// return { logs: await res.json() };
				return { logs: await res.json(), categories: await categoriesResponse.json() };
			} else {
				return await res.json();
			}
		} catch (err) {
			throw error(500, 'error fetching logs');
		}
	} else {
		throw redirect(307, '/login');
	}
};

export const actions: Actions = {
	remove: async ({ fetch, cookies, url }) => {
		const publicToken = cookies.get('token');
		const params = new URLSearchParams(url.searchParams);
		const logId = params.get('logId');
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
		if (!logId) {
			return {
				error: 'spending log not identified'
			};
		}
		try {
			const res = await fetch(UrlPaths.logs.delete(logId), {
				method: 'DELETE',
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
