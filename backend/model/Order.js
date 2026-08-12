import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },// type: mongoose.Schema.Types.ObjectId this tells about the data type here ObjectId is the 12 digit hexadecimal string but its not primitive so we have to write it like this nd ref: user tells us that this UserId points to User Collections _id which we passed thorugh controller..
  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
      qty: { type: Number, required: true },
      price: { type: Number, required: true }
    }
  ],
  totalAmount: { type: Number, required: true },
  address: {
    fullName: { type: String, required: true },
    street: { type: String, required: true },
    city: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true }
  },
  paymentId: { type: String },
  status: { type: String, enum: ['Pending', 'Shipped', 'Delivered'], default: 'Pending' },
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);

export default Order;