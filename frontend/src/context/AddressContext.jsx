import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '../utils/api';
import { AuthContext } from './AuthContext';
import { toast } from 'react-toastify';

export const AddressContext = createContext();

export const AddressProvider = ({ children }) => {
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);

  const fetchAddresses = async () => {
    try {
      const res = await api.get('/addresses');
      setAddresses(res.data.addresses || []);
    } catch (err) {
      console.error('Fetch addresses error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) fetchAddresses();
    else { setAddresses([]); setLoading(false); }
  }, [user]);

  const addAddress = async (data) => {
    const res = await api.post('/addresses', data);
    await fetchAddresses();
    toast.success('Address added!');
    return res.data.address;
  };

  const updateAddress = async (id, data) => {
    await api.put(`/addresses/${id}`, data);
    await fetchAddresses();
    toast.success('Address updated!');
  };

  const setDefault = async (id) => {
    await api.put(`/addresses/${id}/default`);
    await fetchAddresses();
    toast.success('Default address updated!');
  };

  const deleteAddress = async (id) => {
    await api.delete(`/addresses/${id}`);
    await fetchAddresses();
    toast.info('Address removed.');
  };

  const defaultAddress = addresses.find(a => a.isDefault) || addresses[0] || null;

  return (
    <AddressContext.Provider value={{ addresses, loading, defaultAddress, addAddress, updateAddress, setDefault, deleteAddress, fetchAddresses }}>
      {children}
    </AddressContext.Provider>
  );
};
