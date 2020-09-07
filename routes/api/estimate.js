const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");

const Estimate = require("../../models/Estimate");

// @route   POST api/estimates
// @desc    Create Invoice
// @access  Private
router.post(
  "/",
  [
    auth,
    [
      check("title", "Title is Required")
        .not()
        .isEmpty(),
      check("name", "Name is required")
        .not()
        .isEmpty(),
      check("email", "Email is required")
        .not()
        .isEmpty(),
      check("estimatenumber", "Estimate number is required")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      title,
      notes,
      previewemail,
      color,
      name,
      email,
      address,
      phone,
      businessnumber,
      estimatenumber,
      estimatedate,
      estimatetoname,
      estimatetoemail,
      estimatetoaddress,
      estimatetophone
    } = req.body;

    const estimateFields = {
      user: req.user.id,
      title,
      notes,
      previewemail,
      color,
      name,
      email,
      address,
      phone,
      businessnumber,
      estimatenumber,
      estimatedate,
      estimatetoname,
      estimatetoemail,
      estimatetoaddress,
      estimatetophone
    };

    try {
      let estimate = await Estimate.findOne({ user: req.user.id });

      estimate = new Estimate(estimateFields);

      await estimate.save();
      res.json(estimate);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route   GET api/estimates
// @desc    Get all invoices
// @access  Private
router.get("/", auth, async (req, res) => {
  try {
    const estimate = await Estimate.find().sort({ date: -1 });
    res.json(estimate);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   GET api/estimates/:id
// @desc    Get invoice by ID
// @access  Private
router.get("/:id", auth, async (req, res) => {
  try {
    const estimate = await Estimate.findById(req.params.id);

    if (!estimate) {
      return res.status(404).json({ msg: "Estimate not Found" });
    }

    res.json(estimate);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   DELETE api/estimates/:id
// @desc    Delete invoice by ID
// @access  Private
router.delete("/:id", auth, async (req, res) => {
  try {
    const estimate = await Estimate.findById(req.params.id);

    if (!estimate) {
      return res.status(404).json({ msg: "Estimate not Found" });
    }

    await estimate.remove();

    res.json({ msg: "Estimate Removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   POST api/estimates/item/:id
// @desc    Add Item to Estimate
// @access  Private
router.post(
  "/item/:id",
  [
    auth,
    [
      check("title", "Title is Required")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const estimate = await Estimate.findById(req.params.id);
      const newEstimateItem = {
        title: req.body.title,
        description: req.body.description,
        rate: req.body.rate,
        quantity: req.body.quantity,
        taxable: req.body.taxable
      };
      estimate.estimateitem.unshift(newEstimateItem);
      await estimate.save();
      res.json(estimate.estimateitem);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route   DELETE api/estimates/item/:id/:item_id
// @desc    Delete an Item from Estimate
// @access  Private
router.delete("/item/:id/:item_id", auth, async (req, res) => {
  try {
    const estimate = await Estimate.findById(req.params.id);
    const item = estimate.estimateitem.find(
      item => item.id === req.params.item_id
    );
    if (!item) {
      return res.status(404).json({ msg: "Item does not exists" });
    }
    const removeIndex = estimate.estimateitem.map(item =>
      item._id.toString().indexOf(req.params.id)
    );
    estimate.estimateitem.splice(removeIndex, 1);
    await estimate.save();
    res.json(estimate.estimateitem);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
