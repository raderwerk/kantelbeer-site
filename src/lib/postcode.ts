import type { Country, LatLng } from './types';

export interface ParsedPostcode {
	country: Country;
	prefix: string;
}

const NL_PREFIX: Record<string, LatLng> = {
	'10': { lat: 52.3728, lng: 4.8936 },
	'11': { lat: 52.3167, lng: 4.9611 },
	'12': { lat: 52.2292, lng: 5.1669 },
	'13': { lat: 52.3508, lng: 5.2647 },
	'14': { lat: 52.2725, lng: 5.1639 },
	'15': { lat: 52.505, lng: 4.9597 },
	'16': { lat: 52.64, lng: 5.06 },
	'17': { lat: 52.723, lng: 4.844 },
	'18': { lat: 52.6324, lng: 4.7534 },
	'19': { lat: 52.893, lng: 4.759 },
	'20': { lat: 52.3874, lng: 4.6462 },
	'21': { lat: 52.3025, lng: 4.6889 },
	'22': { lat: 52.458, lng: 4.619 },
	'23': { lat: 52.1601, lng: 4.497 },
	'24': { lat: 52.1292, lng: 4.6555 },
	'25': { lat: 52.0705, lng: 4.3007 },
	'26': { lat: 52.0116, lng: 4.3571 },
	'27': { lat: 52.0607, lng: 4.494 },
	'28': { lat: 52.0116, lng: 4.7108 },
	'29': { lat: 51.93, lng: 4.59 },
	'30': { lat: 51.9225, lng: 4.4792 },
	'31': { lat: 51.93, lng: 4.43 },
	'32': { lat: 51.845, lng: 4.33 },
	'33': { lat: 51.8133, lng: 4.6901 },
	'34': { lat: 52.02, lng: 5.04 },
	'35': { lat: 52.0907, lng: 5.1214 },
	'36': { lat: 52.139, lng: 5.041 },
	'37': { lat: 52.09, lng: 5.233 },
	'38': { lat: 52.1561, lng: 5.3878 },
	'39': { lat: 52.0286, lng: 5.5589 },
	'40': { lat: 51.886, lng: 5.43 },
	'41': { lat: 51.948, lng: 5.227 },
	'42': { lat: 51.83, lng: 4.974 },
	'43': { lat: 51.4988, lng: 3.61 },
	'44': { lat: 51.5042, lng: 3.8883 },
	'45': { lat: 51.336, lng: 3.828 },
	'46': { lat: 51.495, lng: 4.291 },
	'47': { lat: 51.5306, lng: 4.4653 },
	'48': { lat: 51.5719, lng: 4.7683 },
	'49': { lat: 51.645, lng: 4.859 },
	'50': { lat: 51.5555, lng: 5.0913 },
	'51': { lat: 51.682, lng: 5.129 },
	'52': { lat: 51.6978, lng: 5.3037 },
	'53': { lat: 51.765, lng: 5.518 },
	'54': { lat: 51.661, lng: 5.619 },
	'55': { lat: 51.42, lng: 5.4 },
	'56': { lat: 51.4416, lng: 5.4697 },
	'57': { lat: 51.479, lng: 5.657 },
	'58': { lat: 51.525, lng: 5.975 },
	'59': { lat: 51.3704, lng: 6.1724 },
	'60': { lat: 50.8514, lng: 5.6909 },
	'61': { lat: 50.998, lng: 5.869 },
	'62': { lat: 50.8514, lng: 5.6909 },
	'63': { lat: 50.865, lng: 5.832 },
	'64': { lat: 50.8882, lng: 5.9795 },
	'65': { lat: 51.8425, lng: 5.8528 },
	'66': { lat: 51.807, lng: 5.725 },
	'67': { lat: 51.985, lng: 5.666 },
	'68': { lat: 51.9851, lng: 5.8987 },
	'69': { lat: 51.93, lng: 6.07 },
	'70': { lat: 51.965, lng: 6.289 },
	'71': { lat: 51.973, lng: 6.719 },
	'72': { lat: 52.14, lng: 6.201 },
	'73': { lat: 52.2112, lng: 5.9699 },
	'74': { lat: 52.255, lng: 6.1639 },
	'75': { lat: 52.2215, lng: 6.8937 },
	'76': { lat: 52.357, lng: 6.6627 },
	'77': { lat: 52.575, lng: 6.62 },
	'78': { lat: 52.779, lng: 6.906 },
	'79': { lat: 52.7225, lng: 6.476 },
	'80': { lat: 52.5168, lng: 6.083 },
	'81': { lat: 52.385, lng: 6.275 },
	'82': { lat: 52.5185, lng: 5.4714 },
	'83': { lat: 52.71, lng: 5.748 },
	'84': { lat: 52.98, lng: 6.07 },
	'85': { lat: 52.965, lng: 5.802 },
	'86': { lat: 53.033, lng: 5.66 },
	'87': { lat: 53.066, lng: 5.522 },
	'88': { lat: 53.187, lng: 5.541 },
	'89': { lat: 53.2012, lng: 5.7999 },
	'90': { lat: 53.2194, lng: 6.5665 },
	'91': { lat: 53.25, lng: 6.58 },
	'92': { lat: 53.112, lng: 6.0989 },
	'93': { lat: 53.138, lng: 6.429 },
	'94': { lat: 52.9925, lng: 6.5642 },
	'95': { lat: 52.989, lng: 6.95 },
	'96': { lat: 53.164, lng: 6.761 },
	'97': { lat: 53.2194, lng: 6.5665 },
	'98': { lat: 53.247, lng: 6.403 },
	'99': { lat: 53.322, lng: 6.86 },
};

const BE_PREFIX: Record<string, LatLng> = {
	'10': { lat: 50.8503, lng: 4.3517 },
	'11': { lat: 50.85, lng: 4.38 },
	'12': { lat: 50.85, lng: 4.32 },
	'13': { lat: 50.88, lng: 4.71 },
	'14': { lat: 50.71, lng: 4.4 },
	'15': { lat: 50.734, lng: 4.234 },
	'16': { lat: 50.983, lng: 4.47 },
	'17': { lat: 50.848, lng: 4.266 },
	'18': { lat: 50.928, lng: 4.425 },
	'19': { lat: 50.717, lng: 4.612 },
	'20': { lat: 51.2213, lng: 4.4051 },
	'21': { lat: 51.176, lng: 4.833 },
	'22': { lat: 51.322, lng: 4.37 },
	'23': { lat: 51.165, lng: 4.99 },
	'24': { lat: 51.111, lng: 4.909 },
	'25': { lat: 51.176, lng: 4.448 },
	'26': { lat: 51.176, lng: 4.14 },
	'27': { lat: 51.05, lng: 4.28 },
	'28': { lat: 51.176, lng: 4.61 },
	'29': { lat: 51.322, lng: 4.95 },
	'30': { lat: 50.8798, lng: 4.7005 },
	'31': { lat: 50.93, lng: 4.7 },
	'32': { lat: 50.97, lng: 5.05 },
	'33': { lat: 50.85, lng: 4.95 },
	'34': { lat: 50.8, lng: 5.18 },
	'35': { lat: 50.9307, lng: 5.3378 },
	'36': { lat: 50.93, lng: 5.33 },
	'37': { lat: 51.0, lng: 5.5 },
	'38': { lat: 51.0, lng: 5.2 },
	'39': { lat: 51.17, lng: 5.4 },
	'40': { lat: 50.6326, lng: 5.5797 },
	'41': { lat: 50.58, lng: 5.5 },
	'42': { lat: 50.7, lng: 5.6 },
	'43': { lat: 50.45, lng: 5.53 },
	'44': { lat: 50.6, lng: 5.85 },
	'45': { lat: 50.4, lng: 5.9 },
	'46': { lat: 50.28, lng: 5.9 },
	'47': { lat: 50.28, lng: 5.4 },
	'48': { lat: 50.45, lng: 5.2 },
	'49': { lat: 50.58, lng: 5.85 },
	'50': { lat: 50.467, lng: 4.87 },
	'51': { lat: 50.25, lng: 4.9 },
	'53': { lat: 50.25, lng: 4.45 },
	'55': { lat: 50.15, lng: 5.35 },
	'56': { lat: 50.15, lng: 4.55 },
	'60': { lat: 50.411, lng: 4.444 },
	'61': { lat: 50.45, lng: 4.2 },
	'62': { lat: 50.28, lng: 4.1 },
	'64': { lat: 50.25, lng: 5.0 },
	'65': { lat: 49.68, lng: 5.82 },
	'66': { lat: 49.85, lng: 5.52 },
	'67': { lat: 49.68, lng: 5.47 },
	'68': { lat: 49.85, lng: 5.1 },
	'69': { lat: 50.0, lng: 5.35 },
	'70': { lat: 50.4542, lng: 3.9566 },
	'71': { lat: 50.45, lng: 3.85 },
	'73': { lat: 50.45, lng: 4.15 },
	'75': { lat: 50.607, lng: 3.389 },
	'76': { lat: 50.6, lng: 3.4 },
	'77': { lat: 50.6, lng: 3.6 },
	'78': { lat: 50.6, lng: 3.78 },
	'79': { lat: 50.6, lng: 3.9 },
	'80': { lat: 51.2093, lng: 3.2247 },
	'81': { lat: 50.85, lng: 3.27 },
	'82': { lat: 51.05, lng: 2.85 },
	'83': { lat: 51.12, lng: 3.13 },
	'84': { lat: 50.98, lng: 3.13 },
	'85': { lat: 50.85, lng: 3.0 },
	'86': { lat: 51.03, lng: 3.0 },
	'87': { lat: 50.98, lng: 3.45 },
	'88': { lat: 50.85, lng: 3.48 },
	'89': { lat: 50.85, lng: 3.6 },
	'90': { lat: 51.0543, lng: 3.7174 },
	'91': { lat: 51.05, lng: 3.72 },
	'92': { lat: 51.03, lng: 3.85 },
	'93': { lat: 51.03, lng: 3.98 },
	'94': { lat: 50.85, lng: 3.85 },
	'95': { lat: 50.85, lng: 3.7 },
	'96': { lat: 50.85, lng: 3.6 },
	'97': { lat: 50.85, lng: 3.5 },
	'98': { lat: 50.85, lng: 3.3 },
	'99': { lat: 51.2, lng: 3.8 },
};

const DE_PREFIX: Record<string, LatLng> = {
	'01': { lat: 51.0504, lng: 13.7373 },
	'02': { lat: 51.7563, lng: 14.3329 },
	'03': { lat: 51.7563, lng: 14.3329 },
	'04': { lat: 51.3397, lng: 12.3731 },
	'06': { lat: 51.482, lng: 11.97 },
	'07': { lat: 50.880, lng: 12.083 },
	'08': { lat: 50.8278, lng: 12.9214 },
	'09': { lat: 50.8278, lng: 12.9214 },
	'10': { lat: 52.52, lng: 13.405 },
	'12': { lat: 52.48, lng: 13.45 },
	'13': { lat: 52.56, lng: 13.4 },
	'14': { lat: 52.3906, lng: 13.0645 },
	'15': { lat: 52.347, lng: 14.55 },
	'16': { lat: 52.8, lng: 13.3 },
	'17': { lat: 53.56, lng: 13.26 },
	'18': { lat: 54.0924, lng: 12.0991 },
	'19': { lat: 53.6355, lng: 11.4012 },
	'20': { lat: 53.5511, lng: 9.9937 },
	'21': { lat: 53.55, lng: 9.99 },
	'22': { lat: 53.57, lng: 10.0 },
	'23': { lat: 53.8655, lng: 10.6866 },
	'24': { lat: 54.3233, lng: 10.1228 },
	'25': { lat: 53.75, lng: 9.65 },
	'26': { lat: 53.1435, lng: 8.2146 },
	'27': { lat: 53.55, lng: 8.58 },
	'28': { lat: 53.0793, lng: 8.8017 },
	'29': { lat: 52.625, lng: 10.08 },
	'30': { lat: 52.3759, lng: 9.732 },
	'31': { lat: 52.15, lng: 9.95 },
	'32': { lat: 52.12, lng: 8.67 },
	'33': { lat: 52.0302, lng: 8.5325 },
	'34': { lat: 51.3127, lng: 9.4797 },
	'35': { lat: 50.584, lng: 8.678 },
	'36': { lat: 50.555, lng: 9.675 },
	'37': { lat: 51.5413, lng: 9.9158 },
	'38': { lat: 52.2689, lng: 10.5268 },
	'39': { lat: 52.1316, lng: 11.6399 },
	'40': { lat: 51.2277, lng: 6.7735 },
	'41': { lat: 51.18, lng: 6.44 },
	'42': { lat: 51.2562, lng: 7.1508 },
	'44': { lat: 51.5136, lng: 7.4653 },
	'45': { lat: 51.4556, lng: 7.0116 },
	'46': { lat: 51.47, lng: 6.85 },
	'47': { lat: 51.4344, lng: 6.7623 },
	'48': { lat: 51.9607, lng: 7.6261 },
	'49': { lat: 52.2799, lng: 8.0472 },
	'50': { lat: 50.9375, lng: 6.9603 },
	'51': { lat: 50.94, lng: 6.96 },
	'52': { lat: 50.7753, lng: 6.0839 },
	'53': { lat: 50.7374, lng: 7.0982 },
	'54': { lat: 49.7499, lng: 6.6371 },
	'55': { lat: 49.9929, lng: 8.2473 },
	'56': { lat: 50.3569, lng: 7.589 },
	'57': { lat: 50.875, lng: 8.02 },
	'58': { lat: 51.367, lng: 7.463 },
	'59': { lat: 51.68, lng: 7.82 },
	'60': { lat: 50.1109, lng: 8.6821 },
	'61': { lat: 50.23, lng: 8.62 },
	'63': { lat: 49.97, lng: 9.15 },
	'64': { lat: 49.8728, lng: 8.6512 },
	'65': { lat: 50.0821, lng: 8.24 },
	'66': { lat: 49.2401, lng: 6.9969 },
	'67': { lat: 49.481, lng: 8.435 },
	'68': { lat: 49.4875, lng: 8.466 },
	'69': { lat: 49.3988, lng: 8.6724 },
	'70': { lat: 48.7758, lng: 9.1829 },
	'71': { lat: 48.78, lng: 9.18 },
	'72': { lat: 48.491, lng: 9.204 },
	'73': { lat: 48.703, lng: 9.652 },
	'74': { lat: 49.1427, lng: 9.2109 },
	'75': { lat: 49.0069, lng: 8.4037 },
	'76': { lat: 49.0069, lng: 8.4037 },
	'77': { lat: 48.47, lng: 7.94 },
	'78': { lat: 48.06, lng: 8.46 },
	'79': { lat: 47.999, lng: 7.8421 },
	'80': { lat: 48.1351, lng: 11.582 },
	'81': { lat: 48.1351, lng: 11.582 },
	'82': { lat: 48.1, lng: 11.5 },
	'83': { lat: 47.856, lng: 12.124 },
	'84': { lat: 48.537, lng: 12.151 },
	'85': { lat: 48.7665, lng: 11.4258 },
	'86': { lat: 48.3705, lng: 10.8978 },
	'87': { lat: 47.726, lng: 10.316 },
	'88': { lat: 47.658, lng: 9.479 },
	'89': { lat: 48.4011, lng: 9.9876 },
	'90': { lat: 49.4521, lng: 11.0767 },
	'91': { lat: 49.4521, lng: 11.0767 },
	'92': { lat: 49.444, lng: 11.863 },
	'93': { lat: 49.0134, lng: 12.1016 },
	'94': { lat: 48.5665, lng: 13.4312 },
	'95': { lat: 49.945, lng: 11.571 },
	'96': { lat: 49.8988, lng: 10.9028 },
	'97': { lat: 49.7913, lng: 9.9534 },
	'98': { lat: 50.609, lng: 10.693 },
	'99': { lat: 50.9848, lng: 11.0299 },
};

export function parsePostcode(input: string, country?: Country): ParsedPostcode | null {
	const compact = input.trim().toUpperCase().replace(/\s+/g, '');
	if (!compact) {
		return null;
	}

	if (country) {
		return parseForCountry(compact, country);
	}

	if (/^\d{5}$/.test(compact)) {
		return parseForCountry(compact, 'de');
	}
	if (/^\d{4}[A-Z]{2}$/.test(compact)) {
		return parseForCountry(compact, 'nl');
	}
	return null;
}

export function geocodePostcode(input: string, country?: Country): LatLng | null {
	const parsed = parsePostcode(input, country);
	if (!parsed) {
		return null;
	}
	return lookupPrefix(parsed.country, parsed.prefix);
}

export function isAmbiguousFourDigitPostcode(input: string, country?: Country): boolean {
	if (country) {
		return false;
	}
	const compact = input.trim().toUpperCase().replace(/\s+/g, '');
	return /^\d{4}$/.test(compact);
}

function parseForCountry(compact: string, country: Country): ParsedPostcode | null {
	switch (country) {
		case 'nl': {
			const match = compact.match(/^(\d{4})(?:[A-Z]{2})?$/);
			if (!match) return null;
			return { country, prefix: match[1].slice(0, 2) };
		}
		case 'be': {
			const match = compact.match(/^(\d{4})$/);
			if (!match) return null;
			return { country, prefix: match[1].slice(0, 2) };
		}
		case 'de': {
			const match = compact.match(/^(\d{5})$/);
			if (!match) return null;
			return { country, prefix: match[1].slice(0, 2) };
		}
		default: {
			const exhaustive: never = country;
			return exhaustive;
		}
	}
}

function lookupPrefix(country: Country, prefix: string): LatLng | null {
	switch (country) {
		case 'nl':
			return NL_PREFIX[prefix] ?? null;
		case 'be':
			return BE_PREFIX[prefix] ?? null;
		case 'de':
			return DE_PREFIX[prefix] ?? null;
		default: {
			const exhaustive: never = country;
			return exhaustive;
		}
	}
}
