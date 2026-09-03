import { describe, expect, it } from 'vitest';
import { COPY } from './copy';
import { dealerContactHref, dealerContactLabel } from './contact';
import type { Dealer } from './types';

function dealer(contact: Dealer['contact']): Dealer {
	return {
		id: 'test',
		name: 'Test',
		street: 'Demostraat 1',
		city: 'Amsterdam',
		postcode: '1012 JS',
		province: 'noord-holland',
		country: 'nl',
		type: 'verkoop',
		contact,
		lat: 52.37,
		lng: 4.89,
	};
}

describe('dealerContactHref', () => {
	it('builds a mailto for form contacts', () => {
		expect(dealerContactHref(dealer({ kind: 'form', email: 'test@example.test' }))).toBe(
			'mailto:test@example.test?subject=Kantelbeer',
		);
	});

	it('builds a mailto for email contacts', () => {
		expect(dealerContactHref(dealer({ kind: 'email', email: 'desk@example.test' }))).toBe(
			'mailto:desk@example.test',
		);
	});

	it('builds a tel link for phone contacts', () => {
		expect(dealerContactHref(dealer({ kind: 'phone', phone: '+31 20 000 0000' }))).toBe(
			'tel:+31200000000',
		);
	});
});

describe('dealerContactLabel', () => {
	it('does not present a mailto form contact as a web form', () => {
		expect(dealerContactLabel(dealer({ kind: 'form', email: 'test@example.test' }), COPY.nl)).toBe(
			'E-mail (contactformulier): test@example.test',
		);
	});

	it('labels email and phone contacts by their kind', () => {
		expect(dealerContactLabel(dealer({ kind: 'email', email: 'desk@example.test' }), COPY.nl)).toBe(
			'E-mail: desk@example.test',
		);
		expect(dealerContactLabel(dealer({ kind: 'phone', phone: '+31 20 000 0000' }), COPY.nl)).toBe(
			'Telefoon: +31 20 000 0000',
		);
	});
});
