import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Profile = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    const fetchMyOrders = async () => {
      try {
        const res = await fetch('/api/orders/myorders', {
          headers: { Authorization: `Bearer ${user.token}` }
        });
        const data = await res.json();
        if (res.ok) {
          setOrders(Array.isArray(data) ? data : []);
        } else {
          if (res.status === 401) {
             logout();
             navigate('/login');
          }
          setOrders([]);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchMyOrders();
  }, [user, navigate, logout]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const containerStyle = { 
    maxWidth: '1000px', 
    margin: '40px auto', 
    padding: '35px', 
    background: '#ffffff', 
    borderRadius: '20px', 
    border: '1px solid #e2e8f0', 
    color: '#0f172a',
    boxShadow: '0 10px 30px rgba(15, 23, 42, 0.05)'
  };

  const badgeStyle = { 
    background: '#eeefbe', 
    background: '#e0e7ff', 
    color: '#4338ca', 
    padding: '6px 14px', 
    borderRadius: '8px', 
    fontSize: '0.85rem', 
    fontWeight: '700', 
    display: 'inline-block' 
  };

  if (!user) return null;

  return (
    <div style={containerStyle}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid #e2e8f0', paddingBottom: '30px', marginBottom: '30px' }}>
        <div>
          <h2 style={{ color: '#0f172a', fontSize: '2.2rem', fontWeight: '800', marginBottom: '12px', letterSpacing: '-0.5px' }}>My Profile</h2>
          <p style={{ color: '#475569', fontSize: '1.1rem', marginBottom: '6px' }}><strong style={{ color: '#0f172a' }}>Name:</strong> {user.name}</p>
          <p style={{ color: '#475569', fontSize: '1.1rem', marginBottom: '16px' }}><strong style={{ color: '#0f172a' }}>Email:</strong> {user.email}</p>
          <span style={badgeStyle}>Account Type: {user.role ? user.role.toUpperCase() : 'USER'}</span>
        </div>
        <button 
          onClick={handleLogout} 
          style={{
            background: '#fef2f2',
            color: '#dc2626',
            border: '1px solid #fca5a5',
            padding: '10px 20px',
            borderRadius: '10px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
          onMouseOver={(e) => { e.target.style.background = '#dc2626'; e.target.style.color = '#ffffff'; }}
          onMouseOut={(e) => { e.target.style.background = '#fef2f2'; e.target.style.color = '#dc2626'; }}
        >
          Logout
        </button>
      </div>

      <h3 style={{ color: '#4f46e5', marginBottom: '20px', fontSize: '1.5rem', fontWeight: '700' }}>Order History</h3>
      
      {loading ? (
        <p style={{ color: '#64748b' }}>Fetching your orders...</p>
      ) : orders.length === 0 ? (
        <div style={{ background: '#f8fafc', padding: '40px 20px', borderRadius: '12px', textAlign: 'center', border: '1px solid #e2e8f0' }}>
          <p style={{ color: '#64748b', marginBottom: '18px', fontSize: '1.05rem' }}>You haven't placed any orders yet.</p>
          <Link to="/shop" style={{
            background: '#4f46e5',
            color: '#ffffff',
            padding: '10px 22px',
            borderRadius: '10px',
            textDecoration: 'none',
            fontWeight: '600',
            display: 'inline-block'
          }}>
            Start Shopping
          </Link>
        </div>
      ) : (
        <div style={{ display: 'grid', gap: '20px' }}>
          {orders.map(order => (
            <div key={order._id} style={{ background: '#f8fafc', padding: '20px 24px', borderRadius: '14px', border: '1px solid #e2e8f0', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '20px' }}>
              <div>
                <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '6px' }}>Order ID: <span style={{ color: '#0f172a', fontWeight: '600' }}>{order._id}</span></p>
                <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '6px' }}>Placed On: <span style={{ color: '#0f172a', fontWeight: '600' }}>{new Date(order.createdAt).toLocaleDateString()}</span></p>
                <p style={{ color: '#64748b', fontSize: '0.9rem' }}>Total: <strong style={{ color: '#16a34a', fontSize: '1.1rem' }}>₹{order.totalAmount.toFixed(2)}</strong></p>
              </div>
              <div>
                <span style={{ 
                  background: order.status === 'Delivered' ? '#dcfce7' : order.status === 'Shipped' ? '#dbeafe' : '#fef3c7', 
                  color: order.status === 'Delivered' ? '#15803d' : order.status === 'Shipped' ? '#1d4ed8' : '#b45309',
                  padding: '8px 18px', 
                  borderRadius: '20px', 
                  fontSize: '0.85rem',
                  fontWeight: '700' 
                }}>
                  {order.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Profile;