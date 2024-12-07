const bcrypt = require("bcrypt");
const express = require("express");
const cors = require("cors");
const axios = require('axios');

const { OAuth2Client } = require('google-auth-library');

const app = express();

app.use(express.json());
app.use(cors());

require("dotenv").config();

app.listen(3000, () => {
  console.log(`Connected to port 3000`);
});

const { MongoClient } = require("mongodb");
const client = new MongoClient(process.env.DB_URI);

let gamesCollection;

client.connect().then(() => {
  console.log("Connected.");
  gamesCollection = client.db("games_db").collection("users");
});

const googleClient = new OAuth2Client("159976334384-t5n83o9qjbscgugor7kpo5j65sjldrh5.apps.googleusercontent.com");

// Routes

app.get("/api/test", async (req, res) => {
  const json = await gamesCollection.find().toArray();
  res.json(json);
});

// // // LOGIN AND SIGNUP

app.post("/signup", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if the user already exists
    const existingUser = await gamesCollection.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: "Username already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the new user into the collection
    const newUser = { username, password: hashedPassword };
    await gamesCollection.insertOne(newUser);

    res.status(201).json({ message: "User created successfully", username });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Error creating user" });
  }
});

// Login route
app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find the user in the database
    const user = await gamesCollection.findOne({ username });
    if (!user) {
      return res.status(400).json({ error: "Invalid username or password" });
    }

    // Compare the hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid username or password" });
    }

    res.json({ message: "Logged in successfully", username });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ error: "Error logging in" });
  }
});

// Google login route
app.post("/google-login", async (req, res) => {
  try {
    const { token } = req.body;

    const ticket = await googleClient.verifyIdToken({
      idToken: token,
      audience: "159976334384-t5n83o9qjbscgugor7kpo5j65sjldrh5.apps.googleusercontent.com",
    });

    const { email, name } = ticket.getPayload();

    let user = await gamesCollection.findOne({ email });
    if (!user) {
      user = {
        username: name,
        email: email,
        favorites: [],
      };
      await gamesCollection.insertOne(user);
    }

    res.status(200).json({ message: "Google login successful", user });
  } catch (error) {
    console.error("Error during Google login:", error);
    res.status(500).json({ error: "Error during Google login" });
  }
});

// // // BACKEND REQUESTS

// Get profile details via username
app.get("/api/profile/:username", async (req, res) => {
  const { username } = req.params;
  let json = await gamesCollection.find({ username: username }).toArray();
  res.status(200).json(json);
});

// Add id to favorites:
app.post("/api/favorites/:username", async (req, res) => {
  try {
    const { username } = req.params;
    const { id } = req.body;

    let [ json ] = await gamesCollection.find({ username: username }).toArray();
    
    let send;

    let favorites = json.favorites ? json.favorites : []

    if (!favorites.includes(id)) {
      send = await gamesCollection.updateOne(
        { username: username },
        { $push: {favorites: id }}
      );
    } else {
      send = {error: `${id} already exists in the profile.`}
    }
    
    res.send(send);
  } catch {
    res.send({error: "Couldn't POST data"});
  }
});

app.delete("/api/favorites/:username", async (req, res) => {
  try {
    const { username } = req.params;
    const { id } = req.body;
    console.log("asdfasdf");

    let results = await gamesCollection.updateOne({username : username}, { $pull: { favorites: id } });

    res.status(200).send(results);

  } catch {
    res.status(500).send({error: "Couldn't DELETE data"});
  };
});

// // // API REQUESTS

// Retrieve id
app.get("/api/games/id/:id", async (req, res) => {
  const { id } = req.params;
  axios.get(`https://api.rawg.io/api/games/${id}?key=${process.env.API_KEY}`)
  .then((response) => {
    res.json(response.data);
  })
})