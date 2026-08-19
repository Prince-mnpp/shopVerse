import React from 'react';

const textualStyle = {
  maxWidth: '900px',
  margin: '0 auto',
  padding: '40px',
  background: '#18181b',
  borderRadius: '16px',
  border: '1px solid rgba(255, 255, 255, 0.05)',
  boxShadow: '0 10px 40px rgba(0,0,0,0.5)',
  lineHeight: '1.8',
  color: '#a1a1aa',
  fontFamily: 'sans-serif'
};

const sectionTitleStyle = {
  color: '#f97316',
  marginTop: '25px',
  marginBottom: '10px',
  fontSize: '1.1rem',
  fontWeight: '600'
};

const Disclaimer = () => {
  return (
    <div style={textualStyle}>
      <h2 style={{ color: '#fff', marginBottom: '20px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '15px' }}>
        ShopVerse — Terms & Legal Disclaimer
      </h2>

      <p style={{ marginBottom: '20px' }}>
        Welcome to <strong>ShopVerse</strong>. By browsing, navigating, or interacting with this application, you acknowledge that you have read, understood, and agreed to the legal parameters and restrictions outlined below.
      </p>

      <h4 style={sectionTitleStyle}>1. Platform Purpose & Educational Scope</h4>
      <p style={{ marginBottom: '15px' }}>
        ShopVerse is designed and maintained primarily as a portfolio project and educational demonstration of modern e-commerce engineering. While it showcases full-stack capabilities—including product filtering, cart management, and checkout flows—it does not operate as an active retail store.
      </p>

      <h4 style={sectionTitleStyle}>2. Product Listings, Imagery & Pricing</h4>
      <p style={{ marginBottom: '15px' }}>
        All products, descriptions, specs, stock counts, and prices displayed across ShopVerse are for demonstration purposes only. Images are dynamically fetched from third-party media sources (such as Unsplash) or dummy APIs. No physical inventory exists, and order fulfillments or deliveries will not take place.
      </p>

      <h4 style={sectionTitleStyle}>3. Payment Gateway & Financial Transactions</h4>
      <p style={{ marginBottom: '15px' }}>
        ShopVerse does not process real financial transactions or store sensitive payment credentials. Any payment interface provided (e.g., Razorpay or Stripe) operates strictly in test/sandbox mode using dummy credit card details or test UPI IDs. Please <strong>do not enter real credit card numbers or sensitive banking details</strong> under any circumstances.
      </p>

      <h4 style={sectionTitleStyle}>4. User Accounts & Data Privacy</h4>
      <p style={{ marginBottom: '15px' }}>
        Any user authentication or profile creation features within ShopVerse are used solely to demonstrate state management and backend integration. Dummy data generated during testing may be periodically reset or cleared without prior notice.
      </p>

      <h4 style={sectionTitleStyle}>5. Limitation of Liability</h4>
      <p style={{ marginBottom: '15px' }}>
        ShopVerse and its developers accept zero liability for any direct or indirect damages, data loss, or system disruptions resulting from the use or inability to use this platform. The service is provided on an "As Is" and "As Available" basis without warranties of any kind.
      </p>

      <h4 style={sectionTitleStyle}>6. Third-Party Services & Links</h4>
      <p style={{ marginBottom: '15px' }}>
        This application may embed or route to external third-party tools, APIs, and CDN networks. ShopVerse retains no control over the content, uptime, or privacy practices of these external dependencies.
      </p>

      <div style={{ marginTop: '35px', paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.05)', fontSize: '0.85rem', fontStyle: 'italic', color: '#71717a' }}>
        Last updated: 2026. Continued access to the ShopVerse platform constitutes implicit agreement to these terms.
      </div>
    </div>
  );
};

export default Disclaimer;