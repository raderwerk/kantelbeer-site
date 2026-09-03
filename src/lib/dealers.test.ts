import { describe, expect, it } from 'vitest';
import { getDealers } from './dealers';
import { queryCatalog } from './catalog';
import type { DealerContact, DealerType } from './types';

const REAL_COMPANY_NAMES = [
	'pon',
	'boels',
	'linde',
	'jungheinrich',
	'toyota',
	'still gmbh',
	'still nederland',
	'crown',
	'hyster',
	'yale',
	'mitsubishi forklift',
	'terberg',
	'van leeuwen',
	'bolk',
	'manitou',
	'caterpillar',
	'bosch',
	'siemens',
	'kion',
	'toyota material',
];

function escapeRegex(value: string): string {
	return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function contactKind(contact: DealerContact): string {
	switch (contact.kind) {
		case 'email':
		case 'phone':
		case 'form':
			return contact.kind;
		default: {
			const exhaustive: never = contact;
			return exhaustive;
		}
	}
}

describe('dealer catalog data', () => {
	it('contains exactly 40 dealers with the required fields', () => {
		const dealers = getDealers();
		expect(dealers).toHaveLength(40);

		const ids = new Set<string>();
		const names = new Set<string>();

		for (const dealer of dealers) {
			expect(dealer.id.length).toBeGreaterThan(0);
			expect(ids.has(dealer.id)).toBe(false);
			ids.add(dealer.id);

			expect(dealer.name.length).toBeGreaterThan(2);
			expect(names.has(dealer.name)).toBe(false);
			names.add(dealer.name);

			expect(dealer.city.length).toBeGreaterThan(1);
			expect(dealer.province.length).toBeGreaterThan(1);
			expect(['nl', 'be', 'de']).toContain(dealer.country);

			const type: DealerType = dealer.type;
			expect(['verkoop', 'service', 'beide']).toContain(type);

			expect(contactKind(dealer.contact).length).toBeGreaterThan(0);
			if (dealer.contact.kind === 'email' || dealer.contact.kind === 'form') {
				expect(dealer.contact.email).toMatch(/@.*\.example$/);
			}
			if (dealer.contact.kind === 'phone') {
				expect(dealer.contact.phone.startsWith('+')).toBe(true);
			}

			expect(dealer.postcode.length).toBeGreaterThan(3);
			expect(Number.isFinite(dealer.lat)).toBe(true);
			expect(Number.isFinite(dealer.lng)).toBe(true);
		}
	});

	it('does not name dealers after existing companies', () => {
		const dealers = getDealers();
		for (const dealer of dealers) {
			const haystack = dealer.name.toLowerCase();
			for (const banned of REAL_COMPANY_NAMES) {
				const pattern = new RegExp(`(?<![a-z])${escapeRegex(banned)}(?![a-z])`, 'i');
				expect(haystack).not.toMatch(pattern);
			}
		}
	});

	it('has at least one filter combination that yields the empty state', () => {
		const result = queryCatalog(getDealers(), { province: 'zeeland', type: 'service' });
		expect(result.status).toBe('empty');
	});
});
