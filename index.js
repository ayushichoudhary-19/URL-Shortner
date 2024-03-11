const express = require('express');
const app = express();
const path = require('path');
const urlRoute = require('./routes/url');
const PORT = 8001;
const staticRoute = require('./routes/staticRouter');
const URL = require('./models/url');
const { connectToMongoDB } = require('./connect');
require('dotenv').config();

// Connect to MongoDB
connectToMongoDB(process.env.MongoDB_URL)
    .then(() => console.log('MongoDB connected'))
    .catch(error => console.error('MongoDB connection error:', error));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

// Middleware
app.use(express.json());
app.use('/url', urlRoute);
app.use('/',staticRoute);
app.use(express.urlencoded({ extended: false}));


// Route to handle redirect
app.get('/url/:shortId', async (req, res) => {
    try {
        const shortId = req.params.shortId;
        const entry = await URL.findOneAndUpdate(
            { shortId },
            { $push: { visitHistory: { timestamp: Date.now() } } },
            { new: true }
        );
        if (!entry) {
            return res.status(404).json({ error: 'Short URL not found' });
        }
        // Redirect to the original URL
        res.redirect(entry.redirectURL);
    } catch (error) {
        console.error('Error while processing redirect:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log('Server Started!');
});
