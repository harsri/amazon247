import React, { useEffect, useState } from 'react';
import api from '../utils/api';
import { toast } from 'react-toastify';
import './Orders.scss';

const STATUS_STEPS = ['PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED'];

const StatusTimeline = ({ status }) => {
  const currentIdx = STATUS_STEPS.indexOf(status);
  const isReturn = status === 'RETURN_REQUESTED' || status === 'RETURNED';
  return (
    <div className="statusTimeline">
      {isReturn ? (
        <div className="statusTimeline__return">🔄 Return {status === 'RETURNED' ? 'Completed' : 'Requested'}</div>
      ) : (
        STATUS_STEPS.map((step, i) => (
          <React.Fragment key={step}>
            <div className={`statusTimeline__step ${i <= currentIdx ? 'done' : ''} ${i === currentIdx ? 'current' : ''}`}>
              <div className="statusTimeline__dot" />
              <span>{step}</span>
            </div>
            {i < STATUS_STEPS.length - 1 && <div className={`statusTimeline__line ${i < currentIdx ? 'done' : ''}`} />}
          </React.Fragment>
        ))
      )}
    </div>
  );
};

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState(null);

  const fetchOrders = async () => {
    try {
      const res = await api.get('/orders');
      setOrders(res.data.orders || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchOrders(); }, []);

  const handleReturn = async (orderId) => {
    try {
      await api.put(`/orders/${orderId}/return`);
      toast.success('Return request submitted!');
      fetchOrders();
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to request return.');
    }
  };

  return (
    <div className="orders">
      <h1>Your Orders</h1>

      {loading ? (
        <p>Loading your orders...</p>
      ) : orders.length === 0 ? (
        <div className="orders__empty">
          <p>You have not placed any orders yet.</p>
        </div>
      ) : (
        <div className="orders__list">
          {orders.map(order => {
            const isExpanded = expandedId === order.id;
            return (
              <div className="order" key={order.id}>
                <div className="order__header">
                  <div>
                    <p className="order__label">ORDER PLACED</p>
                    <p>{new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                  </div>
                  <div>
                    <p className="order__label">TOTAL</p>
                    <p>₹{order.totalAmount.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="order__label">SHIP TO</p>
                    <p>{order.address?.fullName || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="order__label">PAYMENT</p>
                    <p>{order.paymentMethod}</p>
                  </div>
                  <div className="order__headerRight">
                    <p className="order__id">Order # {order.id}</p>
                    <button className="order__detailToggle" onClick={() => setExpandedId(isExpanded ? null : order.id)}>
                      {isExpanded ? 'Hide Details ▲' : 'View Details ▼'}
                    </button>
                  </div>
                </div>

                <StatusTimeline status={order.status} />

                {isExpanded && (
                  <div className="order__expanded">
                    {/* Items */}
                    <div className="order__items">
                      {order.orderItems?.map(item => (
                        <div className="orderItem" key={item.id}>
                          <img src={item.product?.images?.[0]?.url || 'https://via.placeholder.com/80'} alt={item.product?.title} />
                          <div className="orderItem__info">
                            <p className="orderItem__title">{item.product?.title}</p>
                            <p className="orderItem__price">₹{item.price.toFixed(2)} × {item.quantity}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Price breakdown */}
                    <div className="order__breakdown">
                      <div className="order__breakdownRow"><span>Subtotal</span><span>₹{order.subtotal?.toFixed(2)}</span></div>
                      <div className="order__breakdownRow"><span>Delivery</span><span>{order.deliveryCharge === 0 ? 'FREE' : `₹${order.deliveryCharge}`}</span></div>
                      <div className="order__breakdownRow"><span>GST (18%)</span><span>₹{order.tax?.toFixed(2)}</span></div>
                      <div className="order__breakdownRow order__breakdownTotal"><strong>Grand Total</strong><strong>₹{order.totalAmount?.toFixed(2)}</strong></div>
                    </div>

                    {/* Delivery Address */}
                    {order.address && (
                      <div className="order__address">
                        <h4>Delivery Address</h4>
                        <p>{order.address.fullName}</p>
                        <p>{order.address.houseNo}, {order.address.addressLine1}</p>
                        {order.address.addressLine2 && <p>{order.address.addressLine2}</p>}
                        <p>{order.address.city}, {order.address.state} - {order.address.pincode}</p>
                        <p>📞 {order.address.phone}</p>
                      </div>
                    )}

                    {/* Return */}
                    {order.status === 'DELIVERED' && (
                      <button className="order__returnBtn" onClick={() => handleReturn(order.id)}>
                        Request Return / Refund
                      </button>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Orders;
