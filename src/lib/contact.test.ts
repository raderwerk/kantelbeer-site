import { describe, expect, it } from 'vitest';
import { COPY } from './copy';
import { dealerContactHref, dealerContactLabel } from './contact';
import type { Dealer } from './types';

const formDealer: Dealer = {
	id: 'nokhef',
	name: 'Nokhef Alkmaar',
	street: 'Kaasbaan 4',
	city: 'Alkmaar',
	postcode: '1811 KE',
	province: 'noord-holland',
	country: 'nl',
	type: 'service',
	contact: { kind: 'form', email: 'info@nokhef.example' },
	lat: 52.6324,
	lng: 4.7534,
};

describe('dealer contact', () => {
	it('labels form contacts as email because the action is mailto', () => {
		const label = dealerContactLabel(formDealer, COPY.nl);
		expect(label.toLowerCase()).toContain('e-mail');
		expect(dealerContactHref(formDealer).startsWith('mailto:')).toBe(true);
	});
});
