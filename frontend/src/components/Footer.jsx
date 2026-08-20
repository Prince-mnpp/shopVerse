import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer style={{
      background: '#ffffff',
      borderTop: '1px solid #e2e8f0',
      padding: '40px 20px',
      marginTop: 'auto',
      boxShadow: '0 -4px 20px rgba(15, 23, 42, 0.03)'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '20px'
      }}>
        <div>
          <h3 style={{ 
            color: '#4f46e5', 
            marginBottom: '6px',
            fontSize: '1.4rem',
            fontWeight: '700',
            letterSpacing: '-0.5px'
          }}>
            ShopVerse
          </h3>
          <p style={{ color: '#64748b', fontSize: '0.9rem' }}>
            Premium E-Commerce Platform.
          </p>
        </div>
        
        <div style={{ display: 'flex', gap: '24px' }}>
          <Link 
            to="/about" 
            style={{ 
              color: '#64748b', 
              fontSize: '0.9rem',
              fontWeight: '500',
              transition: 'color 0.2s ease'
            }}
            onMouseOver={(e) => e.target.style.color = '#0f172a'}
            onMouseOut={(e) => e.target.style.color = '#64748b'}
          >
            About Us
          </Link>
          <Link 
            to="/return" 
            style={{ 
              color: '#64748b', 
              fontSize: '0.9rem',
              fontWeight: '500',
              transition: 'color 0.2s ease'
            }}
            onMouseOver={(e) => e.target.style.color = '#0f172a'}
            onMouseOut={(e) => e.target.style.color = '#64748b'}
          >
            Return Policy
          </Link>
          <Link 
            to="/disclaimer" 
            style={{ 
              color: '#64748b', 
              fontSize: '0.9rem',
              fontWeight: '500',
              transition: 'color 0.2s ease'
            }}
            onMouseOver={(e) => e.target.style.color = '#0f172a'}
            onMouseOut={(e) => e.target.style.color = '#64748b'}
          >
            Disclaimer
          </Link>
        </div>
        
        <div style={{ color: '#94a3b8', fontSize: '0.85rem' }}>
          &copy; {new Date().getFullYear()} ShopVerse. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;