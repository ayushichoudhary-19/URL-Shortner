const ShortUniqueId = require('short-unique-id');
const uid = new ShortUniqueId({ length: 10 });
const URL = require('../models/url');

async function handleGenerateShortURL(req, res) {  
    const body = req.body;

    if (!body.url) {
        return res.status(400).json({ error: 'URL is required' });
    }

    const shortID = uid.rnd();

    try {
        await URL.create({
            shortId: shortID,
            redirectURL: body.url,
            visitHistory: [],
        });
    
        return res.json({
            id: shortID 
        });
    } catch (error) {
        console.error('Error generating short URL:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

async function handleGetAnalytics(req,res){
        const shortId = req.params.shortId;
        const result = await URL.findOne({shortId});
        return res.json({
           totalClicks: result.visitHistory.length,
           analytics: result.visitHistory, 
        });
}

module.exports = {handleGenerateShortURL,handleGetAnalytics};