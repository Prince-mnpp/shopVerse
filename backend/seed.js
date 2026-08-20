import mongoose from 'mongoose';
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import User from './model/User.js';
import Product from './model/Product.js';
import { connectDB } from './config/db.js';

dotenv.config();
connectDB();

const importData = async () => {
  try {
    await User.deleteMany();
    await Product.deleteMany();

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('password123', salt);

    await User.create({
      name: 'Admin User',
      email: 'admin@shopnest.com',
      password: hashedPassword,
      role: 'admin'
    });

    const products = [
      // --- CLOTHING (MEN & WOMEN) ---
      {
        name: 'Classic Men Denim Jacket',
        description: 'Timeless trucker denim jacket crafted from 100% durable cotton with button closure.',
        price: 69.99,
        category: 'Clothing',
        stock: 30,
        imageUrl: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=1080&q=80',
        ratings: 4.7,
        numReviews: 85
      },
      {
        name: 'Oversized Cotton Streetwear Hoodie',
        description: 'Heavyweight organic fleece hoodie featuring dropped shoulders and a cozy front pocket.',
        price: 54.50,
        category: 'Clothing',
        stock: 45,
        imageUrl: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1080&q=80',
        ratings: 4.8,
        numReviews: 120
      },
      {
        name: 'Floral Print Summer Sundress',
        description: 'Lightweight breathable rayon dress with a flattering tie-waist and soft ruffle hem.',
        price: 48.00,
        category: 'Clothing',
        stock: 25,
        imageUrl: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=1080&q=80',
        ratings: 4.6,
        numReviews: 64
      },
      {
        name: 'Slim-Fit Chino Trousers',
        description: 'Stretch-cotton khaki chinos designed for seamless office-to-weekend style.',
        price: 42.99,
        category: 'Clothing',
        stock: 40,
        imageUrl: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=1080&q=80',
        ratings: 4.5,
        numReviews: 53
      },
      {
        name: 'Vintage Band Graphic T-Shirt',
        description: 'Soft washed cotton crewneck tee featuring retro screen-printed artwork.',
        price: 29.99,
        category: 'Clothing',
        stock: 60,
        imageUrl: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1080&q=80',
        ratings: 4.4,
        numReviews: 92
      },
      {
        name: 'Formal Tailored Blazer',
        description: 'Sharp single-breasted blazer tailored with structured lapels and interior pockets.',
        price: 129.00,
        category: 'Clothing',
        stock: 18,
        imageUrl: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1080&q=80',
        ratings: 4.9,
        numReviews: 41
      },
      {
        name: 'Ribbed Knit Wool Sweater',
        description: 'Warm blend wool pullover sweater featuring cozy ribbed cuffs and neckline.',
        price: 65.00,
        category: 'Clothing',
        stock: 22,
        imageUrl: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=1080&q=80',
        ratings: 4.7,
        numReviews: 78
      },
      {
        name: 'Athletic Running Shorts',
        description: 'Moisture-wicking gym shorts equipped with built-in compression liner and zipper pocket.',
        price: 34.00,
        category: 'Clothing',
        stock: 50,
        imageUrl: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?auto=format&fit=crop&w=1080&q=80',
        ratings: 4.6,
        numReviews: 110
      },

      // --- FOOTWEAR & ACCESSORIES ---
      {
        name: 'Retro Crimson Running Sneakers',
        description: 'Lightweight breathable mesh sneakers featuring memory foam insoles.',
        price: 89.95,
        category: 'Footwear',
        stock: 28,
        imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1080&q=80',
        ratings: 4.8,
        numReviews: 175
      },
      {
        name: 'Classic White Leather Low-Tops',
        description: 'Minimalist leather sneakers tailored for durable everyday urban wear.',
        price: 75.00,
        category: 'Footwear',
        stock: 35,
        imageUrl: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=1080&q=80',
        ratings: 4.7,
        numReviews: 142
      },
      {
        name: 'All-Terrain Hiking Boots',
        description: 'Waterproof ankle boots equipped with high-traction rubber lugs for wilderness trails.',
        price: 135.00,
        category: 'Footwear',
        stock: 15,
        imageUrl: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1080&q=80',
        ratings: 4.9,
        numReviews: 63
      },
      {
        name: 'Handcrafted Bifold Leather Wallet',
        description: 'Genuine slim leather wallet with RFID blocking layer and multiple card slots.',
        price: 38.00,
        category: 'Fashion Accessories',
        stock: 50,
        imageUrl: 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=1080&q=80',
        ratings: 4.6,
        numReviews: 81
      },
      {
        name: 'Polarized Wayfarer Sunglasses',
        description: '100% UV400 protection lightweight frame with anti-glare scratch-resistant lenses.',
        price: 65.00,
        category: 'Fashion Accessories',
        stock: 45,
        imageUrl: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=1080&q=80',
        ratings: 4.3,
        numReviews: 54
      },
      {
        name: 'Vintage Leather Travel Duffel Bag',
        description: 'Handcrafted full-grain leather duffel bag perfect for weekend getaways.',
        price: 129.00,
        category: 'Fashion Accessories',
        stock: 12,
        imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1080&q=80',
        ratings: 4.8,
        numReviews: 67
      },

      // --- ELECTRONICS & GADGETS ---
      {
        name: 'Ultra-Sharp Smart Watch Series 8',
        description: 'Advanced fitness tracking, AMOLED display, heart rate sensor, and multi-day battery life.',
        price: 199.99,
        category: 'Electronics',
        stock: 25,
        imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1080&q=80',
        ratings: 4.7,
        numReviews: 42
      },
      {
        name: 'Pro Mechanical Gaming Keyboard',
        description: 'Tactile RGB back-lit mechanical keys with anti-ghosting technology and durable frame.',
        price: 119.95,
        category: 'Electronics',
        stock: 30,
        imageUrl: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=1080&q=80',
        ratings: 4.9,
        numReviews: 88
      },
      {
        name: 'Studio Monitor Over-Ear Headphones',
        description: 'Professional high-fidelity audio headphones built for studio tracking and mixing.',
        price: 179.00,
        category: 'Electronics',
        stock: 15,
        imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1080&q=80',
        ratings: 4.8,
        numReviews: 140
      },
      {
        name: 'Active Noise Cancelling Wireless Earbuds',
        description: 'Compact wireless earbuds with immersive spatial sound and IPX5 water resistance.',
        price: 89.99,
        category: 'Electronics',
        stock: 50,
        imageUrl: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=1080&q=80',
        ratings: 4.5,
        numReviews: 95
      },
      {
        name: 'Portable Bluetooth Speaker',
        description: '360-degree deep bass sound speaker with 24-hour battery endurance.',
        price: 59.99,
        category: 'Electronics',
        stock: 40,
        imageUrl: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=1080&q=80',
        ratings: 4.6,
        numReviews: 63
      },
      {
        name: '4K Ultra HD Action Camera',
        description: 'Waterproof sports camera featuring electronic image stabilization and Wi-Fi.',
        price: 149.50,
        category: 'Electronics',
        stock: 18,
        imageUrl: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=1080&q=80',
        ratings: 4.4,
        numReviews: 31
      },
      {
        name: 'Ergonomic Wireless Vertical Mouse',
        description: 'Reduces wrist strain with natural handshake positioning and silent clicks.',
        price: 34.99,
        category: 'Electronics',
        stock: 60,
        imageUrl: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=1080&q=80',
        ratings: 4.3,
        numReviews: 76
      },
      {
        name: 'Ultra-Slim Power Bank 10000mAh',
        description: 'High-speed dual USB charging portable battery bank with temperature safeguards.',
        price: 29.95,
        category: 'Electronics',
        stock: 80,
        imageUrl: 'https://images.unsplash.com/photo-1609592424074-0f2c4e20790b?auto=format&fit=crop&w=1080&q=80',
        ratings: 4.5,
        numReviews: 110
      },
      {
        name: 'Foldable Drone with 4K Camera',
        description: 'GPS auto-return drone with optical flow positioning and real-time FPV transmission.',
        price: 219.00,
        category: 'Electronics',
        stock: 10,
        imageUrl: 'https://images.unsplash.com/photo-1527977966376-1c8408f9f108?auto=format&fit=crop&w=1080&q=80',
        ratings: 4.6,
        numReviews: 53
      },
      {
        name: 'Smart Ambient Desk Light Strip',
        description: 'RGB ambient LED strip compatible with Alexa and Google Assistant with music sync.',
        price: 22.99,
        category: 'Electronics',
        stock: 90,
        imageUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1080&q=80',
        ratings: 4.3,
        numReviews: 119
      },

      // --- BEAUTY, HAIRCARE & PERSONAL CARE ---
      {
        name: 'Minimalist Hair Growth Actives 18% Serum',
        description: 'A powerful scalp serum formulated with Redensyl to reduce hair fall and promote growth.',
        price: 799.00,
        category: 'Haircare',
        stock: 25,
        imageUrl: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=1080&q=80',
        ratings: 4.6,
        numReviews: 128
      },
      {
        name: 'Minimalist Maleic Bond Repair 5% Serum',
        description: 'A leave-in treatment serum designed to repair broken hair bonds and reduce frizz.',
        price: 499.00,
        category: 'Haircare',
        stock: 35,
        imageUrl: 'https://images.unsplash.com/photo-1608248597349-53d69431d155?auto=format&fit=crop&w=1080&q=80',
        ratings: 4.5,
        numReviews: 94
      },
      {
        name: 'Hydrating Botanical Facial Cleanser',
        description: 'Gentle pH-balanced gel cleanser enriched with green tea and chamomile extracts.',
        price: 24.00,
        category: 'Beauty',
        stock: 45,
        imageUrl: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1080&q=80',
        ratings: 4.7,
        numReviews: 82
      },
      {
        name: 'Nourishing Organic Argan Hair Oil',
        description: 'Cold-pressed 100% pure Argan oil to restore shine and deeply hydrate hair ends.',
        price: 18.50,
        category: 'Haircare',
        stock: 55,
        imageUrl: 'https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&w=1080&q=80',
        ratings: 4.8,
        numReviews: 210
      },
      {
        name: 'Rosewater Hydrating Mist Spray',
        description: '100% natural distilled rose petal water that balances skin pH instantly.',
        price: 15.00,
        category: 'Beauty',
        stock: 70,
        imageUrl: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=1080&q=80',
        ratings: 4.4,
        numReviews: 48
      },
      {
        name: 'Detoxifying Mineral Clay Face Mask',
        description: 'Purifying clay mask formulated to unclog pores and absorb excess skin oil.',
        price: 22.00,
        category: 'Beauty',
        stock: 40,
        imageUrl: 'https://images.unsplash.com/photo-1567928269937-ae020b666795?auto=format&fit=crop&w=1080&q=80',
        ratings: 4.5,
        numReviews: 67
      },

      // --- HOME & KITCHEN ---
      {
        name: 'Stainless Steel Pour-Over Coffee Maker',
        description: 'Precision brewing glass carafe with permanent reusable stainless steel filter.',
        price: 39.99,
        category: 'Home & Kitchen',
        stock: 40,
        imageUrl: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?auto=format&fit=crop&w=1080&q=80',
        ratings: 4.6,
        numReviews: 115
      },
      {
        name: 'Ceramic Ultrasonic Essential Oil Diffuser',
        description: 'Quiet cool mist humidifier with 7 LED color light modes and auto shut-off.',
        price: 29.99,
        category: 'Home & Kitchen',
        stock: 60,
        imageUrl: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=1080&q=80',
        ratings: 4.4,
        numReviews: 92
      },
      {
        name: 'Enameled Cast Iron Dutch Oven',
        description: 'Heavy-duty cast iron pot for seamless baking, braising, and slow cooking.',
        price: 89.99,
        category: 'Home & Kitchen',
        stock: 15,
        imageUrl: 'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=1080&q=80',
        ratings: 4.9,
        numReviews: 130
      },
      {
        name: 'Electric Gooseneck Pour-Over Kettle',
        description: 'Variable temperature control kettle engineered for coffee pour-overs.',
        price: 69.95,
        category: 'Home & Kitchen',
        stock: 22,
        imageUrl: 'https://images.unsplash.com/photo-1520970014086-2208d157c9e2?auto=format&fit=crop&w=1080&q=80',
        ratings: 4.7,
        numReviews: 78
      },
      {
        name: 'Solid Organic Bamboo Cutting Board',
        description: 'Eco-friendly bamboo cutting board equipped with deep juice grooves.',
        price: 27.50,
        category: 'Home & Kitchen',
        stock: 50,
        imageUrl: 'https://images.unsplash.com/photo-1590794056226-77ef3a6c474e?auto=format&fit=crop&w=1080&q=80',
        ratings: 4.5,
        numReviews: 43
      },
      {
        name: 'Matte Nordic Ceramic Mug Set',
        description: 'Set of 4 handcrafted matte ceramic mugs with ergonomic handles.',
        price: 34.00,
        category: 'Home & Kitchen',
        stock: 35,
        imageUrl: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1080&q=80',
        ratings: 4.6,
        numReviews: 59
      },
      {
        name: 'HEPA Smart Room Air Purifier',
        description: 'Quiet room air purifier that filters 99.97% of dust, pollen, and allergens.',
        price: 129.99,
        category: 'Home & Kitchen',
        stock: 18,
        imageUrl: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?auto=format&fit=crop&w=1080&q=80',
        ratings: 4.8,
        numReviews: 104
      },
      {
        name: 'Insulated Travel Tumbler 30oz',
        description: 'Keep beverages piping hot or ice-cold for hours with leak-proof straw lid.',
        price: 28.50,
        category: 'Home & Kitchen',
        stock: 55,
        imageUrl: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=1080&q=80',
        ratings: 4.8,
        numReviews: 184
      },
      {
        name: 'Automatic Barista Espresso Machine',
        description: '15-Bar high pressure pump espresso maker with milk frother wand.',
        price: 279.99,
        category: 'Home & Kitchen',
        stock: 8,
        imageUrl: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?auto=format&fit=crop&w=1080&q=80',
        ratings: 4.9,
        numReviews: 162
      },

      // --- FURNITURE ---
      {
        name: 'Ergonomic Mesh Office Chair',
        description: 'Breathable lumbar support chair with adjustable armrests and headrest.',
        price: 249.50,
        category: 'Furniture',
        stock: 18,
        imageUrl: 'https://images.unsplash.com/photo-1505797149-43b0069ec26b?auto=format&fit=crop&w=1080&q=80',
        ratings: 4.5,
        numReviews: 31
      },
      {
        name: 'Minimalist Wooden Desk Lamp',
        description: 'Adjustable solid wooden table lamp featuring warm eye-care LED lighting.',
        price: 45.00,
        category: 'Furniture',
        stock: 30,
        imageUrl: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1080&q=80',
        ratings: 4.7,
        numReviews: 49
      },
      {
        name: 'Mid-Century Velvet Accent Chair',
        description: 'Plush velvet armchair anchored by sturdy tapered metallic gold legs.',
        price: 189.00,
        category: 'Furniture',
        stock: 10,
        imageUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1080&q=80',
        ratings: 4.8,
        numReviews: 27
      },
      {
        name: 'Electric Standing Desk Frame',
        description: 'Motorized height-adjustable desk frame with programmable memory presets.',
        price: 299.00,
        category: 'Furniture',
        stock: 14,
        imageUrl: 'https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?auto=format&fit=crop&w=1080&q=80',
        ratings: 4.9,
        numReviews: 83
      },

      // --- SPORTS & FITNESS ---
      {
        name: 'Non-Slip Eco TPE Yoga Mat',
        description: 'Extra thick high-density TPE yoga mat with body alignment guidelines.',
        price: 36.99,
        category: 'Sports',
        stock: 45,
        imageUrl: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?auto=format&fit=crop&w=1080&q=80',
        ratings: 4.6,
        numReviews: 91
      },
      {
        name: 'Adjustable Dumbbell Set',
        description: 'Space-saving compact fast-adjust dumbbell system for home strength training.',
        price: 159.00,
        category: 'Sports',
        stock: 12,
        imageUrl: 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=1080&q=80',
        ratings: 4.7,
        numReviews: 112
      },
      {
        name: 'Heavy-Duty Resistance Bands Set',
        description: '5 color-coded latex exercise bands with handles, door anchor, and bag.',
        price: 19.99,
        category: 'Sports',
        stock: 60,
        imageUrl: 'https://images.unsplash.com/photo-1598289431512-b97b0917affc?auto=format&fit=crop&w=1080&q=80',
        ratings: 4.4,
        numReviews: 74
      },
      {
        name: 'Pro Deep Tissue Massage Gun',
        description: 'Percussion muscle massager equipped with 6 interchangeable heads.',
        price: 79.99,
        category: 'Sports',
        stock: 20,
        imageUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=1080&q=80',
        ratings: 4.8,
        numReviews: 145
      },

      // --- STATIONERY ---
      {
        name: 'Hardcover Bullet Dot Grid Journal',
        description: '160 GSM thick bleed-proof paper notebook with inner pocket and ribbon.',
        price: 18.99,
        category: 'Stationery',
        stock: 50,
        imageUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1080&q=80',
        ratings: 4.8,
        numReviews: 142
      },
      {
        name: 'Pastel Fineliner Pens (Set of 12)',
        description: 'Quick-drying water-based fine point markers ideal for journaling.',
        price: 14.99,
        category: 'Stationery',
        stock: 65,
        imageUrl: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=1080&q=80',
        ratings: 4.5,
        numReviews: 89
      },
      {
        name: 'Vintage Brass Fountain Pen',
        description: 'Heavy metallic brass fountain pen with smooth stainless fine nib.',
        price: 29.50,
        category: 'Stationery',
        stock: 25,
        imageUrl: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?auto=format&fit=crop&w=1080&q=80',
        ratings: 4.7,
        numReviews: 38
      }
    ];

    const insertedProducts = await Product.insertMany(products);

    console.log(`✅ Successfully seeded ${insertedProducts.length} unique products!`);
    process.exit();
  } catch (error) {
    console.error(`❌ Error with data import: ${error.message}`);
    process.exit(1);
  }
};

importData();