import type { Actions } from './$types';
import { PRIVATE_SECRET } from '$env/static/private';
import { UrlPaths } from '$lib/constants/root';
import { getUser } from '$lib/helpers/utils';
import { redirect, type ServerLoadEvent } from '@sveltejs/kit';
import { error } from '@sveltejs/kit';
import type { Bill } from '$lib/types/api/bills';

export const actions: Actions = {
	default: async ({ fetch, request, cookies }) => {
		const publicToken = cookies.get('token');
		const data = await request.formData();
		const amount = Number(data.get('amount'));
		const balance = Number(data.get('balance'));
		const dayDue = Number(data.get('daydue'));
		const limit = Number(data.get('limit'));
		const rate = Number(data.get('rate'));
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
		try {
			const res = await fetch(UrlPaths.bills.create(userId), {
				method: 'POST',
				body: JSON.stringify({ amount, balance, dayDue, limit, rate, title }),
				headers: {
					Authorization: `Bearer ${token}`,
					'Content-type': 'application/json; charset=UTF-8'
				}
			});
			if (res.ok) {
				return { bill: await res.json() };
			} else {
				return await res.json();
			}
		} catch (err) {
			console.error(err);
			return { error: err };
		}
	}
};

export const load = async ({
	cookies
}: ServerLoadEvent): Promise<{ bills?: Bill[] } | { error?: string }> => {
	const publicToken = cookies.get('token');
	if (publicToken) {
		const { userId, token } = getUser(publicToken, PRIVATE_SECRET);
		try {
			const res = await fetch(UrlPaths.bills.get.list(userId), {
				headers: {
					Authorization: `Bearer ${token}`,
					'Content-Type': 'application/json'
				}
			});
			if (res.ok) {
				return { bills: await res.json() };
			} else {
				return await res.json();
			}
		} catch (err) {
			throw error(500, 'error fetching bills');
		}
	} else {
		throw redirect(307, '/login');
	}
};
