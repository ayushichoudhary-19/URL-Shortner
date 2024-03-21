const ShortUniqueId = require('short-unique-id');
const uid = new ShortUniqueId({ length: 10 });
const URL = require('../models/url');

async function handleGenerateShortURL(req, res) {  
    const body = req.body;

    if (!body.url) {
        return res.status(400).json({ error: 'URL is required' });
    }

    try {
        // Check if the URL already exists in the database
        let existingURL = await URL.findOne({ redirectURL: body.url });

        if (existingURL) {
            // If the URL already exists, return its short ID
            return res.render("home",{
                id: existingURL.shortId,
            });
        }

        // Generate a new short ID
        const shortID = uid.randomUUID();

        // Create a new URL entry in the database
        await URL.create({
            shortId: shortID,
            redirectURL: body.url,
            visitHistory: [],
        });
    
        return res.render("home",{
            id: shortID,
        });
    } catch (error) {
        console.error('Error generating short URL:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

async function handleGetAnalytics(req, res) {
    const shortId = req.params.shortId;

    try {
        const result = await URL.findOne({ shortId });
        
        if (!result) {
            return res.status(404).json({ error: 'Short URL not found' });
        }

        return res.json({
            totalClicks: result.visitHistory.length,
            analytics: result.visitHistory, 
        });
    } catch (error) {
        console.error('Error retrieving analytics:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = { handleGenerateShortURL, handleGetAnalytics };
