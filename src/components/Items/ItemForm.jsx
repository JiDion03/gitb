import React, { useState } from 'react';
import axios from 'axios';
import './ItemForm.less'; 

const ItemForm = () => {
    const [itemData, setItemData] = useState({
        name: '',
        description: '',
        price: '',
        categories: { main: '', sub: '' },
        images: []
    });

    const handleChange = e => {
        const { name, value } = e.target;
        if (name === 'main' || name === 'sub') {
            setItemData(prevState => ({
                ...prevState,
                categories: { ...prevState.categories, [name]: value }
            }));
        } else if (name === 'images') {
            setItemData(prevState => ({
                ...prevState,
                images: value.split(',').map(img => img.trim()).filter(img => img)
            }));
        } else {
            setItemData(prevState => ({ ...prevState, [name]: value }));
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log('Submitting data:', itemData);
        try {
            const response = await axios.post('http://localhost:5000/api/items', itemData);
            alert('Item added successfully!');
            setItemData({
                name: '',
                description: '',
                price: '',
                categories: { main: '', sub: '' },
                images: []
            });
        } catch (error) {
            console.error('Failed to add item:', error);
            alert(`Failed to add item: ${error.response.data.message}`);
        }
    };

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <label>Name:</label>
                <input type="text" name="name" value={itemData.name} onChange={handleChange} />
                <label>Description:</label>
                <textarea name="description" value={itemData.description} onChange={handleChange} />
                <label>Price:</label>
                <input type="number" name="price" value={itemData.price} onChange={handleChange} />
                <label>Main Category:</label>
                <input type="text" name="main" value={itemData.categories.main} onChange={handleChange} />
                <label>Sub Category:</label>
                <input type="text" name="sub" value={itemData.categories.sub} onChange={handleChange} />
                <label>Images (comma-separated URLs):</label>
                <input type="text" name="images" value={itemData.images.join(',')} onChange={handleChange} />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default ItemForm;
