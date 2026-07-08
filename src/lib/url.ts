// Bygger interne lenker som respekterer Astros `base` (viktig for GitHub Pages
// prosjektsider, der siden ligger under /chef-julie/).
const base = import.meta.env.BASE_URL;

export function url(path = ''): string {
  return `${base.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;
}
