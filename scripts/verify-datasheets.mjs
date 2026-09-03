import { readFile } from 'node:fs/promises';
import { getProduct } from '../src/data/products.ts';

const samples = ['kb-h25', 'kb-k30', 'kb-w20'];
const base = new URL('../dist/', import.meta.url);
const normalizeTable = html => html.match(/<table class="specification-table">[\s\S]*?<\/table>/)?.[0].replace(/\s+/g, ' ').trim();

for (const slug of samples) {
	const product = getProduct(slug);
	if (!product) throw new Error(`Datasheetcontrole: onbekend product ${slug}.`);
	const files = await Promise.all([
		readFile(new URL(`producten/${product.category}/${slug}/index.html`, base), 'utf8'),
		readFile(new URL(`datasheets/${slug}/index.html`, base), 'utf8'),
	]);
	const [page, sheet] = files.map(normalizeTable);
	if (!page || !sheet || page !== sheet) throw new Error(`Datasheetcontrole mislukt voor ${slug}.`);
	console.log(`✓ ${slug}: specificatietabel is regel voor regel gelijk`);
}
