import React, { useEffect, useState } from 'react';
import api from '../utils/api';
import './Orders.scss';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await api.get('/orders');
        setOrders(response.data.orders || []);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  return (
    <div className="orders">
      <h1>Your Orders</h1>
      
      {loading ? (
        <p>Loading your orders...</p>
      ) : orders.length === 0 ? (
        <p>You have not placed any orders yet.</p>
      ) : (
        <div className="orders__list">
          {orders.map(order => (
            <div className="order" key={order.id}>
              <div className="order__header">
                <div>
                  <p>ORDER PLACED</p>
                  <p>{new Date(order.createdAt).toLocaleDateString()}</p>
                </div>
                <div>
                  <p>TOTAL</p>
                  <p>${order.totalAmount.toFixed(2)}</p>
                </div>
                <div className="order__headerRight">
                  <p>ORDER # {order.id}</p>
                  <p className="order__status">Status: {order.status}</p>
                </div>
              </div>

              <div className="order__items">
                {order.orderItems?.map(item => (
                  <div className="orderItem" key={item.id}>
                    <img 
                      src={item.product.images?.[0]?.url || 'https://via.placeholder.com/80x80.png?text=Item'} 
                      alt="" 
                    />
                    <div className="orderItem__info">
                       <p className="orderItem__title">{item.product.title}</p>
                       <p className="orderItem__price">
                         ${item.price.toFixed(2)}
                       </p>
                       <p>Qty: {item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
