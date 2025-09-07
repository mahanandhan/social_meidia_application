import express from 'express';
import { getMe, loginUser, logoutUser, registerUser } from '../controllers/auth.controller.js';
import { protectRoute } from '../middleware/protectRoute.js';
const router = express.Router();
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);
router.get('/me', protectRoute,getMe)
export default router;