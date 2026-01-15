export function formatDate(date: Date) {
	return new Intl.DateTimeFormat('es-CL', {
		year: 'numeric',
		month: 'short',
		day: 'numeric'
	}).format(date);
}; 

export function toDateTimeLocal(iso?: string) {
	if (!iso) return undefined;
	return new Date(iso).toISOString().slice(0, 16);
};

export function normalizeDate(value?: string) {
	return value && value !== "undefined" ? value : undefined;
}