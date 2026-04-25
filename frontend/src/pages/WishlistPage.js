
import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import ProductCard from '../components/ProductCard';

const WishlistPage = () => {
  const { user } = useContext(AuthContext);
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    const config = { headers: { Authorization: `Bearer ${user.token}` } };
    axios.get('/api/wishlist', config)
      .then(res => setWishlist(res.data.products || []))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [user]);

  const removeFromWishlist = async (productId) => {
    const config = { headers: { Authorization: `Bearer ${user.token}` } };
    await axios.delete(`/api/wishlist/${productId}`, config);
    setWishlist(prev => prev.filter(p => p._id !== productId));
  };

  if (loading) return <p style={{ padding: '2rem' }}>Loading wishlist...</p>;

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <h2 style={{ marginBottom: '1.5rem' }}>My Wishlist</h2>
      {wishlist.length === 0 ? (
        <p>Your wishlist is empty.</p>
      ) : (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem' }}>
          {wishlist.map(product => (
            <div key={product._id} style={{ position: 'relative' }}>
              <ProductCard product={product} />
              <button
                onClick={() => removeFromWishlist(product._id)}
                style={{
                  marginTop: '8px', width: '100%', background: '#ef4444',
                  color: 'white', border: 'none', padding: '6px',
                  borderRadius: '6px', cursor: 'pointer'
                }}>
                ✕ Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistPage;