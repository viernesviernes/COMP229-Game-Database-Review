const bcrypt = require("bcrypt");
const express = require("express");
const cors = require("cors");

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

// Routes

app.get("/api/test", (req, res) => {
  const json = gamesCollection.find().toArray();
  res.json(json);
});

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
