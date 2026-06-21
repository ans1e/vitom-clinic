import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.dirname(fileURLToPath(import.meta.url));
const url = process.argv[2] || 'http://localhost:3000';
const label = process.argv[3] || '';

const outDir = path.join(root, 'temporary screenshots');
fs.mkdirSync(outDir, { recursive: true });
let n = 1;
while (fs.existsSync(path.join(outDir, `screenshot-${n}${label ? '-' + label : ''}.png`))) n++;
const outPath = path.join(outDir, `screenshot-${n}${label ? '-' + label : ''}.png`);

const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 1000, deviceScaleFactor: 1 });
await page.goto(url, { waitUntil: 'load', timeout: 60000 });
await new Promise(r => setTimeout(r, 700));
// Scroll through the page to trigger IntersectionObserver reveals, then return to top.
await page.evaluate(async () => {
  const h = document.body.scrollHeight;
  for (let y = 0; y <= h; y += 400) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 60)); }
  window.scrollTo(0, 0);
  await new Promise(r => setTimeout(r, 400));
});
await new Promise(r => setTimeout(r, 600));
await page.screenshot({ path: outPath, fullPage: true });
await browser.close();
console.log('Saved', outPath);
