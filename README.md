# BookNook – Online Book Store (Node.js + Express + MySQL)

A responsive online book store with four pages:

| Page | URL | Purpose |
|------|-----|---------|
| Home | `/` | Hero banner, features, featured books |
| Catalogue | `/catalogue.html` | Search, category filter, sorting, add to cart |
| Login | `/login.html` | Session-based login |
| Registration | `/register.html` | Creates a user (password hashed with bcrypt) in MySQL |

## Project structure

```
bookstore/
├── server.js          Express app entry point
├── db.js              MySQL connection pool
├── schema.sql         Database + tables + 14 sample books
├── routes/
│   ├── auth.js        /api/auth/register, login, logout, me
│   └── books.js       /api/books, /api/books/categories
├── public/
│   ├── index.html, catalogue.html, login.html, register.html
│   ├── css/style.css
│   └── js/app.js, catalogue.js
├── .env.example
└── package.json
```

## Setup in VS Code

1. Install **Node.js (v18+)** and **MySQL Server**. Open this folder in VS Code (`File > Open Folder`).
2. Open the terminal (`Ctrl + ~`) and install packages:
   ```
   npm install
   ```
3. Create the database. In the terminal:
   ```
   mysql -u root -p < schema.sql
   ```
   (Or open `schema.sql` in MySQL Workbench and run it.)
4. Copy `.env.example` to `.env` and put your MySQL password in `DB_PASSWORD`:
   ```
   copy .env.example .env      (Windows)
   cp .env.example .env        (Mac/Linux)
   ```
5. Start the server:
   ```
   npm start
   ```
6. Open http://localhost:3000

## Notes

- Passwords are hashed with `bcryptjs`; all SQL uses parameterised queries.
- The cart is stored in the browser (localStorage) as a simple demo.
- To use MongoDB or Oracle instead, only `db.js` and the two files in `routes/` need to change.
