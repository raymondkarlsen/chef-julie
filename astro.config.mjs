import { defineConfig } from 'astro/config';

// Oppdater 'site' når domenet er klart (f.eks. via one.com).
// For GitHub Pages på et prosjekt-repo settes vanligvis også 'base'.
export default defineConfig({
  site: 'https://raymondkarlsen.no',
  base: '/chef-julie',
});
