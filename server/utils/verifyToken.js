
import { errorHandler } from '../utils/error.js';

import jwt from "jsonwebtoken";

export const verifyJWToken = (req, res, next) => {
  // const token = req.cookie.access_token;
  console.log(">>>working on verifyToken<<<");

  // if( !token ) {
  //   return next(errorHandler(401, "You are not authenticated!"));
  // }

  // jwt.verify( token, process.env.JWT_SECRET, (err, user) => {
  //   if( err ) {
  //     return next(errorHandler(403, "Token is not valid"));
  //   }

  //   req.user = user;
  //   next();
  // });

  next();
  console.log(">>>verifyToken ok.<<<");
}
