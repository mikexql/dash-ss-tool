const { chromium } = require('playwright');
const path = require('path');

module.exports = async function takeScreenshot(url) {
    const browser = await chromium.launch({ headless: true,
        args: [
            '--no-sandbox',
            '--disable-dev-shm-usage',
            '--disable-gpu',
            '--disable-background-timer-throttling',
            '--disable-renderer-backgrounding',
            '--disable-backgrounding-occluded-windows',
        ],});
    const page = await browser.newPage();
    await page.goto(url);

    const filename = `screenshot-${Date.now()}.png`;
    const filepath = path.join('/tmp', filename); // << use /tmp on Render
    await page.screenshot({ path: filepath, fullPage: true });

    await browser.close();
    return filename;
};
