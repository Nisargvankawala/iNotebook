const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = 'Nisargis a goodb$oy'

//ROUTES 1 : create a user using : POST "/api/auth/createuser" . Doesn't require Auth . No login required
router.post('/createuser', [
  body('email', 'Enter a valid email').isEmail(),
  body('name', 'Enter a valid name').isLength({ min: 3 }),
  body('password', 'Enter a valid password').isLength({ min: 5 }),
], async (req, res) => {
  // console.log(req.body);
  let success = false;

  //if there are error, return Bad request and the errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    success = false;
    return res.status(400).json({success, errors: errors.array() });
  }


  try {
    //check whether user with this email exist already    
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      success = false;
      return res.status(400).json({success, error: "sorry user with same email already exists" })
    }

    //generating salt using bcrypt
    const salt = await bcrypt.genSalt(10);

    //merging salt with the password and generating a hash function 
    const secPass = await bcrypt.hash(req.body.password, salt);

    //the secpass will be store in db as a hash function and not the orignal password
    user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: secPass,
    })

    const data = {
      user: {
        id: user.id
      }
    }
    const authtoken = jwt.sign(data, JWT_SECRET);


    // res.json(user)
    success = true;
    res.json({ success,authtoken })


  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal server error")
  }

})



// ROUTES 2 :authenticating a user using : POST "/api/auth/login" . No login required 
router.post('/login', [
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'password cannot be blank').exists(),
], async (req, res) => {
  let success =false;

  //if there are error, return Bad request and the errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email })
    if (!user) {
      success =false
      return res.status(400).json({success, error: "Please try to login with correct credentials" })
    }

    const passwordCompare = await bcrypt.compare(password, user.password)
    if (!passwordCompare) {
      success =false
      return res.status(400).json({success, error: "Please try to login with correct credentials" })
    }

    const data = {
      user: {
        id: user.id
      }
    }
    const authtoken = jwt.sign(data, JWT_SECRET);
    success = true;
    res.json({success, authtoken })

  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal server error")
  }

})


// ROUTES 3 :Get login id a user Detail using : POST "/api/auth/getuser" . Login required 

// In our case, middleware is a function that will be called whenever a request will be made in the 'login required' routes.
router.post('/getuser',fetchuser, async (req, res) => {

  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password")
    res.send(user)
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal server error")
  }
})
module.exports = router
