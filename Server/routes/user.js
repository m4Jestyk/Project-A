import express from 'express';
import { acceptFriend, addFriend, changePassword, createUser, declineFriend, fetchFriends, fetchRandomId, fetchRequests, getProfile, getProfileById, login, logout, updateProfile } from '../controllers/user.js';
import { getUser } from '../utils/helper/tokenHelper.js';

const router = express.Router();

router.post("/new", createUser);

router.post("/login", login);

router.post("/logout", logout);

router.put("/update/:id", getUser, updateProfile);
  
router.post("/random", getUser, fetchRandomId);

router.post("/getprofile", getProfile);

router.post("/getprofilebyid", getProfileById);

router.post("/addfriend", getUser, addFriend);

router.post("/acceptfriend", getUser, acceptFriend);

router.post("/declinefriend", getUser, declineFriend);

router.get("/getrequests", getUser, fetchRequests);

router.get("/getfriends", getUser, fetchFriends);

router.post("/changepw", changePassword);


export default router;