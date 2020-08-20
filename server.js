const express = require("express");
const connectDB = require("./config/db");
const path = require("path");

const app = express();

app.get("/", (req, res) => res.send("API Running"));

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

// Define Routes

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server Started on port ${PORT}`));
