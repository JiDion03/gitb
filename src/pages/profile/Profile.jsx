import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Sidebar from './Sidebar'; 

function Profile() {
    const { userId } = useParams();  
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); 

    useEffect(() => {
        console.log(`Fetching data for user ID: ${userId}`);
        const fetchData = async () => {
            if (!userId) {
                console.log("User ID is undefined or not provided.");
                setLoading(false);
                return;
            }
            try {
                const response = await axios.get(`http://localhost:5000/api/users/${userId}`);
                console.log("Response data:", response.data);  
                setUser(response.data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [userId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!user) {
        return <div>No user data found.</div>;
    }

    return (
        <div className="profile-container">
            <Sidebar />
            <div className="profile-content">
                <div className="welcome-message">
                    Welcome back, {user.firstName} {user.lastName}, what are you up to?
                </div>
            </div>
        </div>
    );
}

export default Profile;
