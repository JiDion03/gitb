import React, { useEffect, useState } from 'react';
import axios from 'axios';

function FetchData() {
    const [data, setData] = useState(null);

    useEffect(() => {
        axios.get('/api') // Assuming your backend has a route '/api' that returns data
            .then(response => {
                console.log('Data fetched:', response.data);
                setData(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    return (
        <div>
            {data ? <p>Data: {data}</p> : <p>Loading data...</p>}
        </div>
    );
}

export default FetchData;
