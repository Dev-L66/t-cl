import express from 'express';
import { protectedRoute } from '../middleware/protectedRoute.js';
import { getAllPosts,  createPost, getUserPosts, getLikedPosts,getFollowingPosts, likeUnlikePost, commentOnPost, deletePost } from '../controllers/post.controller.js';
const router = express.Router();


router.get('/all', protectedRoute, getAllPosts);
router.post('/create', protectedRoute, createPost);
router.get('/user/:username', protectedRoute, getUserPosts)
router.get('/likes', protectedRoute, getLikedPosts);
router.get('/following', protectedRoute, getFollowingPosts);
router.post('/like/:id', protectedRoute, likeUnlikePost);
router.post('/comment/:id', protectedRoute, commentOnPost);
router.delete('/:id', protectedRoute, deletePost);

export default router;