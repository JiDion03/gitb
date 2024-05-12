import React, { useState } from 'react';
import axios from 'axios';
import './AddProduct.less'; 

const categories = {
  "Laptop, Tablete, Telefoane": [
    "Laptopuri", 
    "Accesorii laptop", 
    "Telefoane mobile", 
    "Accesorii telefoane mobile", 
    "Tablete", 
    "Accesorii tablete", 
    "Wearables si Gadgets"
  ],
  "PC & Software": [
    "Desktop PC", 
    "Monitoare", 
    "Placi Video", 
    "Placi de baza", 
    "Procesoare", 
    "Solid-State-Drive (SSD)", 
    "Hard Disk-uri", 
    "Memorii", 
    "Carcase", 
    "Coolere procesor", 
    "Placi de sunet", 
    "Surse PC", 
    "Sisteme de operare", 
    "Office & Aplicatii desktop"
  ],
  "Periferice PC": [
    "Mouse", 
    "Tastaturi", 
    "Hard Disk externe", 
    "SSD-uri externe", 
    "Boxe PC", 
    "Casti", 
    "Microfoane", 
    "Memorii USB", 
    "Imprimante", 
    "Cartuse, tonere si consumabile", 
    "Routere wireless", 
    "Camere de supraveghere", 
    "Camere Web"
  ],
  "TV, Sisteme Audio-Video": [
    "Televizoare si accesorii", 
    "Drone si accesorii", 
    "Camere video si accesorii", 
    "Aparate foto si accesorii", 
    "Videoproiectoare si accesorii"
  ],
  "Electrocasnice, Climatizare": [
    "Frigidere si derivate", 
    "Masini de spalat rufe", 
    "Aragazuri, hote si cuptoare", 
    "Masini de spalat vase", 
    "Electrocasnice bucatarie", 
    "Espressoare si cafetiere", 
    "Aspiratoare si fiare de calcat", 
    "Climatizare", 
    "Purificatoare de aer", 
    "Aparate de aer conditionat"
  ],
  "Gaming, Carti, Birotica": [
    "Console Gaming", 
    "Accesorii Gaming", 
    "Jocuri Console & PC", 
    "Carti", 
    "Filme", 
    "Muzica", 
    "Consumabile si accesorii birou"
  ],
  "Jucarii, Articole copii & bebelusi": [
    "Jucarii", 
    "Scutece si servetele", 
    "Igiena si ingrijire", 
    "Hrana si accesorii"
  ],
  "Ingrijire Personala, Cosmetice": [
    "Ingrijire personala", 
    "Cosmetice"
  ],
  "Casa, Gradina, Bricolaj": [
    "Gradinarit", 
    "Mobilier", 
    "Saltele", 
    "Sisteme de iluminat", 
    "Scule", 
    "Materiale de constructii"
  ],
  "Sport & Calatorie": [
    "Camping", 
    "Accesorii sportive", 
    "Ciclism", 
    "Imbracaminte si incaltaminte sport", 
    "Fitness si nutritie"
  ],
  "Auto-Moto": [
    "Anvelope si jante", 
    "Intretinere", 
    "Electronice auto", 
    "Accesorii auto", 
    "Vehicule electrice"
  ]
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
    <div className="add-product-form"> {}
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
