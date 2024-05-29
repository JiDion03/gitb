import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, Routes, Route, useLocation } from "react-router-dom";
import ListedItems from "./ListedItems";
import DistributorOrders from "./DistributorOrders";
import Stats from "./Stats";
import "./DistributorProfile.less";

const DistributorProfile = ({ userId }) => {
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/users/${userId}`
        );
        console.log("Fetched user data:", response.data); // Log the fetched user data
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError("Error fetching user data");
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchUser();
    } else {
      setLoading(false);
      setError("User ID is missing");
    }
  }, [userId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="profile-container">
      <div className="profile-content">
        <h1 className="negro">Distributor Profile</h1>
        <Routes>
          <Route
            path="listed-items"
            element={<ListedItems userId={userId} />}
          />
          <Route
            path="orders"
            element={<DistributorOrders userId={userId} />}
          />
          <Route path="stats" element={<Stats userId={userId} />} />
          <Route path="/" element={<ListedItems userId={userId} />} />{" "}
          {/* Default Route */}
        </Routes>
      </div>
      <div className="menu">
        <ol>
          <li
            className={
              location.pathname === `/distributor/${userId}/listed-items`
                ? "active"
                : ""
            }
          >
            <Link to={`/distributor/${userId}/listed-items`}>Listed Items</Link>
          </li>
          <li
            className={
              location.pathname === `/distributor/${userId}/orders`
                ? "active"
                : ""
            }
          >
            <Link to={`/distributor/${userId}/orders`}>Orders</Link>
          </li>
          <li
            className={
              location.pathname === `/distributor/${userId}/stats`
                ? "active"
                : ""
            }
          >
            <Link to={`/distributor/${userId}/stats`}>Statistics</Link>
          </li>
        </ol>
      </div>
    </div>
  );
};

export default DistributorProfile;
