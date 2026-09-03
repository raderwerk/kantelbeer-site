import raw from '../data/dealers.json';
import type { Country, Dealer, DealerContact, DealerType } from './types';
import { isCountry, isDealerType } from './types';

export function getDealers(): Dealer[] {
	if (!Array.isArray(raw.dealers) || raw.dealers.length !== 40) {
		throw new Error('Dealer catalog must contain exactly 40 dealers.');
	}
	return raw.dealers.map(parseDealer);
}

function parseDealer(value: (typeof raw.dealers)[number]): Dealer {
	if (!isDealerType(value.type) || !isCountry(value.country)) {
		throw new Error(`Invalid dealer record: ${value.id}`);
	}

	return {
		id: required(value.id, 'id'),
		name: required(value.name, 'name'),
		street: required(value.street, 'street'),
		city: required(value.city, 'city'),
		postcode: required(value.postcode, 'postcode'),
		province: required(value.province, 'province'),
		country: value.country as Country,
		type: value.type as DealerType,
		contact: parseContact(value.contact),
		lat: asFinite(value.lat, 'lat'),
		lng: asFinite(value.lng, 'lng'),
	};
}

function parseContact(contact: (typeof raw.dealers)[number]['contact']): DealerContact {
	switch (contact.kind) {
		case 'email':
			return { kind: 'email', email: required(contact.email, 'email') };
		case 'phone':
			return { kind: 'phone', phone: required(contact.phone, 'phone') };
		case 'form':
			return { kind: 'form', email: required(contact.email, 'email') };
		default:
			throw new Error(`Unknown contact kind: ${String(contact.kind)}`);
	}
}

function required(value: string | undefined, field: string): string {
	const trimmed = value?.trim();
	if (!trimmed) {
		throw new Error(`Missing dealer field: ${field}`);
	}
	return trimmed;
}

function asFinite(value: number, field: string): number {
	if (!Number.isFinite(value)) {
		throw new Error(`Invalid dealer field: ${field}`);
	}
	return value;
}
