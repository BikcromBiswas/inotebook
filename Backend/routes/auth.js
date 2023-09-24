require('dotenv').config()
const fetchUser = require('../middleware/fetchUser')
const jwt = require('jsonwebtoken');
const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
const User = require('../models/User')
// ************************​‌‍‌⁡⁢⁣⁢𝙍𝙊𝙐𝙏𝙀 𝟭 : 𝘾𝙍𝙀𝘼𝙏𝙀 𝙐𝙎𝙀𝙍⁡​ ********************************************************
//Create a user using : POST "/api/auth" .Doesn,t require auth
router.post('/createuser', [
  body('email').isEmail(),
  body('name').isLength({ min: 3, max: 15 }),
  body('password').isLength({ min: 8 }).withMessage("2message must be 8 charachter long").matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).+$/, "i").withMessage('Password should be combination of one uppercase , one lower case, one special char, one digit and min 8 , max 20 char long')
], async (req, res) => {
  const errors = validationResult(req);

  let success = false;
  //If on creating user some errors ,return Bad Request and the errors
  if (!errors.isEmpty()) {
    return res.status(400).json({success, errors: errors.array() });
  }

  //Check whether the user with the email exists already
  let u = await User.findOne({
    email: req.body.email
  }).catch(err => {
    res.status(500).json({success,
      error: "So sorry error occured on our side"
    })
  })

  // ​‌‌‌SALTING PASSWORD​
  const salt = await bcrypt.genSalt(10) // Adding salt
  const hashedPassword = await bcrypt.hash(req.body.password, salt) //Final hashed password


  //IF the email of user already exists
  if (u) {
    res.status(400).json({success , error: "2Sorry a user with this email already exists" })
  }
  else {

    
    //Creating user if the user doesn,t exists
    try {
      let user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
      })
        //IF any error occured on sever side
        .then(user => {
          success = true;
          //Creating a JWT (json web token ) if user exists 
          let data = {
            id: user.id
          }
          data = JSON.stringify(data, null, 4)
          console.log(data)
          const authtoken = jwt.sign(data, process.env.SECRET_KEY)
          console.log(authtoken)
          res.json({success, authtoken })
        })
    }
    catch (err) {
      success = false;
      console.log(err)
      res.status(500).send({success, error: "So sorry error occured on our side" })
    }
  }
})


// ******************************⁡⁢⁢⁢​‌‌‍𝗥𝗢𝗨𝗧𝗘 𝟮 : 𝗟𝗢𝗚𝗜𝗡​⁡ ********************************************************

//Create a AUTHENTICATION using : POST "/api/auth/login" .Doesn,t require auth
router.post('/login',
  [
    body('email').isEmail().withMessage("Please enter valid email"),
    // body('name').isLength({ min: 3, max: 15 }).withMessage("Name should be 3 charachter long and less than 15 charachter"),
    body('password').isLength({ min: 8 }).withMessage("Password must be 8 charachters long")
  ], async (req, res) => {
    const errors = validationResult(req);
    //If the errors ,return Bad Request and the errors
    let success = false;
    if (!errors.isEmpty()) {
      return res.status(400).json({success, errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email })
      if (user == null) {
        return res.status(400).json({success,
          error: "Please try to login with correct cerendtials "
        })
      }
      const passwordCmp = await bcrypt.compare(password, user.password);
      console.log("Is the login request is true or false :" + passwordCmp)
      
      if (!passwordCmp) {
        success = false;        
        return res.status(400).json({success,
          error: "Please try to login with correct cerendtials "
        })
      }
      console.log(user.id)
      console.log(process.env.SECRET_KEY)
      let data = {
        id: user.id
      }
      data = JSON.stringify(data, null, 4)
      const authtoken = jwt.sign(data, process.env.SECRET_KEY)
      console.log(authtoken)
      success = true;
      res.json({success, authtoken })
    } catch (err) {
      console.log(err)
      res.status(500).send({success,error: "So sorry error occured on our side" })
    }
  })


// *************************⁡⁣⁣⁢​‌‌‍ ​‌‌‍ROUTE 3 : GET USER​​⁡ ********************************************************
//Get loggedin user details using : POST "/api/auth/getuser" .login required
router.post('/getuser', fetchUser, async (req, res) => {
  try {
    // console.log(req)
    const userId = req.id;
    const user = await User.findById(userId).select("-password");
    // console.log(user)
    res.json(user)
  }
  catch (err) {
    // console.log(err)
    res.status(500).send({ error: "So sorry error occured on our side" })
  }
})
module.exports = router 