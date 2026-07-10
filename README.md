# Chef Julie 🍳

Enkel oppskriftsnettside bygget med [Astro](https://astro.build/). Innholdet består av
to typer sider: en **forside** med hero-område og oppskriftsliste, og en fast
**oppskriftsmal**.

## Kom i gang

```bash
npm install
npm run dev
```

Åpne http://localhost:4321 i nettleseren.

| Kommando          | Hva den gjør                          |
| ----------------- | ------------------------------------- |
| `npm run dev`     | Starter lokal utviklingsserver        |
| `npm run build`   | Bygger nettsiden til `dist/`          |
| `npm run preview` | Forhåndsviser den bygde siden lokalt  |

## Legge til en oppskrift

Oppskrifter redigeres i **Sanity Studio** – et enkelt, visuelt redigeringsverktøy.
Ingen koding er nødvendig.

1. Gå til **https://chef-julie.sanity.studio/** og logg inn.
2. Trykk **«Oppskrift» → «Create new»**.
3. Fyll ut feltene (tittel, ingress, bilde, ingredienser, steg, tips …). Dra og
   slipp et bilde i «Hovedbilde».
4. Trykk **Publish**. Nettsiden bygges automatisk på nytt, og oppskriften er live
   etter et par minutter.

Innholdet lagres i Sanity (skytjeneste), og nettsiden henter det ved bygging.

## Innholdsmodell

Feltene defineres av skjemaet i `studio/schemaTypes/recipe.ts`. Nettsiden henter
oppskrifter fra Sanity via `src/lib/sanity.ts`.

### Studio (redigeringsverktøyet)

```bash
cd studio
npm install
npm run dev        # kjør Studio lokalt på http://localhost:3333
npx sanity deploy  # publiser Studio til chef-julie.sanity.studio
```

## Publisering

Nettsiden bygges automatisk og publiseres til **GitHub Pages**:

- ved **push til `main`**, og
- når en oppskrift **publiseres i Sanity Studio** (via en webhook som utløser
  GitHub Actions – hendelsestype `sanity-publish`).

Se `.github/workflows/deploy.yml`.

Egendefinert domene (via one.com / eksisterende `raymondkarlsen.no`) er allerede
koblet på: siden serveres på `raymondkarlsen.no/chef-julie/`.

## Videre planer

- **Fase 3:** filtrering/søk, SEO, bildeoptimalisering.
- Evt. «last opp bilde av oppskrift → utkast lages automatisk» som snarvei i tillegg
  til Studio.
