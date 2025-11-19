import { Product, ProductCategory } from './types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: '1',
    title: 'Quantum Noise-Canceling Headphones',
    price: 299.99,
    description: 'Experience silence with our top-tier noise cancellation technology.',
    category: ProductCategory.ELECTRONICS,
    stock: 50,
    image: 'https://image.pollinations.ai/prompt/modern%20black%20over-ear%20headphones%20product%20shot',
    rating: 4.8
  },
  {
    id: '2',
    title: 'Ergonomic Mesh Office Chair',
    price: 199.50,
    description: 'Work in comfort with lumbar support and breathable mesh.',
    category: ProductCategory.HOME,
    stock: 20,
    image: 'https://image.pollinations.ai/prompt/ergonomic%20black%20mesh%20office%20chair%20studio%20background',
    rating: 4.5
  },
  {
    id: '3',
    title: 'Minimalist Mechanical Keyboard',
    price: 120.00,
    description: 'Tactile feedback with a sleek, compact design.',
    category: ProductCategory.ELECTRONICS,
    stock: 35,
    image: 'https://image.pollinations.ai/prompt/sleek%20white%20mechanical%20keyboard%20on%20desk',
    rating: 4.7
  },
  {
    id: '4',
    title: 'Smart Fitness Watch Pro',
    price: 249.99,
    description: 'Track your health metrics, sleep, and workouts with precision.',
    category: ProductCategory.ELECTRONICS,
    stock: 100,
    image: 'https://image.pollinations.ai/prompt/smart%20fitness%20watch%20with%20screen%20display',
    rating: 4.6
  },
  {
    id: '5',
    title: 'Premium Cotton Hoodie',
    price: 59.99,
    description: 'Soft, durable, and stylish. Perfect for casual wear.',
    category: ProductCategory.FASHION,
    stock: 200,
    image: 'https://image.pollinations.ai/prompt/folded%20premium%20grey%20cotton%20hoodie',
    rating: 4.3
  },
  {
    id: '6',
    title: 'Wireless Charging Pad',
    price: 29.99,
    description: 'Fast charging for all your Qi-enabled devices.',
    category: ProductCategory.ELECTRONICS,
    stock: 150,
    image: 'https://image.pollinations.ai/prompt/sleek%20round%20wireless%20charging%20pad',
    rating: 4.1
  },
  {
    id: '7',
    title: 'Ceramic Coffee Mug Set',
    price: 35.00,
    description: 'Handcrafted ceramic mugs for your morning brew.',
    category: ProductCategory.HOME,
    stock: 40,
    image: 'https://image.pollinations.ai/prompt/set%20of%20artisanal%20ceramic%20coffee%20mugs',
    rating: 4.9
  },
  {
    id: '8',
    title: 'Yoga Mat Eco-Friendly',
    price: 45.00,
    description: 'Non-slip, sustainable material for perfect poses.',
    category: ProductCategory.SPORTS,
    stock: 60,
    image: 'https://image.pollinations.ai/prompt/rolled%20eco-friendly%20yoga%20mat%20texture',
    rating: 4.4
  },
  {
    id: '9',
    title: 'Running Sneakers Air',
    price: 110.00,
    description: 'Lightweight design for marathon runners.',
    category: ProductCategory.SPORTS,
    stock: 25,
    image: 'https://image.pollinations.ai/prompt/pair%20of%20modern%20running%20sneakers%20sport',
    rating: 4.5
  },
  {
    id: '10',
    title: 'Sci-Fi Novel Collection',
    price: 80.00,
    description: 'A curated set of the decade\'s best science fiction.',
    category: ProductCategory.BOOKS,
    stock: 10,
    image: 'https://image.pollinations.ai/prompt/stack%20of%20science%20fiction%20books%20space%20cover',
    rating: 4.8
  },
  {
    id: '11',
    title: 'Vintage Denim Jacket',
    price: 89.99,
    description: 'Classic look that never goes out of style.',
    category: ProductCategory.FASHION,
    stock: 15,
    image: 'https://image.pollinations.ai/prompt/vintage%20blue%20denim%20jacket%20hanging',
    rating: 4.2
  },
  {
    id: '12',
    title: 'Smart Home Hub',
    price: 149.99,
    description: 'Control all your devices from one central unit.',
    category: ProductCategory.HOME,
    stock: 30,
    image: 'https://image.pollinations.ai/prompt/smart%20home%20hub%20device%20on%20table',
    rating: 4.0
  },
  {
    id: '13',
    title: 'Bluetooth Portable Speaker',
    price: 65.00,
    description: 'Waterproof sound system for outdoor adventures.',
    category: ProductCategory.ELECTRONICS,
    stock: 80,
    image: 'https://image.pollinations.ai/prompt/rugged%20portable%20bluetooth%20speaker%20outdoor',
    rating: 4.3
  },
  {
    id: '14',
    title: 'Leather Wallet',
    price: 45.00,
    description: 'Genuine leather with RFID protection.',
    category: ProductCategory.FASHION,
    stock: 90,
    image: 'https://image.pollinations.ai/prompt/classic%20brown%20leather%20wallet%20men',
    rating: 4.6
  },
  {
    id: '15',
    title: 'Stainless Steel Water Bottle',
    price: 25.00,
    description: 'Keeps drinks cold for 24 hours.',
    category: ProductCategory.SPORTS,
    stock: 120,
    image: 'https://image.pollinations.ai/prompt/sleek%20stainless%20steel%20water%20bottle%20insulated',
    rating: 4.7
  },
  {
    id: '16',
    title: 'Modern Table Lamp',
    price: 55.00,
    description: 'Adjustable brightness with a warm glow.',
    category: ProductCategory.HOME,
    stock: 25,
    image: 'https://image.pollinations.ai/prompt/modern%20minimalist%20table%20lamp%20lit',
    rating: 4.4
  },
  {
    id: '17',
    title: 'Biography of Great Leaders',
    price: 30.00,
    description: 'Inspiring stories from history.',
    category: ProductCategory.BOOKS,
    stock: 40,
    image: 'https://image.pollinations.ai/prompt/hardcover%20biography%20book%20historical',
    rating: 4.9
  },
  {
    id: '18',
    title: 'Programming Cookbook',
    price: 50.00,
    description: 'Essential algorithms and patterns.',
    category: ProductCategory.BOOKS,
    stock: 55,
    image: 'https://image.pollinations.ai/prompt/programming%20coding%20textbook%20computer%20science',
    rating: 4.8
  },
  {
    id: '19',
    title: 'Action Camera 4K',
    price: 299.00,
    description: 'Capture your extreme moments in high definition.',
    category: ProductCategory.ELECTRONICS,
    stock: 15,
    image: 'https://image.pollinations.ai/prompt/compact%204k%20action%20camera%20waterproof',
    rating: 4.5
  },
  {
    id: '20',
    title: 'Bamboo Cutlery Set',
    price: 15.00,
    description: 'Reusable and eco-friendly dining.',
    category: ProductCategory.HOME,
    stock: 200,
    image: 'https://image.pollinations.ai/prompt/set%20of%20bamboo%20cutlery%20eco%20friendly',
    rating: 4.2
  }
];