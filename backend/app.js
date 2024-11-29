const express = require('express');
const app = express();

require('dotenv').config();

app.listen(3000, () => {
    console.log(`Connected to port 3000`);
})

const { MongoClient } = require('mongodb');
const client = new MongoClient(process.env.DB_URI);

let gamesCollection;

client.connect().then(() => {
    console.log("Connected.");
    gamesCollection = client.db('games_db').collection('users');
})

// Routes

app.get('/api/test', (req, res) => {
    const json = gamesCollection.find().toArray();
    res.json(json);
})