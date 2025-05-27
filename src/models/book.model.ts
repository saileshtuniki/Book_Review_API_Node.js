import db from '../config/db';
import {Book} from '../interfaces/book.interfaces';


export const createBookInDB = async (book: Book) => {
  const { title, author, genre } = book;
  const result = await db.query(
    `INSERT INTO books (title, author, genre)
     VALUES ($1, $2, $3)
     RETURNING *;`,
    [title, author, genre]
  );
  return result.rows[0];
};


export const getBooksFromDB = async (
  limit: number,
  offset: number,
  author?: string,
  genre?: string
) => {
  let query = 'SELECT * FROM books WHERE 1=1';
  const values: any[] = [];

  if (author) {
    values.push(`%${author}%`);
    query += ` AND author ILIKE $${values.length}`;
  }

  if (genre) {
    values.push(`%${genre}%`);
    query += ` AND genre ILIKE $${values.length}`;
  }

  values.push(limit);
  values.push(offset);
  query += ` ORDER BY created_at DESC LIMIT $${values.length - 1} OFFSET $${values.length}`;

  const result = await db.query(query, values);
  return result.rows;
};


export const getBookDetailsFromDB = async (
  bookId: number,
  limit: number,
  offset: number
) => {
  const bookQuery = `
    SELECT *, 
      (SELECT ROUND(AVG(rating), 2) FROM reviews WHERE book_id = $1) AS average_rating
    FROM books
    WHERE id = $1;
  `;

  const bookResult = await db.query(bookQuery, [bookId]);
  const book = bookResult.rows[0];

  if (!book) return null;

  const reviewsQuery = `
    SELECT r.*, u.username
    FROM reviews r
    JOIN users u ON r.user_id = u.id
    WHERE r.book_id = $1
    ORDER BY r.created_at DESC
    LIMIT $2 OFFSET $3;
  `;

  const reviewsResult = await db.query(reviewsQuery, [bookId, limit, offset]);

  return {
    book,
    reviews: reviewsResult.rows,
    pagination: {
      page: offset / limit + 1,
      limit,
    },
  };
};

export const searchBooksFromDB = async (searchQuery: string) => {
  const query = `
    SELECT * FROM books
    WHERE LOWER(title) LIKE LOWER($1) OR LOWER(author) LIKE LOWER($1)
  `;
  const values = [`%${searchQuery}%`];
  const result = await db.query(query, values);
  return result.rows;
};


