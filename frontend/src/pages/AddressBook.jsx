import React, { useContext, useState } from 'react';
import { AddressContext } from '../context/AddressContext';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { FiPlus } from 'react-icons/fi';
import './AddressBook.scss';

const EMPTY_FORM = { fullName: '', phone: '', email: '', houseNo: '', addressLine1: '', addressLine2: '', city: '', state: '', pincode: '', landmark: '', addressType: 'HOME' };

const INDIAN_STATES = ['Andhra Pradesh','Arunachal Pradesh','Assam','Bihar','Chhattisgarh','Goa','Gujarat','Haryana','Himachal Pradesh','Jharkhand','Karnataka','Kerala','Madhya Pradesh','Maharashtra','Manipur','Meghalaya','Mizoram','Nagaland','Odisha','Punjab','Rajasthan','Sikkim','Tamil Nadu','Telangana','Tripura','Uttar Pradesh','Uttarakhand','West Bengal','Delhi','Jammu & Kashmir','Ladakh'];

const AddressBook = () => {
  const { addresses, loading, addAddress, updateAddress, setDefault, deleteAddress } = useContext(AddressContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);

  if (!user) {
    navigate('/login');
    return null;
  }

  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleEdit = (addr) => {
    setEditId(addr.id);
    setForm({ fullName: addr.fullName, phone: addr.phone, email: addr.email, houseNo: addr.houseNo, addressLine1: addr.addressLine1, addressLine2: addr.addressLine2 || '', city: addr.city, state: addr.state, pincode: addr.pincode, landmark: addr.landmark || '', addressType: addr.addressType });
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancel = () => { setShowForm(false); setEditId(null); setForm(EMPTY_FORM); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editId) await updateAddress(editId, form);
      else await addAddress(form);
      handleCancel();
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="addressBook">
      <div className="addressBook__header">
        <h1>Your Addresses</h1>
      </div>

      {/* Address Form */}
      {showForm && (
        <div className="addressForm">
          <h2>{editId ? 'Edit Address' : 'Add a new address'}</h2>
          <form onSubmit={handleSubmit}>
            <div className="addressForm__grid">
              <div className="addressForm__field">
                <label>Full Name *</label>
                <input name="fullName" value={form.fullName} onChange={handleChange} required placeholder="e.g. John Doe" />
              </div>
              <div className="addressForm__field">
                <label>Phone Number *</label>
                <input name="phone" value={form.phone} onChange={handleChange} required placeholder="10-digit mobile number" maxLength={10} />
              </div>
              <div className="addressForm__field">
                <label>Email</label>
                <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="email@example.com" />
              </div>
              <div className="addressForm__field">
                <label>House / Flat No. *</label>
                <input name="houseNo" value={form.houseNo} onChange={handleChange} required placeholder="e.g. 42B" />
              </div>
              <div className="addressForm__field addressForm__field--wide">
                <label>Address Line 1 *</label>
                <input name="addressLine1" value={form.addressLine1} onChange={handleChange} required placeholder="Street, Colony, Area" />
              </div>
              <div className="addressForm__field addressForm__field--wide">
                <label>Address Line 2</label>
                <input name="addressLine2" value={form.addressLine2} onChange={handleChange} placeholder="Near landmark, sector etc (Optional)" />
              </div>
              <div className="addressForm__field">
                <label>Landmark</label>
                <input name="landmark" value={form.landmark} onChange={handleChange} placeholder="e.g. Near City Mall" />
              </div>
              <div className="addressForm__field">
                <label>City *</label>
                <input name="city" value={form.city} onChange={handleChange} required placeholder="City" />
              </div>
              <div className="addressForm__field">
                <label>State *</label>
                <select name="state" value={form.state} onChange={handleChange} required>
                  <option value="">Select State</option>
                  {INDIAN_STATES.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div className="addressForm__field">
                <label>Pincode *</label>
                <input name="pincode" value={form.pincode} onChange={handleChange} required placeholder="6-digit PIN" maxLength={6} />
              </div>
              <div className="addressForm__field">
                <label>Address Type</label>
                <div className="addressForm__typeGroup">
                  {['HOME', 'WORK', 'OTHER'].map(type => (
                    <label key={type} className={`addressForm__typeBtn ${form.addressType === type ? 'active' : ''}`}>
                      <input type="radio" name="addressType" value={type} checked={form.addressType === type} onChange={handleChange} />
                      {type === 'HOME' ? '🏠 Home' : type === 'WORK' ? '🏢 Work' : '📍 Other'}
                    </label>
                  ))}
                </div>
              </div>
            </div>
            <div className="addressForm__actions">
              <button type="submit" className="btn-primary" disabled={saving}>{saving ? 'Saving...' : editId ? 'Update Address' : 'Save Address'}</button>
              <button type="button" className="btn-secondary" onClick={handleCancel}>Cancel</button>
            </div>
          </form>
        </div>
      )}

      {/* Address Cards */}
      {loading ? (
        <p>Loading addresses...</p>
      ) : (
        <div className="addressBook__grid">
          {/* Add New Address Card */}
          {!showForm && (
            <div className="addressCard addressCard--add" onClick={() => { setShowForm(true); setEditId(null); setForm(EMPTY_FORM); }}>
              <div className="addressCard__addBtn">
                <FiPlus size={48} color="#ccc" />
                <span>Add address</span>
              </div>
            </div>
          )}

          {addresses.map(addr => (
            <div className={`addressCard ${addr.isDefault ? 'addressCard--default' : ''}`} key={addr.id}>
              {addr.isDefault && (
                  <div className="addressCard__defaultHeader">
                      <span>Default: </span>
                      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png" alt="Amazon Logo" className="addressCard__logo" />
                  </div>
              )}
              
              <div className="addressCard__content">
                <h3>{addr.fullName}</h3>
                <p>{addr.houseNo}, {addr.addressLine1}</p>
                {addr.addressLine2 && <p>{addr.addressLine2}</p>}
                <p>{addr.city}, {addr.state} {addr.pincode}</p>
                <p>India</p>
                <p>Phone number: {addr.phone}</p>
                {addr.landmark && <p>Landmark: {addr.landmark}</p>}
                
                <div className="addressCard__actions">
                  <button className="addressCard__btn" onClick={() => handleEdit(addr)}>Edit</button>
                  <span className="addressCard__separator">|</span>
                  <button className="addressCard__btn" onClick={() => deleteAddress(addr.id)}>Remove</button>
                  {!addr.isDefault && (
                    <>
                      <span className="addressCard__separator">|</span>
                      <button className="addressCard__btn" onClick={() => setDefault(addr.id)}>Set as Default</button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AddressBook;
