import express from "express";
import { SignUp, SignIn, google, SignOut } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup", SignUp);

router.post("/signin", SignIn);

router.post('/google', google);

router.get("/signout", SignOut);

export default router;
