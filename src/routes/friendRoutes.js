import express from 'express';
import { sendFriendRequest, respondToFriendRequest, getFriends, getPendingRequests } from '../controllers/friendController.js';
import auth from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/send-request/:friendId', auth, sendFriendRequest);
router.post('/respond-request/:friendId', auth, respondToFriendRequest);
router.get('/get-friends', auth, getFriends);
router.get('/get-pending-requests', auth, getPendingRequests);

export default router;
