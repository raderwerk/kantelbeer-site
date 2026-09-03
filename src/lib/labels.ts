import type { Country, DealerType } from './types';

export type Locale = 'nl' | 'en';

export const PROVINCE_LABELS: Record<string, { nl: string; en: string; country: Country }> = {
	'noord-holland': { nl: 'Noord-Holland', en: 'North Holland', country: 'nl' },
	'zuid-holland': { nl: 'Zuid-Holland', en: 'South Holland', country: 'nl' },
	utrecht: { nl: 'Utrecht', en: 'Utrecht', country: 'nl' },
	'noord-brabant': { nl: 'Noord-Brabant', en: 'North Brabant', country: 'nl' },
	gelderland: { nl: 'Gelderland', en: 'Gelderland', country: 'nl' },
	overijssel: { nl: 'Overijssel', en: 'Overijssel', country: 'nl' },
	'limburg-nl': { nl: 'Limburg', en: 'Limburg', country: 'nl' },
	groningen: { nl: 'Groningen', en: 'Groningen', country: 'nl' },
	friesland: { nl: 'Friesland', en: 'Friesland', country: 'nl' },
	drenthe: { nl: 'Drenthe', en: 'Drenthe', country: 'nl' },
	zeeland: { nl: 'Zeeland', en: 'Zeeland', country: 'nl' },
	flevoland: { nl: 'Flevoland', en: 'Flevoland', country: 'nl' },
	antwerpen: { nl: 'Antwerpen', en: 'Antwerp', country: 'be' },
	'oost-vlaanderen': { nl: 'Oost-Vlaanderen', en: 'East Flanders', country: 'be' },
	'west-vlaanderen': { nl: 'West-Vlaanderen', en: 'West Flanders', country: 'be' },
	'vlaams-brabant': { nl: 'Vlaams-Brabant', en: 'Flemish Brabant', country: 'be' },
	'limburg-be': { nl: 'Limburg', en: 'Limburg', country: 'be' },
	brussels: { nl: 'Brussel', en: 'Brussels', country: 'be' },
	liege: { nl: 'Luik', en: 'Liège', country: 'be' },
	hainaut: { nl: 'Henegouwen', en: 'Hainaut', country: 'be' },
	'nordrhein-westfalen': { nl: 'Noordrijn-Westfalen', en: 'North Rhine-Westphalia', country: 'de' },
	niedersachsen: { nl: 'Nedersaksen', en: 'Lower Saxony', country: 'de' },
	bremen: { nl: 'Bremen', en: 'Bremen', country: 'de' },
};

export const COUNTRY_LABELS: Record<Country, { nl: string; en: string }> = {
	nl: { nl: 'Nederland', en: 'Netherlands' },
	be: { nl: 'België', en: 'Belgium' },
	de: { nl: 'Duitsland', en: 'Germany' },
};

export const TYPE_LABELS: Record<DealerType, { nl: string; en: string }> = {
	verkoop: { nl: 'Verkoop', en: 'Sales' },
	service: { nl: 'Service', en: 'Service' },
	beide: { nl: 'Verkoop en service', en: 'Sales and service' },
};

export function provinceLabel(slug: string, locale: Locale): string {
	return PROVINCE_LABELS[slug]?.[locale] ?? slug;
}

export function countryLabel(country: Country, locale: Locale): string {
	return COUNTRY_LABELS[country][locale];
}

export function typeLabel(type: DealerType, locale: Locale): string {
	return TYPE_LABELS[type][locale];
}

export function provincesByCountry(
	slugs: string[],
): { country: Country; provinces: { slug: string }[] }[] {
	const grouped: Record<Country, { slug: string }[]> = { nl: [], be: [], de: [] };
	for (const slug of slugs) {
		const meta = PROVINCE_LABELS[slug];
		if (!meta) continue;
		grouped[meta.country].push({ slug });
	}

	const countries: Country[] = ['nl', 'be', 'de'];
	return countries
		.filter((country) => grouped[country].length > 0)
		.map((country) => ({
			country,
			provinces: grouped[country].sort((a, b) =>
				provinceLabel(a.slug, 'nl').localeCompare(provinceLabel(b.slug, 'nl'), 'nl'),
			),
		}));
}
