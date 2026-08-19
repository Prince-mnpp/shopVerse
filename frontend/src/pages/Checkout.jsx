import React, { useState, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { clearCart } from '../redux/cartSlice';

const Checkout = () => {
  const { user } = useContext(AuthContext);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [address, setAddress] = useState({
    fullName: '',
    street: '',
    city: '',
    postalCode: '',
    country: ''
  });

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * (item.qty || 1), 0);

  const handlePayment = async () => {
    try {
      // 1. Create order on backend
      const orderRes = await fetch('/api/payment/order', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user?.token}`
        },
        body: JSON.stringify({ amount: totalPrice })
      });

      const orderData = await orderRes.json();

      // Fallback if Razorpay API fails or credentials are unconfigured
      if (!orderRes.ok) {
        const fallback = window.confirm(
          "Razorpay order initialization failed on backend. Proceed with Student Bypass Mode to place a test order?"
        );
        if (fallback) {
          return bypassPayment();
        } else {
          return alert("Payment initialization canceled.");
        }
      }

      // 2. Razorpay Checkout options
      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID || 'rzp_test_dummykey123',
        amount: orderData.amount,
        currency: orderData.currency || 'INR',
        name: 'ShopVerse',
        description: 'Order Checkout',
        order_id: orderData.id,
        handler: async function (response) {
          // 3. Verify payment signature on backend
          const verifyRes = await fetch('/api/payment/verify', {
            method: 'POST',
            headers: { 
              'Content-Type': 'application/json',
              Authorization: `Bearer ${user?.token}`
            },
            body: JSON.stringify(response)
          });

          if (verifyRes.ok) {
            await createFinalOrder(response.razorpay_payment_id);
          } else {
            alert('Payment verification failed.');
          }
        },
        prefill: {
          name: address.fullName,
          email: user?.email,
          contact: '9999999999'
        },
        theme: {
          color: '#f97316'
        }
      };

      // Ensure Razorpay SDK script is loaded on window
      if (!window.Razorpay) {
        alert("Razorpay SDK failed to load. Are you connected to the internet?");
        return;
      }

      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.error('Checkout Error:', error);
      alert('An unexpected error occurred during checkout.');
    }
  };

  const createFinalOrder = async (paymentId) => {
    const saveOrderRes = await fetch('/api/orders', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user?.token}`
      },
      body: JSON.stringify({
        orderItems: cartItems,
        totalPrice: totalPrice,
        shippingAddress: address,
        paymentMethod: 'Razorpay',
        paymentId
      })
    });

    if (saveOrderRes.ok) {
      dispatch(clearCart());
      navigate('/ordersuccess');
    } else {
      alert('Failed to save order details to database.');
    }
  };

  const bypassPayment = async () => {
    await createFinalOrder('bypass_txn_' + Date.now());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user) {
      alert("Please login first to complete your checkout.");
      navigate('/login');
      return;
    }
    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    handlePayment();
  };

  return (
    <div className="checkout-container">
      <h2>ShopVerse Checkout</h2>
      <div className="checkout-content">
        <form onSubmit={handleSubmit} className="shipping-form">
          <h3>Shipping Address</h3>
          <input 
            type="text" 
            placeholder="Full Name" 
            required 
            value={address.fullName} 
            onChange={(e) => setAddress({...address, fullName: e.target.value})} 
          />
          <input 
            type="text" 
            placeholder="Street Address" 
            required 
            value={address.street} 
            onChange={(e) => setAddress({...address, street: e.target.value})} 
          />
          <input 
            type="text" 
            placeholder="City" 
            required 
            value={address.city} 
            onChange={(e) => setAddress({...address, city: e.target.value})} 
          />
          <input 
            type="text" 
            placeholder="Postal Code" 
            required 
            value={address.postalCode} 
            onChange={(e) => setAddress({...address, postalCode: e.target.value})} 
          />
          <input 
            type="text" 
            placeholder="Country" 
            required 
            value={address.country} 
            onChange={(e) => setAddress({...address, country: e.target.value})} 
          />
          <div className="checkout-summary">
            <h4>Total Amount: ₹{totalPrice.toFixed(2)}</h4>
            <button type="submit" className="btn">Pay Now</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;