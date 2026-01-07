export function formatDate(date: Date) {
	return new Intl.DateTimeFormat('es-CL', {
		year: 'numeric',
		month: 'short',
		day: 'numeric'
	}).format(date);
}; 