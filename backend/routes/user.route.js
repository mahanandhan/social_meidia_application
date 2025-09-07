import express from 'express';
import { followUnfollowUser, getUserProfile } from '../controllers/user.controller.js';
import { protectRoute } from '../middleware/protectRoute.js';

const router = express.Router();

router.get('/profile/:username', protectRoute,getUserProfile);
router.post('/follow/:id', protectRoute,followUnfollowUser);
export default router;