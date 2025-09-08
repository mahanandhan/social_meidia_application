import express from 'express';
import { followUnfollowUser, getSuggestedUsers, getUserProfile } from '../controllers/user.controller.js';
import { protectRoute } from '../middleware/protectRoute.js';

const router = express.Router();

router.get('/profile/:username', protectRoute,getUserProfile);
router.post('/follow/:id', protectRoute,followUnfollowUser);
router.get('/suggested', protectRoute,getSuggestedUsers);
export default router;