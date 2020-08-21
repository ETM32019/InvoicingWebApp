const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

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

      // Create instance of User
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
      //   const payload = {
      //     user: {
      //       id: user.id
      //     }
      //   };

      res.send("User Registered");
    } catch (error) {
      console.error(error.message);
      req.status(500).send("Server error");
    }
  }
);

module.exports = router;
