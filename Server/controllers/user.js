import { User } from "../models/user.js";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import {tokenCreate} from "../utils/helper/tokenHelper.js"
 
export const createUser = async (req, res) => {
  try {
    const { name, email, username, password } = req.body;

    let user = await User.findOne({email});

    if (user) {
      return res.json({
        error: "User with this email already exists",
      });
    }

    user = await User.findOne({username});

    if(user) {
      return res.json({
        error: "User with this username already exists",
      })
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
    res.cookie("cookiemonster", token);           //COOKIE GENERATION



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

export const logout = async(req, res) => {
  try {
    await res.cookie("cookiemonster", "", {
      expires: new Date(Date.now())
    });

    await res.json({
      message: "logged out"
    })
  } catch (error) {
    console.log(error);
    console.log("Error during logout");
  }
}

export const changeBio = async(req, res) => {
  try {
    const {username, email, newBio} = req.body;
    let user = await User.findOne({username: username});

    if (!user) return res.status(400).json({ error: "User not found" });

    user.email = email || user.email;
    user.username = username || user.username;
    user.shortBio = newBio;

    user.save();

    res.status(200).json({
      user
    })


  } catch (error) {
    console.log(error);
    console.log("error while changing bio")
  }
}

export const fetchRandomId = async(req, res) => {
  const user = await User.aggregate([
    {
      $sample: {size: 1}
    }
  ]);

  if(user.length === 0) {
    return res.json(
     {
      message: "no user found!"
     }
    )
  }

  res.json(user[0]);
}
