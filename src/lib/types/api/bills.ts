export type Bill = {
	id: string;
	balance: number;
	dayDue: number;
	rate: number;
	limit: number;
	amount: number;
	title: string;
	createdAt: Date;
	updatedAt: Date;
	userId: string;
};
