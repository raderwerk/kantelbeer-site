import { afterEach, describe, expect, it } from 'vitest';
import { mkdtemp, mkdir, rm, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { checkLinks } from '../scripts/check-links.mjs';

const roots: string[] = [];
afterEach(async () => Promise.all(roots.splice(0).map((root) => rm(root, { recursive: true, force: true }))));

async function fixture(html: string) {
	const root = await mkdtemp(join(tmpdir(), 'kantelbeer-links-'));
	roots.push(root);
	await mkdir(join(root, 'contact'), { recursive: true });
	await writeFile(join(root, 'index.html'), html);
	await writeFile(join(root, 'contact', 'index.html'), '<h1 id="offerte">Offerte</h1>');
	return root;
}

describe('checkLinks', () => {
	it('accepts existing routes and in-page anchors under the configured base', async () => {
		const root = await fixture('<main id="inhoud"><a href="#inhoud">Inhoud</a><a href="/voorbeeld/contact/#offerte">Offerte</a></main>');
		expect((await checkLinks({ root, base: '/voorbeeld/' })).failures).toEqual([]);
	});

	it('reports a missing in-page anchor', async () => {
		const root = await fixture('<a href="#bestaat-niet">Kapot</a>');
		expect((await checkLinks({ root, base: '/voorbeeld/' })).failures[0]).toContain('Missing anchor #bestaat-niet');
	});
});
