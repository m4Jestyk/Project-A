import { User } from "../models/user.js";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { tokenCreate } from "../utils/helper/tokenHelper.js";

export const createUser = async (req, res) => {
  try {
    const { name, email, username, password } = req.body;

    let user = await User.findOne({ email });

    if (user) {
      return res.json({
        error: "User with this email already exists",
      });
    }

    user = await User.findOne({ username });

    if (user) {
      return res.json({
        error: "User with this username already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user = await User.create({
      name,
      username,
      email,
      password: hashedPassword,
    });

    await user.save();

    if (user) {
      res.status(200).json({
        success: true,
        _id: user._id,
        name: user.name,
        username: user.username,
        email: user.email,
      });
    } else {
      res.status(400).json({
        error: "Invalid user details",
      });
    }
  } catch (error) {
    console.log("Error while creating the user :'(");
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user) {
      return res.json({
        error: "User not found",
      });
    }

    const isPwCorrect = await bcrypt.compare(password, user.password || "");

    if (!isPwCorrect) {
      return res.json({
        error: "Wrong password!",
      });
    }

    console.log(user);
    const token = tokenCreate(user);
    res.cookie("cookiemonster", token); //COOKIE GENERATION

    res.status(200).json({
      success: true,
      message: "logged in!",
      _id: user._id,
      name: user.name,
      username: user.username,
      email: user.email,
    });
  } catch (error) {
    console.log(error);
  }
};

export const logout = async (req, res) => {
  try {
    await res.cookie("cookiemonster", "", {
      expires: new Date(Date.now()),
    });

    await res.json({
      message: "logged out",
    });
  } catch (error) {
    console.log(error);
    console.log("Error during logout");
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { _id, username, email, password, shortBio, fullBio, interests } =
      req.body;
    let user = await User.findOne({ _id: _id });

    if (!user) return res.status(400).json({ error: "User not found" });

    let hashedPassword = "";

    if (password) hashedPassword = await bcrypt.hash(password, 10);

    user.email = email || user.email;
    user.username = username || user.username;
    user.shortBio = shortBio || user.shortBio;
    user.fullBio = fullBio || user.fullBio;
    user.interests = interests || user.interests;
    if (password) {
      user.password = hashedPassword;
    }

    user.save();

    res.status(200).json({
      user,
    });
  } catch (error) {
    console.log(error);
    console.log("error while updating info");
  }
};

export const fetchRandomId = async (req, res) => {
  const user = req.user;

  const currentUser = await User.findById(user._id).populate("friends");
  const friendsIds = currentUser.friends.map((friend) => friend._id);
  friendsIds.push(user._id);

  let foundUser = [];

  while (foundUser.length === 0) {
    foundUser = await User.aggregate([
      {
        $match: {
          _id: { $nin: friendsIds },
        },
      },
      {
        $sample: { size: 1 },
      },
    ]);
  }

  if (foundUser.length === 0) {
    return res.json({
      message: "No user found!",
    });
  }

  res.json(foundUser[0]);
};

export const getProfile = async (req, res) => {
  const { username } = req.body;
  const user = await User.findOne({ username });

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  return res.json(user);
};

export const getProfileById = async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await User.findOne({
      _id: new mongoose.Types.ObjectId(userId),
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.json(user);
  } catch (error) {
    console.log("Error while fetching: ", error);

    res.json({
      success: false,
    });
  }
};

export const addFriend = async (req, res) => {
  const userId = req.user._id;
  const friendId = req.body.userToAdd;

  try {
    console.log(friendId);
    await User.findByIdAndUpdate(userId, {
      $push: { friendRequestsSent: friendId },
    });
    await User.findByIdAndUpdate(friendId, {
      $push: { friendRequestsRecieved: userId },
    });
    return res.json({
      userId: userId,
      friendId: friendId,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const acceptFriend = async (req, res) => {
  const userId = req.user._id;
  const friendId = req.body.userToAdd;

  try {
    console.log(friendId);

    await User.findByIdAndUpdate(userId, {
      $push: { friends: friendId },
      $pull: { friendRequestsRecieved: friendId },
    });
    await User.findByIdAndUpdate(friendId, {
      $push: { friends: userId },
      $pull: { friendRequestsSent: userId },
    });

    return res.json({
      userId: userId,
      friendId: friendId,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while accepting the friend request.",
    });
  }
};

export const declineFriend = async (req, res) => {
  const userId = req.user._id;
  const friendId = req.body.userToDecline;

  try {
    console.log(friendId);

    await User.findByIdAndUpdate(userId, {
      $pull: { friendRequestsRecieved: friendId },
    });
    await User.findByIdAndUpdate(friendId, {
      $pull: { friendRequestsSent: userId },
    });

    return res.json({
      userId: userId,
      friendId: friendId,
      success: true,
      message: "Friend request declined successfully.",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while declining the friend request.",
    });
  }
};

export const fetchRequests = async (req, res) => {
  const username = req.user.username;
  try {
    let user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    await res.status(200).json(user.friendRequestsRecieved);
  } catch (error) {
    console.log("Error fetching the Requests");
  }
};

export const fetchFriends = async (req, res) => {
  const username = req.user.username;
  try {
    let user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    await res.status(200).json(user.friends);
  } catch (error) {
    console.log("Error fetching the friends");
  }
};

export const changePassword = async (req, res) => {
  //only for testing and dev mode
  try {
    const username = req.body.username;
    const newPassword = req.body.newPassword;
    let user = await User.findOne({ username });

    let hashedPassword = "";

    if (newPassword) hashedPassword = await bcrypt.hash(newPassword, 10);

    if (newPassword) {
      user.password = hashedPassword;
    }

    user.save();

    res.json({
      success: true,
    });
  } catch (error) {
    res.json({ success: false });
  }
};
