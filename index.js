const express = require('express');
const path = require('path');
const takeScreenshot = require('./screenshot');
const app = express();

app.use(express.static('public'));
app.use(express.json());

app.post('/screenshot/batch', async (req, res) => {
    const { urls } = req.body;
    if (!Array.isArray(urls) || urls.length === 0) {
        return res.status(400).send('Missing or invalid URLs');
    }

    try {
        const results = [];
        for (const url of urls) {
            const filename = await takeScreenshot(url);
            results.push({ url, path: `/screenshots/${filename}` });
        }
        res.json(results);
    } catch (e) {
        console.error(e);
        res.status(500).send('Batch screenshot failed');
    }
});

app.post('/screenshot', async (req, res) => {
    const { url } = req.body;

    if (!url) return res.status(400).send('Missing URL');

    try {
        const filename = await takeScreenshot(url);
        res.json({ message: 'Screenshot taken', path: `/screenshots/${filename}` });
    } catch (err) {
        console.error(err);
        res.status(500).send('Failed to take screenshot');
    }
});

app.use('/screenshots', express.static('/tmp'));

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log('App running');
});
