import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../login/AuthContext";
import "./AddProduct.less";

const categories = {
  "Laptop, Tablete, Telefoane": [
    "Laptopuri",
    "Accesorii laptop",
    "Telefoane mobile",
    "Accesorii telefoane mobile",
    "Tablete",
    "Accesorii tablete",
    "Wearables si Gadgets",
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
    "Office & Aplicatii desktop",
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
    "Camere Web",
  ],
  "TV, Sisteme Audio-Video": [
    "Televizoare si accesorii",
    "Drone si accesorii",
    "Camere video si accesorii",
    "Aparate foto si accesorii",
    "Videoproiectoare si accesorii",
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
    "Aparate de aer conditionat",
  ],
  "Gaming, Carti, Birotica": [
    "Console Gaming",
    "Accesorii Gaming",
    "Jocuri Console & PC",
    "Carti",
    "Filme",
    "Muzica",
    "Consumabile si accesorii birou",
  ],
  "Jucarii, Articole copii & bebelusi": [
    "Jucarii",
    "Scutece si servetele",
    "Igiena si ingrijire",
    "Hrana si accesorii",
  ],
  "Ingrijire Personala, Cosmetice": ["Ingrijire personala", "Cosmetice"],
  "Casa, Gradina, Bricolaj": [
    "Gradinarit",
    "Mobilier",
    "Saltele",
    "Sisteme de iluminat",
    "Scule",
    "Materiale de constructii",
  ],
  "Sport & Calatorie": [
    "Camping",
    "Accesorii sportive",
    "Ciclism",
    "Imbracaminte si incaltaminte sport",
    "Fitness si nutritie",
  ],
  "Auto-Moto": [
    "Anvelope si jante",
    "Intretinere",
    "Electronice auto",
    "Accesorii auto",
    "Vehicule electrice",
  ],
};

function AddProduct() {
  const { auth } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    quantity: "",
    category: "",
    subcategory: "",
    images: [],
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, images: [...e.target.files] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!auth.user) {
      console.error("User not authenticated");
      alert("You must be logged in to add a product.");
      return;
    }

    const data = new FormData();
    formData.images.forEach((image) => data.append("images", image));
    Object.keys(formData).forEach((key) => {
      if (key !== "images") {
        data.append(key, formData[key]);
      }
    });
    data.append("distributor", auth.user.id);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/products/add",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );
      alert("Product added successfully!");
      console.log(response.data);
      navigate("/profile");
    } catch (error) {
      console.error("Failed to add product:", error.response?.data);
      alert(`Failed to add product: ${error.response?.data.message}`);
    }
  };

  return (
    <div className="add-product-form">
      <form onSubmit={handleSubmit}>
        <label htmlFor="name" className="nume">
          Product Name
        </label>
        <input
          type="text"
          name="name"
          id="name"
          value={formData.name}
          onChange={handleInputChange}
          required
        />

        <label htmlFor="description" className="nume">
          Product Description
        </label>
        <textarea
          name="description"
          id="description"
          value={formData.description}
          onChange={handleInputChange}
          required
        />

        <label htmlFor="price" className="nume">
          Price
        </label>
        <input
          type="number"
          name="price"
          id="price"
          value={formData.price}
          onChange={handleInputChange}
          required
        />

        <label htmlFor="quantity" className="nume">
          Quantity
        </label>
        <input
          type="number"
          name="quantity"
          id="quantity"
          value={formData.quantity}
          onChange={handleInputChange}
          required
        />

        <label htmlFor="category" className="nume">
          Category
        </label>
        <select
          name="category"
          id="category"
          value={formData.category}
          onChange={handleInputChange}
          required
        >
          <option value="" className="nume">
            Select Category
          </option>
          {Object.keys(categories).map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        <label htmlFor="subcategory" className="nume">
          Subcategory
        </label>
        <select
          name="subcategory"
          id="subcategory"
          value={formData.subcategory}
          onChange={handleInputChange}
          required
          disabled={!formData.category}
        >
          <option value="">Select Subcategory</option>
          {formData.category &&
            categories[formData.category].map((sub) => (
              <option key={sub} value={sub}>
                {sub}
              </option>
            ))}
        </select>

        <label htmlFor="images" className="nume">
          Product Images
        </label>
        <input
          type="file"
          multiple
          onChange={handleImageChange}
          accept="image/*"
        />

        <button type="submit">Add Product</button>
      </form>
    </div>
  );
}

export default AddProduct;
