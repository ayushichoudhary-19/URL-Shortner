const express = require('express');
const app = express();
const urlRoute = require('./routes/url');
const PORT = 8001;
const URL = require('./models/url');
const { connectToMongoDB } = require('./connect');
require('dotenv').config();

// Connect to MongoDB
connectToMongoDB(process.env.MongoDB_URL)
    .then(() => console.log('MongoDB connected'))
    .catch(error => console.error('MongoDB connection error:', error));

// Middleware
app.use(express.json());
app.use('/url', urlRoute);

// Route to handle redirect
app.get('/:shortId', async (req, res) => {
    try {
        const shortId = req.params.shortId;
        // Find the URL entry by shortId and update visitHistory
        const entry = await URL.findOneAndUpdate(
            { shortId },
            { $push: { visitHistory: { timestamp: Date.now() } } },
            { new: true } // Return the updated document
        );
        if (!entry) {
            return res.status(404).json({ error: 'Short URL not found' });
        }
        // Redirect to the original URL
        res.redirect(entry.redirectUrl);
    } catch (error) {
        console.error('Error while processing redirect:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log('Server Started!');
});
