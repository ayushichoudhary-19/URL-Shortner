const ShortUniqueId = require('short-unique-id');

const uid = new ShortUniqueId({ length: 10 });
const URL = require('../models/url');
async function handleGenerateShortURL(req,res) {  
        const shortID= uid.rnd();
        const body = req.body;
        if(!body.URL) return res.status(400).json({error: 'URL is required'});
        await URL.create({ //create a new document in the URL collection database
            shortId: shortID,
            redirectUrl: body.URL,
            visitHistory: [],
        });
    
    return res.json({id: shortID});

    }


module.exports = {handleGenerateShortURL};