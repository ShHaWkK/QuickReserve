import { Request, Response } from 'express';
import User from '../models/UserModel';


interface User {
    _id: string;
    name: string;
    email: string;
    
}

interface CustomRequest extends Request {
    user?: User; 
}

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
            email: user.email
        });
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'An unexpected error occurred' });
        }
    }
};

// Login user
export const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (user && await user.matchPassword(password)) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email
            });
        } else {
            res.status(401).send('Invalid email or password');
        }
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).send(error.message);
        } else {
            res.status(500).send('An unexpected error occurred');
        }
    }
};

// Get user profile
export const getUserProfile = async (req: CustomRequest, res: Response) => {
    try {
        if (!req.user || !req.user._id) {
            res.status(401).send('Not authorized');
            return;
        }
        const user = await User.findById(req.user._id).select('-password');
        if (!user) {
            res.status(404).send('User not found');
            return;
        }
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email
        });
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).send(error.message);
        } else {
            res.status(500).send('An unexpected error occurred');
        }
    }
};
