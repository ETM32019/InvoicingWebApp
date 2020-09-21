const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

const Item = require("../../models/Item");

// @route   POST api/items
// @desc    Create or update an Item
// @access  Private
router.post("/", auth, async (req, res) => {
  try {
    // create new item
    const newItem = new Item({
      description: req.body.description,
      rate: req.body.rate,
      additionaldetails: req.body.additionaldetails,
      taxable: req.body.taxable
    });

    // save new item object
    const item = await newItem.save();

    // display it
    res.json(item);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   GET api/items
// @desc    Get all items
// @access  Private
router.get("/", auth, async (req, res) => {
  try {
    // get all items via recent date created
    const items = await Item.find().sort({ date: -1 });
    res.json(items);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   GET api/items/:id
// @desc    Get item by id
// @access  Private
router.get("/:id", auth, async (req, res) => {
  try {
    // find item by id through the params
    const item = await Item.findById(req.params.id);

    // check for item
    if (!item) {
      return res.status(404).json({ msg: "Item not Found" });
    }

    // return the item
    res.json(item);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   PUT api/items/:id
// @desc    Update item by id
// @access  Private
router.put("/:id", auth, async (req, res) => {
  try {
    // find item by id and update; error check for item
    let item = await Item.findByIdAndUpdate(
      req.params.id,
      {
        description: req.body.description || "Untitled Item",
        rate: req.body.rate || 0.0,
        additionaldetails: req.body.additionaldetails || "No Notes Added",
        taxable: req.body.taxable || false
      },
      { new: true }
    ).then(item => {
      if (!item) {
        return res.status(404).json({ msg: "Item does not exists" });
      }
    });

    res.send(item);
    res.json({msg: "Item Updated"})
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   DELETE api/items/:id
// @desc    Delete item by id
// @access  Private
router.delete("/:id", auth, async (req, res) => {
  try {
    // get item by id
    const item = await Item.findById(req.params.id);

    // check for item
    if (!item) {
      return res.status(404).json({ msg: "Item not Found" });
    }

    // remove item
    await item.remove();

    // display message
    res.json({ msg: "Item Removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
