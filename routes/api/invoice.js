const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");

const Invoice = require("../../models/Invoice");
const User = require("../../models/User");

// @route   POST api/invoices
// @desc    Create Invoice
// @access  Private
router.post(
  "/",
  [
    auth,
    check("title", "Title is required")
      .not()
      .isEmpty(),
    check("name", "Name is required")
      .not()
      .isEmpty(),
    check("itemdescription", "Item description is required")
      .not()
      .isEmpty(),
    check("itemrate", "Item rate is required")
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    // check validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      // get current user
      const user = await User.findById(req.user.id).select("-password");

      // create new invoice object
    //   const newInvoice = new Invoice({

    //   })
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
