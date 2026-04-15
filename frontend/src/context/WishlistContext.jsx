import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '../utils/api';
import { AuthContext } from './AuthContext';
import { toast } from 'react-toastify';

export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user) fetchWishlist();
    else setWishlistItems([]);
  }, [user]);

  const fetchWishlist = async () => {
    try {
      const res = await api.get('/wishlist');
      setWishlistItems(res.data.wishlistItems || []);
    } catch (err) {
      console.error('Failed to fetch wishlist:', err);
    }
  };

  // Toggle: add or remove
  const toggleWishlist = async (productId) => {
    if (!user) { toast.warn('Please login to manage your wishlist.'); return; }
    try {
      const res = await api.post('/wishlist', { productId });
      await fetchWishlist();
      if (res.data.action === 'removed') {
        toast.info('Removed from Wishlist');
      } else {
        toast.success('Added to Wishlist!');
      }
    } catch (err) {
      toast.error('Wishlist action failed');
    }
  };

  const removeFromWishlist = async (itemId) => {
    try {
      await api.delete(`/wishlist/${itemId}`);
      await fetchWishlist();
      toast.info('Removed from Wishlist');
    } catch (err) {
      toast.error('Failed to remove from wishlist');
    }
  };

  const isWishlisted = (productId) => wishlistItems.some(w => w.productId === productId);

  return (
    <WishlistContext.Provider value={{ wishlistItems, toggleWishlist, removeFromWishlist, isWishlisted }}>
      {children}
    </WishlistContext.Provider>
  );
};
