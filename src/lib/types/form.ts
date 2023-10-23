type _Option = {
	id: string;
	title?: string;
	name?: string;
	label?: string;
};

type AtLeast<T, U> = Partial<T> & Pick<T, Extract<keyof T, keyof U>>;

export type Option = AtLeast<
	_Option,
	{ id: string; title: string | undefined; name: string | undefined; label: string | undefined }
>;
