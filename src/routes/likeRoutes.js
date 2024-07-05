import express from 'express';
import { toggleLike, getLikes } from '../controllers/likeController.js';
import auth from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/:id', auth, getLikes);
router.post('/toggle/:id', auth, toggleLike);

export default router;
