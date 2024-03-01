const express = require('express')
const app = express();
const urlRoute = require('./routes/url')
const PORT  = 8001;
const {connectToMongoDB} = require('./connect')
require('dotenv').config();


connectToMongoDB(process.env.MongoDB_URL)
    .then(console.log('mongoDB connected'));


app.use(express.json());
app.use('/url', urlRoute);
app.listen(PORT,()=>{
    console.log('Server Started!');
})