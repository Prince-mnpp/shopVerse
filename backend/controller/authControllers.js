import jwt from "jsonwebtoken";
import User from "../model/User.js";
import bcrypt from "bcrypt";
import { sendEmail } from "../utils/sendEmail.js";

export const generateToken = (id) => {
  return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn : '7d'});
}

export const registerUser = async(req, res) => {
  const { name, email, password } = req.body;
  console.log("aagya 0")
  try {
    const existingUser = await User.findOne({email});
    console.log("AAGYA 1");
    if(existingUser){
      return res.status(400).json({message: 'user already exists'});
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({name, email, password: hashedPassword});
    if(user){
      const otp = Math.floor(100000 + Math.random() * 900000).toString();

      const message = `Welcome to ShopVerse, ${name}!
      Your otp for registration is ${otp}`;

      await sendEmail(email, `Welcome to shopVerse - your otp for registration`, message);
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      });
    }
    else {
      res.status(400).json({ message: "Invalid user data"});
    }
    
  } catch (error) {
    res.status(500).json({message: 'error occured on register User at authControllers'});
  }
}
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = User.findOne({ email });
    if(user && (await bcrypt.compare(password, user.password))){
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      });
    }
    else{
      res.status(400).json({message: "Invalid email or password"});
    }
  } catch (error) {
    res.status(500).json({message : "Server error while login"});
  }
};
export const getUsers = async(req, res) => {
  try{
    const users = await User.find({}).select('-password');
    res.json(users);
  }
  catch(err){
    res.status(500).json({message: 'Server error'});
  }
}