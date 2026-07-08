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

Oppskrifter ligger som Markdown-filer i `src/content/recipes/`. Kopier en eksisterende
fil, gi den et nytt filnavn (filnavnet blir URL-en, f.eks. `pannekaker.md` →
`/oppskrifter/pannekaker`), og fyll ut feltene øverst i filen:

```markdown
---
title: Navn på oppskriften
ingress: Kort, fristende beskrivelse.
heroImage: ../../assets/recipes/mitt-bilde.svg
heroImageAlt: Beskrivelse av bildet
servings: 4
prepTime: 10 min
cookTime: 20 min
totalTime: 30 min
difficulty: Enkel        # Enkel | Middels | Avansert
category: Middag
tags:
  - hverdagsmat
ingredientGroups:
  - heading: Røre
    items:
      - 3 dl mel
      - 5 dl melk
instructions:
  - Steg én.
  - Steg to.
tips:
  - Et nyttig tips.
publishedAt: 2026-01-15
draft: false
---

Valgfri brødtekst under ingrediens- og fremgangsmåtefeltene.
```

Bilder legges i `src/assets/recipes/` og refereres relativt fra Markdown-filen.

## Innholdsmodell

Feltene valideres av skjemaet i `src/content.config.ts`. Dette skjemaet er den samme
innholdsmodellen vi planlegger å bruke også når innholdet på sikt hentes fra et CMS.

## Publisering

Nettsiden bygges automatisk og publiseres til **GitHub Pages** ved push til `main`
(se `.github/workflows/deploy.yml`). Aktiver Pages under repo → Settings → Pages →
Source: "GitHub Actions".

Egendefinert domene (f.eks. via one.com) kan kobles på senere under samme innstillinger.

## Videre planer

- **Fase 2:** koble innhold til et redaktørvennlig CMS (f.eks. Sanity eller et
  git-basert CMS) uten å skrive om malene.
- **Fase 3:** filtrering/søk, SEO, bildeoptimalisering.
