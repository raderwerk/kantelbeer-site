import type { CatalogQuery, Dealer, DealerType, RankedDealer } from './types';
import { isCountry, isDealerType } from './types';
import { distanceKm } from './geo';
import { geocodePostcode } from './postcode';
import type { CatalogAlternative, CatalogResult } from './types';

export function parseCatalogQuery(search: string): CatalogQuery {
	const query = search.startsWith('?') ? search.slice(1) : search;
	const params = new URLSearchParams(query);
	const province = normalize(params.get('provincie'));
	const postcode = normalize(params.get('postcode'));
	const typeValue = params.get('type');
	const countryValue = params.get('land');

	const result: CatalogQuery = {};
	if (province) result.province = province;
	if (isDealerType(typeValue)) result.type = typeValue;
	if (postcode) result.postcode = postcode;
	if (isCountry(countryValue)) result.country = countryValue;
	return result;
}

export function serializeCatalogQuery(query: CatalogQuery): string {
	const params = new URLSearchParams();
	if (query.province) params.set('provincie', query.province);
	if (query.type) params.set('type', query.type);
	if (query.postcode) params.set('postcode', query.postcode);
	if (query.country) params.set('land', query.country);
	const encoded = params.toString();
	return encoded ? `?${encoded}` : '';
}

export function filterDealers(
	dealers: Dealer[],
	query: Pick<CatalogQuery, 'province' | 'type'>,
): Dealer[] {
	return dealers.filter((dealer) => {
		if (query.province && dealer.province !== query.province) {
			return false;
		}
		if (query.type && !matchesType(dealer.type, query.type)) {
			return false;
		}
		return true;
	});
}

export function queryCatalog(dealers: Dealer[], query: CatalogQuery): CatalogResult {
	const filtered = filterDealers(dealers, query);

	if (query.postcode) {
		const origin = geocodePostcode(query.postcode, query.country);
		if (!origin) {
			return {
				status: 'invalid-postcode',
				mode: 'nearest',
				dealers: [],
				messageKey: 'invalidPostcode',
				alternatives: [
					{
						key: 'clearPostcode',
						params: withoutPostcode(query),
					},
				],
			};
		}

		const nearest = rankByDistance(filtered, origin).slice(0, 5);
		if (nearest.length === 0) {
			const alternatives: CatalogAlternative[] = [];
			if (query.province) {
				alternatives.push({
					key: 'nearestAll',
					params: { postcode: query.postcode, type: query.type, country: query.country },
				});
			}
			alternatives.push({
				key: 'clearPostcode',
				params: withoutPostcode(query),
			});
			alternatives.push({ key: 'reset', params: {} });
			return {
				status: 'empty',
				mode: 'nearest',
				dealers: [],
				messageKey: 'emptyNearby',
				alternatives,
			};
		}

		return { status: 'ok', mode: 'nearest', dealers: nearest };
	}

	if (filtered.length === 0) {
		const alternatives: CatalogAlternative[] = [];
		if (query.province && query.type) {
			alternatives.push({ key: 'allInProvince', params: { province: query.province } });
			alternatives.push({ key: 'typeNationwide', params: { type: query.type } });
		}
		alternatives.push({ key: 'reset', params: {} });
		return {
			status: 'empty',
			mode: 'list',
			dealers: [],
			messageKey: 'emptyFiltered',
			alternatives,
		};
	}

	return { status: 'ok', mode: 'list', dealers: filtered };
}

function matchesType(dealerType: DealerType, filter: DealerType): boolean {
	switch (filter) {
		case 'verkoop':
			return dealerType === 'verkoop' || dealerType === 'beide';
		case 'service':
			return dealerType === 'service' || dealerType === 'beide';
		case 'beide':
			return dealerType === 'beide';
		default: {
			const exhaustive: never = filter;
			return exhaustive;
		}
	}
}

function rankByDistance(dealers: Dealer[], origin: { lat: number; lng: number }): RankedDealer[] {
	return dealers
		.map((dealer) => ({
			...dealer,
			distanceKm: distanceKm(origin, dealer),
		}))
		.sort((a, b) => (a.distanceKm ?? 0) - (b.distanceKm ?? 0));
}

function withoutPostcode(query: CatalogQuery): CatalogQuery {
	const next: CatalogQuery = {};
	if (query.province) next.province = query.province;
	if (query.type) next.type = query.type;
	if (query.country) next.country = query.country;
	return next;
}

function normalize(value: string | null): string | undefined {
	const trimmed = value?.trim();
	return trimmed ? trimmed : undefined;
}
