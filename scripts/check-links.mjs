import { access, readFile, readdir } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';

async function htmlPages(root) {
	const pages = [];
	async function walk(directory) {
		for (const item of await readdir(directory, { withFileTypes: true })) {
			const file = join(directory, item.name);
			if (item.isDirectory()) await walk(file);
			else if (item.name.endsWith('.html')) pages.push(file);
		}
	}
	await walk(root);
	return pages;
}

function htmlTarget(target) {
	if (target.endsWith('/')) return join(target, 'index.html');
	return /\.[a-z0-9]+$/i.test(target) ? target : join(target, 'index.html');
}

function attributes(html, attribute) {
	const pattern = new RegExp(`\\b${attribute}=(?:"([^"]*)"|'([^']*)')`, 'gi');
	return [...html.matchAll(pattern)].map((match) => match[1] ?? match[2]);
}

export async function checkLinks({ root = resolve('dist'), base = '/' } = {}) {
	const pages = await htmlPages(root);
	const failures = [];
	const normalizedBase = `/${base.replace(/^\/+|\/+$/g, '')}/`.replace('//', '/');

	for (const page of pages) {
		const html = await readFile(page, 'utf8');
		for (const href of attributes(html, 'href')) {
			if (/^(?:https?:|mailto:|tel:|data:|javascript:)/i.test(href)) continue;

			const [pathPart, rawFragment] = href.split('#', 2);
			const clean = pathPart.split('?')[0];
			if (!clean && rawFragment === undefined) continue;
			const relative = clean.startsWith(normalizedBase) ? clean.slice(normalizedBase.length) : clean.replace(/^\//, '');
			const target = clean
				? htmlTarget(clean.startsWith('/') ? join(root, relative) : resolve(dirname(page), relative))
				: page;

			try {
				await access(target);
			} catch {
				failures.push(`Dead link: ${href} in ${page}`);
				continue;
			}

			if (rawFragment) {
				const targetHtml = await readFile(target, 'utf8');
				const fragment = decodeURIComponent(rawFragment);
				const anchors = new Set([...attributes(targetHtml, 'id'), ...attributes(targetHtml, 'name')]);
				if (!anchors.has(fragment)) failures.push(`Missing anchor #${fragment}: ${href} in ${page}`);
			}
		}
	}

	return { pages: pages.length, failures };
}

async function run() {
	const { default: astroConfig } = await import('../astro.config.mjs');
	const result = await checkLinks({ base: astroConfig.base });
	for (const failure of result.failures) console.error(failure);
	if (result.failures.length) process.exitCode = 1;
	else console.log(`Checked ${result.pages} pages: no dead internal links or anchors.`);
}

if (process.argv[1] && import.meta.url === new URL(`file://${resolve(process.argv[1])}`).href) await run();
