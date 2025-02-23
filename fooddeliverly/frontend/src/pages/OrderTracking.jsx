// src/pages/OrderTracking.jsx
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styles from './OrderTracking.module.css';

function OrderTracking() {
  const [order, setOrder] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/orders/${id}`);
        setOrder(response.data);
      } catch (error) {
        console.error('Error fetching order:', error);
      }
    };

    fetchOrder();
  }, [id]);

  if (!order) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <h1>Order Tracking</h1>
      <div className={styles.orderDetails}>
        <h2>Order #{order._id}</h2>
        <p className={styles.status}>Status: {order.status}</p>
        <h3>Items:</h3>
        {order.items.map((item, index) => (
          <div key={index} className={styles.orderItem}>
            <span>{item.name}</span>
            <span>${item.price.toFixed(2)} x {item.quantity}</span>
          </div>
        ))}
        <p className={styles.total}>Total: ${order.totalAmount.toFixed(2)}</p>
      </div>
    </div>
  );
}

export default OrderTracking;