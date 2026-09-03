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

## Bijdragen

Werk gaat via pull requests op `main`. Draai `npm run typecheck` en `npm run build` lokaal vóórdat je een PR opent — de CI-check `ci` moet slagen voordat een PR gemerged kan worden. Zie `AGENTS.md` voor de volledige scope, Definition of Done en verboden handelingen voor agents die aan deze repo werken.

## Poort

De hoofdbranch `main` is beschermd: pull request verplicht, de status check `ci` moet slagen, geen force-push en geen verwijdering. Een mens merget; agents mergen nooit.
