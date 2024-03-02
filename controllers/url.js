const ShortUniqueId = require('short-unique-id');
const uid = new ShortUniqueId({ length: 10 });
const URL = require('../models/url');

async function handleGenerateShortURL(req,res) {  
        console.log(shortID);
        const body = req.body;
        if(!body.url) return res.status(400).json({error: 'URL is required'});
        const shortID= uid.rnd();

        await url.create({ //create a new document in the URL collection database
            shortId: shortID,
            redirectUrl: body.url,
            visitHistory: [],
        });
    
        return res.render("home", {
            id: shortID,
          });
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