export const categories = [
	{
		slug: 'hefbruggen',
		name: 'Hefbruggen',
		label: '01 — Omhoog',
		title: 'Vrij werken op elke hoogte.',
		description: 'Robuuste hydraulische hefbruggen voor montage, onderhoud en inspectie. Ontworpen voor dagelijks intensief gebruik.',
		specs: ['2.500–8.000 kg', 'Tot 2.100 mm', 'Elektrohydraulisch'],
		models: ['KB H25', 'KB H40', 'KB H80'],
	},
	{
		slug: 'kantelaars',
		name: 'Kantelaars',
		label: '02 — Draaien',
		title: 'Elke zijde binnen handbereik.',
		description: 'Veilig en gecontroleerd kantelen van carrosserieën en industriële componenten, met maximale toegang rondom.',
		specs: ['1.500–5.000 kg', 'Tot 360°', 'Synchrone aandrijving'],
		models: ['KB K15', 'KB K30', 'KB K50'],
	},
	{
		slug: 'werkplaatsliften',
		name: 'Werkplaatsliften',
		label: '03 — Verplaatsen',
		title: 'Ruimte die met je meewerkt.',
		description: 'Mobiele liftoplossingen voor flexibel materiaaltransport en ergonomisch werken zonder vaste installatie.',
		specs: ['500–2.000 kg', 'Compact chassis', 'Accuvoeding'],
		models: ['KB W05', 'KB W12', 'KB W20'],
	},
] as const;

export const nav = [
	{ href: '/producten', label: 'Systemen', children: categories.map(({ slug, name }) => ({ href: `/producten/${slug}`, label: name })) },
	{ href: '/over-ons', label: 'Over ons' },
	{ href: '/dealer-worden', label: 'Dealer worden' },
	{ href: '/contact', label: 'Contact' },
] as const;
