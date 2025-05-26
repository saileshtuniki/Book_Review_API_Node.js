// src/routes/book.routes.ts
import express from 'express';
import { createBook,getAllBooks , getBookDetails, searchBooks} from '../controllers/book.controller';
import authMiddleware from '../middleware/auth.middleware';

const router = express.Router();

// Only authenticated users can add books
router.post('/books', authMiddleware, createBook);

router.get('/books/:id', getBookDetails);


router.get('/books', getAllBooks);



router.get('/search', searchBooks);



export default router;
