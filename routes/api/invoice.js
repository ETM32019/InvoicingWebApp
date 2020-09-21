const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");

const Invoice = require("../../models/Invoice");

// @route   POST api/invoices
// @desc    Create Invoice
// @access  Private
router.post(
  "/",
  [
    auth,
    [
      check("title", "Title is required")
        .not()
        .isEmpty(),
      check("name", "Name is required")
        .not()
        .isEmpty(),
      check("email", "Email is required")
        .not()
        .isEmpty(),
      check("invoicenumber", "Invoice number is required")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    // check validation errors
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
      invoicenumber,
      invoicedate,
      invoiceterms,
      invoicedue,
      invoicetoname,
      invoicetoemail,
      invoicetoaddress,
      invoicetophone
    } = req.body;

    const invoiceFields = {
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
      invoicenumber,
      invoicedate,
      invoiceterms,
      invoicedue,
      invoicetoname,
      invoicetoemail,
      invoicetoaddress,
      invoicetophone
    };

    try {
      let invoice = await Invoice.findOne({ user: req.user.id });

      invoice = new Invoice(invoiceFields);

      await invoice.save();
      res.json(invoice);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route   PUT api/invoices/:id
// @desc    Edit invoice by ID
// @access  Private
router.put("/:id", auth, async (req, res) => {
  try {
    let updateInvoice = await Invoice.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title || "No Title Given",
        notes: req.body.notes || "No Notes Added",
        previewemail: req.body.previewemail || "No Email Provided",
        color: req.body.color || "No Color Selected",
        name: req.body.name || "No Name Provided",
        email: req.body.email || "No Email Provided",
        address: req.body.address || "No Address Given",
        phone: req.body.phone || "No Number Provided",
        businessnumber: req.body.businessnumber || "No Business Provided",
        invoicenumber: req.body.invoicenumber,
        invoicedate: req.body.invoicedate,
        invoiecterms: req.body.invoiceterms,
        invoicedue: req.body.invoicedue,
        invoicetoname: req.body.invoicetoname || "No Name Given",
        invoicetoemail: req.body.invoicetoemail || "No Email Provided",
        invoicetoaddress: req.body.invoicetoaddress || "No Address Provided",
        invoicetophone: req.body.invoicetophone || "No Phone Given"
      },
      { new: true }
    );
    // error check for invoice
    if (!updateInvoice) {
      return res.status(404).json({ msg: "Invoice does not exist." });
    }
    res.send(updateInvoice);
    res.json({ msg: "Invoice Updated" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   GET api/invoices
// @desc    Get all invoices
// @access  Private
router.get("/", auth, async (req, res) => {
  try {
    const invoice = await Invoice.find().sort({ date: -1 });
    res.json(invoice);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   GET api/invoices/:id
// @desc    Get invoice by id
// @access  Private
router.get("/:id", auth, async (req, res) => {
  try {
    // find all invoices from  most recent
    const invoice = await Invoice.findById(req.params.id);
    // If no invoice display message
    if (!invoice) {
      return res.status(404).json({ msg: "Invoice not Found" });
    }
    // display invoice
    res.json(invoice);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   DELETE api/invoices/:id
// @desc    Delete invoice by id
// @access  Private
router.delete("/:id", auth, async (req, res) => {
  try {
    // find all invoices via id
    const invoice = await Invoice.findById(req.params.id);
    // check if there is an invoice
    if (!invoice) {
      return res.status(404).json({ msg: "Invoice not Found" });
    }
    // remove invoice
    await invoice.remove();
    // display confirmation message
    res.json({ msg: "Invoice Removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});
// @route   POST api/invoices/item/:id
// @desc    Add Item to Invoice
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
    // validation error check
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      // get the invoice by id
      const invoice = await Invoice.findById(req.params.id);
      // create invoice item
      const newInvoiceItem = {
        title: req.body.title,
        description: req.body.description,
        rate: req.body.rate,
        quantity: req.body.quantity,
        taxable: req.body.taxable
      };
      // append the new to the invoiceitem
      invoice.invoiceitem.unshift(newInvoiceItem);
      // save invoice
      await invoice.save();
      // display the new item
      res.json(invoice.invoiceitem);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route   PUT api/invoices/item/:id/:item_id
// @desc    Edit Item in Invoice
// @access  Private
// router.put("/item/:id/:item_id", auth, async (req, res) => {
//   try {
//     // find the invoice by id
//     let invoice = await Invoice.findById(req.params.id);
//     // find invoice item by id
//     let invItem = invoice.invoiceitem.find(
//       item => item.id === req.params.item_id
//     );
//     // update the invoice item
    
//     res.send(invItem);
//     // res.json({ msg: "Invoice Item Updated" });
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("Server Error");
//   }
// });

// @route   DELETE api/invoices/item/:id/:item_id
// @desc    Delete an Item from Invoice by id
// @access  Private
router.delete("/item/:id/:item_id", auth, async (req, res) => {
  try {
    // find invoice by ID
    const invoice = await Invoice.findById(req.params.id);
    // pull out item
    const item = invoice.invoiceitem.find(
      item => item.id === req.params.item_id
    );
    // make sure item exists
    if (!item) {
      return res.status(404).json({ msg: "Item does not exists" });
    }
    // get remove index
    const removeIndex = invoice.invoiceitem.map(item =>
      item._id.toString().indexOf(req.params.id)
    );
    // remove the item from the array
    invoice.invoiceitem.splice(removeIndex, 1);
    // save invoice
    await invoice.save();
    // display
    res.json(invoice.invoiceitem);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
