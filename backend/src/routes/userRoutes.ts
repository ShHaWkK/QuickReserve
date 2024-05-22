// backend/src/routes/userRoutes.ts
import express from 'express';
import { registerUser, loginUser, getUserProfile } from '../controllers/userController';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', getUserProfile, protect);  // Protect this route

export default router;
