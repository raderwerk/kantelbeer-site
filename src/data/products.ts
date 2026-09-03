export const specificationFields = [
	{ key: 'capacity', label: 'Hefvermogen' },
	{ key: 'liftHeight', label: 'Hefhoogte' },
	{ key: 'platform', label: 'Platform / opname' },
	{ key: 'dimensions', label: 'Afmetingen (l × b × h)' },
	{ key: 'drive', label: 'Aandrijving' },
	{ key: 'power', label: 'Voeding' },
	{ key: 'cycle', label: 'Cyclusduur' },
	{ key: 'installation', label: 'Installatie' },
	{ key: 'weight', label: 'Eigen gewicht' },
	{ key: 'standard', label: 'Norm' },
] as const;

type SpecificationKey = (typeof specificationFields)[number]['key'];
export type Specifications = Record<SpecificationKey, string>;
export type ProductCategory = 'hefbruggen' | 'kantelaars' | 'werkplaatsliften';
export type Product = { slug: string; name: string; category: ProductCategory; summary: string; specifications: Specifications };

/** Eén bron voor catalogus, productpagina, vergelijker en datasheet. */
export const products = [
	{ slug: 'kb-h25', name: 'KB H25', category: 'hefbruggen', summary: 'Tweekoloms hefbrug voor personenwagens.', specifications: { capacity: '2.500 kg', liftHeight: '1.900 mm', platform: '4 zwenkarmen', dimensions: '3.420 × 3.100 × 2.820 mm', drive: 'Elektrohydraulisch', power: '400 V / 2,2 kW', cycle: '55 s', installation: 'Vloermontage', weight: '620 kg', standard: 'EN 1493' } },
	{ slug: 'kb-h35', name: 'KB H35', category: 'hefbruggen', summary: 'Tweekoloms hefbrug voor bestelwagens.', specifications: { capacity: '3.500 kg', liftHeight: '1.950 mm', platform: '4 zwenkarmen', dimensions: '3.650 × 3.280 × 2.900 mm', drive: 'Elektrohydraulisch', power: '400 V / 2,6 kW', cycle: '60 s', installation: 'Vloermontage', weight: '710 kg', standard: 'EN 1493' } },
	{ slug: 'kb-h40', name: 'KB H40', category: 'hefbruggen', summary: 'Vierkoloms hefbrug met rijbanen.', specifications: { capacity: '4.000 kg', liftHeight: '1.850 mm', platform: 'Rijbanen 4.600 × 550 mm', dimensions: '5.400 × 3.050 × 2.150 mm', drive: 'Elektrohydraulisch', power: '400 V / 3,0 kW', cycle: '65 s', installation: 'Vloermontage', weight: '1.180 kg', standard: 'EN 1493' } },
	{ slug: 'kb-h80', name: 'KB H80', category: 'hefbruggen', summary: 'Vierkoloms hefbrug voor bedrijfsvoertuigen.', specifications: { capacity: '8.000 kg', liftHeight: '2.100 mm', platform: 'Rijbanen 6.000 × 700 mm', dimensions: '6.850 × 3.600 × 2.450 mm', drive: 'Elektrohydraulisch', power: '400 V / 5,5 kW', cycle: '85 s', installation: 'Vloermontage', weight: '2.350 kg', standard: 'EN 1493' } },
	{ slug: 'kb-k15', name: 'KB K15', category: 'kantelaars', summary: 'Kantelaar voor carrosserieën en lichte componenten.', specifications: { capacity: '1.500 kg', liftHeight: '1.400 mm', platform: 'Verstelbare draagarmen', dimensions: '4.200 × 2.100 × 2.350 mm', drive: 'Hydraulisch, 180°', power: '400 V / 2,2 kW', cycle: '70 s', installation: 'Vloermontage', weight: '780 kg', standard: 'EN 1493' } },
	{ slug: 'kb-k20', name: 'KB K20', category: 'kantelaars', summary: 'Kantelaar met instelbare opnames.', specifications: { capacity: '2.000 kg', liftHeight: '1.500 mm', platform: 'Verstelbare draagarmen', dimensions: '4.500 × 2.250 × 2.450 mm', drive: 'Hydraulisch, 180°', power: '400 V / 2,6 kW', cycle: '75 s', installation: 'Vloermontage', weight: '920 kg', standard: 'EN 1493' } },
	{ slug: 'kb-k30', name: 'KB K30', category: 'kantelaars', summary: 'Synchrone kantelaar voor industriële componenten.', specifications: { capacity: '3.000 kg', liftHeight: '1.650 mm', platform: 'Universele spanramen', dimensions: '5.100 × 2.500 × 2.700 mm', drive: 'Synchroon hydraulisch, 360°', power: '400 V / 4,0 kW', cycle: '90 s', installation: 'Verankerde vloerrails', weight: '1.460 kg', standard: 'EN 1493' } },
	{ slug: 'kb-k50', name: 'KB K50', category: 'kantelaars', summary: 'Kantelaar voor zware industriële componenten.', specifications: { capacity: '5.000 kg', liftHeight: '1.800 mm', platform: 'Universele spanramen', dimensions: '6.200 × 3.000 × 3.100 mm', drive: 'Synchroon hydraulisch, 360°', power: '400 V / 5,5 kW', cycle: '110 s', installation: 'Verankerde vloerrails', weight: '2.420 kg', standard: 'EN 1493' } },
	{ slug: 'kb-w05', name: 'KB W05', category: 'werkplaatsliften', summary: 'Mobiele schaarlift voor onderdelen.', specifications: { capacity: '500 kg', liftHeight: '1.100 mm', platform: '900 × 600 mm', dimensions: '1.350 × 720 × 380 mm', drive: 'Elektrohydraulisch', power: '24 V accu / 0,8 kW', cycle: '28 s', installation: 'Mobiel', weight: '185 kg', standard: 'EN 1570-1' } },
	{ slug: 'kb-w10', name: 'KB W10', category: 'werkplaatsliften', summary: 'Mobiele schaarlift met gesloten platform.', specifications: { capacity: '1.000 kg', liftHeight: '1.300 mm', platform: '1.200 × 800 mm', dimensions: '1.650 × 920 × 420 mm', drive: 'Elektrohydraulisch', power: '24 V accu / 1,2 kW', cycle: '35 s', installation: 'Mobiel', weight: '310 kg', standard: 'EN 1570-1' } },
	{ slug: 'kb-w12', name: 'KB W12', category: 'werkplaatsliften', summary: 'Mobiele lift voor werkplaatsassemblage.', specifications: { capacity: '1.200 kg', liftHeight: '1.500 mm', platform: '1.400 × 900 mm', dimensions: '1.850 × 1.020 × 450 mm', drive: 'Elektrohydraulisch', power: '24 V accu / 1,5 kW', cycle: '42 s', installation: 'Mobiel', weight: '390 kg', standard: 'EN 1570-1' } },
	{ slug: 'kb-w20', name: 'KB W20', category: 'werkplaatsliften', summary: 'Mobiele lift met breed platform.', specifications: { capacity: '2.000 kg', liftHeight: '1.600 mm', platform: '1.800 × 1.000 mm', dimensions: '2.200 × 1.150 × 500 mm', drive: 'Elektrohydraulisch', power: '48 V accu / 2,2 kW', cycle: '50 s', installation: 'Mobiel', weight: '640 kg', standard: 'EN 1570-1' } },
] as const satisfies readonly Product[];

export function validateProducts(values: readonly Product[]): void {
	if (values.length !== 12) throw new Error(`Productvalidatie: verwacht 12 producten, kreeg ${values.length}.`);
	const slugs = new Set<string>();
	for (const item of values) {
		if (!item.slug || !item.name || !item.category || !item.summary) throw new Error(`Productvalidatie: verplicht basisveld ontbreekt bij ${item.slug || item.name || 'onbekend product'}.`);
		if (slugs.has(item.slug)) throw new Error(`Productvalidatie: dubbele slug ${item.slug}.`);
		slugs.add(item.slug);
		for (const { key } of specificationFields) {
			if (typeof item.specifications[key] !== 'string' || item.specifications[key].trim() === '') throw new Error(`Productvalidatie: ${item.slug}.${key} ontbreekt.`);
		}
		const actual = Object.keys(item.specifications);
		if (actual.length !== specificationFields.length || actual.some(key => !specificationFields.some(field => field.key === key))) throw new Error(`Productvalidatie: ${item.slug} heeft afwijkende specificatievelden.`);
	}
}

validateProducts(products);
export const getProduct = (slug: string) => products.find(item => item.slug === slug);
