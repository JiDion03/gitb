import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import './FilterComponent.less';


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
  

  function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const FilterComponent = ({ setProducts }) => {
    const query = useQuery();
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedSubcategory, setSelectedSubcategory] = useState('');
    const [priceMin, setPriceMin] = useState('');
    const [priceMax, setPriceMax] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const urlCategory = query.get('category');
        const urlSubcategory = query.get('subcategory');

        if (urlCategory && urlCategory !== selectedCategory) {
            setSelectedCategory(urlCategory);
            setSelectedSubcategory('');
        }
        
        if (urlSubcategory && urlSubcategory !== selectedSubcategory) {
            setSelectedSubcategory(urlSubcategory);
        }
    }, [query]); 

    useEffect(() => {
        if (selectedCategory && selectedSubcategory) {
            handleFilter();
        }
    }, [selectedCategory, selectedSubcategory, priceMin, priceMax]);

    const handleFilter = async () => {
        setError('');
        try {
            const response = await axios.get('http://localhost:5000/api/products/filter', {
                params: {
                    category: selectedCategory,
                    subcategory: selectedSubcategory,
                    priceMin,
                    priceMax
                }
            });
            if (Array.isArray(response.data)) {
                setProducts(response.data);
            } else {
                throw new Error("Received data is not an array");
            }
        } catch (error) {
            console.error('Failed to fetch filtered products:', error);
            setError('Failed to load products. Please try again.');
            setProducts([]);
        }
    };

    return (
        <div className="filter-component">
            <select value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)}>
                <option value="">Select Category</option>
                {Object.keys(categories).map(category => (
                    <option key={category} value={category}>{category}</option>
                ))}
            </select>
            <select value={selectedSubcategory} onChange={e => setSelectedSubcategory(e.target.value)} disabled={!selectedCategory}>
                <option value="">Select Subcategory</option>
                {selectedCategory && categories[selectedCategory] && categories[selectedCategory].map(subcategory => (
                    <option key={subcategory} value={subcategory}>{subcategory}</option>
                ))}
            </select>
            <input type="number" placeholder="Min Price" value={priceMin} onChange={e => setPriceMin(e.target.value)} />
            <input type="number" placeholder="Max Price" value={priceMax} onChange={e => setPriceMax(e.target.value)} />
            <button onClick={handleFilter}>Filter</button>
            {error && <p className="error-message">{error}</p>}
        </div>
    );
}

export default FilterComponent;