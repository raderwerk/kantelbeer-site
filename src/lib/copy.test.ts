import { describe, expect, it } from 'vitest';
import { COPY, DISCLAIMER } from './copy';

describe('site copy', () => {
	it('keeps the mandated Raderwerk footer verbatim for every locale', () => {
		expect(DISCLAIMER).toBe('Demonstratiebedrijf van Raderwerk. Dit bedrijf bestaat niet.');
	});

	it('reports dynamic nearest-dealer counts in both languages', () => {
		expect(COPY.nl.countNearest).toContain('{count}');
		expect(COPY.en.countNearest).toContain('{count}');
		expect(COPY.nl.countNearestOne).toBeTruthy();
		expect(COPY.en.countNearestOne).toBeTruthy();
	});
});
