import type { DateStyle } from '$lib/types';

export function formatDate(date: string, dateStyle: DateStyle = 'medium', locales = 'en') {
	// Safari is mad about dashes in the date
	const dateToFormat = new Date(date.replaceAll('-', '/'));
	const dateFormatter = new Intl.DateTimeFormat(locales, { dateStyle });
	return dateFormatter.format(dateToFormat);
}

export function formatNumber(number: number, locales = 'en') {
	return new Intl.NumberFormat(locales).format(number);
}

export function formatSeconds(x: number) {
	if (x === 0 || x === undefined || x === null) {
		return 'no time';
	}

	x = Math.round(x); // Round to nearest second
	const h = Math.floor(x / 3600),
		m = Math.floor((x % 3600) / 60),
		s = x % 60;
	const parts = [];

	if (h > 0) parts.push(`${h} ${h === 1 ? 'hour' : 'hours'}`);
	if (m > 0) parts.push(`${m} ${m === 1 ? 'minute' : 'minutes'}`);
	if (s > 0 || parts.length === 0) parts.push(`${s} ${s === 1 ? 'second' : 'seconds'}`);

	// Special case for durations less than a minute
	if (h === 0 && m === 0) {
		return parts[0];
	}

	// General case
	if (parts.length > 1) {
		return parts.slice(0, -1).join(', ') + ' and ' + parts[parts.length - 1];
	} else {
		return parts[0];
	}
}
