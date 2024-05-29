import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./ListedItems.less";

const ListedItems = ({ userId }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/products/user/${userId}`
        );
        setItems(response.data);
      } catch (error) {
        setError("Error fetching items");
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, [userId]);

  const handleDeleteItem = async (itemId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/products/${itemId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setItems(items.filter((item) => item._id !== itemId));
    } catch (error) {
      setError("Error deleting item");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="listed-items-container">
      <div className="products-container">
        {items.map((item) => (
          <div key={item._id} className="product-card">
            <Link to={`/edit-item/${item._id}`}>
              <img
                src={`http://localhost:5000/${item.images[0]}`}
                alt={item.name}
              />
              <h2>{item.name}</h2>
            </Link>
            <p>${item.price}</p>
            <p>Quantity: {item.quantity}</p>
            <div className="item-controls">
              <Link to={`/edit-item/${item._id}`}>
                <button>Edit</button>
              </Link>
              <button onClick={() => handleDeleteItem(item._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListedItems;
