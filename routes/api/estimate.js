const express = require("express");
const router = express.Router();

// @route   GET api/estimate
// @desc    test route
// @access  Public

router.get("/", (req, res) => res.send("Estimate Route"));

module.exports = router;