import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './DisplayProduct.less';  

function DisplayProducts() {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/products');
                console.log("Product Images URLs:", response.data.map(p => `http://localhost:5000/uploads/${p.images[0]}`));
                setProducts(response.data);
            } catch (error) {
                setError('Failed to fetch products');
                console.error('Error:', error);
            }
        };
    
        fetchProducts();
    }, []);
    

    return (
        <div className="products-container">
    {error && <p>Error loading products: {error}</p>}
    {products.map(product => (
        <div key={product._id} className="product-card">
            <img src={`http://localhost:5000/uploads/${product.images[0]}`} alt={product.name}  style={{ width: "100%", height: "auto" }} />
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p className="price">${product.price}</p>
            <p className="category">{product.category} - {product.subcategory}</p>
        </div>
    ))}
</div>


    );
}

export default DisplayProducts;
