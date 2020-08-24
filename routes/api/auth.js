const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const User = require("../../models/User");
const config = require("config");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// @route   GET api/auth
// @desc    Get authorization by user ID
// @access  Public
router.get("/", auth, async (req, res) => {
  try {
    // find the user by id from the middleware and returning the user minus the password
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   POST api/auth
// @desc    Authenticate user and get token
// @access  Public
router.post(
  "/",
  [
    // Validation Checks for first and last name, email, and password
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").exists()
  ],
  async (req, res) => {
    // define errors for validation
    const errors = validationResult(req);
    // if there are errors, this returns a status of 400 and all errors in an array in json format
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Destructure req.body
    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      // See if user exists
      if (!user) {
        return res.status(400).json({
          errors: [
            {
              msg: "Invalid Credentials"
            }
          ]
        });
      }

      // Compare password and token
      const isMatch = await bcrypt.compare(password, user.password);
      // if not a match then throw an error with a msg
      if (!isMatch) {
        return res.status(400).json({
          errors: [
            {
              msg: "Invalid Credentials"
            }
          ]
        });
      }

      // Return jsonwebtoken
      // send the user id as the payload to identify which user has the token
      const payload = {
        user: {
          id: user.id
        }
      };

      // fist sign jwt with the user id for the token
      jwt.sign(
        payload,
        // bring in the jwt secret string from the middleware
        config.get("jwtSecret"),
        // optional: expire token in x amount of time
        // TODO: set expire time back to 1 hr
        { expiresIn: "600h" },
        // put a callback
        (err, token) => {
          // if error throw it
          if (err) throw err;
          // if not return the token
          res.json({ token });
        }
      );
    } catch (err) {
      console.log(err.message);
      req.status(500).send("Server error");
    }
  }
);

module.exports = router;
