import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import {
	filterDealers,
	parseCatalogQuery,
	queryCatalog,
	serializeCatalogQuery,
} from './catalog';
import { geocodePostcode, parsePostcode } from './postcode';
import { resultStatusText } from './copy';
import { getDealers } from './dealers';
import { distanceKm } from './geo';
import type { Dealer } from './types';

const fixtures: Dealer[] = [
	{
		id: 'amsterdam',
		name: 'Hefcirkel Amsterdam',
		street: 'Demostraat 1',
		city: 'Amsterdam',
		postcode: '1012 JS',
		province: 'noord-holland',
		country: 'nl',
		type: 'beide',
		contact: { kind: 'email', email: 'verkoop@hefcirkel.example' },
		lat: 52.3738,
		lng: 4.8909,
	},
	{
		id: 'middelburg',
		name: 'Kanteldijk Middelburg',
		street: 'Demostraat 2',
		city: 'Middelburg',
		postcode: '4331 LH',
		province: 'zeeland',
		country: 'nl',
		type: 'verkoop',
		contact: { kind: 'phone', phone: '+31 118 000 4331' },
		lat: 51.4988,
		lng: 3.61,
	},
	{
		id: 'assen',
		name: 'Nokvaart Assen',
		street: 'Demostraat 3',
		city: 'Assen',
		postcode: '9401 JW',
		province: 'drenthe',
		country: 'nl',
		type: 'service',
		contact: { kind: 'form', email: 'info@nokvaart.example' },
		lat: 52.9925,
		lng: 6.5642,
	},
	{
		id: 'utrecht',
		name: 'Tilthuis Utrecht',
		street: 'Demostraat 4',
		city: 'Utrecht',
		postcode: '3511 WS',
		province: 'utrecht',
		country: 'nl',
		type: 'beide',
		contact: { kind: 'email', email: 'verkoop@tilthuis.example' },
		lat: 52.0907,
		lng: 5.1214,
	},
	{
		id: 'groningen',
		name: 'Draaihaven Groningen',
		street: 'Demostraat 5',
		city: 'Groningen',
		postcode: '9712 JN',
		province: 'groningen',
		country: 'nl',
		type: 'beide',
		contact: { kind: 'phone', phone: '+31 50 000 9712' },
		lat: 53.2194,
		lng: 6.5665,
	},
	{
		id: 'antwerpen',
		name: 'Hefkaai Antwerpen',
		street: 'Demostraat 6',
		city: 'Antwerpen',
		postcode: '2000',
		province: 'antwerpen',
		country: 'be',
		type: 'beide',
		contact: { kind: 'email', email: 'verkoop@hefkaai.example' },
		lat: 51.2213,
		lng: 4.4051,
	},
	{
		id: 'koln',
		name: 'Hebkreis Koln',
		street: 'Demostrasse 7',
		city: 'Köln',
		postcode: '50667',
		province: 'nordrhein-westfalen',
		country: 'de',
		type: 'beide',
		contact: { kind: 'form', email: 'info@hebkreis.example' },
		lat: 50.9375,
		lng: 6.9603,
	},
];

describe('parseCatalogQuery', () => {
	it('reads provincie, type, postcode and land from the URL', () => {
		expect(parseCatalogQuery('?provincie=zeeland&type=service&postcode=4331+LH&land=nl')).toEqual({
			province: 'zeeland',
			type: 'service',
			postcode: '4331 LH',
			country: 'nl',
		});
	});

	it('ignores unknown type and land values', () => {
		expect(parseCatalogQuery('?type=wholesale&land=fr')).toEqual({});
	});
});

describe('serializeCatalogQuery', () => {
	it('round-trips query fields and omits empty ones', () => {
		const query = {
			province: 'utrecht',
			type: 'verkoop' as const,
			postcode: '3511 WS',
			country: 'nl' as const,
		};
		const encoded = serializeCatalogQuery(query);
		expect(encoded.startsWith('?')).toBe(true);
		expect(parseCatalogQuery(encoded)).toEqual(query);
		expect(serializeCatalogQuery({})).toBe('');
	});
});

describe('filterDealers', () => {
	it('filters by province', () => {
		expect(filterDealers(fixtures, { province: 'zeeland' }).map((dealer) => dealer.id)).toEqual([
			'middelburg',
		]);
	});

	it('treats type=verkoop as sales or both', () => {
		const ids = filterDealers(fixtures, { province: 'drenthe', type: 'verkoop' }).map(
			(dealer) => dealer.id,
		);
		expect(ids).toEqual([]);
	});

	it('treats type=service as service or both', () => {
		const ids = filterDealers(fixtures, { type: 'service' }).map((dealer) => dealer.id);
		expect(ids).toContain('assen');
		expect(ids).toContain('amsterdam');
		expect(ids).not.toContain('middelburg');
	});
});

describe('postcode parsing and geocoding', () => {
	it('parses NL, BE and DE formats', () => {
		expect(parsePostcode('1012 JS')).toEqual({ country: 'nl', prefix: '10' });
		expect(parsePostcode('1012js')).toEqual({ country: 'nl', prefix: '10' });
		expect(parsePostcode('2000', 'be')).toEqual({ country: 'be', prefix: '20' });
		expect(parsePostcode('50667')).toEqual({ country: 'de', prefix: '50' });
	});

	it('geocodes Amsterdam, Antwerp and Cologne prefixes', () => {
		const amsterdam = geocodePostcode('1012 JS');
		const antwerp = geocodePostcode('2000', 'be');
		const cologne = geocodePostcode('50667');
		expect(amsterdam).not.toBeNull();
		expect(antwerp).not.toBeNull();
		expect(cologne).not.toBeNull();
		expect(distanceKm(amsterdam!, { lat: 52.3738, lng: 4.8909 })).toBeLessThan(20);
		expect(distanceKm(antwerp!, { lat: 51.2213, lng: 4.4051 })).toBeLessThan(25);
		expect(distanceKm(cologne!, { lat: 50.9375, lng: 6.9603 })).toBeLessThan(25);
	});

	it('does not treat a four-digit code as Dutch when the country is not set', () => {
		expect(parsePostcode('2000')).toBeNull();
		expect(geocodePostcode('2000')).toBeNull();
		expect(geocodePostcode('9000')).toBeNull();
		expect(geocodePostcode('2000', 'be')?.lat).toBeCloseTo(51.2213, 2);
		expect(geocodePostcode('2000', 'nl')?.lat).toBeCloseTo(52.3874, 2);
		expect(geocodePostcode('9000', 'be')?.lat).toBeCloseTo(51.0543, 2);
	});

	it('returns null for unusable input', () => {
		expect(geocodePostcode('')).toBeNull();
		expect(geocodePostcode('abc')).toBeNull();
		expect(geocodePostcode('12')).toBeNull();
	});
});

describe('queryCatalog', () => {
	it('returns the five nearest dealers with distances for a postcode search', () => {
		const extra: Dealer[] = [
			...fixtures,
			{
				id: 'rotterdam',
				name: 'Plateauwacht Rotterdam',
				street: 'Demostraat 8',
				city: 'Rotterdam',
				postcode: '3011 AD',
				province: 'zuid-holland',
				country: 'nl',
				type: 'beide',
				contact: { kind: 'email', email: 'verkoop@plateauwacht.example' },
				lat: 51.9225,
				lng: 4.4792,
			},
			{
				id: 'haarlem',
				name: 'Kantelbaan Haarlem',
				street: 'Demostraat 9',
				city: 'Haarlem',
				postcode: '2011 NC',
				province: 'noord-holland',
				country: 'nl',
				type: 'verkoop',
				contact: { kind: 'phone', phone: '+31 23 000 2011' },
				lat: 52.3874,
				lng: 4.6462,
			},
			{
				id: 'almere',
				name: 'Hefpolder Almere',
				street: 'Demostraat 10',
				city: 'Almere',
				postcode: '1315 AB',
				province: 'flevoland',
				country: 'nl',
				type: 'beide',
				contact: { kind: 'form', email: 'info@hefpolder.example' },
				lat: 52.3508,
				lng: 5.2647,
			},
		];

		const result = queryCatalog(extra, { postcode: '1012 JS' });
		expect(result.status).toBe('ok');
		if (result.status !== 'ok') return;
		expect(result.mode).toBe('nearest');
		expect(result.dealers).toHaveLength(5);
		expect(result.dealers[0]?.id).toBe('amsterdam');
		expect(result.dealers[1]?.id).toBe('haarlem');
		for (const dealer of result.dealers) {
			expect(dealer.distanceKm).toBeGreaterThan(0);
			expect(Number.isFinite(dealer.distanceKm)).toBe(true);
		}
		expect(result.dealers[0]!.distanceKm).toBeLessThan(result.dealers[4]!.distanceKm ?? Infinity);
	});

	it('returns an empty-state message with alternatives instead of an empty list', () => {
		const result = queryCatalog(fixtures, { province: 'zeeland', type: 'service' });
		expect(result.status).toBe('empty');
		if (result.status !== 'empty') return;
		expect(result.dealers).toEqual([]);
		expect(result.messageKey).toBe('emptyFiltered');
		expect(result.alternatives.length).toBeGreaterThan(0);
		expect(result.alternatives.some((item) => item.params.province === 'zeeland' && !item.params.type)).toBe(
			true,
		);
		expect(result.alternatives.some((item) => item.params.type === 'service' && !item.params.province)).toBe(
			true,
		);
	});

	it('returns an invalid-postcode state with an alternative to clear the search', () => {
		const result = queryCatalog(fixtures, { postcode: 'nope' });
		expect(result.status).toBe('invalid-postcode');
		if (result.status !== 'invalid-postcode') return;
		expect(result.dealers).toEqual([]);
		expect(result.alternatives.some((item) => item.params.postcode === undefined)).toBe(true);
	});

	it('asks for a country instead of ranking a Belgian four-digit postcode as Dutch', () => {
		const result = queryCatalog(getDealers(), { postcode: '2000' });
		expect(result.status).toBe('ambiguous-postcode');
		if (result.status !== 'ambiguous-postcode') return;
		expect(result.dealers).toEqual([]);
		expect(
			result.alternatives.some(
				(item) => item.params.country === 'be' && item.params.postcode === '2000',
			),
		).toBe(true);
		expect(
			result.alternatives.some(
				(item) => item.params.country === 'nl' && item.params.postcode === '2000',
			),
		).toBe(true);

		const belgian = queryCatalog(getDealers(), { postcode: '2000', country: 'be' });
		expect(belgian.status).toBe('ok');
		if (belgian.status !== 'ok') return;
		expect(belgian.dealers[0]?.id).toBe('hefkaai-antwerpen');
		expect(belgian.dealers[0]?.country).toBe('be');
	});

	it('reports the actual number of nearest matches when filters leave fewer than five', () => {
		const result = queryCatalog(fixtures, { province: 'zeeland', postcode: '4331 LH' });
		expect(result.status).toBe('ok');
		if (result.status !== 'ok') return;
		expect(result.dealers).toHaveLength(1);
		const status = resultStatusText('nl', result, { province: 'zeeland', postcode: '4331 LH' });
		expect(status).toContain('4331 LH');
		expect(status).not.toMatch(/vijf/i);
		expect(status.toLowerCase()).toContain('dealer');
	});

	it('does not use the browser geolocation API', () => {
		const files = [
			'src/lib/catalog.ts',
			'src/lib/catalog-ui.ts',
			'src/lib/postcode.ts',
			'src/lib/geo.ts',
			'src/lib/dealers.ts',
			'src/components/DealerCatalog.astro',
		];
		for (const file of files) {
			expect(readFileSync(file, 'utf8'), file).not.toMatch(/geolocation/i);
		}
		const result = queryCatalog(fixtures, { postcode: '3511 WS' });
		expect(result.status).toBe('ok');
	});
});
