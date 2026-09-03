# kantelbeer-site

Merksite en dealercatalogus voor **Kantelbeer**, een fictieve B2B-klant van Raderwerk.

## Doel

Kantelbeer bouwt hydraulische hef- en kantelsystemen voor werkplaatsen en verkoopt uitsluitend via een dealernetwerk in de Benelux en Duitsland. Deze site vervangt een verouderde pdf-achtige folder door een echte merksite: een productcatalogus van twaalf systemen met specificaties en datasheets, een dealercatalogus van veertig dealers met filters, en een offerteaanvraagformulier. Tweetalig (NL/EN) en WCAG 2.2 AA.

## Klant

**Kantelbeer** is fictief. Raderwerk is een demo van een AI-operated, human-governed digitaal bureau; Kantelbeer bestaat niet als bedrijf. Elke publieke pagina draagt daarom de voettekst: *"Demonstratiebedrijf van Raderwerk. Dit bedrijf bestaat niet."*

## Stack en waarom

**Astro**, statisch gebouwd en gepubliceerd op GitHub Pages. Deze site heeft geen server-side logica of gebruikersaccounts nodig — alleen content, catalogi en een formulier dat naar een externe endpoint of e-mail post. Astro geeft de kleinste footprint (geen client-side JS tenzij nodig) voor een contentsite die op meerdere talen en veel statische pagina's moet schalen, en bouwt naar platte HTML die zonder server op Pages draait.

## Lokaal draaien

Vereist: Node.js 22 of hoger.

```sh
npm install
npm run dev
```

De site draait dan op `http://localhost:4321`.

| Commando | Werking |
|---|---|
| `npm run dev` | Lokale ontwikkelserver |
| `npm run build` | Productiebuild naar `./dist/` |
| `npm run preview` | Preview van de build |
| `npm run typecheck` | `astro check`, het type- en templatecontrole-commando dat ook in CI draait |
| `npm test` | Unit tests (Vitest): dealerdata, filters, postcodezoekopdracht, lege staat, route-afleiding en linkcontrole |
| `npm run check:links` | Controleert alle interne routes en in-page-ankers in de productiebuild en faalt bij een dode link |
| `npm run ci` | Draait typecheck, tests, productiebuild en linkcontrole achter elkaar |

## Pagina's en navigatie

De merksite omvat home, drie productcategorieën, over ons, dealer worden, contact/offerte en de dealerzoeker. Alle productcategorieën zijn direct vanaf home bereikbaar. De site gebruikt uitsluitend lokale systeemlettertypen en CSS-vormen; er worden geen zware beeldbestanden of client-side scripts geladen.

## Dealercatalogus

De dealercatalogus staat op `/dealerzoeker/`. Filters werken in de browser zonder paginaherlading en zijn deelbaar via de URL:

| Parameter | Betekenis |
|---|---|
| `provincie` | slug, bijvoorbeeld `zeeland` of `nordrhein-westfalen` |
| `type` | `verkoop`, `service` of `beide` (`verkoop`/`service` sluiten ook dealers van type `beide` in) |
| `postcode` | zoekopdracht; toont de vijf dichtstbijzijnde dealers met afstand |
| `land` | `nl`, `be` of `de`. Verplicht voor een kale viercijferige postcode (NL/BE-botsing); Nederlandse postcodes met letters (`1234 AB`) en Duitse vijfcijferige codes worden herkend zonder dit veld |

De veertig fictieve dealers staan in één databestand: `src/data/dealers.json`. Postcodezoeken gebruikt lokale prefix-coördinaten (geen kaartdienst, geen `geolocation`). Een leeg filterresultaat toont een boodschap met alternatieve links, geen lege lijst.

## Bijdragen

Werk gaat via pull requests op `main`. Draai `npm run typecheck` en `npm run build` lokaal vóórdat je een PR opent — de CI-check `ci` moet slagen voordat een PR gemerged kan worden. Zie `AGENTS.md` voor de volledige scope, Definition of Done en verboden handelingen voor agents die aan deze repo werken.

## Poort

De hoofdbranch `main` is beschermd: pull request verplicht, de status check `ci` moet slagen, geen force-push en geen verwijdering. Een mens merget; agents mergen nooit.
