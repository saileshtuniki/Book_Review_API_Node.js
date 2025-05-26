
import { Request, Response } from 'express';
import { createReviewInDB, updateReviewInDB , deleteReviewByIdFromDB} from '../models/review.model';


export const createReview = async (req: Request, res: Response): Promise<void> => {
  try {
    // grab the decoded user id
    const user = (req as any).user;
    console.log('Controller sees req.user:', user);
    
    const book_id = parseInt(req.params.id);

    const { rating, comment } = req.body;

    if (!book_id || !rating || !comment) {
       res.status(400).json({ message: 'All fields are required' });
       return
    }

    if (!user?.id) {
       res.status(401).json({ message: 'Unauthorized: User ID missing' });
       return
    }

    // actually insert with a real user_id
    const review = await createReviewInDB({
      user_id: user.id,
      book_id,
      rating,
      comment,
    });

     res.status(201).json({ message: 'Review created', review });
     return
  } catch (err: any) {
    console.error('Review creation error:', err);
     res.status(500).json({ message: 'Something went wrong', error: err.message });
     return
  }
};






export const updateReview = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = (req as any).user;
    const reviewId = Number(req.params.id);
    const { rating, comment } = req.body;

    if (!rating && !comment) {
      res.status(400).json({ message: 'At least one of rating/comment required' });
      return;
    }

    // Ensure the review belongs to this user
    const updated = await updateReviewInDB(reviewId, user.id, { rating, comment });
    if (updated.rowCount === 0) {
      res.status(404).json({ message: 'Review not found or not yours' });
      return;
    }

    res.status(200).json({ message: 'Review updated', review: updated.rows[0] });
    return;
  } catch (err: any) {
    console.error('updateReview error ▶', err);
    res.status(500).json({ message: 'Something went wrong', error: err.message });
    return;
  }
};




// controllers/review.controller.ts




interface AuthRequest extends Request {
  user?: { id: number };
}

export const deleteReview = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const reviewId = parseInt(req.params.id);
    const userId = req.user?.id;

    if (!userId) {
       res.status(401).json({ message: 'Unauthorized: User ID not found' });
       return;
    }

    const deleted = await deleteReviewByIdFromDB(reviewId, userId);

    if (!deleted) {
       res.status(403).json({ message: 'Forbidden: Not allowed to delete this review'});
       return
    }

    res.json({ message: 'Review deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};
