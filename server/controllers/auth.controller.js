import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";


export const SignUp = async (req, res, next) => {
  const { username, email, password } = req.body;
  const saltRounds = 10;

  console.log(req.body);

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
  const { username, email, password } = req.body;

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

  } catch( error ) {
    next( error );
  }
}
