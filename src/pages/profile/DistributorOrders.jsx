import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../login/AuthContext";
import "./DistributorOrders.less";

const DistributorOrders = ({ userId }) => {
  const { auth } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/orders/distributor/${userId}`,
          {
            headers: { Authorization: `Bearer ${auth.token}` },
          }
        );
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching distributor orders:", error);
        setError("Failed to fetch orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [userId, auth.token]);

  const handleStatusUpdate = async (orderId, itemId, newStatus) => {
    try {
      await axios.put(
        `http://localhost:5000/api/orders/${orderId}/items/${itemId}/status`,
        { status: newStatus },
        {
          headers: { Authorization: `Bearer ${auth.token}` },
        }
      );
      setOrders(
        orders.map((order) =>
          order._id === orderId
            ? {
                ...order,
                items: order.items.map((item) =>
                  item._id === itemId ? { ...item, status: newStatus } : item
                ),
              }
            : order
        )
      );
    } catch (error) {
      console.error("Error updating item status:", error);
      setError("Failed to update item status");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="distributor-orders-container">
      <h2 className="order-text">Orders for Your Products</h2>
      {orders.length === 0 ? (
        <p>No orders found</p>
      ) : (
        orders.map((order) => (
          <div key={order._id} className="order-card">
            <p>Order ID: {order._id}</p>
            {order.items.map((item) => (
              <div key={item._id} className="order-item">
                <p>Product: {item.product.name}</p>
                <p>Quantity: {item.quantity}</p>
                <p>Status: {item.status}</p>
                <select
                  value={item.status}
                  onChange={(e) =>
                    handleStatusUpdate(order._id, item._id, e.target.value)
                  }
                >
                  <option value="pending">Pending</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                </select>
              </div>
            ))}
          </div>
        ))
      )}
    </div>
  );
};

export default DistributorOrders;
