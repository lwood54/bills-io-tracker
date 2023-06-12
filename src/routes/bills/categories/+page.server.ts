import { getUser } from '$lib/helpers/utils';
import { error, type ServerLoadEvent } from '@sveltejs/kit';
import { PRIVATE_SECRET } from '$env/static/private';
import { UrlPaths } from '$lib/constants/root';
import type { Category } from '$lib/types/api/bills';

export const load = async ({ cookies }: ServerLoadEvent): Promise<{ categories?: Category[] }> => {
	const publicToken = cookies.get('token');
	if (publicToken) {
		const { token, userId } = getUser(publicToken, PRIVATE_SECRET);
		try {
			const categories = await fetch(UrlPaths.categories.get.list(userId), {
				headers: {
					Authorization: `Bearer ${token}`,
					'Content-Type': 'application/json'
				}
			});
			return { categories: await categories.json() };
		} catch (err) {
			throw error(500, 'error fetching category details');
		}
	}
	return { categories: [] };
};
