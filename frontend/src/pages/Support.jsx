import React, { useState } from 'react';
import api from '../utils/api';
import { toast } from 'react-toastify';
import './Support.scss';

const Support = () => {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await api.post('/support', { subject, message });
      toast.success("Support ticket submitted.");
      setSubject('');
      setMessage('');
    } catch (error) {
      toast.error(error.response?.data?.error || "Failed to submit ticket.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="support">
      <h1>Help & Customer Service</h1>
      
      <div className="support__container">
         <div className="support__faq">
            <h3>Frequently Asked Questions</h3>
            <ul>
               <li><strong>Where is my order?</strong> - Check the Orders tab above.</li>
               <li><strong>How do I return an item?</strong> - Go to Returns & Orders and select the item to return.</li>
               <li><strong>Which payment methods are accepted?</strong> - We accept all major Dummy Credit Cards and Cash on Delivery.</li>
            </ul>
         </div>

         <div className="support__form">
            <h3>Contact Us</h3>
            <form onSubmit={handleSubmit}>
              <input 
                 type="text" 
                 placeholder="Subject" 
                 value={subject} 
                 onChange={e => setSubject(e.target.value)} 
                 required 
              />
              <textarea 
                 placeholder="Describe your issue..." 
                 value={message} 
                 onChange={e => setMessage(e.target.value)} 
                 rows={6}
                 required 
              />
              <button type="submit" className="btn-primary" disabled={submitting}>
                {submitting ? 'Submitting...' : 'Submit Ticket'}
              </button>
            </form>
         </div>
      </div>
    </div>
  );
};

export default Support;
