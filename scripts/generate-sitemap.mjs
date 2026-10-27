import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const GENERATED_SITEMAP_PATH = path.join(ROOT_DIR, 'src', 'generated', 'sitemap.xml');
const PUBLIC_SITEMAP_PATH = path.join(ROOT_DIR, 'public', 'sitemap.xml');
const ROUTES_PATH = path.join(ROOT_DIR, 'src', 'lib', 'routes.ts');
const SERVICES_PATH = path.join(ROOT_DIR, 'src', 'data', 'services.ts');
const LOCATIONS_PATH = path.join(ROOT_DIR, 'src', 'data', 'locations.ts');

const SITE_ORIGIN = 'https://www.meridianinfotechsolutions.in';

function normalizeUrl(url) {
  const parsed = new URL(url);

  if (parsed.pathname === '/locations/SOBO') {
    parsed.pathname = '/locations/sobo/';
    return parsed.toString();
  }

  if (parsed.pathname !== '/' && !parsed.pathname.endsWith('/')) {
    parsed.pathname = `${parsed.pathname}/`;
  }

  return parsed.toString();
}

function extractArrayValues(source, name) {
  const match = source.match(new RegExp(`(?:const|export const)\\s+${name}\\s*=\\s*\\[([\\s\\S]*?)\\]`));
  return match ? [...match[1].matchAll(/'([^']+)'|"([^"]+)"/g)].map((item) => item[1] ?? item[2]) : [];
}

function extractSlugs(source) {
  return [...source.matchAll(/slug:\s*'([^']+)'/g)].map((match) => match[1]);
}

function getRoutes(routesSource, servicesSource, locationsSource) {
  const staticRoutes = extractArrayValues(routesSource, 'staticRoutes');
  const extraRoutes = extractArrayValues(routesSource, 'extraRoutes');
  const serviceRoutes = extractSlugs(servicesSource).map((slug) => `/services/${slug}/`);
  const locationRoutes = extractSlugs(locationsSource).map((slug) => `/locations/${slug}/`);

  return [...new Set([...staticRoutes, ...serviceRoutes, ...locationRoutes, ...extraRoutes])]
    .map((route) => route === '/' ? route : `${route.replace(/\/+$/, '')}/`);
}

function readExistingMetadata(xml) {
  const metadata = new Map();
  const urlRegex = /<url>\s*<loc>([^<]+)<\/loc>([\s\S]*?)<\/url>/g;
  let match;

  while ((match = urlRegex.exec(xml)) !== null) {
    metadata.set(normalizeUrl(match[1]), match[2].trim());
  }

  return metadata;
}

function createSitemapXml(routes, existingXml) {
  const metadata = readExistingMetadata(existingXml);
  const today = new Date().toISOString().slice(0, 10);
  const entries = routes.map((route) => {
    const url = normalizeUrl(`${SITE_ORIGIN}${route}`);
    const details = metadata.get(url) ?? [
      `    <lastmod>${today}</lastmod>`,
      '    <changefreq>monthly</changefreq>',
      '    <priority>0.7</priority>',
    ].join('\n');

    return `  <url>\n    <loc>${url}</loc>\n${details}\n  </url>`;
  });

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries.join('\n')}\n</urlset>\n`;
}

async function run() {
  const [routesSource, servicesSource, locationsSource, existingXml] = await Promise.all([
    fs.readFile(ROUTES_PATH, 'utf8'),
    fs.readFile(SERVICES_PATH, 'utf8'),
    fs.readFile(LOCATIONS_PATH, 'utf8'),
    fs.readFile(GENERATED_SITEMAP_PATH, 'utf8'),
  ]);
  const routes = getRoutes(routesSource, servicesSource, locationsSource);
  const sitemapXml = createSitemapXml(routes, existingXml);

  await fs.writeFile(GENERATED_SITEMAP_PATH, sitemapXml);
  await fs.writeFile(PUBLIC_SITEMAP_PATH, sitemapXml);

  console.log(`Sitemap generated: ${routes.length} URLs`);
  console.log(`  Static: ${extractArrayValues(routesSource, 'staticRoutes').length}`);
  console.log(`  Services: ${extractSlugs(servicesSource).length}`);
  console.log(`  Locations: ${extractSlugs(locationsSource).length}`);
  console.log(`  Specialized: ${extractArrayValues(routesSource, 'extraRoutes').length}`);
}

run().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
