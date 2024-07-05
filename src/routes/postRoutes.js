import express from 'express';
import { createPost, getPosts, getUserPosts, getPost, updatePost, deletePost } from '../controllers/postController.js';
import auth from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', auth, createPost);
router.get('/', auth, getPosts);
router.get('/user', auth, getUserPosts);
router.get('/:postId', auth, getPost);
router.put('/:postId', auth, updatePost);
router.delete('/:postId', auth, deletePost);

export default router;
