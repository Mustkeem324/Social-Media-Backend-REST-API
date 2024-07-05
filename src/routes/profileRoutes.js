import express from 'express';
import { getUserDetails, updateUserDetails, getAllUsers } from '../controllers/profileController.js';
import auth from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/get-details/:userId', auth, getUserDetails);
router.get('/get-all-details', auth, getAllUsers);
router.put('/update-details/:userId', auth, updateUserDetails);

export default router;
