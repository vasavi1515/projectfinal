// src/pages/RestaurantMenu.jsx
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './RestaurantMenu.module.css';

function RestaurantMenu() {
  const [restaurant, setRestaurant] = useState(null);
  const [cart, setCart] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/restaurants/${id}`);
        setRestaurant(response.data);
      } catch (error) {
        console.error('Error fetching restaurant:', error);
      }
    };

    fetchRestaurant();
  }, [id]);

  const addToCart = (item) => {
    setCart([...cart, { ...item, quantity: 1 }]);
  };

  const placeOrder = async () => {
    try {
      const orderData = {
        restaurant: id,
        items: cart.map(item => ({
          name: item.name,
          quantity: item.quantity,
          price: item.price
        })),
        totalAmount: cart.reduce((total, item) => total + item.price * item.quantity, 0)
      };

      const response = await axios.post('http://localhost:5000/api/orders', orderData);
      navigate(`/order/${response.data._id}`);
    } catch (error) {
      console.error('Error placing order:', error);
    }
  };

  if (!restaurant) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <h1>{restaurant.name}</h1>
      <h2>Menu</h2>
      <div className={styles.menuList}>
        {restaurant.menu.map((item, index) => (
          <div key={index} className={styles.menuItem}>
            <h3>{item.name}</h3>
            <p>{item.description}</p>
            <p>${item.price.toFixed(2)}</p>
            <button onClick={() => addToCart(item)}>Add to Cart</button>
          </div>
        ))}
      </div>
      <div className={styles.cart}>
        <h2>Cart</h2>
        {cart.map((item, index) => (
          <div key={index} className={styles.cartItem}>
            <span>{item.name}</span>
            <span>${item.price.toFixed(2)} x {item.quantity}</span>
          </div>
        ))}
        <p className={styles.total}>Total: ${cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}</p>
        <button onClick={placeOrder}>Place Order</button>
      </div>
    </div>
  );
}

export default RestaurantMenu;