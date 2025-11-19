import express from 'express';
import { createRequire } from 'module';
import cors from 'cors';
import bodyParser from 'body-parser';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Create require for CommonJS modules like sqlite3
const require = createRequire(import.meta.url);
const sqlite3 = require('sqlite3').verbose();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 3001;
const SECRET_KEY = 'jojos-secret-key-change-this-in-prod';

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Database Setup - Use absolute path to avoid CWD issues
const dbPath = join(__dirname, 'jojos.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) console.error('Database opening error: ', err);
  else console.log(`Connected to SQLite database at ${dbPath}`);
});

// Initialize Tables
db.serialize(() => {
  // Users Table
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    name TEXT,
    email TEXT UNIQUE,
    password TEXT,
    isAdmin INTEGER
  )`);

  // Products Table
  db.run(`CREATE TABLE IF NOT EXISTS products (
    id TEXT PRIMARY KEY,
    title TEXT,
    price REAL,
    description TEXT,
    category TEXT,
    stock INTEGER,
    image TEXT,
    rating REAL
  )`);

  // Seed Products if empty
  db.get("SELECT count(*) as count FROM products", [], (err, row) => {
    if (err) return console.error(err);
    if (row && row.count === 0) {
      console.log("Seeding database with initial products...");
      const products = [
        {
          id: '1',
          title: 'Quantum Noise-Canceling Headphones',
          price: 299.99,
          description: 'Experience silence with our top-tier noise cancellation technology.',
          category: 'Electronics',
          stock: 50,
          image: 'https://image.pollinations.ai/prompt/modern%20black%20over-ear%20headphones%20product%20shot',
          rating: 4.8
        },
        {
          id: '2',
          title: 'Ergonomic Mesh Office Chair',
          price: 199.50,
          description: 'Work in comfort with lumbar support and breathable mesh.',
          category: 'Home',
          stock: 20,
          image: 'https://image.pollinations.ai/prompt/ergonomic%20black%20mesh%20office%20chair%20studio%20background',
          rating: 4.5
        },
        {
          id: '3',
          title: 'Minimalist Mechanical Keyboard',
          price: 120.00,
          description: 'Tactile feedback with a sleek, compact design.',
          category: 'Electronics',
          stock: 35,
          image: 'https://image.pollinations.ai/prompt/sleek%20white%20mechanical%20keyboard%20on%20desk',
          rating: 4.7
        },
        {
          id: '4',
          title: 'Smart Fitness Watch Pro',
          price: 249.99,
          description: 'Track your health metrics, sleep, and workouts with precision.',
          category: 'Electronics',
          stock: 100,
          image: 'https://image.pollinations.ai/prompt/smart%20fitness%20watch%20with%20screen%20display',
          rating: 4.6
        },
        {
          id: '5',
          title: 'Premium Cotton Hoodie',
          price: 59.99,
          description: 'Soft, durable, and stylish. Perfect for casual wear.',
          category: 'Fashion',
          stock: 200,
          image: 'https://image.pollinations.ai/prompt/folded%20premium%20grey%20cotton%20hoodie',
          rating: 4.3
        }
      ];

      const stmt = db.prepare("INSERT INTO products (id, title, price, description, category, stock, image, rating) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
      products.forEach(p => {
        stmt.run(p.id, p.title, p.price, p.description, p.category, p.stock, p.image, p.rating);
      });
      stmt.finalize();
    }
  });
});

// --- Routes ---

// Get All Products
app.get('/api/products', (req, res) => {
  db.all("SELECT * FROM products", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Create Product (Admin)
app.post('/api/products', (req, res) => {
  const { id, title, price, description, category, stock, image, rating } = req.body;
  db.run(
    "INSERT INTO products (id, title, price, description, category, stock, image, rating) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
    [id, title, price, description, category, stock, image, rating],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Product created", id });
    }
  );
});

// Update Product (Admin)
app.put('/api/products/:id', (req, res) => {
  const { title, price, description, category, stock, image, rating } = req.body;
  db.run(
    "UPDATE products SET title = ?, price = ?, description = ?, category = ?, stock = ?, image = ?, rating = ? WHERE id = ?",
    [title, price, description, category, stock, image, rating, req.params.id],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Product updated" });
    }
  );
});

// Delete Product (Admin)
app.delete('/api/products/:id', (req, res) => {
  db.run("DELETE FROM products WHERE id = ?", req.params.id, function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Product deleted" });
  });
});

// Register
app.post('/api/auth/register', async (req, res) => {
  const { email, password, name } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const id = Date.now().toString();
    const isAdmin = email.includes('admin') ? 1 : 0;

    db.run(
      "INSERT INTO users (id, name, email, password, isAdmin) VALUES (?, ?, ?, ?, ?)",
      [id, name, email, hashedPassword, isAdmin],
      function (err) {
        if (err) return res.status(400).json({ error: "Email likely already exists" });
        
        const token = jwt.sign({ id, email, isAdmin: !!isAdmin }, SECRET_KEY, { expiresIn: '24h' });
        res.json({ 
          token, 
          user: { id, name, email, isAdmin: !!isAdmin } 
        });
      }
    );
  } catch (e) {
    res.status(500).json({ error: "Registration error" });
  }
});

// Login
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  
  db.get("SELECT * FROM users WHERE email = ?", [email], async (err, user) => {
    if (err) return res.status(500).json({ error: "Server error" });
    if (!user) return res.status(400).json({ error: "User not found" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).json({ error: "Invalid credentials" });

    const isAdmin = user.isAdmin === 1;
    const token = jwt.sign({ id: user.id, email: user.email, isAdmin }, SECRET_KEY, { expiresIn: '24h' });
    
    res.json({ 
      token, 
      user: { id: user.id, name: user.name, email: user.email, isAdmin } 
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
