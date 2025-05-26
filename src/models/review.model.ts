import db from '../config/db';

interface Review {
  user_id: number;
  book_id: number;
  rating: number;
  comment: string;
}

export const createReviewInDB = async (review: Review) => {
  const { user_id, book_id, rating, comment } = review;
  const query = `
    INSERT INTO reviews (user_id, book_id, rating, comment)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
  `;
  const values = [user_id, book_id, rating, comment];
  const result = await db.query(query, values);
  return result.rows[0];
};

interface ReviewUpdate {
  rating?: number;
  comment?: string;
}

export const updateReviewInDB = async (
  reviewId: number,
  userId: number,
  changes: ReviewUpdate
) => {
  // Build dynamic SET clause
  const sets: string[] = [];
  const values: any[] = [];
  let idx = 1;

  if (changes.rating !== undefined) {
    sets.push(`rating = $${idx++}`);
    values.push(changes.rating);
  }
  if (changes.comment !== undefined) {
    sets.push(`comment = $${idx++}`);
    values.push(changes.comment);
  }
  if (sets.length === 0) {
    throw new Error('No fields to update');
  }

  // Always update the updated timestamp if you have one:
  // sets.push(`updated_at = NOW()`);

  // WHERE review id AND ownership
  const query = `
    UPDATE reviews
    SET ${sets.join(', ')}
    WHERE id = $${idx++} AND user_id = $${idx}
    RETURNING *;
  `;
  values.push(reviewId, userId);

  return db.query(query, values);
};





export const deleteReviewByIdFromDB = async (
  reviewId: number,
  userId: number
): Promise<boolean> => {
  const query = `
    DELETE FROM reviews
    WHERE id = $1 AND user_id = $2
    RETURNING *;
  `;

  const result = await db.query(query, [reviewId, userId]);
  return (result.rowCount ?? 0) > 0;
};
