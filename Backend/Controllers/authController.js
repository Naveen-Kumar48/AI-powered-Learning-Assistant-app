import jwt from "jsonwebtoken";
import User from "../models/User.js";



//generate the jwt token
const generateToken = (user) => {
    return jwt.sign(
        { id: user._id, username: user.username, email: user.email },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRES_IN || '7d'
        }
    );
}


//@desc Register a new user
//@route POST /api/auth/register
//@access Public
export const register = async (req, res,next) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.status(400).json({ success: false, message: 'All fields are required' });
        }
        
    } catch (error) {
        next(error)
    }
}

//@desc Login a user
//@route POST /api/auth/login
//@access Public

 export const   login = async (req, res,next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ success: false, message: 'All fields are required' });
        }
        
    } catch (error) {
        next(error)
    }
}





