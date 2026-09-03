import { parseCatalogQuery, queryCatalog, serializeCatalogQuery } from './catalog';
import { COPY, alternativeLabel, fill, resultStatusText } from './copy';
import { getDealers } from './dealers';
import type { Locale } from './labels';
import { provinceLabel, typeLabel } from './labels';
import { dealerContactHref, dealerContactLabel } from './contact';
import type { CatalogQuery, CatalogResult, RankedDealer } from './types';
import { isCountry, isDealerType } from './types';

const dealers = getDealers();

export function bindCatalog(root: HTMLElement): void {
	const locale: Locale = root.dataset.locale === 'en' ? 'en' : 'nl';
	const copy = COPY[locale];
	const form = root.querySelector<HTMLFormElement>('[data-catalog-form]');
	const status = root.querySelector<HTMLElement>('[data-catalog-status]');
	const empty = root.querySelector<HTMLElement>('[data-catalog-empty]');
	const list = root.querySelector<HTMLElement>('[data-catalog-list]');

	if (!form || !status || !empty || !list) {
		return;
	}

	const apply = (query: CatalogQuery, updateUrl: boolean) => {
		syncForm(form, query);
		const result = queryCatalog(dealers, query);
		if (updateUrl) {
			writeUrl(query);
			syncLanguageLinks(query);
		}

		status.textContent = resultStatusText(locale, result, query);
		renderResult(result, { locale, copy, list, empty, apply });
	};

	apply(parseCatalogQuery(window.location.search), false);
	syncLanguageLinks(parseCatalogQuery(window.location.search));

	form.addEventListener('submit', (event) => {
		event.preventDefault();
		apply(readForm(form), true);
	});

	form.addEventListener('reset', (event) => {
		event.preventDefault();
		apply({}, true);
	});

	form.addEventListener('change', (event) => {
		const target = event.target;
		if (!(target instanceof HTMLElement)) return;
		if (target.getAttribute('name') === 'postcode') return;
		apply(readForm(form), true);
	});

	window.addEventListener('popstate', () => {
		apply(parseCatalogQuery(window.location.search), false);
	});
}

function renderResult(
	result: CatalogResult,
	ctx: {
		locale: Locale;
		copy: (typeof COPY)[Locale];
		list: HTMLElement;
		empty: HTMLElement;
		apply: (query: CatalogQuery, updateUrl: boolean) => void;
	},
): void {
	if (result.status === 'ok') {
		ctx.empty.hidden = true;
		ctx.empty.replaceChildren();
		ctx.list.hidden = false;
		ctx.list.replaceChildren(
			...result.dealers.map((dealer) => renderCard(dealer, ctx.locale, ctx.copy)),
		);
		return;
	}

	ctx.list.hidden = true;
	ctx.list.replaceChildren();
	ctx.empty.hidden = false;
	ctx.empty.replaceChildren(renderEmpty(result, ctx));
}

function renderEmpty(
	result: Extract<CatalogResult, { alternatives: unknown[] }>,
	ctx: {
		locale: Locale;
		copy: (typeof COPY)[Locale];
		apply: (query: CatalogQuery, updateUrl: boolean) => void;
	},
): HTMLElement {
	const box = document.createElement('div');
	box.className = 'empty-state';

	const heading = document.createElement('h3');
	heading.textContent = ctx.copy[result.messageKey];

	const list = document.createElement('ul');
	list.className = 'empty-state__alts';

	for (const alternative of result.alternatives) {
		const item = document.createElement('li');
		const link = document.createElement('a');
		const href = serializeCatalogQuery(alternative.params);
		link.href = href || window.location.pathname;
		link.textContent = alternativeLabel(ctx.locale, alternative);
		link.addEventListener('click', (event) => {
			event.preventDefault();
			ctx.apply(alternative.params, true);
		});
		item.append(link);
		list.append(item);
	}

	box.append(heading, list);
	return box;
}

function renderCard(dealer: RankedDealer, locale: Locale, copy: (typeof COPY)[Locale]): HTMLElement {
	const item = document.createElement('li');
	const article = document.createElement('article');
	article.className = 'dealer-card';

	const heading = document.createElement('h3');
	heading.textContent = dealer.name;

	const meta = document.createElement('p');
	meta.className = 'dealer-card__type';
	meta.textContent = typeLabel(dealer.type, locale);

	const address = document.createElement('address');
	address.className = 'dealer-card__address';
	address.textContent = `${dealer.street}, ${dealer.postcode} ${dealer.city}, ${provinceLabel(dealer.province, locale)}`;

	article.append(heading, meta, address);

	if (typeof dealer.distanceKm === 'number') {
		const distance = document.createElement('p');
		distance.className = 'dealer-card__distance';
		distance.textContent = fill(copy.distance, {
			distance: formatDistance(dealer.distanceKm, locale),
		});
		article.append(distance);
	}

	const contact = document.createElement('p');
	const link = document.createElement('a');
	link.href = dealerContactHref(dealer);
	link.textContent = dealerContactLabel(dealer, copy);
	contact.append(link);
	article.append(contact);
	item.append(article);
	return item;
}

function readForm(form: HTMLFormElement): CatalogQuery {
	const data = new FormData(form);
	const query: CatalogQuery = {};
	const province = stringValue(data.get('provincie'));
	const type = stringValue(data.get('type'));
	const postcode = stringValue(data.get('postcode'));
	const country = stringValue(data.get('land'));
	if (province) query.province = province;
	if (isDealerType(type)) query.type = type;
	if (postcode) query.postcode = postcode;
	if (isCountry(country)) query.country = country;
	return query;
}

function syncForm(form: HTMLFormElement, query: CatalogQuery): void {
	setControl(form, 'provincie', query.province ?? '');
	setControl(form, 'type', query.type ?? '');
	setControl(form, 'postcode', query.postcode ?? '');
	setControl(form, 'land', query.country ?? '');
}

function setControl(form: HTMLFormElement, name: string, value: string): void {
	const control = form.elements.namedItem(name);
	if (control instanceof HTMLInputElement || control instanceof HTMLSelectElement) {
		control.value = value;
	}
}

function writeUrl(query: CatalogQuery): void {
	const url = new URL(window.location.href);
	url.search = serializeCatalogQuery(query).replace(/^\?/, '');
	history.replaceState(null, '', `${url.pathname}${url.search}${url.hash}`);
}

function syncLanguageLinks(query: CatalogQuery): void {
	const suffix = serializeCatalogQuery(query);
	for (const link of document.querySelectorAll<HTMLAnchorElement>('[data-lang-switch]')) {
		const baseHref = link.dataset.langBase;
		if (!baseHref) continue;
		link.href = `${baseHref}${suffix}`;
	}
}

function stringValue(value: FormDataEntryValue | null): string | undefined {
	if (typeof value !== 'string') return undefined;
	const trimmed = value.trim();
	return trimmed ? trimmed : undefined;
}

export function formatDistance(km: number, locale: Locale): string {
	const rounded = km < 10 ? km.toFixed(1) : Math.round(km).toString();
	const value = locale === 'nl' ? rounded.replace('.', ',') : rounded;
	return `${value} km`;
}
