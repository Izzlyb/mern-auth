import express from 'express';
import {
  test,
  updateUser,
  deleteUser,
} from '../controllers/user.controller.js';
import { verifyJWToken } from '../utils/verifyToken.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.get('/:id', test);
router.post('/update/:id', verifyToken, updateUser);
router.delete('/delete/:id', verifyJWToken, deleteUser);

export default router;
