const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../model/User");
const { secret } = require("../configs/default");


const userRegister = async (userDets, res) => {
  try {
   // validate the email
    let emailNotRegistered = await validateEmail(userDets.email);
    if (!emailNotRegistered) {
      return res.status(400).json({
        message: `Email is already registered.`,
        success: false
      });
    }

    // Get the hashed password
    const password = await bcrypt.hash(userDets.password, 12);
    // create a new user
    const newUser = new User({
      ...userDets,
      password,
      
    });

    await newUser.save();
    return res.status(201).json({
      message: "Hurry! now you are successfully registred. Please now login.",
      success: true
    });
  } catch (err) {
    // Implement logger function (winston)
    return res.status(500).json({
      message: "Unable to create your account.",
      success: false
    });
  }
};

const userLogin = async (userCreds,res) => {
  let { email, password } = userCreds;
  // First Check if the username is in the database
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({
      message: "Username is not found. Invalid login credentials.",
      success: false
    });
  }
  
  let isMatch = await bcrypt.compare(password, user.password);
  if (isMatch) {
    // Sign in the token and issue it to the user
    let token = jwt.sign(
      {
        user_id: user._id,
        email: user.email,
        
      },
      secret,
      { expiresIn: "1 hr" }
    );

    let result = {
     
      email: user.email,
      token: `Bearer ${token}`,
      expiresIn: 168
    };

    return res.status(200).json({
      ...result,
      message: "Hurray! You are now logged in.",
      success: true
    });
  } else {
    return res.status(403).json({
      message: "Incorrect password.",
      success: false
    });
  }
};

const validateEmail = async email => {
  let user = await User.findOne({ email });
  return user ? false : true;
};



module.exports = {
  
  userLogin,
  userRegister,
};
