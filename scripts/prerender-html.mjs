import puppeteer from 'puppeteer';
import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import fs from 'node:fs/promises';
import { existsSync } from 'node:fs';

const ROOT_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DIST_DIR = path.join(ROOT_DIR, 'dist');
const SITEMAP_PATH = path.join(DIST_DIR, 'sitemap.xml');

async function getRoutes() {
    const sitemapXml = await fs.readFile(SITEMAP_PATH, 'utf8');
    const locRegex = /<loc>(.*?)<\/loc>/g;
    let match;
    const routes = [];
    while ((match = locRegex.exec(sitemapXml)) !== null) {
        try {
            const url = new URL(match[1]);
            routes.push(url.pathname);
        } catch { }
    }
    return routes;
}

async function startServer() {
    const app = express();

    // Serve static assets natively
    app.use(express.static(DIST_DIR, { index: false }));

    app.use((req, res, next) => {
        let target = path.join(DIST_DIR, req.path, 'index.html');
        if (!existsSync(target)) {
            target = path.join(DIST_DIR, 'index.html');
        }
        res.sendFile(target);
    });

    return new Promise((resolve) => {
        const server = app.listen(0, () => {
            resolve({ server, port: server.address().port });
        });
    });
}

async function runPrerender() {
    if (!existsSync(DIST_DIR) || !existsSync(SITEMAP_PATH)) {
        console.error('Build artifacts missing. Aborting prerender.');
        return;
    }

    const routes = await getRoutes();
    const { server, port } = await startServer();
    const baseUrl = `http://localhost:${port}`;

    console.log(`Starting Puppeteer...`);
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    // Speed up rendering by aborting non-essential network requests
    await page.setRequestInterception(true);
    page.on('request', (req) => {
        const resourceType = req.resourceType();
        if (['image', 'media', 'font', 'stylesheet'].includes(resourceType)) {
            req.abort();
        } else {
            req.continue();
        }
    });

    for (const route of routes) {
        const renderUrl = `${baseUrl}${route}`;
        try {
            console.log(`Prerendering ${route}...`);
            // Use networkidle0 to ensure all JS effects have triggered 
            await page.goto(renderUrl, { waitUntil: 'networkidle0', timeout: 30000 });

            const html = await page.evaluate(() => {
                document.querySelectorAll('link[rel="modulepreload"][href]').forEach((link) => {
                    const url = new URL(link.href);
                    if (url.origin === window.location.origin) {
                        link.setAttribute('href', `${url.pathname}${url.search}${url.hash}`);
                    }
                });
                return document.documentElement.outerHTML;
            });
            const fullHtml = `<!doctype html>\n${html}`;

            const routeDir = path.join(DIST_DIR, route.replace(/^\//, ''));
            await fs.mkdir(routeDir, { recursive: true });
            await fs.writeFile(path.join(routeDir, 'index.html'), fullHtml);
        } catch (err) {
            console.error(`Failed to prerender ${route}:`, err.message);
        }
    }

    await browser.close();
    server.close();
    console.log(`Prerender complete for ${routes.length} routes.`);
}

runPrerender().catch(console.error);
