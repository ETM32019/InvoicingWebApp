const express = require("express");
const router = express.Router();

// @route   GET api/invoice
// @desc    test route
// @access  Public

router.get("/", (req, res) => res.send("Invoice Route"));

module.exports = router;