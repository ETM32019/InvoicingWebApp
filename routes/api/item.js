const express = require("express");
const router = express.Router();

// @route   GET api/items
// @desc    test route
// @access  Public

router.get("/", (req, res) => res.send("Item Route"));

module.exports = router;