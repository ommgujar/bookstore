const express = require('express');
const pool = require('../db');

const router = express.Router();

// GET /api/books?search=&category=&sort=
router.get('/', async (req, res, next) => {
  try {
    const { search = '', category = '', sort = 'title' } = req.query;
    const where = [];
    const params = [];

    if (search.trim()) {
      where.push('(title LIKE ? OR author LIKE ?)');
      params.push(`%${search.trim()}%`, `%${search.trim()}%`);
    }
    if (category && category !== 'All') {
      where.push('category = ?');
      params.push(category);
    }

    const orders = {
      title: 'title ASC',
      price_asc: 'price ASC',
      price_desc: 'price DESC',
      newest: 'created_at DESC, id DESC'
    };
    const orderBy = orders[sort] || orders.title;

    const sql =
      'SELECT id, title, author, category, price, description, cover_color, stock FROM books' +
      (where.length ? ' WHERE ' + where.join(' AND ') : '') +
      ' ORDER BY ' + orderBy;

    const [rows] = await pool.query(sql, params);
    res.json({ books: rows });
  } catch (err) {
    next(err);
  }
});

// GET /api/books/categories
router.get('/categories', async (req, res, next) => {
  try {
    const [rows] = await pool.query('SELECT DISTINCT category FROM books ORDER BY category');
    res.json({ categories: rows.map((r) => r.category) });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
