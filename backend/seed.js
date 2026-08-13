import dotenv from "dotenv";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import Product from "./model/Product.js";
import User from "./model/User.js";
import Order from "./model/Order.js";

// Load MONGO_URI from backend/.env when this file is run directly.
dotenv.config();

const products = [
  {
    name: "Wireless Bluetooth Headphones",
    description: "Over-ear headphones with 30-hour battery life and noise isolation.",
    price: 2499,
    category: "Electronics",
    stock: 25,
    imageUrl: "https://placehold.co/600x600?text=Headphones",
    rating: 4.5,
    numReviews: 18,
  },
  {
    name: "Classic Cotton T-Shirt",
    description: "Soft, regular-fit cotton t-shirt for everyday wear.",
    price: 699,
    category: "Fashion",
    stock: 50,
    imageUrl: "https://placehold.co/600x600?text=T-Shirt",
    rating: 4.2,
    numReviews: 12,
  },
  {
    name: "Stainless Steel Water Bottle",
    description: "Insulated 750 ml bottle that keeps drinks cold or hot for hours.",
    price: 899,
    category: "Home & Kitchen",
    stock: 40,
    imageUrl: "https://placehold.co/600x600?text=Water+Bottle",
    rating: 4.7,
    numReviews: 31,
  },
  {
    name: "Mechanical Gaming Keyboard",
    description: "Compact RGB mechanical keyboard with tactile switches.",
    price: 3499,
    category: "Electronics",
    stock: 15,
    imageUrl: "https://placehold.co/600x600?text=Keyboard",
    rating: 4.6,
    numReviews: 24,
  },
];

const users = [
  { name: "Admin User", email: "admin@shopnest.test", role: "admin" },
  { name: "Aarav Sharma", email: "aarav@shopnest.test", role: "user" },
  { name: "Meera Patel", email: "meera@shopnest.test", role: "user" },
];

const address = {
  fullName: "Aarav Sharma",
  street: "42 Market Road",
  city: "New Delhi",
  postalCode: "110001",
  country: "India",
};

async function seedDatabase() {
  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI is missing. Add it to backend/.env before running the seed script.");
  }

  // If the URI has no database path, MongoDB otherwise uses a database named
  // "test". DB_NAME lets you override this without putting a name in the URI.
  const dbName = process.env.DB_NAME || "shopnest";
  await mongoose.connect(process.env.MONGO_URI, {
    dbName,
    serverSelectionTimeoutMS: 10_000,
  });
  console.log(`Connected to MongoDB database: ${mongoose.connection.name}`);

  // Upsert makes this safe to run more than once and creates the database on
  // the first insert (MongoDB creates databases lazily).
  const operations = products.map((product) => ({
    updateOne: {
      filter: { name: product.name },
      update: { $setOnInsert: product },
      upsert: true,
    },
  }));

  const productResult = await Product.bulkWrite(operations);
  console.log(
    `Products: ${productResult.upsertedCount} added, ${productResult.matchedCount} already existed.`
  );

  // All seeded accounts use this password. It is hashed before insertion, just
  // like registered accounts, and is not overwritten on later seed runs.
  const password = await bcrypt.hash("Password@123", 10);
  const userResult = await User.bulkWrite(
    users.map((user) => ({
      updateOne: {
        filter: { email: user.email },
        update: {
          $setOnInsert: { ...user, password, verified: true },
        },
        upsert: true,
      },
    }))
  );
  console.log(`Users: ${userResult.upsertedCount} added, ${userResult.matchedCount} already existed.`);

  const seededProducts = await Product.find({ name: { $in: products.map((product) => product.name) } });
  const seededUsers = await User.find({ email: { $in: users.map((user) => user.email) } });
  const productsByName = new Map(seededProducts.map((product) => [product.name, product]));
  const usersByEmail = new Map(seededUsers.map((user) => [user.email, user]));

  if (productsByName.size !== products.length || usersByEmail.size !== users.length) {
    throw new Error("Could not load all seeded users and products to create orders.");
  }

  const orders = [
    {
      paymentId: "seed-payment-001",
      userId: usersByEmail.get("aarav@shopnest.test")._id,
      items: [
        {
          productId: productsByName.get("Wireless Bluetooth Headphones")._id,
          qty: 1,
          price: 2499,
        },
        {
          productId: productsByName.get("Stainless Steel Water Bottle")._id,
          qty: 2,
          price: 899,
        },
      ],
      totalAmount: 4297,
      address,
      status: "Shipped",
    },
    {
      paymentId: "seed-payment-002",
      userId: usersByEmail.get("meera@shopnest.test")._id,
      items: [
        {
          productId: productsByName.get("Mechanical Gaming Keyboard")._id,
          qty: 1,
          price: 3499,
        },
      ],
      totalAmount: 3499,
      address: { ...address, fullName: "Meera Patel", city: "Mumbai", postalCode: "400001" },
      status: "Pending",
    },
  ];

  const orderResult = await Order.bulkWrite(
    orders.map((order) => ({
      updateOne: {
        filter: { paymentId: order.paymentId },
        update: { $setOnInsert: order },
        upsert: true,
      },
    }))
  );
  console.log(`Orders: ${orderResult.upsertedCount} added, ${orderResult.matchedCount} already existed.`);
}

seedDatabase()
  .catch((error) => {
    console.error("Seeding failed:", error.message);
    process.exitCode = 1;
  })
  .finally(async () => {
    await mongoose.disconnect();
  });
