import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ItemList.less'; 

const ItemList = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        setLoading(true);
        axios.get('http://localhost:5000/api/items')
            .then(response => {
                console.log("Fetched items:", response.data); 
                setItems(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Failed to fetch items:', error);
                setError('Failed to fetch items');
                setLoading(false);
            });
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="item-list">
            {items.length > 0 ? (
                items.map(item => (
                    <div key={item._id} className="item">
                        <h3>{item.name}</h3>
                        <p>{item.description}</p>
                        <p>${item.price}</p>
                        <div className="images">
                            {item.images.map((image, index) => (
                                <img src={image} alt={`${item.name} ${index + 1}`} key={index} />
                            ))}
                        </div>
                        <p>Category: {item.categories.main} {'>'} {item.categories.sub}</p>
                    </div>
                ))
            ) : <p>No items found.</p>}
        </div>
    );
};

export default ItemList;
