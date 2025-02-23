// src/pages/Home.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styles from './Home.module.css';

function Home() {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/restaurants');
        setRestaurants(response.data);
      } catch (error) {
        console.error('Error fetching restaurants:', error);
      }
    };

    fetchRestaurants();
  }, []);

  return (
    <div className="container">
      <h1>TastyNow Food Delivery</h1>
      <h2>Available Restaurants</h2>
      <div className={styles.restaurantList}>
        {restaurants.map((restaurant) => (
          <Link to={`/restaurant/${restaurant._id}`} key={restaurant._id} className={styles.restaurantCard}>
            <h3 className={styles.restaurantName}>{restaurant.name}</h3>
            <p>{restaurant.cuisine}</p>
            <p>{restaurant.address}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Home;