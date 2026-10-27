import fs from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DIST_DIR = path.join(ROOT_DIR, 'dist');
const SITEMAP_PATH = path.join(DIST_DIR, 'sitemap.xml');
const INDEX_HTML_PATH = path.join(DIST_DIR, 'index.html');

async function processSitemapData() {
    if (!existsSync(DIST_DIR) || !existsSync(SITEMAP_PATH) || !existsSync(INDEX_HTML_PATH)) {
        console.log('Build output not found. Skipping postbuild SEO injection.');
        return;
    }

    const sitemapXml = await fs.readFile(SITEMAP_PATH, 'utf8');
    // Match all <loc> tags
    const locRegex = /<loc>(.*?)<\/loc>/g;
    let match;
    const locs = [];
    while ((match = locRegex.exec(sitemapXml)) !== null) {
        locs.push(match[1]);
    }

    const templateHtml = await fs.readFile(INDEX_HTML_PATH, 'utf8');
    const BASE_URL = 'https://www.meridianinfotechsolutions.in';

    for (const loc of locs) {
        let url;
        try {
            url = new URL(loc);
        } catch {
            continue;
        }
        const routePath = url.pathname;
        if (routePath === '/') continue;

        const routeDir = path.join(DIST_DIR, routePath.replace(/^\//, ''));
        await fs.mkdir(routeDir, { recursive: true });

        // Inject self-referencing canonical layout by replacing the base URL
        // We add a trailing slash to avoid matching partial strings in other places if they ever exist
        const routeHtml = templateHtml.replaceAll(BASE_URL, loc);

        await fs.writeFile(path.join(routeDir, 'index.html'), routeHtml);
    }

    const rootRouteCount = locs.filter((loc) => new URL(loc).pathname === '/').length;
    const generatedRouteCount = locs.length - rootRouteCount;
    console.log(
        `Generated SEO HTML for ${locs.length} sitemap URLs ` +
        `(${generatedRouteCount} route directories plus the root dist/index.html).`,
    );
}

processSitemapData().catch(console.error);
