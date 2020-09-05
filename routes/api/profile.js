const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");

const Profile = require("../../models/Profile");
const User = require("../../models/User");

// @route   GET api/profile/me
// @desc    Get current users profile
// @access  Private
router.get("/me", auth, async (req, res) => {
  try {
    // create a profile variable from our Profile Model by the user id
    const profile = await Profile.findOne({
      user: req.user.id
    }).populate("user", ["firstname", "lastname"]);
    // If the user doesn't have a profile yet
    if (!profile) {
      return res
        .status(400)
        .json({ msg: "There is no profile for this user." });
    }
    // return the profile in JSON
    res.json(profile);
  } catch (err) {
    // Default Error Handling
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   POST api/profile
// @desc    Create or update user profile
// @access  Private
router.post("/", auth, async (req, res) => {
  // pull out fields from req.body
  const {
    title,
    email,
    address1,
    address2,
    phone,
    businessnumber,
    businessnumberlabel,
    companylogo,
    color,
    type,
    rate,
    label,
    inclusive,
    code,
    lastnumber,
    defaultnotes,
    paypal,
    backtransfer,
    bycheck,
    other
  } = req.body;

  // build the company profile object
  const profileFields = {};
  profileFields.user = req.user.id;
  if (title) profileFields.title = title;
  if (email) profileFields.email = email;
  if (address1) profileFields.address1 = address1;
  if (address2) profileFields.address2 = address2;
  if (phone) profileFields.phone = phone;
  if (businessnumber) profileFields.businessnumber = businessnumber;
  if (businessnumberlabel)
    profileFields.businessnumberlabel = businessnumberlabel;
  if (companylogo) profileFields.companylogo = companylogo;
  if (color) profileFields.color = color;

  // build the tax object
  profileFields.tax = {};
  if (type) profileFields.tax.type = type;
  if (rate) profileFields.tax.rate = rate;
  if (label) profileFields.tax.label = label;
  if (inclusive) profileFields.tax.inclusive = inclusive;

  // build the currency object
  profileFields.currency = {};
  if (code) profileFields.currency.code = code;

  // build the estimate object
  profileFields.estimate = {};
  if (title) profileFields.estimate.title = title;
  if (lastnumber) profileFields.estimate.lastnumber = lastnumber;
  if (defaultnotes) profileFields.estimate.defaultnotes = defaultnotes;

  // build the payment method object
  profileFields.payment = {};
  if (paypal) profileFields.payment.paypal = paypal;
  if (backtransfer) profileFields.payment.backtransfer = backtransfer;
  if (bycheck) profileFields.payment.bycheck = bycheck;
  if (other) profileFields.payment.other = other;

  try {
    // get current profile
    let profile = await Profile.findOne({ user: req.user.id });

    if (profile) {
      // update profile
      profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true }
      );
      // return updated profile
      return res.json(profile);
    }

    // create profile
    profile = new Profile(profileFields);

    // save the profile
    await profile.save();

    // display the profile
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   DELETE api/profile/
// @desc    Delete profile, user & posts
// @access  Private
router.delete("/", auth, async (req, res) => {
  try {
    // TODO: Remove Invoices, Estimates, Clients, Items?
    // remove the profile
    await Profile.findOneAndDelete({ user: req.user.id });
    // remove the user
    await User.findOneAndDelete({ _id: req.user.id });

    res.json({ msg: "User Deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
