import mongoose from 'mongoose';
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import User from './model/User';
import Product from './model/Product';
import { connectDB } from './config/db';

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await User.deleteMany();
    await Product.deleteMany();

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('password123', salt);
    
    const adminUser = await User.create({
      name: 'Admin User',
      email: 'admin@shopnest.com',
      password: hashedPassword,
      role: 'admin'
    });

    const products = [
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
        name: 'Ergonomic Mesh Office Chair',
        description: 'Breathable lumbar support chair designed for all-day comfort with adjustable armrests.',
        price: 249.50,
        category: 'Furniture',
        stock: 18,
        imageUrl: 'https://images.unsplash.com/photo-1580481072645-022f9a6d1296?auto=format&fit=crop&w=1080&q=80',
        ratings: 4.5,
        numReviews: 31
      },
      {
        name: 'Vintage Leather Travel Duffel Bag',
        description: 'Handcrafted full-grain leather duffel bag perfect for weekend getaways and carry-on travel.',
        price: 129.00,
        category: 'Fashion',
        stock: 12,
        imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1080&q=80',
        ratings: 4.8,
        numReviews: 67
      },
      {
        name: 'Stainless Steel Pour-Over Coffee Maker',
        description: 'Precision brewing glass carafe with permanent reusable stainless steel mesh filter.',
        price: 39.99,
        category: 'Home & Kitchen',
        stock: 40,
        imageUrl: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?auto=format&fit=crop&w=1080&q=80',
        ratings: 4.6,
        numReviews: 115
      },
      {
        name: 'Pro Mechanical Gaming Keyboard',
        description: 'Tactile RGB back-lit mechanical keys with anti-ghosting technology and durable aluminum frame.',
        price: 119.95,
        category: 'Electronics',
        stock: 30,
        imageUrl: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=1080&q=80',
        ratings: 4.9,
        numReviews: 88
      },
      {
        name: 'Polarized Wayfarer Sunglasses',
        description: '100% UV400 protection lightweight frame with anti-glare polarized scratch-resistant lenses.',
        price: 65.00,
        category: 'Fashion',
        stock: 45,
        imageUrl: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=1080&q=80',
        ratings: 4.3,
        numReviews: 54
      },
      {
        name: 'Aromatherapy Ceramic Essential Oil Diffuser',
        description: 'Quiet ultrasonic cool mist humidifier with 7 color LED light modes and automatic shut-off.',
        price: 29.99,
        category: 'Home & Kitchen',
        stock: 60,
        imageUrl: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=1080&q=80',
        ratings: 4.4,
        numReviews: 92
      },
      {
        name: 'Studio Monitor Over-Ear Headphones',
        description: 'Professional high-fidelity audio headphones built for studio tracking, mixing, and critical listening.',
        price: 179.00,
        category: 'Electronics',
        stock: 15,
        imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1080&q=80',
        ratings: 4.8,
        numReviews: 140
      }
    ];

    await Product.insertMany(products);
    
    console.log('✅ Data Imported Successfully!');
    process.exit();
  } catch (error) {
    console.error(`❌ Error with data import: ${error.message}`);
    process.exit(1);
  }
};

importData();