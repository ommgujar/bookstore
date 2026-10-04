CREATE DATABASE IF NOT EXISTS bookstore;
USE bookstore;

DROP TABLE IF EXISTS books;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE books (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  author VARCHAR(120) NOT NULL,
  category VARCHAR(60) NOT NULL,
  price DECIMAL(8,2) NOT NULL,
  description TEXT,
  cover_color VARCHAR(7) DEFAULT '#3b5bdb',
  stock INT DEFAULT 10,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO books (title, author, category, price, description, cover_color, stock) VALUES
('The Alchemist', 'Paulo Coelho', 'Fiction', 299.00, 'A shepherd boy journeys in search of treasure and his personal legend.', '#e8590c', 25),
('To Kill a Mockingbird', 'Harper Lee', 'Fiction', 349.00, 'A classic story of justice and childhood in the American South.', '#2b8a3e', 18),
('The God of Small Things', 'Arundhati Roy', 'Fiction', 399.00, 'A family saga set in Kerala that won the Booker Prize.', '#c2255c', 12),
('Atomic Habits', 'James Clear', 'Self-Help', 499.00, 'Tiny changes that deliver remarkable results.', '#1971c2', 40),
('Deep Work', 'Cal Newport', 'Self-Help', 450.00, 'Rules for focused success in a distracted world.', '#5f3dc4', 22),
('Sapiens', 'Yuval Noah Harari', 'History', 550.00, 'A brief history of humankind.', '#e67700', 30),
('The Discovery of India', 'Jawaharlal Nehru', 'History', 420.00, 'A sweeping account of Indian history and culture.', '#9c36b5', 15),
('Clean Code', 'Robert C. Martin', 'Technology', 899.00, 'A handbook of agile software craftsmanship.', '#0b7285', 20),
('The Pragmatic Programmer', 'Andrew Hunt, David Thomas', 'Technology', 950.00, 'Your journey to mastery as a developer.', '#364fc7', 16),
('You Don''t Know JS Yet', 'Kyle Simpson', 'Technology', 650.00, 'A deep dive into the core mechanisms of JavaScript.', '#f08c00', 14),
('A Brief History of Time', 'Stephen Hawking', 'Science', 399.00, 'From the Big Bang to black holes.', '#1864ab', 28),
('Cosmos', 'Carl Sagan', 'Science', 475.00, 'A personal voyage through the universe.', '#0c8599', 17),
('Wings of Fire', 'A. P. J. Abdul Kalam', 'Biography', 275.00, 'The autobiography of India''s Missile Man.', '#d9480f', 35),
('Becoming', 'Michelle Obama', 'Biography', 599.00, 'A memoir of the former First Lady of the United States.', '#862e9c', 19);
