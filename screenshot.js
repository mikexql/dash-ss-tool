const { chromium } = require('playwright');
const path = require('path');

module.exports = async function takeScreenshot(url) {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    await page.goto(url);

    const filename = `screenshot-${Date.now()}.png`;
    const filepath = path.join(__dirname, 'screenshots', filename);

    await page.screenshot({ path: filepath, fullPage: true });
    await browser.close();

    return filename;
};
