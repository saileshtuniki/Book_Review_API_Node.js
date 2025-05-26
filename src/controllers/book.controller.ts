// src/controllers/book.controller.ts
import { Request, Response } from 'express';
import { createBookInDB, getBooksFromDB, getBookDetailsFromDB, searchBooksFromDB } from '../models/book.model';


export const createBook = async (req: Request, res: Response) => {
  try {
    const { title, author, genre } = req.body;
    if (!title || !author) {
       res.status(400).json({ message: 'Title and author are required' });
       return;
    }
    const book = await createBookInDB({ title, author, genre });
     res.status(201).json(book);
     return;
  } catch (err: any) {
    console.error('createBook error ▶', err);
     res.status(500).json({ message: 'Failed to create book', error: err.message });
     return;
  }
};


export const getAllBooks = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const author = req.query.author as string;
    const genre = req.query.genre as string;

    const offset = (page - 1) * limit;

    const books = await getBooksFromDB(limit, offset, author, genre);

    res.json({ page, limit, books });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};


export const getBookDetails = async (req: Request, res: Response): Promise<void> => {
  try {
    const bookId = parseInt(req.params.id);
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 5;
    const offset = (page - 1) * limit;

    const bookDetails = await getBookDetailsFromDB(bookId, limit, offset);

    if (!bookDetails) {
       res.status(404).json({ message: 'Book not found' });
       return
    }

    res.json(bookDetails);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export const searchBooks = async (req: Request, res: Response):Promise<void> => {
  try {
    const { query } = req.query;

    if (!query || typeof query !== 'string') {
       res.status(400).json({ message: 'Query parameter is required' });
       return
    }

    const books = await searchBooksFromDB(query);
    res.json({ results: books });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};
