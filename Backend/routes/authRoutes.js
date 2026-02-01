import express from "express";
import { body } from "express-validator";
import {
    register,
    login,
    getProfile,
    updateProfile,
    changePassword
} from '../Controllers/authController.js'
import  updateProfileValidation from "../middleware/errorHandler.js"

import protect from '../middleware/auth.js'

const router = express.Router();

//validtion middleware
const registerValidation = [

    body('username').trim().isLength({min:3}).withMessage('Username must be at least 3 characters long'), //      

    body('email').trim().isEmail().withMessage('Invalid email').normalizeEmail(),
    body('password').trim().isLength({min:6}).withMessage('Password must be at least 6 characters long'),
]
//login validation 

const loginValidation = [
    body('email').trim().normalizeEmail().isEmail().withMessage('Invalid email'),
    body('password').notEmpty().withMessage('Password is required'),
]

//public routes
router.post('/register', registerValidation, register)
router.post('/login', loginValidation, login)

//protected routes
router.get('/profile', protect, getProfile)
router.put('/update-profile', protect, updateProfileValidation, updateProfile)
router.post('/change-password', protect, changePassword)

export default router