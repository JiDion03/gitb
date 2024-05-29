import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./EditItem.less";
import { useNotification } from "../../components/notifications/NotificationContext";

const EditItem = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState({
    name: "",
    description: "",
    price: "",
    quantity: "",
    category: "",
    distributor: "",
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const showNotification = useNotification();

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/products/${productId}`
        );
        setItem(response.data);
        setLoading(false);
      } catch (error) {
        setError("Error fetching item");
        setLoading(false);
      }
    };

    fetchItem();
  }, [productId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItem((prevItem) => ({ ...prevItem, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      await axios.put(`http://localhost:5000/api/products/${productId}`, item, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      showNotification("Item updated successfully!", "success");
      navigate(`/distributor/${item.distributor}/listed-items`);
    } catch (error) {
      setError("Error updating item");
      showNotification("Error updating item", "error");
    }
  };

  const handleDelete = async () => {
    const token = localStorage.getItem("token");

    try {
      await axios.delete(`http://localhost:5000/api/products/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      showNotification("Item deleted successfully!", "success");
      navigate(`/distributor/${item.distributor}/listed-items`);
    } catch (error) {
      setError("Error deleting item");
      showNotification("Error deleting item", "error");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="edit-item-container">
      <h1 className="edit-text">Edit Item</h1>
      <form className="edit-item-form" onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={item.name}
            onChange={handleChange}
          />
        </label>
        <label>
          Description:
          <input
            type="text"
            name="description"
            value={item.description}
            onChange={handleChange}
          />
        </label>
        <label>
          Price:
          <input
            type="number"
            name="price"
            value={item.price}
            onChange={handleChange}
          />
        </label>
        <label>
          Quantity:
          <input
            type="number"
            name="quantity"
            value={item.quantity}
            onChange={handleChange}
          />
        </label>
        <label>
          Category:
          <input
            type="text"
            name="category"
            value={item.category}
            onChange={handleChange}
          />
        </label>
        <label>
          Distributor:
          <input
            type="text"
            name="distributor"
            value={item.distributor}
            readOnly
          />
        </label>
        <button className="save-button" type="submit">
          Save
        </button>
        <button className="delete-button" onClick={handleDelete}>
          Delete
        </button>
      </form>
    </div>
  );
};

export default EditItem;
