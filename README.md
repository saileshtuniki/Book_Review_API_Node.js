# 📚 Book Review API – Node.js + TypeScript + PostgreSQL

This is a backend project for a **Book Review API** built using **Node.js**, **Express**, **TypeScript**, and **PostgreSQL**. It allows users to register, login, add books, write reviews, and perform various operations on books and reviews. JWT-based authentication is used to protect sensitive routes.

---

## ✅ Features Implemented

### 🔐 Authentication
- `POST /signup` – Register a new user
- `POST /login` – Authenticate user and return JWT token

### 📘 Book Management
- `POST /books` – Add a new book (Authenticated users only)
- `GET /books` – Get all books (with pagination + optional filters by author/genre)
- `GET /books/:id` – Get book details by ID with average rating and paginated reviews
- `GET /search?query=...` – Search books by title or author (partial and case-insensitive)

### ✍️ Review Management
- `POST /books/:id/reviews` – Submit a review for a book (Authenticated, one review per user per book)
- `PUT /reviews/:id` – Update your own review
- `DELETE /reviews/:id` – Delete your own review

---

## ⚙️ How to Run This Project

### 1. Clone the Repository

```bash
git clone https://github.com/saileshtuniki/Book_Review_API_Node.js.git
cd Book_Review_API_Node.js
