import express from 'express';
import { addComment, getComments, updateComment, deleteComment } from '../controllers/commentController.js';
import auth from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/:postId', auth, addComment);
router.get('/:postId', auth, getComments);
router.put('/:commentId', auth, updateComment);
router.delete('/:commentId', auth, deleteComment);

export default router;
