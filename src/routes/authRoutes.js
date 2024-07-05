import express from 'express';
import { signup, signin, logout, logoutAllDevices } from '../controllers/authController.js';
import auth from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/signin', signin);
router.post('/logout', auth, logout);
router.post('/logout-all-devices', auth, logoutAllDevices);

export default router;
