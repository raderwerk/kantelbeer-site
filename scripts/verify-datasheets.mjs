import { readFile } from 'node:fs/promises';

const samples = ['kb-h25', 'kb-k30', 'kb-w20'];
const base = new URL('../dist/', import.meta.url);
const normalizeTable = html => html.match(/<table class="specification-table">[\s\S]*?<\/table>/)?.[0].replace(/\s+/g, ' ').trim();

for (const slug of samples) {
	const files = await Promise.all([
		readFile(new URL(`producten/${slug.startsWith('kb-h') ? 'hefbruggen' : slug.startsWith('kb-k') ? 'kantelaars' : 'werkplaatsliften'}/${slug}/index.html`, base), 'utf8'),
		readFile(new URL(`datasheets/${slug}/index.html`, base), 'utf8'),
	]);
	const [page, sheet] = files.map(normalizeTable);
	if (!page || !sheet || page !== sheet) throw new Error(`Datasheetcontrole mislukt voor ${slug}.`);
	console.log(`✓ ${slug}: specificatietabel is regel voor regel gelijk`);
}
