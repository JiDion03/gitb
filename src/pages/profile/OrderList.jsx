import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './OrderList.less';

const OrderList = ({ userId }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('No token, authorization denied');
          setLoading(false);
          return;
        }

        const response = await axios.get(`http://localhost:5000/api/orders/user/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const ordersData = response.data;

        // Fetch product details for each order item
        const productRequests = ordersData.map(order =>
          Promise.all(order.items.map(item =>
            axios.get(`http://localhost:5000/api/products/${item.productId}`, {
              headers: {
                Authorization: `Bearer ${token}`
              }
            })
          ))
        );

        const productResponses = await Promise.all(productRequests);

        const ordersWithProductData = ordersData.map((order, orderIndex) => ({
          ...order,
          items: order.items.map((item, itemIndex) => ({
            ...item,
            product: productResponses[orderIndex][itemIndex].data
          }))
        }));

        setOrders(ordersWithProductData);
        console.log('Orders fetched:', ordersWithProductData); // Log the fetched orders
      } catch (error) {
        setError('Failed to fetch orders');
        console.error('Error fetching orders:', error.response ? error.response.data : error.message); // Improved error logging
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [userId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (orders.length === 0) return <div>No orders found</div>;

  return (
    <div className="order-list-container">
      <h2>Your Orders</h2>
      {orders.map(order => (
        <div key={order._id} className="order-summary">
          <Link to={`/orders/${order._id}`}>
            <p>Order ID: {order._id}</p>
            <p>Total: ${order.totalPrice.toFixed(2)}</p>
            <p>Status: {order.items[0].status}</p>
            <p>Placed on: {new Date(order.createdAt).toLocaleDateString()}</p>
            <div className="order-items-images">
              {order.items.map(item => (
                <img key={item.productId} src={`http://localhost:5000/${item.product.images[0]}`} alt={item.product.name} />
              ))}
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default OrderList;
