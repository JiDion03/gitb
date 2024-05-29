import React from "react";
import { Link, Routes, Route, useLocation, useParams } from "react-router-dom";
import Orders from "./Orders";
import CartPage from "../Cart/Cart";
import FavoritesPage from "../Favorite/Favorite";
import "./Profile.less";

const Profile = ({ user }) => {
  const location = useLocation();
  const { userId } = useParams();

  if (!user) return <div>Loading...</div>;

  return (
    <div className="profile-container123">
      <div className="menu">
        <ol>
          <li
            className={
              location.pathname === `/profile/${userId}/orders` ? "active" : ""
            }
          >
            <Link to={`/profile/${userId}/orders`}>Orders</Link>
          </li>
          <li className={location.pathname === `/cart` ? "active" : ""}>
            <Link to={`/cart`}>Cart</Link>
          </li>
          <li className={location.pathname === `/favorites` ? "active" : ""}>
            <Link to={`/favorites`}>Favorites</Link>
          </li>
        </ol>
      </div>
      <div className="profile-content123">
        <div className="profile-details123">
          <h1>My Account</h1>
          <p>
            <strong>Name:</strong> {user.firstName} {user.lastName}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Phone:</strong> {user.phoneNumber}
          </p>
          {/* Add other user data fields here if needed */}
        </div>
        <Routes>
          <Route path="orders/*" element={<Orders userId={user.id} />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="favorites" element={<FavoritesPage />} />
        </Routes>
      </div>
    </div>
  );
};

export default Profile;
