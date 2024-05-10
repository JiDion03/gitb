import React, { useState } from 'react';
import axios from 'axios';
import './AddProduct.less';  // Ensure the CSS file is named correctly and located in the right folder

const categories = {
  Electronics: ["Mobile Phones", "Laptops", "Cameras"],
  Clothing: ["Jackets", "Shirts", "Pants"],
  Kitchen: ["Appliances", "Utensils", "Tableware"]
};

function AddProduct() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    subcategory: '',
    images: []
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "category") {
      setFormData({ ...formData, category: value, subcategory: '' });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, images: [...e.target.files] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    formData.images.forEach(image => data.append('images', image));
    Object.keys(formData).forEach(key => {
      if (key !== 'images') {
        data.append(key, formData[key]);
      }
    });

    try {
      const response = await axios.post('http://localhost:5000/api/products/add', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      alert('Product added successfully!');
      console.log(response.data);
    } catch (error) {
      console.error('Failed to add product:', error.response?.data);
      alert(`Failed to add product: ${error.response?.data.message}`);
    }
  };

  return (
    <div className="add-product-form"> {/* This div applies the CSS styles to your form */}
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" value={formData.name} onChange={handleInputChange} required />
        <textarea name="description" value={formData.description} onChange={handleInputChange} required />
        <input type="number" name="price" value={formData.price} onChange={handleInputChange} required />
        <select name="category" value={formData.category} onChange={handleInputChange} required>
          <option value="">Select Category</option>
          {Object.keys(categories).map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
        <select name="subcategory" value={formData.subcategory} onChange={handleInputChange} required disabled={!formData.category}>
          <option value="">Select Subcategory</option>
          {formData.category && categories[formData.category].map(sub => (
            <option key={sub} value={sub}>{sub}</option>
          ))}
        </select>
        <input type="file" multiple onChange={handleImageChange} accept="image/*" />
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
}

export default AddProduct;
