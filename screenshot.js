const { chromium } = require('playwright');
const path = require('path');

module.exports = async function takeScreenshot(url) {
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle' });

    const filename = `screenshot-${Date.now()}.png`;
    const filepath = path.join('/tmp', filename); // << use /tmp on Render
    await page.screenshot({ path: filepath, fullPage: true });

    await browser.close();
    return filename;
};
