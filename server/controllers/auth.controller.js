import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const SignUp = async (req, res, next) => {
  const { username, email, password } = req.body;
  const saltRounds = 10;

  try {
    var salt = bcryptjs.genSaltSync(saltRounds);
    var hashPassword = bcryptjs.hashSync(password, salt);

    const newUser = new User({ username, email, password: hashPassword });
    await newUser.save();
    res.status(201).json({ message: "User created in database successfully." });
  
  } catch( error ) {
    next( error );
  }
}

export const SignIn = async (req, res, next) => {
  const { email, password } = req.body;

  console.log(req.body);
  try {
    /* check email */
    const validUser = await User.findOne({ email });
    if( !validUser ) {
      return next(errorHandler(404, "Invalid credentials"))
    }
    const validPassword = await bcryptjs.compareSync( password, validUser.password );
    if( !validPassword ) {
      return next(errorHandler(408, "Username or Email does not match"));
    }

    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET );
    const { password: hashPassword, ...rest } = validUser._doc;
    const expireDate = Date.now() * 360000;
    res.cookie('access_token', token, { httpOnly: true })
        .status(200)
        .json(rest);

    console.log(">>>End of SignIn<<<");

  } catch( error ) {
    next( error );
  }
}


export const google = async (req, res, next) => {
  const { username, email, password } = req.body;
  const expireDate = Date.now() * 3600000;

  try {
    console.log("<<<<Checking email: the Google Sign-In UI>>>>");
    console.log(req.body.email);

    /* check email */
    const validUser = await User.findOne({ email: req.body.email  });
    if( validUser ) {
      const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET );
      const { password: hashPassword, ...rest } = validUser._doc;

      res.cookie('access_token', token, { httpOnly: true })
    } else {

      const generatedPassword = Math.random().toString(36).slice(-8) +
                                Math.random().toString(36).slice(-8); // to hava a 16 digit password.
      const hashedPassword = bcryptjs.hashSync( generatedPassword, 10);

      const newUser = new User({
            username: req.body.name.split(" ").join("").toLowerCase() + Math.floor(Math.random * 1000).toString(), 
            email: req.body.email, 
            password: hashedPassword, 
            profilePicture: req.body.photo});

      await newUser.save();
      const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET );
      const { password: hashPassword, ...rest } = newUser._doc;

      res.cookie('access_token', token, { httpOnly: true })
    }

    const validPassword = await bcryptjs.compareSync( password, validUser.password );
    if( !validPassword ) {
      return next(errorHandler(408, "Username or Email does not match"));
    }

  } catch( error ) {
    next( error );
  }
}


export const SignOut = async (req, res, next) => {
  res.clearCookie('access_token').status(200).json("Sign Out successfully");
}
