import Order from "../model/Order.js";
import { sendEmail } from "../utils/sendEmail.js";

export const addOrderItems = async(req, res) => {
  try {
    const { items, totalAmount, address, paymentId} = req.body;
    if(items && items.length === 0){
      return res.status(400).json({ message : "No order items"});
    }
    else{
      const order = new Order({
        userId: req.user._id,
        items,
        totalAmount,
        address,
        paymentId
      });
      const createdOrder = await order.save();

      //send order confirmation message
      const message =  `
        <h2>Order Confirmation</h2>
        <p>Hello ${req.user.name},</p>
        <p>Your order has been successfully placed! Order ID: <strong>${createdOrder._id}</strong></p>
        <p>Total Amount Paid: $${totalAmount.toFixed(2)}</p>
        <p>It will be shipped to: ${address.street}, ${address.city}</p>
        <p>Thank you for shopping with ShopNest!</p>
      `;
      console.log(req.user.email, req.user.name);

      await sendEmail({
        email: req.user.email,
        subject: 'ShopNest - Order Confirmation',
        message
      });

      res.status(201).json(createdOrder);
        
    }
  } catch (error) {
    res.status(500).json({message: error.message});
  }
};

export const getMyorders = async(req, res) => {
  try{
    const orders = await Order.find({ userId: req.user._id});
    res.json(orders);
  }
  catch(err){
    res.status(500).json({message: err.message});
  }
};

export const getOrders = async(req, res) => {
  try {
    const orders = await Order.find({}).populate('userId', 'id name'); // userId becomes like "userId": {
      //"_id": "65f1a2b3c4d5e6f7a8b9c000",
      //"name": "Prince"
    //},
    res.json(Orders);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
};

export const updateOrderStatus = async(req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if(order){
      order.status = req.body.status || order.status;
      const updatedOrder = await order.save();
      res.json(updatedOrder);
    }
    else{
      res.status(404).json({message: 'Order not found'});
    }
  } catch (error) {
    res.status(500).json({message: error.message});
  }
}