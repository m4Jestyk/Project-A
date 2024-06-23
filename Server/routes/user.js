import express from 'express';
import { changeBio, createUser, fetchRandomId, login, logout } from '../controllers/user.js';
import { getUser } from '../utils/helper/tokenHelper.js';

const router = express.Router();
 
router.post("/new", createUser);

router.post("/login", login);

router.post("/logout", logout);

router.put("/update/:id", getUser, changeBio);

router.post("/random", fetchRandomId);


export default router;