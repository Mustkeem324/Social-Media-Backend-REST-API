import express from 'express';
import { sendOTP, verifyOTP, resetPassword } from '../controllers/otpController.js';

const router = express.Router();

router.post('/send', sendOTP);
router.post('/verify', verifyOTP);
router.post('/reset-password', resetPassword);

export default router;
