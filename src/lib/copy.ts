import type { CatalogAlternative, CatalogQuery, CatalogResult, DealerType } from './types';
import type { Locale } from './labels';
import { provinceLabel, typeLabel } from './labels';

export interface Copy {
	skip: string;
	home: string;
	dealersNav: string;
	mainNav: string;
	language: string;
	languageName: string;
	otherLanguage: string;
	otherLanguageHref: string;
	homeTitle: string;
	homeDescription: string;
	homeLead: string;
	homeCta: string;
	catalogTitle: string;
	catalogDescription: string;
	catalogLead: string;
	filtersLegend: string;
	provinceLabel: string;
	allProvinces: string;
	typeLabel: string;
	allTypes: string;
	postcodeLabel: string;
	postcodeHint: string;
	countryLabel: string;
	countryAuto: string;
	searchSubmit: string;
	reset: string;
	resultsHeading: string;
	countList: string;
	countListOne: string;
	countNearest: string;
	countNearestOne: string;
	emptyStatus: string;
	invalidPostcodeStatus: string;
	ambiguousStatus: string;
	distance: string;
	contactEmail: string;
	contactPhone: string;
	contactForm: string;
	emptyFiltered: string;
	emptyNearby: string;
	invalidPostcode: string;
	ambiguousPostcode: string;
	altAllInProvince: string;
	altTypeNationwide: string;
	altNearestAll: string;
	altClearPostcode: string;
	altSearchAsNl: string;
	altSearchAsBe: string;
	altReset: string;
	noJs: string;
	disclaimer: string;
}

export const COPY: Record<Locale, Copy> = {
	nl: {
		skip: 'Ga naar de inhoud',
		home: 'Home',
		dealersNav: 'Dealers',
		mainNav: 'Hoofdnavigatie',
		language: 'Taal',
		languageName: 'Nederlands',
		otherLanguage: 'English',
		otherLanguageHref: 'en',
		homeTitle: 'Kantelbeer — hydraulische hef- en kantelsystemen',
		homeDescription:
			'Kantelbeer bouwt hydraulische hef- en kantelsystemen voor werkplaatsen en verkoopt uitsluitend via een dealernetwerk in de Benelux en Duitsland.',
		homeLead:
			'Deze site wordt opgebouwd langs de productcatalogus, de dealercatalogus en het offerteaanvraagformulier.',
		homeCta: 'Vind de dichtstbijzijnde dealer',
		catalogTitle: 'Dealercatalogus',
		catalogDescription:
			'Vind een Kantelbeer-dealer op provincie, type of postcode. De dealer is het verkoopkanaal.',
		catalogLead:
			'Filter zonder de pagina te herladen. Een postcodezoekopdracht toont de vijf dichtstbijzijnde dealers met afstand, zonder locatietoestemming van je browser.',
		filtersLegend: 'Filters',
		provinceLabel: 'Provincie',
		allProvinces: 'Alle provincies',
		typeLabel: 'Type',
		allTypes: 'Alle types',
		postcodeLabel: 'Postcode',
		postcodeHint:
			'Nederland: 1234 AB. België: vier cijfers plus land België. Duitsland: 50667. Vier cijfers zonder letters vragen om een land. Er wordt geen locatie van je browser gevraagd.',
		countryLabel: 'Land van de postcode',
		countryAuto: 'Niet opgegeven',
		searchSubmit: 'Toon dichtstbijzijnde dealers',
		reset: 'Wis filters',
		resultsHeading: 'Dealers',
		countList: '{count} dealers',
		countListOne: '{count} dealer',
		countNearest: '{count} dichtstbijzijnde dealers bij {postcode}',
		countNearestOne: 'Dichtstbijzijnde dealer bij {postcode}',
		emptyStatus: 'Geen dealers gevonden',
		invalidPostcodeStatus: 'Postcode niet herkend',
		ambiguousStatus: 'Kies het land van de postcode',
		distance: '{distance} van de postcode',
		contactEmail: 'E-mail',
		contactPhone: 'Telefoon',
		contactForm: 'Contactformulier',
		emptyFiltered:
			'Geen dealers voor deze combinatie van provincie en type. Kies een van de alternatieven hieronder in plaats van een lege lijst.',
		emptyNearby:
			'Geen dealers nabij deze postcode met de huidige filters. Kies een alternatief hieronder.',
		invalidPostcode:
			'Deze postcode wordt niet herkend. Gebruik een Nederlandse (1234 AB), Belgische (1000, met land België) of Duitse (50667) postcode.',
		ambiguousPostcode:
			'Deze postcode van vier cijfers kan Nederlands of Belgisch zijn. Kies een land in plaats van stil het verkeerde land te gokken.',
		altAllInProvince: 'Toon alle dealers in {province}',
		altTypeNationwide: 'Toon {type} in alle provincies',
		altNearestAll: 'Toon de vijf dichtstbijzijnde dealers, ongeacht provincie',
		altClearPostcode: 'Wis de postcode en behoud de overige filters',
		altSearchAsNl: 'Zoek {postcode} als Nederlandse postcode',
		altSearchAsBe: 'Zoek {postcode} als Belgische postcode',
		altReset: 'Toon alle dealers',
		noJs: 'JavaScript is nodig om filters zonder herladen toe te passen. De dealercatalogus zelf blijft zichtbaar.',
		disclaimer: 'Demonstratiebedrijf van Raderwerk. Dit bedrijf bestaat niet.',
	},
	en: {
		skip: 'Skip to content',
		home: 'Home',
		dealersNav: 'Dealers',
		mainNav: 'Main navigation',
		language: 'Language',
		languageName: 'English',
		otherLanguage: 'Nederlands',
		otherLanguageHref: '',
		homeTitle: 'Kantelbeer — hydraulic lift and tilt systems',
		homeDescription:
			'Kantelbeer builds hydraulic lift and tilt systems for workshops and sells exclusively through a dealer network in the Benelux and Germany.',
		homeLead:
			'This site is being built around the product catalogue, the dealer catalogue and the quote request form.',
		homeCta: 'Find the nearest dealer',
		catalogTitle: 'Dealer catalogue',
		catalogDescription:
			'Find a Kantelbeer dealer by province, type or postcode. The dealer is the sales channel.',
		catalogLead:
			'Filter without reloading the page. A postcode search shows the five nearest dealers with distance, without asking for browser location permission.',
		filtersLegend: 'Filters',
		provinceLabel: 'Province',
		allProvinces: 'All provinces',
		typeLabel: 'Type',
		allTypes: 'All types',
		postcodeLabel: 'Postcode',
		postcodeHint:
			'Netherlands: 1234 AB. Belgium: four digits plus country Belgium. Germany: 50667. Four digits without letters need a country. Your browser is never asked for a location.',
		countryLabel: 'Postcode country',
		countryAuto: 'Not set',
		searchSubmit: 'Show nearest dealers',
		reset: 'Clear filters',
		resultsHeading: 'Dealers',
		countList: '{count} dealers',
		countListOne: '{count} dealer',
		countNearest: '{count} nearest dealers to {postcode}',
		countNearestOne: 'Nearest dealer to {postcode}',
		emptyStatus: 'No dealers found',
		invalidPostcodeStatus: 'Postcode not recognised',
		ambiguousStatus: 'Choose the postcode country',
		distance: '{distance} from the postcode',
		contactEmail: 'Email',
		contactPhone: 'Phone',
		contactForm: 'Contact form',
		emptyFiltered:
			'No dealers match this combination of province and type. Use one of the alternatives below instead of an empty list.',
		emptyNearby:
			'No dealers near this postcode with the current filters. Choose an alternative below.',
		invalidPostcode:
			'This postcode is not recognised. Use a Dutch (1234 AB), Belgian (1000, with country set to Belgium) or German (50667) postcode.',
		ambiguousPostcode:
			'This four-digit postcode could be Dutch or Belgian. Choose a country instead of silently guessing the wrong one.',
		altAllInProvince: 'Show all dealers in {province}',
		altTypeNationwide: 'Show {type} in all provinces',
		altNearestAll: 'Show the five nearest dealers, ignoring province',
		altClearPostcode: 'Clear the postcode and keep the other filters',
		altSearchAsNl: 'Search {postcode} as a Dutch postcode',
		altSearchAsBe: 'Search {postcode} as a Belgian postcode',
		altReset: 'Show all dealers',
		noJs: 'JavaScript is required to apply filters without a reload. The dealer catalogue itself remains visible.',
		disclaimer: 'Demonstration company of Raderwerk. This company does not exist.',
	},
};

export function fill(template: string, values: Record<string, string | number>): string {
	return template.replace(/\{(\w+)\}/g, (_, key: string) => String(values[key] ?? ''));
}

export function resultStatusText(
	locale: Locale,
	result: CatalogResult,
	query: CatalogQuery,
): string {
	const copy = COPY[locale];
	switch (result.status) {
		case 'ok':
			if (result.mode === 'nearest') {
				if (result.dealers.length === 1) {
					return fill(copy.countNearestOne, { postcode: query.postcode ?? '' });
				}
				return fill(copy.countNearest, {
					count: result.dealers.length,
					postcode: query.postcode ?? '',
				});
			}
			if (result.dealers.length === 1) {
				return fill(copy.countListOne, { count: 1 });
			}
			return fill(copy.countList, { count: result.dealers.length });
		case 'empty':
			return copy.emptyStatus;
		case 'invalid-postcode':
			return copy.invalidPostcodeStatus;
		case 'ambiguous-postcode':
			return copy.ambiguousStatus;
		default: {
			const exhaustive: never = result;
			return exhaustive;
		}
	}
}

export function alternativeLabel(
	locale: Locale,
	alternative: CatalogAlternative,
): string {
	const copy = COPY[locale];
	switch (alternative.key) {
		case 'allInProvince':
			return fill(copy.altAllInProvince, {
				province: provinceLabel(alternative.params.province ?? '', locale),
			});
		case 'typeNationwide':
			return fill(copy.altTypeNationwide, {
				type: typeLabel((alternative.params.type ?? 'beide') as DealerType, locale),
			});
		case 'nearestAll':
			return copy.altNearestAll;
		case 'clearPostcode':
			return copy.altClearPostcode;
		case 'searchAsNl':
			return fill(copy.altSearchAsNl, { postcode: alternative.params.postcode ?? '' });
		case 'searchAsBe':
			return fill(copy.altSearchAsBe, { postcode: alternative.params.postcode ?? '' });
		case 'reset':
			return copy.altReset;
		default: {
			const exhaustive: never = alternative.key;
			return exhaustive;
		}
	}
}
