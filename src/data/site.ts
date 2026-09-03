import { products, type ProductCategory } from './products';

export const categoryRoute = (slug: string) => `/producten/${slug}`;

const categoryContent = [
	{
		slug: 'hefbruggen',
		name: 'Hefbruggen',
		label: '01 — Omhoog',
		title: 'Vrij werken op elke hoogte.',
		description: 'Robuuste hydraulische hefbruggen voor montage, onderhoud en inspectie. Ontworpen voor dagelijks intensief gebruik.',
	},
	{
		slug: 'kantelaars',
		name: 'Kantelaars',
		label: '02 — Draaien',
		title: 'Elke zijde binnen handbereik.',
		description: 'Veilig en gecontroleerd kantelen van carrosserieën en industriële componenten, met maximale toegang rondom.',
	},
	{
		slug: 'werkplaatsliften',
		name: 'Werkplaatsliften',
		label: '03 — Verplaatsen',
		title: 'Ruimte die met je meewerkt.',
		description: 'Mobiele liftoplossingen voor flexibel materiaaltransport en ergonomisch werken zonder vaste installatie.',
	},
] as const;

const numericValue = (value: string) => Number(value.replace(/\D/g, ''));

/** Category summaries are derived from the validated product catalogue. */
export const categories = categoryContent.map(category => {
	const models = products.filter(product => product.category === category.slug as ProductCategory);
	const capacities = models.map(product => product.specifications.capacity);
	const liftHeights = models.map(product => product.specifications.liftHeight);
	return {
		...category,
		models,
		specs: [
			`${capacities.at(0)}–${capacities.at(-1)}`,
			`Tot ${liftHeights.reduce((highest, value) => numericValue(value) > numericValue(highest) ? value : highest)}`,
			[...new Set(models.map(product => product.specifications.installation))].join(' / '),
		],
	};
});

export const nav = [
	{ href: '/producten', label: 'Systemen', children: categories.map(({ slug, name }) => ({ href: categoryRoute(slug), label: name })) },
	{ href: '/over-ons', label: 'Over ons' },
	{ href: '/dealer-worden', label: 'Dealer worden' },
	{ href: '/contact', label: 'Contact' },
] as const;
