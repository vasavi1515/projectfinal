// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import RestaurantMenu from './pages/RestaurantMenu';
import OrderTracking from './pages/OrderTracking';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/restaurant/:id" element={<RestaurantMenu />} />
            <Route path="/order/:id" element={<OrderTracking />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;