// pages/profile/DistributorProfile.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Sidebar from './Sidebar'; 
import './Profile.less';

function DistributorProfile() {
    const { userId } = useParams();  
    const [user, setUser] = useState(null);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        console.log(`Fetching data for user ID: ${userId}`);
        const fetchData = async () => {
            if (!userId) {
                console.log("User ID is undefined or not provided.");
                setLoading(false);
                return;
            }
            try {
                const userResponse = await axios.get(`http://localhost:5000/api/users/${userId}`);
                console.log("User response data:", userResponse.data);  
                setUser(userResponse.data);

                const productsResponse = await axios.get(`http://localhost:5000/api/users/distributor/${userId}/products`);
                console.log("Products response data:", productsResponse.data);
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
                <div className="distributor-products">
                    <h2>Products Listed</h2>
                    {products.length === 0 ? (
                        <p>No products listed.</p>
                    ) : (
                        <div className="product-list">
                            {products.map(product => (
                                <div key={product._id} className="product-card">
                                    <img src={`http://localhost:5000/uploads/${product.images[0]}`} alt={product.name} style={{ width: "100%", height: "auto" }} />
                                    <h2>{product.name}</h2>
                                    <p>{product.description}</p>
                                    <p className="price">${product.price}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default DistributorProfile;
