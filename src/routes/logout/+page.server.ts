import { redirect } from '@sveltejs/kit';
import type { PageServerLoadEvent } from './$types';

export const load = async ({ cookies, url }: PageServerLoadEvent) => {
	cookies.delete('email');
	cookies.delete('token');
	throw redirect(307, '/login');
};
