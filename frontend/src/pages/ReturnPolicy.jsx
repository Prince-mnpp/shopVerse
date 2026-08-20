import React from 'react';

const textualStyle = {
  maxWidth: '900px',
  margin: '0 auto',
  padding: '40px',
  background: '#ffffff',
  borderRadius: '20px',
  border: '1px solid #e2e8f0',
  boxShadow: '0 10px 30px rgba(15, 23, 42, 0.05)',
  lineHeight: '1.8',
  color: '#475569',
  fontFamily: 'sans-serif'
};

const sectionTitleStyle = {
  color: '#4f46e5',
  marginTop: '25px',
  marginBottom: '10px',
  fontSize: '1.15rem',
  fontWeight: '700'
};

const ReturnPolicy = () => {
  return (
    <div style={textualStyle}>
      <h2 style={{ 
        color: '#0f172a', 
        marginBottom: '20px', 
        borderBottom: '1px solid #e2e8f0', 
        paddingBottom: '15px',
        fontSize: '2rem',
        fontWeight: '800',
        letterSpacing: '-0.5px'
      }}>
        ShopVerse — Return & Refund Policy
      </h2>

      <p style={{ marginBottom: '20px' }}>
        At <strong style={{ color: '#0f172a' }}>ShopVerse</strong>, customer satisfaction is a top priority. We strive to provide clear guidelines regarding product returns, cancellations, and test-environment refund workflows.
      </p>

      <h4 style={sectionTitleStyle}>1. 30-Day Return Window</h4>
      <p style={{ marginBottom: '15px' }}>
        In a production retail setup, customers may initiate a return within 30 days of receiving their shipment. To qualify for a full return, items must be unused, in their original condition, and preserved inside the factory packaging along with valid proof of purchase.
      </p>

      <h4 style={sectionTitleStyle}>2. Simulated Refund Processing</h4>
      <p style={{ marginBottom: '15px' }}>
        Because ShopVerse operates as an educational e-commerce platform using payment sandbox environments (e.g., Razorpay/Stripe test modes), no real money is processed. Order cancellations or simulated return triggers will update the order state immediately in the app dashboard without executing actual financial transfers.
      </p>

      <h4 style={sectionTitleStyle}>3. Non-Returnable & Exempt Items</h4>
      <p style={{ marginBottom: '15px' }}>
        Certain product categories are strictly non-returnable, including perishable goods, downloadable digital software, gift cards, customized items, and personal care products once opened or unsealed.
      </p>

      <h4 style={sectionTitleStyle}>4. Exchange & Replacement Policy</h4>
      <p style={{ marginBottom: '15px' }}>
        Products received in a damaged, defective, or incorrect state are eligible for immediate replacement. In a live environment, customers would submit photo verification to trigger a pre-paid return shipping label and replacement dispatch.
      </p>

      <h4 style={sectionTitleStyle}>5. Shipping & Restocking Fees</h4>
      <p style={{ marginBottom: '15px' }}>
        Unless the return is caused by a ShopVerse fulfillment error or defective item, return shipping charges are the responsibility of the customer. Standard restocking fees may apply for high-value electronics and specialty items.
      </p>

      <div style={{ 
        marginTop: '35px', 
        paddingTop: '20px', 
        borderTop: '1px solid #e2e8f0', 
        fontSize: '0.85rem', 
        fontStyle: 'italic', 
        color: '#94a3b8' 
      }}>
        Note: ShopVerse is a portfolio application. All transaction flows, return requests, and refund timelines (typically 5–7 business days in real deployments) are strictly simulated for demonstration purposes.
      </div>
    </div>
  );
};

export default ReturnPolicy;