const express = require("express");
const router = express.Router();
const config = require("config");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../../models/User");

// @route   POST api/user
// @desc    Register User
// @access  Public
router.post(
  "/",
  [
    // Validation Checks for first and last name, email, and password
    check("firstname", "First name is required")
      .not()
      .isEmpty(),
    check("lastname", "Last name is required")
      .not()
      .isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 })
  ],
  async (req, res) => {
    // define errors for validation
    const errors = validationResult(req);
    // if there are errors, this returns a status of 400 and all errors in an array in json format
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Destructure req.body
    const { firstname, lastname, email, password } = req.body;

    // Check if user exist via email
    try {
      let user = await User.findOne({ email });
      //check the user
      if (user) {
        return res.status(400).json({
          errors: [
            {
              msg: "User already exists"
            }
          ]
        });
      }

      // Create new instance of User
      user = new User({
        firstname,
        lastname,
        email,
        password
      });

      // Encrypt Password
      // - create salt
      const salt = await bcrypt.genSalt(10);
      // - take password and hash it
      user.password = await bcrypt.hash(password, salt);
      // - save user to db
      await user.save();

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
    } catch (error) {
      console.error(error.message);
      req.status(500).send("Server error");
    }
  }
);

module.exports = router;
