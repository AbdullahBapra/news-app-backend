import User from '../models/users.js';
import express from 'express';
import { otpgenrate , sendOTPEmail } from './otp.js';
const router = express.Router();

// Create a new user

router.post('/', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({
            email
        });
        if (existingUser) {

            return res.status(400).json({
                message: "User with this email already exists"
            });
        }
        const otp = otpgenrate();
        const otpExpires = new Date(Date.now() + 10 * 60 * 1000);
        const newUser = new User({
            name,
            email,
            password,
            otp,
            otpExpires
        });
        const savedUser = await newUser.save();
        await sendOTPEmail(email, otp);
        res.status(201).json(savedUser);
    }
    catch (error) {
        res.status(500).json({ message: "Failed to create user", error: error.message });
    }
});

// Get all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    }
    catch (error) {
        res.status(500).json({ message: "Failed to fetch users", error: error.message });
    }
});

// Get a user by ID
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
    }
    catch (error) {
        res.status(500).json({ message: "Failed to fetch user", error: error.message });
    }
});


router.delete('/:id', async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "User deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Failed to delete user", error: error.message });
    }
});

// update user route 


router.put('/:id', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            { name, email, password },
            { new: true }
        );
        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(updatedUser);
    }
    catch (error) {
        res.status(500).json({ message: "Failed to update user", error: error.message });
    }
});

router.post('/verify-otp', async (req, res) => {
    try{
        const { email } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const otp = otpgenrate();
        user.otp = otp;
        user.otpExpires = new Date(Date.now() + 10 * 60 * 1000);
        await user.save();
        await sendOTPEmail(email, otp);
        res.status(200).json({ message: "OTP sent to email" });

    }
    catch (error) {
        res.status(500).json({ message: "Failed to verify OTP", error: error.message });
    }
});


router.post('/reset-password', async (req, res) => {
    try {
        const { email, otp, newPassword } = req.body;
        const user = await User.find
            ({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        if (user.otp !== otp || user.otpExpires < new Date()) {
            return res.status(400).json({ message: "Invalid or expired OTP" });
        }
        user.password = newPassword;
        user.otp = null;
        user.otpExpires = null;
        await user.save();
        res.status(200).json({ message: "Password reset successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Failed to reset password", error: error.message });
    }
});



export default router;
