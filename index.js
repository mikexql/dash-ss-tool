const express = require('express');
const path = require('path');
const takeScreenshot = require('./screenshot');
const app = express();

app.use(express.static('public'));
app.use(express.json());

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

app.use('/screenshots', express.static(path.join(__dirname, 'screenshots')));

app.listen(3001, () => {
    console.log('App running at http://localhost:3001');
});
