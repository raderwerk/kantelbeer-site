export type Country = 'nl' | 'be' | 'de';
export type DealerType = 'verkoop' | 'service' | 'beide';
export type ContactKind = 'email' | 'phone' | 'form';

export type DealerContact =
	| { kind: 'email'; email: string }
	| { kind: 'phone'; phone: string }
	| { kind: 'form'; email: string };

export interface Dealer {
	id: string;
	name: string;
	street: string;
	city: string;
	postcode: string;
	province: string;
	country: Country;
	type: DealerType;
	contact: DealerContact;
	lat: number;
	lng: number;
}

export interface LatLng {
	lat: number;
	lng: number;
}

export interface CatalogQuery {
	province?: string;
	type?: DealerType;
	postcode?: string;
	country?: Country;
}

export type RankedDealer = Dealer & { distanceKm?: number };

export interface CatalogAlternative {
	key:
		| 'allInProvince'
		| 'typeNationwide'
		| 'nearestAll'
		| 'clearPostcode'
		| 'reset'
		| 'searchAsNl'
		| 'searchAsBe';
	params: CatalogQuery;
}

export type CatalogResult =
	| { status: 'ok'; mode: 'list' | 'nearest'; dealers: RankedDealer[] }
	| {
			status: 'empty';
			mode: 'list' | 'nearest';
			dealers: [];
			messageKey: 'emptyFiltered' | 'emptyNearby';
			alternatives: CatalogAlternative[];
	  }
	| {
			status: 'invalid-postcode';
			mode: 'nearest';
			dealers: [];
			messageKey: 'invalidPostcode';
			alternatives: CatalogAlternative[];
	  }
	| {
			status: 'ambiguous-postcode';
			mode: 'nearest';
			dealers: [];
			messageKey: 'ambiguousPostcode';
			alternatives: CatalogAlternative[];
	  };

export const DEALER_TYPES: DealerType[] = ['verkoop', 'service', 'beide'];
export const COUNTRIES: Country[] = ['nl', 'be', 'de'];

export function isDealerType(value: string | null | undefined): value is DealerType {
	return value === 'verkoop' || value === 'service' || value === 'beide';
}

export function isCountry(value: string | null | undefined): value is Country {
	return value === 'nl' || value === 'be' || value === 'de';
}
