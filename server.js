const express = require("express");
const connectDB = require("./config/db");
const path = require("path");

const app = express();

app.get("/", (req, res) => res.send("API Running"));

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false })); // This allows is to get data in req.body

// Define Routes
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/profile", require("./routes/api/profile"));
app.use("/api/invoices", require("./routes/api/invoice"));
app.use("/api/estimates", require("./routes/api/estimate"));
app.use("/api/items", require("./routes/api/item"));
app.use("/api/clients", require("./routes/api/client"));
app.use("/api/user", require("./routes/api/user"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server Started on port ${PORT}`));
