import { describe, expect, it } from 'vitest';
import { products, specificationFields, validateProducts, type Product } from './products';

describe('product catalogue', () => {
	it('contains 12 products with the same specification fields', () => {
		expect(products).toHaveLength(12);
		for (const product of products) expect(Object.keys(product.specifications)).toEqual(specificationFields.map(field => field.key));
	});

	it('fails loudly when a required specification is missing', () => {
		const invalid = structuredClone(products) as unknown as Product[];
		invalid[0].specifications.capacity = '';
		expect(() => validateProducts(invalid)).toThrow('kb-h25.capacity ontbreekt');
	});
});
