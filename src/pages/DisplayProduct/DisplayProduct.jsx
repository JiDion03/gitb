    import React, { useEffect, useState } from 'react';
    import axios from 'axios';
    import './DisplayProduct.less';  

    function DisplayProducts({ products, setProducts }) {
        const [error, setError] = useState('');

        useEffect(() => {
            // Fetch products if none are provided
            if (!products || products.length === 0) {
                const fetchProducts = async () => {
                    try {
                        const response = await axios.get('http://localhost:5000/api/products');
                        setProducts(response.data); // Update the state in the Home component
                    } catch (error) {
                        setError('Failed to fetch products');
                        console.error('Error:', error);
                    }
                };

                fetchProducts();
            }
        }, [products, setProducts]); // Depend on products and setProducts

        if (error) {
            return <p>Error loading products: {error}</p>;
        }

        if (!Array.isArray(products)) {
            console.error('Invalid products type:', typeof products, products);
            return <p>Error: Products data is not valid.</p>;
        }

        if (products.length === 0) {
            return <p>No products found. Please adjust your filters or try again later.</p>;
        }

        return (
            <div className="products-container">
                {products.map(product => (
                    <div key={product._id} className="product-card">
                        <img src={`http://localhost:5000/uploads/${product.images[0]}`} alt={product.name} style={{ width: "100%", height: "auto" }} />
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
