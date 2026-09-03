import { describe, expect, it } from 'vitest';
import { DISCLAIMER } from './copy';

describe('site disclaimer', () => {
	it('keeps the mandated Raderwerk footer verbatim on every locale', () => {
		expect(DISCLAIMER).toBe('Demonstratiebedrijf van Raderwerk. Dit bedrijf bestaat niet.');
	});
});
