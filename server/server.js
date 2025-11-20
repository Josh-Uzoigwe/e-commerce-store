import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { OAuth2Client } from 'google-auth-library';

const app = express();
const PORT = 3001;
const SECRET_KEY = 'jojos-secret-key-change-this-in-prod';

// MongoDB Connection URI (Default local instance)
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/jojos_store';

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || "YOUR_GOOGLE_CLIENT_ID"; 
const client = new OAuth2Client(GOOGLE_CLIENT_ID);

// Middleware
app.use(cors());
app.use(bodyParser.json());

// --- Mongoose Schemas & Models ---

// User Schema
const userSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true }, // Keeping 'id' string for frontend compatibility
  name: String,
  email: { type: String, required: true, unique: true },
  password: { type: String }, // Nullable for Google Auth users
  isAdmin: { type: Boolean, default: false }
});

const User = mongoose.model('User', userSchema);

// Product Schema
const productSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true }, // Keeping 'id' string for frontend compatibility
  title: { type: String, required: true },
  price: { type: Number, required: true },
  description: String,
  category: String,
  stock: Number,
  image: String,
  rating: Number
});

const Product = mongoose.model('Product', productSchema);

// --- Database Connection & Seeding ---

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log(`✅ Connected to MongoDB at ${MONGO_URI}`);
    seedDatabase();
  })
  .catch(err => console.error('❌ MongoDB connection error:', err));

const seedDatabase = async () => {
  try {
    // Seed Products
    const count = await Product.countDocuments();
    if (count === 0) {
      console.log("Seeding database with initial products...");
      const initialProducts = [
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
      await Product.insertMany(initialProducts);
      console.log("✅ Database seeded with products");
    }

    // Seed Admin User
    const adminEmail = 'admin@jojos.com';
    const existingAdmin = await User.findOne({ email: adminEmail });
    if (!existingAdmin) {
      console.log("Seeding admin user...");
      const hashedPassword = await bcrypt.hash('admin123', 10);
      await User.create({
        id: 'admin-user-id',
        name: 'Jojo Admin',
        email: adminEmail,
        password: hashedPassword,
        isAdmin: true
      });
      console.log("✅ Admin user seeded (admin@jojos.com / admin123)");
    }

  } catch (err) {
    console.error("Seeding error:", err);
  }
};

// --- Routes ---

// Get All Products
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find({}).select('-_id -__v'); // Exclude internal fields
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create Product (Admin)
app.post('/api/products', async (req, res) => {
  try {
    // Frontend sends an ID, but if it doesn't, we generate one
    const productData = req.body;
    if (!productData.id) productData.id = Date.now().toString();
    
    const product = await Product.create(productData);
    res.json({ message: "Product created", id: product.id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update Product (Admin)
app.put('/api/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Product.findOneAndUpdate({ id }, req.body, { upsert: false });
    res.json({ message: "Product updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete Product (Admin)
app.delete('/api/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Product.deleteOne({ id });
    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Register
app.post('/api/auth/register', async (req, res) => {
  try {
    const { email, password, name } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const id = Date.now().toString();
    const isAdmin = email.includes('admin');

    const newUser = await User.create({
      id,
      name,
      email,
      password: hashedPassword,
      isAdmin
    });

    const token = jwt.sign(
      { id: newUser.id, email: newUser.email, isAdmin: newUser.isAdmin }, 
      SECRET_KEY, 
      { expiresIn: '24h' }
    );
    
    res.json({ 
      token, 
      user: { id: newUser.id, name: newUser.name, email: newUser.email, isAdmin: newUser.isAdmin } 
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Registration error" });
  }
});

// Login
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(400).json({ error: "User not found" });

    // Check if password exists (Google users might not have one)
    if (!user.password) return res.status(400).json({ error: "Please login with Google" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).json({ error: "Invalid credentials" });

    const token = jwt.sign(
      { id: user.id, email: user.email, isAdmin: user.isAdmin }, 
      SECRET_KEY, 
      { expiresIn: '24h' }
    );
    
    res.json({ 
      token, 
      user: { id: user.id, name: user.name, email: user.email, isAdmin: user.isAdmin } 
    });
  } catch (e) {
    res.status(500).json({ error: "Login error" });
  }
});

// Google Login
app.post('/api/auth/google', async (req, res) => {
  const { token } = req.body;
  
  try {
    let payload;
    
    if (GOOGLE_CLIENT_ID.includes("MOCK")) {
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

    let user = await User.findOne({ email });

    if (user) {
      // Login existing user
      const token = jwt.sign(
        { id: user.id, email: user.email, isAdmin: user.isAdmin }, 
        SECRET_KEY, 
        { expiresIn: '24h' }
      );
      res.json({
        token,
        user: { id: user.id, name: user.name, email: user.email, isAdmin: user.isAdmin }
      });
    } else {
      // Create new Google user
      const id = Date.now().toString();
      
      user = await User.create({
        id,
        name,
        email,
        password: null, // No password for Google users
        isAdmin: false
      });

      const token = jwt.sign(
        { id: user.id, email: user.email, isAdmin: user.isAdmin }, 
        SECRET_KEY, 
        { expiresIn: '24h' }
      );
      res.json({ 
        token, 
        user: { id: user.id, name: user.name, email: user.email, isAdmin: user.isAdmin } 
      });
    }

  } catch (error) {
    console.error("Google Auth Error:", error);
    res.status(401).json({ error: "Google authentication failed" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});