import { describe, expect, it } from 'vitest';
import { categories, categoryRoute, nav } from '../src/data/site';

describe('category routes', () => {
	it('derives every product navigation route from its slug', () => {
		const productLinks = nav[0].children.map(({ href }) => href);
		expect(productLinks).toEqual(categories.map(({ slug }) => categoryRoute(slug)));
		expect(categoryRoute('hefbruggen')).toBe('/producten/hefbruggen');
	});
});
