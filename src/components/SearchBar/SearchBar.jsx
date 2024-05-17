import React, { useState } from 'react';
import './SearchBar.less';
import axios from 'axios';

const SearchBar = ({ setProducts }) => {
    const [query, setQuery] = useState('');

    const handleSearch = async (e) => {
        setQuery(e.target.value);
        if (e.target.value.trim() === '') {
            // If the search query is empty, fetch all products
            const response = await axios.get('http://localhost:5000/api/products');
            setProducts(response.data);
        } else {
            // Fetch search results from the backend
            const response = await axios.get(`http://localhost:5000/api/products/search?query=${e.target.value}`);
            setProducts(response.data);
        }
    };

    return (
        <div className="search-bar-container">
            <input
                type="text"
                value={query}
                onChange={handleSearch}
                placeholder="Search..."
                className="search-input"
            />
            <i className="search-icon fas fa-search"></i>
        </div>
    );
};

export default SearchBar;
