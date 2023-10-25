import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';
import { errorHandler } from "../utils/error.js";

export const SignUp = async (req, res, next) => {
  const saltRounds = 10;

  console.log(req.body);

  const { username, email, password } = req.body;
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

export default SignUp;
