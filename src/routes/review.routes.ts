import express from 'express';
import { createReview, updateReview , deleteReview} from '../controllers/review.controller';
import authMiddleware from '../middleware/auth.middleware';

const router = express.Router();

router.post('/books/:id/reviews', authMiddleware, createReview);
router.put('/reviews/:id', authMiddleware, updateReview);
router.delete('/reviews/:id', authMiddleware, deleteReview);

export default router;
