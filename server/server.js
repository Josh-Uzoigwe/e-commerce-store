import express from 'express';
import { createRequire } from 'module';
import cors from 'cors';
import bodyParser from 'body-parser';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { OAuth2Client } from 'google-auth-library';

// Create require for CommonJS modules like sqlite3
const require = createRequire(import.meta.url);
const sqlite3 = require('sqlite3').verbose();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 3001;
const SECRET_KEY = 'jojos-secret-key-change-this-in-prod';
// NOTE: In a real app, this should match the Client ID used in the frontend
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || "YOUR_GOOGLE_CLIENT_ID"; 
const client = new OAuth2Client(GOOGLE_CLIENT_ID);

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
        },
        {
          id: '6',
          title: 'Wireless Charging Pad',
          price: 29.99,
          description: 'Fast charging for all your Qi-enabled devices.',
          category: 'Electronics',
          stock: 150,
          image: 'https://image.pollinations.ai/prompt/sleek%20round%20wireless%20charging%20pad',
          rating: 4.1
        },
        {
          id: '7',
          title: 'Ceramic Coffee Mug Set',
          price: 35.00,
          description: 'Handcrafted ceramic mugs for your morning brew.',
          category: 'Home',
          stock: 40,
          image: 'https://image.pollinations.ai/prompt/set%20of%20artisanal%20ceramic%20coffee%20mugs',
          rating: 4.9
        },
        {
          id: '8',
          title: 'Yoga Mat Eco-Friendly',
          price: 45.00,
          description: 'Non-slip, sustainable material for perfect poses.',
          category: 'Sports',
          stock: 60,
          image: 'https://image.pollinations.ai/prompt/rolled%20eco-friendly%20yoga%20mat%20texture',
          rating: 4.4
        },
        {
          id: '9',
          title: 'Running Sneakers Air',
          price: 110.00,
          description: 'Lightweight design for marathon runners.',
          category: 'Sports',
          stock: 25,
          image: 'https://image.pollinations.ai/prompt/pair%20of%20modern%20running%20sneakers%20sport',
          rating: 4.5
        },
        {
          id: '10',
          title: 'Sci-Fi Novel Collection',
          price: 80.00,
          description: 'A curated set of the decade\'s best science fiction.',
          category: 'Books',
          stock: 10,
          image: 'https://image.pollinations.ai/prompt/stack%20of%20science%20fiction%20books%20space%20cover',
          rating: 4.8
        },
        {
          id: '11',
          title: 'Vintage Denim Jacket',
          price: 89.99,
          description: 'Classic look that never goes out of style.',
          category: 'Fashion',
          stock: 15,
          image: 'https://image.pollinations.ai/prompt/vintage%20blue%20denim%20jacket%20hanging',
          rating: 4.2
        },
        {
          id: '12',
          title: 'Smart Home Hub',
          price: 149.99,
          description: 'Control all your devices from one central unit.',
          category: 'Home',
          stock: 30,
          image: 'https://image.pollinations.ai/prompt/smart%20home%20hub%20device%20on%20table',
          rating: 4.0
        },
        {
          id: '13',
          title: 'Bluetooth Portable Speaker',
          price: 65.00,
          description: 'Waterproof sound system for outdoor adventures.',
          category: 'Electronics',
          stock: 80,
          image: 'https://image.pollinations.ai/prompt/rugged%20portable%20bluetooth%20speaker%20outdoor',
          rating: 4.3
        },
        {
          id: '14',
          title: 'Leather Wallet',
          price: 45.00,
          description: 'Genuine leather with RFID protection.',
          category: 'Fashion',
          stock: 90,
          image: 'https://image.pollinations.ai/prompt/classic%20brown%20leather%20wallet%20men',
          rating: 4.6
        },
        {
          id: '15',
          title: 'Stainless Steel Water Bottle',
          price: 25.00,
          description: 'Keeps drinks cold for 24 hours.',
          category: 'Sports',
          stock: 120,
          image: 'https://image.pollinations.ai/prompt/sleek%20stainless%20steel%20water%20bottle%20insulated',
          rating: 4.7
        },
        {
          id: '16',
          title: 'Modern Table Lamp',
          price: 55.00,
          description: 'Adjustable brightness with a warm glow.',
          category: 'Home',
          stock: 25,
          image: 'https://image.pollinations.ai/prompt/modern%20minimalist%20table%20lamp%20lit',
          rating: 4.4
        },
        {
          id: '17',
          title: 'Biography of Great Leaders',
          price: 30.00,
          description: 'Inspiring stories from history.',
          category: 'Books',
          stock: 40,
          image: 'https://image.pollinations.ai/prompt/hardcover%20biography%20book%20historical',
          rating: 4.9
        },
        {
          id: '18',
          title: 'Programming Cookbook',
          price: 50.00,
          description: 'Essential algorithms and patterns.',
          category: 'Books',
          stock: 55,
          image: 'https://image.pollinations.ai/prompt/programming%20coding%20textbook%20computer%20science',
          rating: 4.8
        },
        {
          id: '19',
          title: 'Action Camera 4K',
          price: 299.00,
          description: 'Capture your extreme moments in high definition.',
          category: 'Electronics',
          stock: 15,
          image: 'https://image.pollinations.ai/prompt/compact%204k%20action%20camera%20waterproof',
          rating: 4.5
        },
        {
          id: '20',
          title: 'Bamboo Cutlery Set',
          price: 15.00,
          description: 'Reusable and eco-friendly dining.',
          category: 'Home',
          stock: 200,
          image: 'https://image.pollinations.ai/prompt/set%20of%20bamboo%20cutlery%20eco%20friendly',
          rating: 4.2
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

// Google Login
app.post('/api/auth/google', async (req, res) => {
  const { token } = req.body;
  
  try {
    // Verify the ID token using Google's official library
    // Note: In a demo env with a mock ID, this verification will fail.
    // We add a fallback for demonstration if the CLIENT ID is "MOCK..."
    
    let payload;
    
    if (GOOGLE_CLIENT_ID.includes("MOCK")) {
        // Mock payload for demo purposes
        payload = {
            email: "demo.user@gmail.com",
            name: "Demo Google User",
            sub: "mock-google-id-" + Date.now()
        };
    } else {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: GOOGLE_CLIENT_ID,
        });
        payload = ticket.getPayload();
    }

    if (!payload) return res.status(400).json({ error: "Invalid Google Token" });

    const { email, name } = payload;

    db.get("SELECT * FROM users WHERE email = ?", [email], async (err, user) => {
      if (err) return res.status(500).json({ error: "Database error" });

      if (user) {
        // User exists, log them in
        const isAdmin = user.isAdmin === 1;
        const jwtToken = jwt.sign({ id: user.id, email: user.email, isAdmin }, SECRET_KEY, { expiresIn: '24h' });
        res.json({
          token: jwtToken,
          user: { id: user.id, name: user.name, email: user.email, isAdmin }
        });
      } else {
        // New user, create account (Password is irrelevant for Google users, we use a dummy hash or allow nulls, here we use a random hash)
        const id = Date.now().toString();
        const randomPass = Math.random().toString(36).slice(-8);
        const hashedPassword = await bcrypt.hash(randomPass, 10);
        const isAdmin = 0;

        db.run(
          "INSERT INTO users (id, name, email, password, isAdmin) VALUES (?, ?, ?, ?, ?)",
          [id, name, email, hashedPassword, isAdmin],
          function (err) {
            if (err) return res.status(500).json({ error: "Failed to create user" });
            
            const jwtToken = jwt.sign({ id, email, isAdmin: !!isAdmin }, SECRET_KEY, { expiresIn: '24h' });
            res.json({ 
              token: jwtToken, 
              user: { id, name, email, isAdmin: !!isAdmin } 
            });
          }
        );
      }
    });

  } catch (error) {
    console.error("Google Auth Error:", error);
    res.status(401).json({ error: "Google authentication failed" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});