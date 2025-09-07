import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import {generateTokenAndSetCookie} from "../lib/utils/generateToken.js";
export const registerUser = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const userExists = await User.findOne({ username });
        const emailExists = await User.findOne({ email });
        if (userExists){
            return res.status(400).json({ message: 'Username already exists' });
        }
        if (emailExists){
            return res.status(400).json({ message: 'Email already exists' });
        }
        if (!username || !email || !password) {
            return res.status(400).json({ message: "Please provide all fields" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });
        if (newUser) {
            generateTokenAndSetCookie(newUser._id, res);
            await newUser.save();
            res.status(201).json({
                _id: newUser._id,
                username: newUser.username,
                email: newUser.email
            })
        }else{
            res.status(400).json({ message: 'Invalid user data' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
        console.error(error);
    }
}

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Please provide all fields" });
        }
        const user = await User.findOne({ email });
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || '');
        if (!user || !isPasswordCorrect) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        generateTokenAndSetCookie(user._id, res);
        res.status(200).json({
            _id: user._id,
            username: user.username,
            email: user.email
        })
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
        console.error(error);
    }
}

export const logoutUser = (req, res) => {
    try {
        res.cookie('jwt', '', {maxAge:0});
        res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}


export const getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select('-password');
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
        console.error(error);
        console.log(error)
    }
}