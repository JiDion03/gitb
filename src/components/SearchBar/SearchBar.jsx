
import React from 'react';
import './SearchBar.less'; 

const SearchBar = ({ query, setQuery }) => {
    return (
        <div className="search-bar-container">
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search..."
                className="search-input"
            />
            <i className="search-icon fas fa-search"></i> 
        </div>
    );
};

export default SearchBar;
