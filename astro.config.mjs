// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	site: 'https://raderwerk.github.io',
	base: '/kantelbeer-site/',
	i18n: {
		defaultLocale: 'nl',
		locales: ['nl', 'en'],
		routing: { prefixDefaultLocale: false },
	},
});
