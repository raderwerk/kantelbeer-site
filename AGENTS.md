# AGENTS.md

Instructies voor Codex, Cursor, Claude en elke andere agent die aan deze repo werkt.

## Scope van deze repo

`kantelbeer-site` is de merksite en dealercatalogus voor Kantelbeer, een fictieve B2B-klant van Raderwerk (zie `README.md`). Werk hier alleen aan wat in het gekoppelde Linear-issue staat: de productcatalogus, de dealercatalogus, het offerteaanvraagformulier, tweetaligheid (NL/EN) en toegankelijkheid (WCAG 2.2 AA). Kantelbeer is fictief — verzin geen echte bedrijfsnaam, geen echt telefoonnummer, geen echt e-mailadres. Elke publieke pagina draagt de voettekst: *"Demonstratiebedrijf van Raderwerk. Dit bedrijf bestaat niet."*

## Definition of Done

Voor uitvoerend werk (feature, bugfix, designtaak) op deze repo geldt, ontleend aan de dienstlijn "web" in de Raderwerk-werkplaats:

- Elk acceptatiecriterium uit het issue is afgevinkt met een link naar aanklikbaar bewijs (PR, preview-URL, screenshot, testuitvoer).
- `npm run typecheck` en `npm run build` draaien groen; de testuitvoer staat in de PR-beschrijving of in een comment.
- De PR is geopend met een beschrijving, groene CI (`ci`-check) en een preview-URL als attachment.
- Toegankelijkheid: volledig toetsenbordpad, tekstcontrast minimaal 4,5:1, gemeten en genoemd.
- Werkt op 360, 768 en 1440 pixels breed, met bewijs (screenshots).
- Geen geheimen in de repo, geen productiecredentials.
- README bijgewerkt als het gedrag of de lokale werkwijze verandert.
- Twee onafhankelijke reviews, uit verschillende modelfamilies, vóór de mergepoort.

## PR-conventies

- Commits en PR-titels in het Engels.
- Eén PR per issue, branchnaam `feat/<issue>-<korte-titel>` of `fix/<issue>-<korte-titel>`.
- Vul het PR-sjabloon volledig in: wat, waarom, bewijs, DoD-checklist, poort.
- Kleine, beoordeelbare diffs. Splits een issue op in meerdere PR's als de scope te groot wordt.

## Verboden handelingen

- **Nooit mergen.** Een agent opent een PR; een mens merget bij de poort.
- **Nooit force-pushen** naar `main`.
- **Nooit deployen** buiten de preview-omgeving die CI/Pages automatisch bouwt.
- **Nooit geheimen** toevoegen, committen of loggen (API-sleutels, tokens, echte klantdata). Deze repo bevat uitsluitend testdata en fictieve content.
- **Nooit** een DoD-punt afvinken zonder verifieerbaar bewijs in dezelfde comment of PR-beschrijving.
- **Nooit** de voettekst met de disclaimer verwijderen of wijzigen op een publieke pagina.

## Vóór het openen van een PR

Draai altijd het CI-commando lokaal en zorg dat het slaagt:

```sh
npm install
npm run typecheck
npm run build
```

## Sign-off

Sluit elke niet-menselijke bijdrage (PR-beschrijving, comment) af met de rol die het werk deed, bijvoorbeeld `Ontwikkelaar · <model>` of `Reviewer · <model>`, conform het rolcontract in de Raderwerk-werkplaats.

## Lokale ontwikkelserver

Start de dev-server op de achtergrond zodat de sessie niet blokkeert:

```sh
astro dev --background
```

Beheer hem met `astro dev stop`, `astro dev status` en `astro dev logs`.

## Astro-documentatie

Volledige documentatie: https://docs.astro.build. Relevant voor deze repo: routing en pagina's, componenten, content collections (productcatalogus, dealercatalogus), styling, en internationalisatie (NL/EN).
