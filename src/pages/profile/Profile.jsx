import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Sidebar from './Sidebar';
import './Profile.less';
import Button from '../../components/button/Button';

function Profile() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (!userId) {
        setLoading(false);
        return;
      }
      try {
        const userResponse = await axios.get(`http://localhost:5000/api/users/${userId}`);
        setUser(userResponse.data);

        const productsResponse = await axios.get(`http://localhost:5000/api/products/user/${userId}`);
        setProducts(productsResponse.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>No user data found.</div>;
  }

  return (
    <div className="profile-container">
      <Sidebar />
      <div className="profile-content">
        <div className="welcome-message">
          Welcome back, {user.firstName} {user.lastName}, what are you up to?
        </div>
        <div className="user-products">
          <h2>Your Products</h2>
          {products.length > 0 ? (
            <div className="products-container">
              {products.map(product => (
                <div key={product._id} className="product-card">
                  <img
                    src={`http://localhost:5000/${product.images[0]}`}
                    alt={product.name}
                    className="product-image"
                  />
                  <div className="product-info">
                    <h3>{product.name}</h3>
                    <p>{product.description}</p>
                    <p className="price">${product.price}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>You have not added any products yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
