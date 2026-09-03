import { readdir, readFile, access } from 'node:fs/promises';
import { join, dirname, resolve } from 'node:path';

const root = resolve('dist');
const pages = [];
async function walk(dir) { for (const item of await readdir(dir, { withFileTypes: true })) { const file = join(dir, item.name); if (item.isDirectory()) await walk(file); else if (item.name.endsWith('.html')) pages.push(file); } }
await walk(root);
let failures = 0;
for (const page of pages) {
	const html = await readFile(page, 'utf8');
	for (const [, href] of html.matchAll(/href="([^"]+)"/g)) {
		if (/^(https?:|mailto:|tel:|#)/.test(href)) continue;
		const clean = href.split('#')[0].split('?')[0];
		if (!clean || clean.endsWith('.svg') || clean.endsWith('.ico')) continue;
		const relative = clean.startsWith('/kantelbeer-site/') ? clean.slice('/kantelbeer-site/'.length) : clean;
		const target = clean.startsWith('/') ? join(root, relative) : resolve(dirname(page), relative);
		const candidate = target.endsWith('/') ? join(target, 'index.html') : /\.[a-z0-9]+$/i.test(target) ? target : join(target, 'index.html');
		try { await access(candidate); } catch { console.error(`Dead link: ${href} in ${page}`); failures++; }
	}
}
if (failures) process.exit(1);
console.log(`Checked ${pages.length} pages: no dead internal links.`);
