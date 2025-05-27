import { Request } from "express";

export interface ReviewParams {
  id: string;
}

export interface AuthRequest extends Request<ReviewParams> {
  user?: { id: number };
}


export interface Review {
  user_id: number;
  book_id: number;
  rating: number;
  comment: string;
}


export interface ReviewUpdate {
  rating?: number;
  comment?: string;
}

