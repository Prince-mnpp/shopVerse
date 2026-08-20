import React from 'react';

const About = () => {
  const containerStyle = {
    maxWidth: '900px',
    margin: '0 auto',
    padding: '40px',
    background: '#ffffff',
    borderRadius: '20px',
    border: '1px solid #e2e8f0',
    boxShadow: '0 10px 30px rgba(15, 23, 42, 0.05)',
    textAlign: 'center'
  };

  const socialBtnStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 20px',
    background: '#f8fafc',
    color: '#334155',
    borderRadius: '10px',
    textDecoration: 'none',
    transition: 'all 0.25s ease',
    border: '1px solid #cbd5e1',
    fontWeight: '500',
    fontSize: '0.95rem'
  };

  return (
    <div style={containerStyle}>
      <img
        src="/dp.jpeg"
        alt="Profile"
        style={{
          width: '180px',
          height: '180px',
          borderRadius: '50%',
          objectFit: 'cover',
          border: '4px solid #4f46e5',
          marginBottom: '20px',
          boxShadow: '0 8px 25px rgba(79, 70, 229, 0.25)'
        }}
      />
      <h2 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '8px', color: '#0f172a', letterSpacing: '-0.5px' }}>
        Prince Rajput
      </h2>
      <h3 style={{ fontSize: '1.4rem', color: '#4f46e5', marginBottom: '20px', fontWeight: '700' }}>
        Jay Bhawani 🗡️
      </h3>

      <p style={{ color: '#475569', fontSize: '1.15rem', lineHeight: '1.8', maxWidth: '600px', margin: '0 auto 30px auto' }}>
        <strong style={{ color: '#0f172a' }}>Join the community and grow together!</strong> Welcome to my platform where we build, deploy, and scale highly engineered systems.
      </p>

      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '12px', marginTop: '20px' }}>
        <a 
          href="https://prince-rajput-portfolio.vercel.app/" 
          target="_blank" 
          rel="noreferrer" 
          style={{ ...socialBtnStyle, background: '#f1f5f9', borderColor: '#cbd5e1', color: '#0f172a' }}
        >
          🌐 Website
        </a>
        <a 
          href="https://youtube.com" 
          target="_blank" 
          rel="noreferrer" 
          style={{ ...socialBtnStyle, background: '#fef2f2', borderColor: '#fca5a5', color: '#dc2626' }}
        >
          📺 YouTube
        </a>
        <a 
          href="https://www.instagram.com/prince_.rajput_56/" 
          target="_blank" 
          rel="noreferrer" 
          style={{ ...socialBtnStyle, background: '#fdf2f8', borderColor: '#fbcfe8', color: '#db2777' }}
        >
          📸 Instagram
        </a>
        <a 
          href="https://www.linkedin.com/in/prince-rajput-191b23332/" 
          target="_blank" 
          rel="noreferrer" 
          style={{ ...socialBtnStyle, background: '#eff6ff', borderColor: '#bfdbfe', color: '#2563eb' }}
        >
          💼 LinkedIn
        </a>
        <a 
          href="https://x.com" 
          target="_blank" 
          rel="noreferrer" 
          style={{ ...socialBtnStyle, background: '#f8fafc', borderColor: '#cbd5e1', color: '#0f172a' }}
        >
          ✖️ X (Twitter)
        </a>
        <a 
          href="https://whatsapp.com" 
          target="_blank" 
          rel="noreferrer" 
          style={{ ...socialBtnStyle, background: '#ecfdf5', borderColor: '#a7f3d0', color: '#059669' }}
        >
          💬 WhatsApp
        </a>
      </div>
    </div>
  );
};

export default About;