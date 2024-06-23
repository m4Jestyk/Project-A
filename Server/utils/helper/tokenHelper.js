import jwt from "jsonwebtoken";
import { User } from "../../models/user.js";

const secretKey = "itsASecret";

const tokenCreate = (user, res) => {
    return jwt.sign({
        _id: user._id,
        email: user.email,
        username: user.username,
    }, secretKey);
}

const getUser = async (req, res, next) => {
    try {

        const token = req.cookies.cookiemonster;

        if(!token){
            return res.status(401).json({message: "Unauthorized user"});
        }

        const decoded =  jwt.verify(token, secretKey);
        console.log(decoded);
        const user = await User.findById(decoded._id).select("-password");


        req.user = user;

        next();
    } catch (error) {
        console.log(error);
        return null;
    }
}

export { tokenCreate, getUser };