import express from 'express';
import { createUser, fetchRandomId, getProfile, login, logout, updateProfile } from '../controllers/user.js';
import { getUser } from '../utils/helper/tokenHelper.js';

const router = express.Router();

router.post("/new", createUser);

router.post("/login", login);

router.post("/logout", logout);

router.put("/update/:id", getUser, updateProfile);

router.post("/random", fetchRandomId);

router.post("/getprofile", getProfile);


export default router;