// backend/src/middleware/authMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/UserModel';

export const protect = async (req: any, res: Response, next: NextFunction) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET!) as jwt.JwtPayload;
            req.user = await User.findById(decoded.id).select('-password');
            next();
        } catch (error) {
            res.status(401).send('Not authorized');
        }
    } else {
        res.status(401).send('Not authorized, no token');
    }
};
