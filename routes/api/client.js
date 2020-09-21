const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

const Client = require("../../models/Client");

// @route   POST api/clients
// @desc    Create or update a client
// @access  Private
router.post("/", auth, async (req, res) => {
  try {
    // create new client object
    const newClient = new Client({
      name: req.body.name,
      email: req.body.email,
      street: req.body.street,
      city: req.body.city,
      country: req.body.country,
      phone: req.body.phone
    });

    // save new client object
    const client = await newClient.save();

    // display json
    res.json(client);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   PUT api/clients/:id
// @desc    Edit Client by ID
// @access  Private
router.put("/:id", auth, async (req, res) => {
  try {
    // find client by id and update
    let client = await Client.findOneAndUpdate(
      req.params.id,
      {
        name: req.body.name || "No Name Given",
        email: req.body.email || "No Email Given",
        street: req.body.street || "No Street Given",
        city: req.body.city || "No City Given",
        country: req.body.country || "No Country Given",
        phone: req.body.phone
      },
      {
        new: true
      }
    );
    // error check for client
    if (!client) {
      return res.status(404).json({ msg: "Client does not exist." });
    }
    // send new client to client
    res.send(client);
    res.json({ msg: "Client Updated" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   GET api/clients
// @desc    Get all clients
// @access  Private
router.get("/", auth, async (req, res) => {
  try {
    // get all clients via recent date created
    const clients = await Client.find().sort({ date: -1 });

    // display
    res.json(clients);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   GET api/clients/:id
// @desc    Get client by ID
// @access  Private
router.get("/:id", auth, async (req, res) => {
  try {
    // find client by id through params
    const client = await Client.findById(req.params.id);

    // check for client
    if (!client) {
      return res.status(404).json({ msg: "Client not Found" });
    }

    //display clients
    res.json(client);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   DELETE api/clients/:id
// @desc    Delete client by ID
// @access  Private
router.delete("/:id", auth, async (req, res) => {
  try {
    // get client by id via id
    const client = await Client.findById(req.params.id);

    // check for client
    if (!client) {
      return res.status(404).json({ msg: "Client not Found" });
    }

    // remove client
    await client.remove();

    // display message
    res.json({ msg: "Client Removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
