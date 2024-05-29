// Stats.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Stats.less';

const Stats = ({ userId }) => {
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        console.log(`Fetching stats for distributor with ID: ${userId}`);
        const response = await axios.get(`http://localhost:5000/api/stats/distributor/${userId}`);
        console.log('Stats data fetched:', response.data);
        setStats(response.data);
      } catch (error) {
        console.error('Error fetching stats:', error);
        setError('Error fetching stats');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [userId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="stats-container">
      <h2>Statistics</h2>
      <div className="stats-details">
        <p>Total Orders: {stats.totalOrders}</p>
        <p>Total Products: {stats.totalProducts}</p>
        <p>Total Sales: ${stats.totalSales}</p>
      </div>
    </div>
  );
};

export default Stats;
