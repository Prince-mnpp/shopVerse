import mongoose from "mongoose";

export const connectDB = async() => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log("mongo db connection setup successfull");
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};