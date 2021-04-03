export const convertDateToString = (date: string): string => new Date(date)
	.toLocaleDateString('en-EN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });