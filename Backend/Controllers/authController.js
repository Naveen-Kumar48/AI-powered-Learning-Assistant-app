import jwt from "jsonwebtoken";
import User from '../models/User.js'



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
       
        
    } catch (error) {
        next(error)
    }
}

//@desc Login a user
//@route POST /api/auth/login
//@access Public

 export const   login = async (req, res,next) => {
    try {
        
        
    } catch (error) {
        next(error)
    }
}


//@desc Get user profile
//@route GET /api/auth/profile
//@access Private



export const getProfile = async (req, res,next) => {
  try{

  }catch(error){

  }
}

//@desc Update user profile
//@route PUT /api/auth/update-profile
//@access Private

export const updateProfile = async (req, res,next) => {
  try{

  }catch(error){

  }
}

//@desc change password
//@route PUT /api/auth/change-password
//@access Private

export const changePassword = async (req, res,next) => {
  try{

  }catch(error){

  }
}