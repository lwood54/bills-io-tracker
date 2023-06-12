import { getUser } from '$lib/helpers/utils';
import { error, type ServerLoadEvent } from '@sveltejs/kit';
import { PRIVATE_SECRET } from '$env/static/private';
import { UrlPaths } from '$lib/constants/root';
import type { Log } from '$lib/types/api/bills';

export const load = async ({ cookies }: ServerLoadEvent): Promise<{ logs?: Log[] }> => {
	const publicToken = cookies.get('token');
	if (publicToken) {
		const { token, userId } = getUser(publicToken, PRIVATE_SECRET);
		try {
			const logs = await fetch(UrlPaths.logs.get.list(userId), {
				headers: {
					Authorization: `Bearer ${token}`,
					'Content-Type': 'application/json'
				}
			});
			return { logs: await logs.json() };
		} catch (err) {
			throw error(500, 'error fetching logs');
		}
	}
	return { logs: [] };
};
