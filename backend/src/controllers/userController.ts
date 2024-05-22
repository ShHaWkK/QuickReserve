// backend/src/controllers/userController.ts
import { Request, Response } from 'express';
import User from '../models/UserModel';
import jwt from 'jsonwebtoken';

// Helper function to generate token
const generateToken = (id: string) => {
    return jwt.sign({ id }, process.env.JWT_SECRET!, {
        expiresIn: '30d',
    });
};

// Register a new user
export const registerUser = async (req: Request, res: Response) => {
    const { name, email, password } = req.body;
    try {
        const userExists = await User.findOne({ email });
        if (userExists) {
            res.status(400).send('User already exists');
            return;
        }
        const user = await User.create({ name, email, password });
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Login user
export const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (user && (await user.matchPassword(password))) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id)
            });
        } else {
            res.status(401).send('Invalid email or password');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Get user profile
export const getUserProfile = async (req: Request, res: Response) => {
    try {
        const user = await User.findById(req.user._id).select('-password');
        if (!user) {
            res.status(404).send('User not found');
            return;
        }
        res.json(user);
    } catch (error) {
        res.status(500).send(error.message);
    }
};
