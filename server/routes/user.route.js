import express from "express";
import User from "../controllers/user.controller.js";

const router = express.Router();

router.get('/', User );

// router.get('/', test);
// router.post('/update/:id', verifyToken, updateUser);
// router.delete('/delete/:id', verifyToken, deleteUser);

export default router;
