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

```
### Install Dependencies
npm install

### setup your .env
npm run dev

### Set Up Environment Variables
PORT=5000
DB_HOST=localhost
DB_PORT=5432
DB_USER=your_postgres_user
DB_PASSWORD=your_postgres_password
DB_NAME=your_db_name
JWT_SECRET=your_jwt_secret_key


### Set Up Database
Run the SQL scripts in src/sql/tables.sql to create the necessary tables.

### Start the Server
npm run dev

### The server will run on:
http://localhost:5000

### 🔗 API Endpoints Summary (Include curl/Postman examples)

| Method | Endpoint             | Description                           | Auth Required |
| ------ | -------------------- | ------------------------------------- | ------------- |
| POST   | `/signup`            | Register a new user                   | ❌             |
| POST   | `/login`             | Login and get JWT token               | ❌             |
| POST   | `/books`             | Add a new book                        | ✅             |
| GET    | `/books`             | Get all books with filters/pagination | ❌             |
| GET    | `/books/:id`         | Get book details, avg rating, reviews | ❌             |
| GET    | `/search?query=term` | Search books by title or author       | ❌             |
| POST   | `/books/:id/reviews` | Submit review for book                | ✅             |
| PUT    | `/reviews/:id`       | Update your review                    | ✅             |
| DELETE | `/reviews/:id`       | Delete your own review                | ✅             |


### 🗂️ Project Structure

src/
│
├── config/           # Database config
├── controllers/      # Request handlers
├── middleware/       # JWT middleware
├── models/           # DB queries and logic
├── routes/           # Route declarations
├── sql/              # SQL scripts for DB setup
├── index.ts          # Entry point
└── tsconfig.json     # TypeScript config


### 👨‍💻 Author
@saileshtuniki
### 📝 License
This project is for educational purposes only.

```