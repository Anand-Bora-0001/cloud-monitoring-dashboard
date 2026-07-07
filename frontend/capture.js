import puppeteer from 'puppeteer';
import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function takeScreenshots() {
  console.log('Starting Vite preview server...');
  const server = spawn('npm', ['run', 'preview'], {
    cwd: __dirname,
    shell: true
  });

  // Give the server 3 seconds to start
  await new Promise(resolve => setTimeout(resolve, 3000));

  console.log('Launching browser...');
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });

  try {
    console.log('Taking screenshot of Dashboard...');
    await page.goto('http://localhost:4173/', { waitUntil: 'networkidle0' });
    await page.screenshot({ path: path.join(__dirname, '../docs/dashboard.png') });

    console.log('Taking screenshot of Capacity Planning...');
    await page.goto('http://localhost:4173/capacity-planning', { waitUntil: 'networkidle0' });
    await page.screenshot({ path: path.join(__dirname, '../docs/capacity_planning.png') });

    console.log('Taking screenshot of Compliance Dashboard...');
    await page.goto('http://localhost:4173/compliance', { waitUntil: 'networkidle0' });
    await page.screenshot({ path: path.join(__dirname, '../docs/compliance.png') });

    console.log('Screenshots saved successfully to docs folder.');
  } catch (error) {
    console.error('Error taking screenshots:', error);
  } finally {
    await browser.close();
    server.kill();
    process.exit(0);
  }
}

takeScreenshots();
